"use client";

import Image from "next/image";
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { Button } from "@/components/ui";
import { SneakerWithBrand } from "@/lib/api/sneakers";
import { SelectBrand } from "@/lib/db/schema";
import { Filters } from "./filters";

export function SneakerList({
	sneakerList,
	brands,
}: {
	sneakerList: SneakerWithBrand[];
	brands: SelectBrand[];
}) {
	return (
		<div className="flex flex-col gap-16">
			<Filters brands={brands} />

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{sneakerList.map((sneaker) => (
					<SneakerItem sneaker={sneaker} key={sneaker.id} />
				))}
			</div>
		</div>
	);
}

interface Props {
	sneaker: SneakerWithBrand;
}

function SneakerItem({ sneaker }: Props) {
	return (
		<Link
			href={sneaker.slug}
			className="group relative flex min-h-108 w-full flex-col overflow-hidden rounded-2xl border-[0.1rem] border-border-color group"
		>
			{/* Top Section */}
			<div className="relative flex-1 bg-container-extra-light group-hover:bg-neutral-900">
				<div className="flex items-center justify-center">
					{sneaker.image && (
						<Image
							src={sneaker.image}
							alt="Foto principal"
							width={160}
							height={160}
							className="transition-transform group-hover:scale-110"
						/>
					)}
				</div>

				{sneaker.isNew && (
					<div className="absolute top-5 left-5 bg-tertiary/20 border border-tertiary/40 rounded-full px-3 py-1">
						<p className="text-xs text-tertiary font-semibold">Nuevo!</p>
					</div>
				)}
			</div>

			{/* Bottom Section */}
			<div className="flex flex-col flex-1 bg-[rgba(255,255,255,.02)] px-5 py-8 shrink-0 gap-3">
				<p className="text-sm text-text-light border border-border-color rounded-full px-4 py-1 w-fit">
					{sneaker.brandName}
				</p>
				<div className="text-sm font-semibold">{sneaker.name}</div>
				<div className="text-xs text-text-light/50 font-semibold line-clamp-2">
					{sneaker.shortDescription}
				</div>

				<div className="flex flex-1">
					<div className="flex flex-1 items-end justify-end ">
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

			<div className="absolute right-5 top-5 cursor-pointer text-text-light transition-transform hover:scale-110">
				<IoHeartOutline size={18} />
			</div>
		</Link>
	);
}
