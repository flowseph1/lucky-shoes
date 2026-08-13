import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { LuExternalLink, LuFootprints, LuLayoutDashboard, LuLogOut, LuMenu, LuTags, LuX } from "react-icons/lu";
import { getAdminSession, signOut } from "@/lib/server/auth";

export const Route = createFileRoute("/admin")({
	loader: ({ location }) => (location.pathname === "/admin/login" ? null : getAdminSession()),
	pendingComponent: AdminLayoutPending,
	pendingMs: 200,
	component: AdminLayout,
});

function AdminLayoutPending() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="size-8 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-500" />
		</div>
	);
}

const links: { to: string; label: string; icon: IconType }[] = [
	{ to: "/admin", label: "Dashboard", icon: LuLayoutDashboard },
	{ to: "/admin/brands", label: "Marcas", icon: LuTags },
	{ to: "/admin/sneakers", label: "Sneakers", icon: LuFootprints },
];

function AdminLayout() {
	const { pathname } = useLocation();
	const session = Route.useLoaderData();
	const navigate = useNavigate();
	const logout = useServerFn(signOut);
	const [menuOpen, setMenuOpen] = useState(false);
	const handleLogout = async () => {
		await logout();
		await navigate({ to: "/admin/login" });
	};

	const initial = session?.email?.[0]?.toUpperCase() ?? "A";
	useEffect(() => {
		if (!menuOpen) return;
		const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
		const previousOverflow = document.body.style.overflow;
		document.addEventListener("keydown", closeOnEscape);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", closeOnEscape);
			document.body.style.overflow = previousOverflow;
		};
	}, [menuOpen]);

	if (pathname === "/admin/login") return <Outlet />;

	return (
		<div className="flex min-h-screen bg-background">
			<aside className="sticky top-0 hidden h-screen w-[25rem] shrink-0 flex-col border-white/[0.06] border-r bg-neutral-700/60 lg:flex">
				<Link to="/admin" className="flex items-center gap-4 px-8 py-10">
					<span className="flex size-12 items-center justify-center rounded-xl bg-primary-500 font-bold text-md text-white/90">
						L
					</span>
					<span className="flex flex-col leading-tight">
						<span className="font-semibold text-sm text-text-base">Lucky Shoes</span>
						<span className="text-text-extra-light text-xs">Panel de administración</span>
					</span>
				</Link>

				<nav className="flex flex-1 flex-col gap-1 px-6">
					<p className="px-4 pt-4 pb-3 font-medium text-text-xx-light text-xs uppercase tracking-wider">Gestión</p>
					{links.map(({ to, label, icon: Icon }) => (
						<Link
							key={to}
							to={to}
							activeOptions={{ exact: to === "/admin" }}
							className="group flex items-center gap-4 rounded-xl px-4 py-4 text-sm text-text-light transition-colors hover:bg-hover hover:text-text-base"
							activeProps={{ className: "!bg-primary-light !text-primary-900 font-medium" }}
						>
							<Icon size={16} className="shrink-0 opacity-80" />
							{label}
						</Link>
					))}
				</nav>

				<div className="border-white/[0.06] border-t p-6">
					<a
						href="/"
						className="mb-3 flex items-center gap-4 rounded-xl px-4 py-4 text-sm text-text-light transition-colors hover:bg-hover hover:text-text-base"
					>
						<LuExternalLink size={16} className="shrink-0 opacity-80" />
						Ver tienda
					</a>
					<div className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-4">
						<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light font-semibold text-primary-900 text-xs">
							{initial}
						</span>
						<span className="min-w-0 flex-1">
							<span className="block truncate text-text-base text-xs">{session?.email ?? "Administrador"}</span>
						</span>
						<button
							type="button"
							onClick={handleLogout}
							title="Cerrar sesión"
							aria-label="Cerrar sesión"
							className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-light transition-colors hover:bg-hover hover:text-secondary"
						>
							<LuLogOut size={15} />
						</button>
					</div>
				</div>
			</aside>

			<main className="min-w-0 flex-1">
				<header className="sticky top-0 z-10 flex h-20 items-center justify-between border-white/[0.06] border-b bg-neutral-700/95 px-4 backdrop-blur lg:hidden">
					<Link to="/admin" className="flex items-center gap-3 text-text-base">
						<span className="flex size-10 items-center justify-center rounded-xl bg-primary-500 font-bold text-sm text-white/90">
							L
						</span>
						<span className="font-semibold text-sm">Lucky Shoes</span>
					</Link>
					<button
						type="button"
						onClick={() => setMenuOpen(true)}
						aria-expanded={menuOpen}
						aria-controls="admin-mobile-navigation"
						aria-label="Abrir menú de administración"
						className="flex size-11 items-center justify-center rounded-lg text-text-light hover:bg-hover hover:text-text-base"
					>
						<LuMenu size={21} />
					</button>
				</header>
				<div className="mx-auto w-full max-w-[110rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-14">
					<Outlet />
				</div>
			</main>

			<div
				className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
				aria-hidden={!menuOpen}
			>
				<button
					type="button"
					aria-label="Cerrar menú de administración"
					onClick={() => setMenuOpen(false)}
					className={`absolute inset-0 bg-black/70 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
				/>
				<aside
					id="admin-mobile-navigation"
					className={`relative flex h-full w-[min(84vw,32rem)] flex-col border-white/[0.06] border-r bg-neutral-700 shadow-2xl transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
				>
					<div className="flex items-center justify-between px-6 py-7">
						<Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-xl bg-primary-500 font-bold text-sm text-white/90">
								L
							</span>
							<span className="font-semibold text-sm text-text-base">Lucky Shoes</span>
						</Link>
						<button
							type="button"
							onClick={() => setMenuOpen(false)}
							aria-label="Cerrar menú"
							className="flex size-11 items-center justify-center rounded-lg text-text-light hover:bg-hover"
						>
							<LuX size={20} />
						</button>
					</div>
					<nav className="flex flex-1 flex-col gap-1 px-4" aria-label="Administración">
						<p className="px-4 pt-3 pb-2 font-medium text-text-xx-light text-xs uppercase tracking-wider">Gestión</p>
						{links.map(({ to, label, icon: Icon }) => (
							<Link
								key={to}
								to={to}
								onClick={() => setMenuOpen(false)}
								activeOptions={{ exact: to === "/admin" }}
								className="flex min-h-12 items-center gap-4 rounded-xl px-4 text-sm text-text-light transition-colors hover:bg-hover hover:text-text-base"
								activeProps={{ className: "!bg-primary-light !text-primary-900 font-medium" }}
							>
								<Icon size={17} className="shrink-0" />
								{label}
							</Link>
						))}
					</nav>
					<div className="border-white/[0.06] border-t p-4">
						<a
							href="/"
							className="mb-2 flex min-h-12 items-center gap-4 rounded-xl px-4 text-sm text-text-light hover:bg-hover hover:text-text-base"
						>
							<LuExternalLink size={16} /> Ver tienda
						</a>
						<div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
							<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light font-semibold text-primary-900 text-xs">
								{initial}
							</span>
							<span className="min-w-0 flex-1 truncate text-text-base text-xs">
								{session?.email ?? "Administrador"}
							</span>
							<button
								type="button"
								onClick={handleLogout}
								aria-label="Cerrar sesión"
								className="flex size-10 shrink-0 items-center justify-center rounded-lg text-text-light hover:bg-hover hover:text-secondary"
							>
								<LuLogOut size={16} />
							</button>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
