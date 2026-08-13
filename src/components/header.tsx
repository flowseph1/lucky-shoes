"use client";

import { useState } from "react";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { Container } from "@/components/container";
import { Logo } from "./logo";
import { Navbar } from "./navbar";
import { MobileNavbar } from "./navbar/MobileNavbar";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<>
			<header className="box-blur fixed top-0 left-0 z-30 h-(--header-height) w-full bg-[rgba(0,2,18,0.82)]">
				<Container>
					<div className="flex h-full justify-between">
						<div className="flex flex-1 items-center">
							<Logo />
							<Navbar />
						</div>
						<div className="flex items-center sm:hidden">
							<button
								type="button"
								onClick={() => setMenuOpen((open) => !open)}
								aria-expanded={menuOpen}
								aria-controls="mobile-store-navigation"
								aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
								className="flex size-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
							>
								{menuOpen ? <IoClose size={24} /> : <IoMenuOutline size={24} />}
							</button>
						</div>
					</div>
				</Container>
				<div className="h-[0.1rem] w-full bg-border-gradient" />
			</header>
			<MobileNavbar open={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
};
