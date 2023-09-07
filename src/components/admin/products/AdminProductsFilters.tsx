import { brands, data } from "@/data";
import React from "react";
import AdminProductsFilter from "./AdminProductsFilter";

const AdminProductsFilters = () => {
    return (
        <div className="flex">
            {brands.map((brand) => (
                <AdminProductsFilter key={brand.name} brand={brand} />
            ))}
        </div>
    );
};

export default AdminProductsFilters;
