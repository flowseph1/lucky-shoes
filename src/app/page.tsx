import { Filters } from "@/components/filters";
import { SneakerList } from "@/components/sneaker-list";
import { Subtitle } from "@/components/subtitle";
import { getSneakers } from "@/lib/api-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Lucky Shoes",
};

export default async function Page() {
  const sneakersData = await getSneakers();

  return (
    <section className="flex flex-col gap-14">
      <Subtitle subtitle="Recomendaciones" />
      <Filters />
      <SneakerList sneakerList={sneakersData.data} />
    </section>
  );
}
