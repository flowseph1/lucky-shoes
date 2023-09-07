import { Filters } from "@/components/filters";
import { Hero } from "@/components/hero";
import { SneakerList } from "@/components/sneaker-list";
import { Subtitle } from "@/components/subtitle";
import { getHomeData, getSneakers } from "@/lib/api-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Lucky Shoes",
};

export default async function Page() {
  const sneakersData = await getSneakers();

  const homeData = await getHomeData();

  return (
    <section className="flex flex-col gap-14">
      <Hero data={homeData.data.hero} />
      <Subtitle subtitle="Recomendaciones" />
      <Filters />
      <SneakerList sneakerList={sneakersData.data} />
    </section>
  );
}
