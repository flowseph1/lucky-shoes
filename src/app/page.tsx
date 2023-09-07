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
    <div>
      <div className="pt-10">
        <Subtitle subtitle="Recomendaciones" className="mb-10" />
        <Filters className="mb-14" />
        <SneakerList sneakerList={sneakersData.data} />
      </div>
    </div>
  );
}
