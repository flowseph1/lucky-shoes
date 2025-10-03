"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { Button } from "@/components/ui";
import { SneakerWithBrand } from "@/lib/api/sneakers";

interface Props {
	sneaker: SneakerWithBrand;
}

export function SneakerItem({ sneaker }: Props) {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<Link
				href={`/sneaker/${sneaker.slug}`}
				className="group group relative flex min-h-108 w-full flex-col overflow-hidden rounded-2xl border-[0.1rem] border-border-color"
			>
				{/* Top Section */}
				<div className="relative flex-1 bg-container-extra-light group-hover:bg-neutral-900">
					<div className="relative h-[160px] w-full overflow-hidden">
						{sneaker.image && (
							<Image
								src={sneaker.image}
								alt="Foto principal"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover transition-transform group-hover:scale-105"
							/>
						)}
					</div>

					{sneaker.isNew && (
						<div className="absolute top-5 left-5 rounded-full border border-tertiary bg-tertiary/70 px-3 py-1">
							<p className="font-semibold text-white/80 text-xs">Nuevo</p>
						</div>
					)}
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
