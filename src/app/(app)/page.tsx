import type { Metadata } from "next";
import { Suspense } from "react";
import { Filters } from "@/components/filters";
import { Hero } from "@/components/hero";
import { SneakerSkeleton } from "@/components/sneaker/skeleton";
import { SneakerList } from "@/components/sneaker-list";
import { getBrands } from "@/lib/api/brands";

export const metadata: Metadata = {
	title: "Inicio | Lucky Shoes",
};

interface PageProps {
	searchParams: Promise<{
		brand?: string;
		search?: string;
	}>;
}

export default async function Page({ searchParams }: PageProps) {
	const { brand, search } = await searchParams;
	const brands = await getBrands();

	return (
		<section className="flex flex-col">
			<Hero />
			<div className="flex flex-col gap-16 pb-20">
				<Filters brands={brands} />
				<Suspense key={`${brand ?? "all"}-${search ?? ""}`} fallback={<SneakerSkeleton />}>
					<SneakerList brand={brand} search={search} />
				</Suspense>
			</div>
		</section>
	);
}
