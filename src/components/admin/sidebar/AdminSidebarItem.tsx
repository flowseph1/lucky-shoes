import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface IAdminSideBarItem {
    item: { title: string; href: string };
}

const AdminSidebarItem = ({ item }: IAdminSideBarItem) => {
    const route = useRouter();

    const isActive = route.pathname.split("/").pop() === item.href.split("/").pop();

    return (
        <Link
            href={item.href}
            className={classNames(
                "mb-4 cursor-pointer rounded-md border-l-8 border-l-transparent px-10 py-4 text-lg font-semibold text-text-extra-light transition-colors hover:bg-neutral-700",
                isActive ? "border-l-[0.7rem] !border-l-primary bg-neutral-500 !text-text-base" : ""
            )}
        >
            {item.title}
        </Link>
    );
};

export default AdminSidebarItem;
