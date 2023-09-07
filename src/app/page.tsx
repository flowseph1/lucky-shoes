import { Filters } from "@/components/filters";
import { ProductsList } from "@/components/products-list";
import { Subtitle } from "@/components/subtitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucky Shoes",
};

export default function Page() {
  return (
    <div>
      <div className="pt-10">
        <Subtitle subtitle="Recomendaciones" className="mb-10" />
        <Filters className="mb-14" />
        <ProductsList />
      </div>
    </div>
  );
}
