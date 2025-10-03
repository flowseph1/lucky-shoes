"use client";

import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { ScreenLayout } from "@/components/ui/screen-layout";
import { useFavorites } from "@/lib/hooks/use-favorites";

export default function FavoritesPage() {
	const { favorites } = useFavorites();
	return (
		<ScreenLayout showBackButton>
			<ScreenLayout.Title>Tus Favoritos</ScreenLayout.Title>
			<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{favorites.map((sneaker) => (
					<SneakerItem sneaker={sneaker} key={sneaker.id} />
				))}
			</div>
		</ScreenLayout>
	);
}
