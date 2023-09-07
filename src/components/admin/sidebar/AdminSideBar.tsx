import React, { useState } from "react";
import AdminSidebarItem from "./AdminSidebarItem";
import { Subtitle } from "@/components/ui";
import { useRouter } from "next/router";

const SIDEBAR_OPTIONS = [
    {
        title: "Dashboard",
        href: "/admin",
    },
    {
        title: "Productos",
        href: "/admin/productos",
    },
    {
        title: "Marcas",
        href: "/admin/marcas",
    },
    {
        title: "Categorias",
        href: "/admin/categorias",
    },
    {
        title: "Descuentos",
        href: "/admin/descuentos",
    },
];

const AdminSideBar = () => {
    return (
        <div className="flex">
            <div className="flex flex-col">
                {/* Logo */}
                <div className="flex h-[8rem] w-full items-center justify-center">
                    <div className="logo-shadow  animate-flicker font-neon text-xxl text-logo">Lucky-Admin</div>
                </div>

                {/* Navegacion */}
                <div className="mr-8 flex w-[20rem] flex-col items-center rounded-lg">
                    <div className="flex w-full  flex-col px-5">
                        {SIDEBAR_OPTIONS.map((item) => {
                            return <AdminSidebarItem key={item.title} item={item} />;
                        })}
                    </div>
                </div>
            </div>

            {/* Border */}
            <div className="w-[0.1rem] bg-border-gradient" />
        </div>
    );
};

export default AdminSideBar;
