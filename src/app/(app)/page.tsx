import { Hero } from "@/components/hero";
import { SneakerList } from "@/components/sneaker-list";
import { getHomeData, getSneakers } from "@/lib/api-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Lucky Shoes",
};

export default async function Page() {
  const sneakersData = await getSneakers();

  const homeData = await getHomeData();

  return (
    <section className="flex flex-col">
      <Hero data={homeData.data.hero} />
      {/* <HottestSneakers data={hottestSneakersData.data} /> */}
      <SneakerList sneakerList={sneakersData.data} />
    </section>
  );
}
