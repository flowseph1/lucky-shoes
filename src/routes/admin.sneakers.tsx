import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { deleteSneaker, getAdminBrands, getAdminSneakers, saveSneaker } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/sneakers")({
	loader: async () => ({ sneakers: await getAdminSneakers(), brands: await getAdminBrands() }),
	component: SneakersPage,
});
function SneakersPage() {
	const { sneakers, brands } = Route.useLoaderData();
	const router = useRouter();
	const save = useServerFn(saveSneaker);
	const remove = useServerFn(deleteSneaker);
	const [editing, setEditing] = useState<(typeof sneakers)[number] | null>(null);
	const [error, setError] = useState("");
	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
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
					imagePath: editing?.imagePath ?? null,
					shortDescription: String(form.get("shortDescription")) || null,
					longDescription: String(form.get("longDescription")) || null,
					availability: String(form.get("availability")) as "Por encargo" | "En stock" | "No disponible",
					isNew: form.get("isNew") === "on",
					status: String(form.get("status")) as "active" | "inactive",
					images: [],
				},
			});
			setEditing(null);
			await router.invalidate();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo guardar");
		}
	};
	return (
		<section className="flex flex-col gap-8">
			<h2 className="font-bold text-3xl">Sneakers</h2>
			<form onSubmit={submit} className="grid grid-cols-1 gap-3 rounded-xl border p-5 md:grid-cols-2">
				<select name="brandId" defaultValue={editing?.brandId} required>
					{brands.map((brand) => (
						<option key={brand.id} value={brand.id}>
							{brand.name}
						</option>
					))}
				</select>
				<input name="name" required placeholder="Nombre" defaultValue={editing?.name} />
				<input name="slug" required placeholder="Slug" defaultValue={editing?.slug} />
				<input name="image" type="url" required placeholder="URL de imagen" defaultValue={editing?.image} />
				<input name="color" placeholder="Color" defaultValue={editing?.color ?? ""} />
				<input name="price" type="number" placeholder="Precio" defaultValue={editing?.price ?? ""} />
				<select name="availability" defaultValue={editing?.availability ?? "Por encargo"}>
					<option>Por encargo</option>
					<option>En stock</option>
					<option>No disponible</option>
				</select>
				<select name="status" defaultValue={editing?.status ?? "active"}>
					<option value="active">Activo</option>
					<option value="inactive">Inactivo</option>
				</select>
				<input name="shortDescription" placeholder="Descripción corta" defaultValue={editing?.shortDescription ?? ""} />
				<textarea
					name="longDescription"
					placeholder="Descripción completa"
					defaultValue={editing?.longDescription ?? ""}
				/>
				<label>
					<input name="isNew" type="checkbox" defaultChecked={editing?.isNew} /> Nuevo
				</label>
				<div>
					<button type="submit" className="rounded bg-primary px-4 py-2">
						{editing ? "Actualizar" : "Agregar sneaker"}
					</button>
					{editing && (
						<button type="button" onClick={() => setEditing(null)} className="ml-3">
							Cancelar
						</button>
					)}
				</div>
				{error && <p className="text-red-400">{error}</p>}
			</form>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr>
							<th>Producto</th>
							<th>Marca</th>
							<th>Estado</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{sneakers.map((sneaker) => (
							<tr key={sneaker.id}>
								<td>{sneaker.name}</td>
								<td>{sneaker.brand.name}</td>
								<td>{sneaker.status}</td>
								<td>
									<button type="button" onClick={() => setEditing(sneaker)}>
										Editar
									</button>
									<button
										type="button"
										className="ml-3 text-red-400"
										onClick={async () => {
											await remove({ data: { id: sneaker.id } });
											await router.invalidate();
										}}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
