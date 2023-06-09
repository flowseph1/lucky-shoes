import { ISneaker } from "@/interfaces";
import React, { memo } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { IconButton } from "../ui";

interface Props {
    sneaker: ISneaker;
}

const ProductItem = ({ sneaker }: Props) => {
    return (
        <div className="group relative flex h-[27rem] w-full flex-col overflow-hidden rounded-lg border-[0.1rem] border-border-color hover:shadow-product-shadow">
            <div className="flex-1 bg-[rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-center">
                    <img
                        src={sneaker.grid_picture_url}
                        alt="Foto principal"
                        width={160}
                        className="cursor-pointer transition-transform group-hover:scale-110"
                    />
                </div>
            </div>
            <div className="flex flex-[0.5] flex-col bg-[rgba(255,255,255,0.07)] p-5">
                <div className="mb-2 cursor-pointer text-sm font-bold hover:underline">{sneaker.name}</div>

                <div className="flex flex-1 justify-between">
                    <div className="flex flex-1 flex-wrap space-x-3">
                        <div className="inline-flex h-fit cursor-pointer truncate rounded-full bg-container px-4 py-1 text-xs">
                            {sneaker.brand_name}
                        </div>
                        {/*  <div className="inline-flex cursor-pointer truncate rounded-full bg-container px-4 py-1 text-xs">
                            {sneaker.nickname}
                        </div> */}
                    </div>

                    <div className="flex flex-1 items-end justify-end ">
                        <IconButton icon={<FiShoppingBag />} />
                    </div>
                </div>
            </div>

            <div className="absolute right-5 top-5 cursor-pointer text-text-light transition-transform hover:scale-110">
                <IoHeartOutline size={18} />
            </div>
        </div>
    );
};

export default memo(ProductItem);
