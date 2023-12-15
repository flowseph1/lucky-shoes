import { Subtitle } from "@/components/subtitle";
import { hottestSneakersData } from "@/data/hottest-sneakers";
import { Sneaker } from "@/types/sneaker";
import Image from "next/image";

export function HottestSneakers({ data }: Sneaker[]) {
  return (
    <div className="flex flex-col gap-8">
      <Subtitle subtitle="Los mas buscados 🔥" />
      <div className="w-full rounded-2xl bg-neutral-900">
        <ul className="flex gap-5">
          {data.map((sneaker) => (
            <HottestSneakerItem key={sneaker.id} {...sneaker} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HottestSneakerItem({
  grid_picture_url,
  name,
  brand_name,
}: Sneaker) {
  return (
    <li>
      {/* Image */}
      <div>
        <Image src={grid_picture_url} alt="sneaker" width={150} height={150} />
      </div>
      {/* Content */}
      <div>
        <p>{name}</p>
        <p>{brand_name}</p>
      </div>
    </li>
  );
}
