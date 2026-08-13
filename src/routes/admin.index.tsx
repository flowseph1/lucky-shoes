import { createFileRoute, Link } from "@tanstack/react-router";
import { LuCircleCheck, LuFootprints, LuSparkles, LuTags } from "react-icons/lu";
import { PageHeader } from "@/components/admin/page-header";
import { Panel, PanelHeader } from "@/components/admin/panel";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { PillStatus } from "@/components/ui/pill-status";
import { getAdminBrands, getAdminSneakers } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/")({
	loader: async () => ({ sneakers: await getAdminSneakers(), brands: await getAdminBrands() }),
	component: Dashboard,
});

function Dashboard() {
	const { sneakers, brands } = Route.useLoaderData();
	const active = sneakers.filter((sneaker) => sneaker.status === "active").length;
	const fresh = sneakers.filter((sneaker) => sneaker.isNew).length;
	const inStock = sneakers.filter((sneaker) => sneaker.availability === "En stock").length;

	const byBrand = brands
		.map((brand) => ({ ...brand, count: sneakers.filter((sneaker) => sneaker.brandId === brand.id).length }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 6);
	const top = byBrand[0]?.count ?? 0;

	const recent = [...sneakers]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5);

	return (
		<section className="flex flex-col gap-8 sm:gap-12">
			<PageHeader
				title="Dashboard"
				description="Resumen del catálogo de Lucky Shoes."
				actions={
					<Link
						to="/admin/sneakers"
						className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-[0.1rem] border-white/[0.08] bg-white/[0.03] px-6 font-medium text-sm text-text-base transition-colors hover:border-white/[0.16] hover:bg-white/[0.06] sm:h-16 sm:w-auto sm:px-8"
					>
						Gestionar sneakers
					</Link>
				}
			/>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Sneakers"
					value={sneakers.length}
					hint={`${inStock} en stock`}
					icon={<LuFootprints size={16} />}
					accent="primary"
				/>
				<StatCard
					label="Activos"
					value={active}
					hint={`${sneakers.length - active} inactivos`}
					icon={<LuCircleCheck size={16} />}
					accent="tertiary"
				/>
				<StatCard label="Marcas" value={brands.length} hint="En catálogo" icon={<LuTags size={16} />} />
				<StatCard
					label="Novedades"
					value={fresh}
					hint="Marcados como nuevos"
					icon={<LuSparkles size={16} />}
					accent="secondary"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
				<Panel className="lg:col-span-3">
					<PanelHeader title="Últimos agregados" description="Los 5 sneakers más recientes" />
					<ul className="divide-y divide-white/[0.04]">
						{recent.map((sneaker) => (
							<li key={sneaker.id} className="flex items-center gap-4 px-5 py-5 sm:gap-6 sm:px-10 sm:py-6">
								<img
									src={sneaker.image}
									alt={sneaker.name}
									className="size-16 shrink-0 rounded-lg border border-white/[0.06] bg-neutral-500 object-cover"
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm text-text-base">{sneaker.name}</p>
									<p className="mt-1 truncate text-text-extra-light text-xs">{sneaker.brand.name}</p>
								</div>
								<PillStatus variant={sneaker.status} />
							</li>
						))}
						{!recent.length && (
							<li className="px-5 py-16 text-center text-sm text-text-light sm:px-10">Aún no hay sneakers.</li>
						)}
					</ul>
				</Panel>

				<Panel className="lg:col-span-2">
					<PanelHeader title="Por marca" description="Distribución del catálogo" />
					<ul className="flex flex-col gap-6 px-5 py-6 sm:px-10 sm:py-8">
						{byBrand.map((brand) => (
							<li key={brand.id}>
								<div className="mb-2 flex items-center justify-between gap-4">
									<span className="flex min-w-0 items-center gap-3">
										<span className="truncate text-sm text-text-base">{brand.name}</span>
										{brand.verified && (
											<Badge tone="accent" className="shrink-0">
												✓
											</Badge>
										)}
									</span>
									<span className="shrink-0 text-text-light text-xs tabular-nums">{brand.count}</span>
								</div>
								<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
									<div
										className="h-full rounded-full bg-primary-500"
										style={{ width: `${top ? Math.max((brand.count / top) * 100, brand.count ? 6 : 0) : 0}%` }}
									/>
								</div>
							</li>
						))}
						{!byBrand.length && <li className="py-10 text-center text-sm text-text-light">Aún no hay marcas.</li>}
					</ul>
				</Panel>
			</div>
		</section>
	);
}
