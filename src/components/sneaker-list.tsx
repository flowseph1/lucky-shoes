"use client";

import { IconButton } from "@/components/ui";
import { products } from "@/data/producst";
import { Sneaker } from "@/types/sneaker";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";

export function SneakerList({ sneakerList }: { sneakerList: Sneaker[] }) {
  return (
    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {sneakerList.map((sneaker) => (
        <SneakerItem sneaker={sneaker} key={sneaker.id} />
      ))}
    </div>
  );
}

interface Props {
  sneaker: Sneaker;
}

function SneakerItem({ sneaker }: Props) {
  return (
    <Link
      href={sneaker.slug}
      className="group relative flex min-h-[27rem] w-full flex-col overflow-hidden rounded-lg border-[0.1rem] border-border-color group:"
    >
      <div className="flex-1 bg-container-extra-light group-hover:bg-neutral-900">
        <div className="flex items-center justify-center">
          <Image
            src={sneaker.grid_picture_url}
            alt="Foto principal"
            width={160}
            height={160}
            className="transition-transform group-hover:scale-110"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-container-light p-5 shrink-0 gap-4">
        <div className="inline-flex h-fit cursor-pointer truncate rounded-full bg-container/50 px-4 py-1 text-[1rem] w-fit ">
          {sneaker.brand_name}
        </div>

        <div className="text-sm font-semibold">{sneaker.name}</div>

        <div className="flex flex-1 justify-between">
          <div className="flex flex-1 flex-wrap space-x-3">
            {/* <div className="inline-flex cursor-pointer truncate rounded-full bg-container px-4 py-1 text-xs">
              {sneaker.nickname}
            </div> */}
          </div>

          <div className="flex flex-1 items-end justify-end ">
            <IconButton icon={<FiShoppingBag />} onClick={() => null} />
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-5 cursor-pointer text-text-light transition-transform hover:scale-110">
        <IoHeartOutline size={18} />
      </div>
    </Link>
  );
}
