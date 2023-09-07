import React from "react";

const AdminProductsFilter = ({ brand }: { brand: { name: string } }) => {
    return (
        <div className="cursor-pointer rounded-lg px-5 py-2 text-xs text-text-extra-light hover:bg-neutral-100 hover:text-text-base">
            {brand.name}
        </div>
    );
};

export default AdminProductsFilter;
