import { data } from "@/data";
import React from "react";
import ProductItem from "./ProductItem";

const Products = () => {
    return (
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.sneakers.map((sneaker) => (
                <ProductItem sneaker={sneaker} key={sneaker.id} />
            ))}
        </div>
    );
};

export default Products;
