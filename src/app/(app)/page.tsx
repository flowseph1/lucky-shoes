import { Hero } from "@/components/hero";
import { SneakerList } from "@/components/sneaker-list";
import { getBrands } from "@/lib/api/brands";
import { getSneakers } from "@/lib/api/sneakers";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Inicio | Lucky Shoes",
};

export default async function Page() {
	const sneakersData = await getSneakers();
	const brandsData = await getBrands();

	return (
		<section className="flex flex-col pt-(--header-height)">
			<Hero />
			<SneakerList sneakerList={sneakersData} brands={brandsData} />
		</section>
	);
}
