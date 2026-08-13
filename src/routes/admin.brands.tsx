import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuExternalLink, LuPlus, LuSearch, LuTags } from "react-icons/lu";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable, EmptyState, Td, Th, Tr } from "@/components/admin/data-table";
import { FormError } from "@/components/admin/form-error";
import { ImagePicker } from "@/components/admin/image-picker";
import { PageHeader } from "@/components/admin/page-header";
import { Panel } from "@/components/admin/panel";
import { RowActions } from "@/components/admin/row-actions";
import { Sheet } from "@/components/admin/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons";
import { Checkbox, Input } from "@/components/ui/form";
import { deleteBrand, getAdminBrands, saveBrand } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/brands")({ loader: () => getAdminBrands(), component: BrandsPage });

const BRANDS_PER_PAGE = 20;

function BrandsPage() {
	const brands = Route.useLoaderData();
	const router = useRouter();
	const save = useServerFn(saveBrand);
	const remove = useServerFn(deleteBrand);
	const [editing, setEditing] = useState<(typeof brands)[number] | null>(null);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [imagePath, setImagePath] = useState<string | null>(null);
	const [deleting, setDeleting] = useState<(typeof brands)[number] | null>(null);
	const [removing, setRemoving] = useState(false);

	const term = query.trim().toLowerCase();
	const visible = term ? brands.filter((brand) => brand.name.toLowerCase().includes(term)) : brands;
	const pageCount = Math.max(1, Math.ceil(visible.length / BRANDS_PER_PAGE));
	const currentPage = Math.min(page, pageCount);
	const firstItem = visible.length ? (currentPage - 1) * BRANDS_PER_PAGE + 1 : 0;
	const lastItem = Math.min(currentPage * BRANDS_PER_PAGE, visible.length);
	const paginatedBrands = visible.slice((currentPage - 1) * BRANDS_PER_PAGE, currentPage * BRANDS_PER_PAGE);

	const confirmDelete = async () => {
		if (!deleting) return;
		setRemoving(true);
		try {
			await remove({ data: { id: deleting.id } });
			await router.invalidate();
			setDeleting(null);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo eliminar");
			setDeleting(null);
		} finally {
			setRemoving(false);
		}
	};

	const openSheet = (brand: (typeof brands)[number] | null) => {
		setError("");
		setEditing(brand);
		setImagePath(brand?.imagePath ?? null);
		setOpen(true);
	};
	const closeSheet = () => {
		setOpen(false);
		setError("");
	};

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		setError("");
		setSaving(true);
		try {
			await save({
				data: {
					id: editing?.id,
					name: String(form.get("name")),
					shortDescription: String(form.get("shortDescription")) || null,
					image: String(form.get("image")),
					imagePath,
					url: String(form.get("url")) || null,
					verified: form.get("verified") === "on",
				},
			});
			setOpen(false);
			setEditing(null);
			await router.invalidate();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo guardar");
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="flex flex-col gap-8 sm:gap-12">
			<PageHeader
				title="Marcas"
				description={`${brands.length} ${brands.length === 1 ? "marca registrada" : "marcas registradas"}.`}
				actions={<Button title="Nueva marca" leftIcon={<LuPlus size={15} />} onClick={() => openSheet(null)} />}
			/>

			{error && !open && <FormError message={error} />}

			<Panel>
				<div className="flex flex-col items-stretch justify-between gap-4 border-white/[0.06] border-b px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:px-10 sm:py-6">
					<Input
						iconLeft={<LuSearch size={15} className="text-text-extra-light" />}
						placeholder="Buscar marca"
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
							setPage(1);
						}}
						className="w-full sm:max-w-[36rem]"
					/>
					<p className="text-text-extra-light text-xs">
						{visible.length} de {brands.length}
					</p>
				</div>

				{visible.length ? (
					<>
						<div className="hidden md:block">
							<DataTable>
								<thead>
									<tr>
										<Th>Marca</Th>
										<Th>Descripción</Th>
										<Th>Sitio web</Th>
										<Th align="right">Acciones</Th>
									</tr>
								</thead>
								<tbody>
									{paginatedBrands.map((brand) => (
										<Tr key={brand.id} onClick={() => openSheet(brand)}>
											<Td>
												<div className="flex items-center gap-5">
													<img
														src={brand.image}
														alt={brand.name}
														className="size-14 shrink-0 rounded-full border border-white/[0.06] bg-neutral-500 object-cover"
													/>
													<span className="flex items-center gap-3 text-text-base">
														{brand.name}
														{brand.verified && <Badge tone="accent">Verificada</Badge>}
													</span>
												</div>
											</Td>
											<Td className="max-w-[32rem] text-text-light">
												<span className="line-clamp-1">{brand.shortDescription || "—"}</span>
											</Td>
											<Td>
												{brand.url ? (
													<a
														href={brand.url}
														target="_blank"
														rel="noreferrer"
														onClick={(event) => event.stopPropagation()}
														className="inline-flex items-center gap-2 text-primary-900 text-xs transition-opacity hover:opacity-80"
													>
														Visitar
														<LuExternalLink size={12} />
													</a>
												) : (
													<span className="text-text-extra-light">—</span>
												)}
											</Td>
											<Td align="right">
												<RowActions onEdit={() => openSheet(brand)} onDelete={() => setDeleting(brand)} />
											</Td>
										</Tr>
									))}
								</tbody>
							</DataTable>
						</div>
						<div className="divide-y divide-white/[0.06] md:hidden">
							{paginatedBrands.map((brand) => (
								<article key={brand.id} className="flex flex-col gap-4 px-5 py-5">
									<div className="flex min-w-0 items-center gap-4">
										<img
											src={brand.image}
											alt={brand.name}
											className="size-14 shrink-0 rounded-full border border-white/[0.06] bg-neutral-500 object-cover"
										/>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<p className="truncate font-medium text-sm text-text-base">{brand.name}</p>
												{brand.verified && <Badge tone="accent">Verificada</Badge>}
											</div>
											<p className="mt-1 line-clamp-2 text-text-light text-xs">
												{brand.shortDescription || "Sin descripción"}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between gap-4">
										{brand.url ? (
											<a
												href={brand.url}
												target="_blank"
												rel="noreferrer"
												className="inline-flex min-h-11 items-center gap-2 text-primary-900 text-xs"
											>
												Visitar sitio <LuExternalLink size={13} />
											</a>
										) : (
											<span className="text-text-extra-light text-xs">Sin sitio web</span>
										)}
										<RowActions onEdit={() => openSheet(brand)} onDelete={() => setDeleting(brand)} />
									</div>
								</article>
							))}
						</div>
						{visible.length > BRANDS_PER_PAGE && (
							<div className="flex flex-col items-stretch justify-between gap-4 border-white/[0.06] border-t px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:px-10">
								<p className="text-text-extra-light text-xs">
									Mostrando {firstItem}–{lastItem} de {visible.length}
								</p>
								<nav
									className="flex items-center justify-between gap-2 sm:justify-start"
									aria-label="Paginación de marcas"
								>
									<Button
										title="Anterior"
										intent="tertiary"
										size="small"
										style={{ height: "3.5rem" }}
										leftIcon={<LuChevronLeft size={15} />}
										onClick={() => setPage((current) => Math.max(1, current - 1))}
										disabled={currentPage === 1}
									/>
									<span className="min-w-20 text-center text-text-light text-xs tabular-nums">
										Página {currentPage} de {pageCount}
									</span>
									<Button
										title="Siguiente"
										intent="tertiary"
										size="small"
										style={{ height: "3.5rem" }}
										className="flex-row-reverse"
										leftIcon={<LuChevronRight size={15} />}
										onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
										disabled={currentPage === pageCount}
									/>
								</nav>
							</div>
						)}
					</>
				) : (
					<EmptyState
						icon={<LuTags size={22} />}
						title={term ? "Sin resultados" : "Todavía no hay marcas"}
						description={
							term
								? `Ninguna marca coincide con "${query}". Prueba con otro término.`
								: "Crea tu primera marca para empezar a cargar sneakers."
						}
						action={!term ? <Button title="Nueva marca" onClick={() => openSheet(null)} /> : null}
					/>
				)}
			</Panel>

			<Sheet
				open={open}
				onClose={closeSheet}
				title={editing ? "Editar marca" : "Nueva marca"}
				description={editing ? editing.name : "Completa los datos de la marca"}
			>
				<form key={editing?.id ?? "new"} onSubmit={submit} className="flex min-h-full flex-col">
					<div className="grid flex-1 grid-cols-1 gap-4 px-5 py-6 sm:px-12 sm:py-8">
						<Input name="name" label="Nombre" required placeholder="Nike" defaultValue={editing?.name} fullWidth />
						<ImagePicker
							name="image"
							label="Logo"
							defaultUrl={editing?.image}
							onChange={(image) => setImagePath(image.path)}
						/>
						<Input
							name="shortDescription"
							label="Descripción corta"
							placeholder="Resumen breve de la marca"
							defaultValue={editing?.shortDescription ?? ""}
							fullWidth
						/>
						<Input
							name="url"
							label="Sitio web"
							type="url"
							placeholder="https://nike.com"
							defaultValue={editing?.url ?? ""}
							fullWidth
						/>
						<Checkbox
							name="verified"
							label="Marca verificada"
							description="Muestra el distintivo de verificación en la tienda"
							defaultChecked={editing?.verified}
						/>
						{error && <FormError message={error} />}
					</div>

					<div className="sticky bottom-0 flex flex-col-reverse gap-2 border-white/[0.06] border-t bg-neutral-600 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-12 sm:py-8 [&>button]:w-full sm:[&>button]:w-auto">
						<Button type="button" intent="ghost" title="Cancelar" onClick={closeSheet} className="justify-center" />
						<Button
							type="submit"
							disabled={saving}
							title={saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear marca"}
						/>
					</div>
				</form>
			</Sheet>

			<ConfirmDialog
				open={deleting !== null}
				title={`Eliminar "${deleting?.name}"`}
				description="Esta acción no se puede deshacer. La marca se eliminará de forma permanente."
				loading={removing}
				onConfirm={confirmDelete}
				onCancel={() => setDeleting(null)}
			/>
		</section>
	);
}
