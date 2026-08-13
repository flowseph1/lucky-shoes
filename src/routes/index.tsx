import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { Filters } from "@/components/filters";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { EmptyList } from "@/components/sneaker/empty-list";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { homeData } from "@/data/home";
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
				<Container>
					<section id="catalogo" className="flex scroll-mt-(--header-height) flex-col gap-12 pb-32">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">{homeData.catalog.title}</h2>
							<p className="text-sm text-text-light">{homeData.catalog.subtitle}</p>
						</div>

						<Filters brands={brands} />

						{sneakers.length ? (
							<div className="flex flex-col gap-6">
								<p className="text-sm text-text-extra-light">
									{sneakers.length} {sneakers.length === 1 ? "resultado" : "resultados"}
								</p>
								<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
									{sneakers.map((sneaker) => (
										<SneakerItem key={sneaker.id} sneaker={sneaker} />
									))}
								</div>
							</div>
						) : (
							<EmptyList />
						)}
					</section>
				</Container>
			</main>
			<Footer />
		</div>
	);
}
