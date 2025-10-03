import { useCallback, useEffect, useState } from "react";
import { SneakerWithBrand } from "@/lib/api/sneakers";

export function useFavorites() {
	const [favorites, setFavorites] = useState<SneakerWithBrand[]>([]);

	const getFavorites = useCallback(() => {
		const favorites = localStorage.getItem("favorites");
		if (favorites) {
			setFavorites(JSON.parse(favorites));
		}
	}, []);

	const saveFavorite = useCallback(
		(sneaker: SneakerWithBrand) => {
			const favoritesArray = favorites ? favorites : [];
			localStorage.setItem("favorites", JSON.stringify([...favoritesArray, sneaker]));
			getFavorites();
		},
		[favorites, getFavorites],
	);

	const deleteFavorite = useCallback(
		(sneaker: SneakerWithBrand) => {
			if (favorites) {
				localStorage.setItem(
					"favorites",
					JSON.stringify(favorites.filter((favorite: SneakerWithBrand) => favorite.id !== sneaker.id)),
				);
				getFavorites();
			}
		},
		[favorites, getFavorites],
	);

	const toggleFavorite = useCallback(
		(sneaker: SneakerWithBrand) => {
			if (favorites.some((favorite: SneakerWithBrand) => favorite.id === sneaker.id)) {
				deleteFavorite(sneaker);
			} else {
				saveFavorite(sneaker);
			}
		},
		[deleteFavorite, saveFavorite, favorites],
	);

	useEffect(() => {
		getFavorites();
	}, [getFavorites]);

	return { favorites, saveFavorite, deleteFavorite, toggleFavorite };
}
