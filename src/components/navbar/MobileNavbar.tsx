import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";

const items = [
	{ title: "Inicio", href: "/" as const },
	{ title: "Sobre Nosotros", href: "/about-us" as const },
	{ title: "Favoritos", href: "/favorites" as const, icon: <IoHeartOutline size={18} /> },
];

export function MobileNavbar({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { pathname } = useLocation();

	useEffect(() => {
		if (!open) return;
		const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
		const previousOverflow = document.body.style.overflow;
		document.addEventListener("keydown", closeOnEscape);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", closeOnEscape);
			document.body.style.overflow = previousOverflow;
		};
	}, [onClose, open]);

	return (
		<div
			className={`fixed inset-0 z-20 sm:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
			aria-hidden={!open}
		>
			<button
				type="button"
				aria-label="Cerrar navegación"
				onClick={onClose}
				className={`absolute inset-0 bg-black/65 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
			/>
			<nav
				id="mobile-store-navigation"
				aria-label="Navegación principal"
				className={`absolute top-(--header-height) right-0 left-0 border-white/[0.08] border-b bg-neutral-700/95 p-4 shadow-2xl backdrop-blur transition-transform ${open ? "translate-y-0" : "-translate-y-full"}`}
			>
				<ul className="flex flex-col gap-1">
					{items.map(({ title, href, icon }) => (
						<li key={href}>
							<Link
								to={href}
								onClick={onClose}
								className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm transition-colors ${pathname === href ? "bg-primary-light text-primary-900" : "text-text-light hover:bg-white/[0.05] hover:text-text-base"}`}
							>
								{icon}
								{title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
