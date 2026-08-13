import { createFileRoute } from "@tanstack/react-router";
import { getAdminSneakers } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/")({ loader: () => getAdminSneakers(), component: Dashboard });
function Dashboard() {
	const sneakers = Route.useLoaderData();
	return (
		<section>
			<h2 className="font-bold text-3xl">Dashboard</h2>
			<p className="mt-3 text-text-light">{sneakers.length} sneakers en el catálogo.</p>
		</section>
	);
}
