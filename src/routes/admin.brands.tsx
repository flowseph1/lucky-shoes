import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { LuExternalLink, LuPlus, LuSearch, LuTags } from "react-icons/lu";
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
	const [imagePath, setImagePath] = useState<string | null>(null);

	const term = query.trim().toLowerCase();
	const visible = term ? brands.filter((brand) => brand.name.toLowerCase().includes(term)) : brands;

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
		<section className="flex flex-col gap-12">
			<PageHeader
				title="Marcas"
				description={`${brands.length} ${brands.length === 1 ? "marca registrada" : "marcas registradas"}.`}
				actions={<Button title="Nueva marca" leftIcon={<LuPlus size={15} />} onClick={() => openSheet(null)} />}
			/>

			{error && !open && <FormError message={error} />}

			<Panel>
				<div className="flex flex-wrap items-center justify-between gap-6 border-white/[0.06] border-b px-10 py-6">
					<Input
						iconLeft={<LuSearch size={15} className="text-text-extra-light" />}
						placeholder="Buscar marca"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="w-full max-w-[36rem]"
					/>
					<p className="text-text-extra-light text-xs">
						{visible.length} de {brands.length}
					</p>
				</div>

				{visible.length ? (
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
							{visible.map((brand) => (
								<Tr key={brand.id}>
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
										<RowActions
											onEdit={() => openSheet(brand)}
											onDelete={async () => {
												try {
													await remove({ data: { id: brand.id } });
													await router.invalidate();
												} catch (cause) {
													setError(cause instanceof Error ? cause.message : "No se pudo eliminar");
												}
											}}
										/>
									</Td>
								</Tr>
							))}
						</tbody>
					</DataTable>
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
					<div className="grid flex-1 grid-cols-1 gap-4 px-12 py-8">
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

					<div className="sticky bottom-0 flex items-center justify-end gap-4 border-white/[0.06] border-t bg-neutral-600 px-12 py-8">
						<Button type="button" intent="ghost" title="Cancelar" onClick={closeSheet} />
						<Button
							type="submit"
							disabled={saving}
							title={saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear marca"}
						/>
					</div>
				</form>
			</Sheet>
		</section>
	);
}
