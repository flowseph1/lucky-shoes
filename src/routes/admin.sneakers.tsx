import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { LuFootprints, LuPlus, LuSearch } from "react-icons/lu";
import { DataTable, EmptyState, Td, Th, Tr } from "@/components/admin/data-table";
import { FormError } from "@/components/admin/form-error";
import { ImagePicker } from "@/components/admin/image-picker";
import { PageHeader } from "@/components/admin/page-header";
import { Panel } from "@/components/admin/panel";
import { RowActions } from "@/components/admin/row-actions";
import { Sheet } from "@/components/admin/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons";
import { Checkbox, Input, Select, Textarea } from "@/components/ui/form";
import { PillStatus } from "@/components/ui/pill-status";
import { deleteSneaker, getAdminBrands, getAdminSneakers, saveSneaker } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/sneakers")({
	loader: async () => ({ sneakers: await getAdminSneakers(), brands: await getAdminBrands() }),
	component: SneakersPage,
});

const availabilityTone = {
	"En stock": "success",
	"Por encargo": "info",
	"No disponible": "neutral",
} as const;

function SneakersPage() {
	const { sneakers, brands } = Route.useLoaderData();
	const router = useRouter();
	const save = useServerFn(saveSneaker);
	const remove = useServerFn(deleteSneaker);
	const [editing, setEditing] = useState<(typeof sneakers)[number] | null>(null);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [query, setQuery] = useState("");
	const [imagePath, setImagePath] = useState<string | null>(null);

	const term = query.trim().toLowerCase();
	const visible = term
		? sneakers.filter(
				(sneaker) =>
					sneaker.name.toLowerCase().includes(term) ||
					sneaker.brand.name.toLowerCase().includes(term) ||
					sneaker.slug.toLowerCase().includes(term),
			)
		: sneakers;

	const openSheet = (sneaker: (typeof sneakers)[number] | null) => {
		setError("");
		setEditing(sneaker);
		setImagePath(sneaker?.imagePath ?? null);
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
					brandId: Number(form.get("brandId")),
					name: String(form.get("name")),
					slug: String(form.get("slug")),
					color: String(form.get("color")) || null,
					price: form.get("price") ? Number(form.get("price")) : null,
					image: String(form.get("image")),
					imagePath,
					shortDescription: String(form.get("shortDescription")) || null,
					longDescription: String(form.get("longDescription")) || null,
					availability: String(form.get("availability")) as "Por encargo" | "En stock" | "No disponible",
					isNew: form.get("isNew") === "on",
					status: String(form.get("status")) as "active" | "inactive",
					images: [],
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
				title="Sneakers"
				description={`${sneakers.length} ${sneakers.length === 1 ? "producto" : "productos"} en el catálogo.`}
				actions={
					<Button
						title="Nuevo sneaker"
						leftIcon={<LuPlus size={15} />}
						onClick={() => openSheet(null)}
						disabled={!brands.length}
					/>
				}
			/>

			{!brands.length && <FormError message="Crea al menos una marca antes de agregar sneakers." />}

			<Panel>
				<div className="flex flex-wrap items-center justify-between gap-6 border-white/[0.06] border-b px-10 py-6">
					<Input
						iconLeft={<LuSearch size={15} className="text-text-extra-light" />}
						placeholder="Buscar por nombre, marca o slug"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="w-full max-w-[36rem]"
					/>
					<p className="text-text-extra-light text-xs">
						{visible.length} de {sneakers.length}
					</p>
				</div>

				{visible.length ? (
					<DataTable>
						<thead>
							<tr>
								<Th>Producto</Th>
								<Th>Marca</Th>
								<Th>Precio</Th>
								<Th>Disponibilidad</Th>
								<Th>Estado</Th>
								<Th align="right">Acciones</Th>
							</tr>
						</thead>
						<tbody>
							{visible.map((sneaker) => (
								<Tr key={sneaker.id}>
									<Td>
										<div className="flex items-center gap-5">
											<img
												src={sneaker.image}
												alt={sneaker.name}
												className="size-16 shrink-0 rounded-lg border border-white/[0.06] bg-neutral-500 object-cover"
											/>
											<div className="min-w-0">
												<p className="flex items-center gap-3 text-text-base">
													<span className="truncate">{sneaker.name}</span>
													{sneaker.isNew && <Badge tone="accent">Nuevo</Badge>}
												</p>
												<p className="mt-1 truncate text-text-extra-light text-xs">/{sneaker.slug}</p>
											</div>
										</div>
									</Td>
									<Td className="text-text-light">{sneaker.brand.name}</Td>
									<Td className="text-text-light tabular-nums">
										{sneaker.price ? `$${sneaker.price.toLocaleString("es-DO")}` : "—"}
									</Td>
									<Td>
										<Badge tone={availabilityTone[sneaker.availability]}>{sneaker.availability}</Badge>
									</Td>
									<Td>
										<PillStatus variant={sneaker.status} />
									</Td>
									<Td align="right">
										<RowActions
											onEdit={() => openSheet(sneaker)}
											onDelete={async () => {
												try {
													await remove({ data: { id: sneaker.id } });
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
						icon={<LuFootprints size={22} />}
						title={term ? "Sin resultados" : "Todavía no hay sneakers"}
						description={
							term
								? `Ningún sneaker coincide con "${query}". Prueba con otro término.`
								: "Agrega tu primer sneaker para que aparezca en la tienda."
						}
						action={!term && brands.length ? <Button title="Nuevo sneaker" onClick={() => openSheet(null)} /> : null}
					/>
				)}
			</Panel>

			<Sheet
				open={open}
				onClose={closeSheet}
				title={editing ? "Editar sneaker" : "Nuevo sneaker"}
				description={editing ? editing.name : "Completa los datos del producto"}
			>
				<form key={editing?.id ?? "new"} onSubmit={submit} className="flex min-h-full flex-col">
					<div className="grid flex-1 grid-cols-1 gap-4 px-12 py-8 md:grid-cols-2">
						<Input
							name="name"
							label="Nombre"
							required
							placeholder="Air Max 90"
							defaultValue={editing?.name}
							fullWidth
						/>
						<Input name="slug" label="Slug" required placeholder="air-max-90" defaultValue={editing?.slug} fullWidth />
						<Select name="brandId" label="Marca" defaultValue={editing?.brandId} required fullWidth>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</Select>
						<Input
							name="color"
							label="Color"
							placeholder="Negro / Blanco"
							defaultValue={editing?.color ?? ""}
							fullWidth
						/>
						<Input
							name="price"
							label="Precio"
							type="number"
							placeholder="0"
							defaultValue={editing?.price ?? ""}
							fullWidth
						/>
						<Select
							name="availability"
							label="Disponibilidad"
							defaultValue={editing?.availability ?? "Por encargo"}
							fullWidth
						>
							<option>Por encargo</option>
							<option>En stock</option>
							<option>No disponible</option>
						</Select>
						<div className="md:col-span-2">
							<ImagePicker
								name="image"
								label="Imagen"
								defaultUrl={editing?.image}
								onChange={(image) => setImagePath(image.path)}
							/>
						</div>
						<Input
							name="shortDescription"
							label="Descripción corta"
							placeholder="Resumen breve del producto"
							defaultValue={editing?.shortDescription ?? ""}
							className="md:col-span-2"
							fullWidth
						/>
						<Textarea
							name="longDescription"
							label="Descripción completa"
							placeholder="Detalles, materiales, historia del modelo…"
							defaultValue={editing?.longDescription ?? ""}
							className="md:col-span-2"
							fullWidth
						/>
						<Select name="status" label="Estado" defaultValue={editing?.status ?? "active"} fullWidth>
							<option value="active">Activo</option>
							<option value="inactive">Inactivo</option>
						</Select>
						<div className="flex items-center">
							<Checkbox
								name="isNew"
								label="Marcar como nuevo"
								description="Se destaca en la tienda"
								defaultChecked={editing?.isNew}
								className="w-full"
							/>
						</div>
						{error && <FormError message={error} className="md:col-span-2" />}
					</div>

					<div className="sticky bottom-0 flex items-center justify-end gap-4 border-white/[0.06] border-t bg-neutral-600 px-12 py-8">
						<Button type="button" intent="ghost" title="Cancelar" onClick={closeSheet} />
						<Button
							type="submit"
							disabled={saving}
							title={saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear sneaker"}
						/>
					</div>
				</form>
			</Sheet>
		</section>
	);
}
