import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavItemProps {
	title: string;
	icon?: ReactNode;
	href?: string;
	active?: boolean;
}

const NavbarItem = ({ title, icon, href, active }: NavItemProps) => {
	if (href) {
		return (
			<Link href={href}>
				<li
					className={cn("flex cursor-pointer flex-row items-center gap-2 hover:text-text-base", {
						"text-text-base": active,
					})}
				>
					{icon && icon}
					{title}
				</li>
			</Link>
		);
	}
	return (
		<li
			className={cn("flex cursor-pointer flex-row items-center gap-2 hover:text-text-base", {
				"text-text-base": active,
			})}
		>
			{icon && icon}
			{title}
		</li>
	);
};

export default NavbarItem;
