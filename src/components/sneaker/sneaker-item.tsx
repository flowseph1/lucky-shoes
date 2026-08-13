"use client";

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CiShop } from "react-icons/ci";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Button } from "@/components/ui";
import { SneakerWithBrand } from "@/lib/api/sneakers";
import { useFavorites } from "@/lib/hooks/use-favorites";

interface Props {
	sneaker: SneakerWithBrand;
}

export function SneakerItem({ sneaker }: Props) {
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.some((favorite) => favorite.id === sneaker.id);

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-1">
			<Link
				to="/sneaker/$slug"
				params={{ slug: sneaker.slug }}
				className="group hover:-translate-y-1 relative flex min-h-108 w-full flex-1 flex-col overflow-hidden rounded-2xl border-[0.1rem] border-border-color transition-all duration-300 hover:border-white/20 hover:shadow-container-shadow"
			>
				{/* Top Section */}
				<div className="relative flex-1 bg-container-extra-light group-hover:bg-neutral-900">
					<div className="relative h-[160px] w-full overflow-hidden">
						{sneaker.image && (
							<img
								src={sneaker.image}
								alt="Foto principal"
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						)}
					</div>

					{sneaker.isNew && (
						<div className="box-blur absolute top-5 left-5 rounded-full border border-primary-border bg-neutral-1000/60 px-3 py-1">
							<p className="font-semibold text-primary-900 text-xxs uppercase tracking-[0.08em]">Nuevo</p>
						</div>
					)}

					<button
						type="button"
						aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
						aria-pressed={isFavorite}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							toggleFavorite(sneaker);
						}}
						className="absolute top-5 right-5 flex cursor-pointer items-center justify-center text-white"
					>
						{isFavorite ? <IoHeart size={22} className="text-tertiary" /> : <IoHeartOutline size={22} />}
					</button>
				</div>

				{/* Bottom Section */}
				<div className="flex flex-1 shrink-0 flex-col gap-3 bg-[rgba(255,255,255,.02)] px-5 py-8">
					<p className="w-fit rounded-full border border-border-color px-4 py-1 text-sm text-text-light">
						{sneaker.brand.name}
					</p>
					<div className="font-semibold text-sm">{sneaker.name}</div>
					<div className="line-clamp-2 font-semibold text-text-light/50 text-xs">{sneaker.shortDescription}</div>

					<div className="flex flex-1">
						<div className="flex flex-1 items-end justify-end">
							<Button
								title="Cotizar"
								size="small"
								rounded="full"
								leftIcon={<CiShop size={20} />}
								onClick={() => null}
							/>
							{/* <Button title="Ver más" intent="primary" onClick={() => null} /> */}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
