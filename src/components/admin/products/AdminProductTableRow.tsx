import { ISneaker } from "@/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const AdminProductTableRow = ({
    sneaker,
    onSelectProduct,
}: {
    sneaker: ISneaker;
    onSelectProduct: (sneaker: ISneaker) => void;
}) => {
    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.3,
            },
        },
        exit: {
            opacity: 0,
        },
    };

    return (
        <motion.tr
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={sneaker.id}
            className="h-[9rem] shrink-0 cursor-pointer border-b-[0.1rem] border-neutral-300 hover:bg-neutral-400"
            onClick={() => onSelectProduct(sneaker)}
        >
            <td className="px-8 py-5">
                <div className="text-xs">#{sneaker.id}</div>
            </td>
            <td className="px-8 py-5">
                <div className="flex w-full flex-col items-center">
                    <Image alt="" src={sneaker.grid_picture_url} width={50} height={40} />
                </div>
            </td>
            <td className="px-8 py-5">
                <div className="flex max-w-[20rem] flex-col">
                    <div className="text-sm font-semibold">{sneaker.name}</div>
                </div>
            </td>
            <td className="px-8 py-5">
                <div className="text-xs">{sneaker.brand_name}</div>
            </td>
            <td className="px-8 py-5">
                <div className="text-xs">{sneaker.color}</div>
            </td>
            <td className="px-8 py-5">
                <div className="rounded-full bg-success-background font-bold text-success-text">Activo</div>
            </td>
        </motion.tr>
    );
};

export default AdminProductTableRow;
