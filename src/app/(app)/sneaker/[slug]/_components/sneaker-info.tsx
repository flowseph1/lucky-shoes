"use client";

import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { SneakerWithBrandAndImages } from "@/lib/api/sneakers";
import { cn } from "@/lib/utils";

export function SneakerInfo({ sneaker }: { sneaker: SneakerWithBrandAndImages }) {
	return (
		<>
			<button
				className={cn("flex cursor-default items-center gap-4", {
					"cursor-pointer": sneaker.brand.url !== null,
				})}
				onClick={sneaker.brand.url !== null ? () => window.open(sneaker.brand.url!, "_blank") : undefined}
			>
				<div className="relative h-16 w-16 rounded-full border border-border-color bg-white/90">
					<Image
						src={sneaker.brand.image}
						alt={sneaker.brand.name}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="rounded-full object-cover"
					/>
				</div>
				<p className="text-lg text-text-light/90">{sneaker.brand.name}</p>
				{sneaker.brand.verified && <MdVerified size={16} className="text-blue-500" />}
			</button>
			<p className="text-balance font-bold text-7xl">{sneaker.name}</p>
			<p className="text-text-light/80">{sneaker.longDescription}</p>
			{/* <p>
				Disponibilidad:{" "}
				<span className="font-semibold">{sneaker.availability}</span>
			</p> */}
		</>
	);
}
