import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { ScreenLayout } from "@/components/ui/screen-layout";
import { useFavorites } from "@/lib/hooks/use-favorites";

export const Route = createFileRoute("/favorites")({ component: FavoritesPage, ssr: false });
function FavoritesPage() {
	const { favorites } = useFavorites();
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-(--header-height)">
				<ScreenLayout showBackButton>
					<ScreenLayout.Title>Tus Favoritos</ScreenLayout.Title>
					<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{favorites.map((sneaker) => (
							<SneakerItem sneaker={sneaker} key={sneaker.id} />
						))}
					</div>
				</ScreenLayout>
			</main>
			<Footer />
		</div>
	);
}
