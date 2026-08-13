import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { getAdminSession } from "@/lib/server/auth";

export const Route = createFileRoute("/admin")({
	loader: ({ location }) => (location.pathname === "/admin/login" ? null : getAdminSession()),
	component: AdminLayout,
});
function AdminLayout() {
	const { pathname } = useLocation();
	if (pathname === "/admin/login") return <Outlet />;

	return (
		<div className="mx-auto flex min-h-screen max-w-7xl gap-12 px-6 py-12">
			<aside className="w-48">
				<h1 className="mb-8 font-bold text-xl">Lucky Shoes</h1>
				<nav className="flex flex-col gap-3">
					<Link to="/admin">Dashboard</Link>
					<Link to="/admin/brands">Marcas</Link>
					<Link to="/admin/sneakers">Sneakers</Link>
				</nav>
			</aside>
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
