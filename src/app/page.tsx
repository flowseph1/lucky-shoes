import { Filters } from "@/components/filters";
import { Hero } from "@/components/hero";
import { HottestSneakers } from "@/components/hottest-sneakers";
import { SneakerList } from "@/components/sneaker-list";
import { Subtitle } from "@/components/subtitle";
import {
  getHomeData,
  getHottestSneakers,
  getSneakers,
} from "@/lib/api-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Lucky Shoes",
};

export default async function Page() {
  const sneakersData = await getSneakers();

  const hottestSneakersData = await getHottestSneakers();

  const homeData = await getHomeData();

  return (
    <section className="flex flex-col gap-24">
      <Hero data={homeData.data.hero} />
      {/* <HottestSneakers data={hottestSneakersData.data} /> */}
      <Filters />
      <SneakerList sneakerList={sneakersData.data} />
    </section>
  );
}
