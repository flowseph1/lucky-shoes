import { Hero } from "@/components/hero";
import { SneakerList } from "@/components/sneaker-list";
import { getSneakers } from "@/lib/api/sneakers";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Inicio | Lucky Shoes",
};

export default async function Page() {
	const sneakersData = await getSneakers();

	return (
		<section className="flex flex-col">
			<Hero />
			{/* <HottestSneakers data={hottestSneakersData.data} /> */}
			<SneakerList sneakerList={sneakersData} />
		</section>
	);
}
