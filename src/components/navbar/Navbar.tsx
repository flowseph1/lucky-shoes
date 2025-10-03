"use client";

import { usePathname } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";
import NavbarItem, { NavItemProps } from "./NavbarItem";

const NAVBAR_ITEMS: NavItemProps[] = [
	{
		title: "Inicio",
		href: "/",
	},
	{
		title: "Sobre Nosotros",
		href: "/about-us",
	},
];

const NAV_BAR_ITEMS_RIGHT: NavItemProps[] = [
	{
		title: "Favoritos",
		href: "/favorites",
		icon: <IoHeartOutline />,
	},
];

const Navbar = () => {
	const pathname = usePathname();

	return (
		<ul className="hidden h-full flex-1 items-center justify-between text-text-light sm:flex">
			<div className="flex flex-row items-center gap-10">
				{NAVBAR_ITEMS.map((item) => (
					<NavbarItem
						key={item.title}
						title={item.title}
						href={item.href}
						icon={item.icon}
						active={pathname === item.href}
					/>
				))}
			</div>
			<div className="flex flex-row items-center gap-10">
				{NAV_BAR_ITEMS_RIGHT.map((item) => (
					<NavbarItem
						key={item.title}
						title={item.title}
						href={item.href}
						icon={item.icon}
						active={pathname === item.href}
					/>
				))}
			</div>
		</ul>
	);
};

export default Navbar;
