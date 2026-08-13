import { createFileRoute } from "@tanstack/react-router";
import { Filters } from "@/components/filters";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { getCatalog, getCatalogBrands } from "@/lib/server/catalog";

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>) => ({
		brand: typeof search.brand === "string" ? search.brand : undefined,
		search: typeof search.search === "string" ? search.search : undefined,
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({ deps }) => ({ brands: await getCatalogBrands(), sneakers: await getCatalog({ data: deps }) }),
	component: HomePage,
});

function HomePage() {
	const { brands, sneakers } = Route.useLoaderData();
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-(--header-height)">
				<Hero />
				<section className="flex flex-col gap-16 pb-20">
					<Filters brands={brands} />
					{sneakers.length ? (
						<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
							{sneakers.map((sneaker) => (
								<SneakerItem key={sneaker.id} sneaker={sneaker} />
							))}
						</div>
					) : (
						<p>No encontramos sneakers para estos filtros.</p>
					)}
				</section>
			</main>
			<Footer />
		</div>
	);
}
