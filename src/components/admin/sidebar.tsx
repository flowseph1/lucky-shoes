"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MdLabelImportantOutline, MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSneaker } from "react-icons/pi";
import { AdminLogo } from "@/components/logo/logo-admin";
import { cn } from "@/lib/utils";

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
		<div className="flex min-w-92 flex-[0.1] flex-col border-neutral-100 border-r px-5">
			<AdminLogo />

			{/* Navigation Bar */}
			<ul className="flex w-full flex-col">
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

	const active = item.slug === "dashboard" && pathname === "/admin" ? true : pathname.includes(item.slug);

	return (
		<Link href={item.href}>
			<li
				className={cn("flex flex-row items-center gap-2 rounded-lg p-5 hover:text-white/70", {
					"bg-neutral-300 font-semibold text-white hover:text-white": active,
				})}
			>
				<div>{item.icon}</div>
				<p>{item.name}</p>
			</li>
		</Link>
	);
}
