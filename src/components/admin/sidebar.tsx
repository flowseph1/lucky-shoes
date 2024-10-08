"use client";

import { Container } from "@/components/container";
import { AdminLogo } from "@/components/logo/logo-admin";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  MdOutlineDashboardCustomize,
  MdLabelImportantOutline,
} from "react-icons/md";
import { PiSneaker } from "react-icons/pi";

const OPTIONS = [
  {
    name: "Dashboard",
    slug: "dashboard",
    href: "/admin",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: "Sneakers",
    slug: "sneakers",
    href: "/admin/sneakers",
    icon: <PiSneaker />,
  },
  {
    name: "Marcas",
    slug: "brands",
    href: "/admin/brands",
    icon: <MdLabelImportantOutline />,
  },
];

export function AdminSideBar() {
  return (
    <div className="flex flex-col flex-[0.1] border-r-[1px] border-neutral-100 min-w-[23rem] px-5">
      <AdminLogo />

      {/* Navigation Bar */}
      <ul className="flex flex-col w-full">
        {OPTIONS.map((item) => (
          <SideBarItem key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
}

interface SideBarProps {
  name: string;
  slug: string;
  href: string;
  icon: ReactNode;
}

export function SideBarItem({ item }: { item: SideBarProps }) {
  const pathname = usePathname();

  const active =
    item.slug === "dashboard" && pathname === "/admin"
      ? true
      : pathname.includes(item.slug);

  return (
    <Link href={item.href}>
      <li
        className={cn(
          "flex flex-row gap-2 items-center p-5 hover:text-white/70 rounded-lg",
          {
            "text-white font-semibold bg-neutral-300 hover:text-white": active,
          },
        )}
      >
        <div>{item.icon}</div>
        <p>{item.name}</p>
      </li>
    </Link>
  );
}
