import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { deleteBrand, getAdminBrands, saveBrand } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/brands")({ loader: () => getAdminBrands(), component: BrandsPage });
function BrandsPage() {
	const brands = Route.useLoaderData();
	const router = useRouter();
	const save = useServerFn(saveBrand);
	const remove = useServerFn(deleteBrand);
	const [editing, setEditing] = useState<(typeof brands)[number] | null>(null);
	const [error, setError] = useState("");
	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		try {
			await save({
				data: {
					id: editing?.id,
					name: String(form.get("name")),
					shortDescription: String(form.get("shortDescription")) || null,
					image: String(form.get("image")),
					imagePath: editing?.imagePath ?? null,
					url: String(form.get("url")) || null,
					verified: form.get("verified") === "on",
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
			<h2 className="font-bold text-3xl">Marcas</h2>
			<form onSubmit={submit} className="grid grid-cols-1 gap-3 rounded-xl border p-5 md:grid-cols-2">
				<input name="name" required placeholder="Nombre" defaultValue={editing?.name} className="rounded border p-3" />
				<input
					name="image"
					type="url"
					required
					placeholder="URL de imagen"
					defaultValue={editing?.image}
					className="rounded border p-3"
				/>
				<input
					name="shortDescription"
					placeholder="Descripción corta"
					defaultValue={editing?.shortDescription ?? ""}
					className="rounded border p-3"
				/>
				<input
					name="url"
					type="url"
					placeholder="Sitio web"
					defaultValue={editing?.url ?? ""}
					className="rounded border p-3"
				/>
				<label>
					<input name="verified" type="checkbox" defaultChecked={editing?.verified} /> Verificada
				</label>
				<div className="flex gap-3">
					<button type="submit" className="rounded bg-primary px-4 py-2">
						{editing ? "Actualizar" : "Agregar marca"}
					</button>
					{editing && (
						<button type="button" onClick={() => setEditing(null)}>
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
							<th>Marca</th>
							<th>Imagen</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{brands.map((brand) => (
							<tr key={brand.id}>
								<td>{brand.name}</td>
								<td>
									<img className="h-10 w-10 rounded-full object-cover" src={brand.image} alt={brand.name} />
								</td>
								<td>
									<button type="button" onClick={() => setEditing(brand)}>
										Editar
									</button>
									<button
										type="button"
										className="ml-3 text-red-400"
										onClick={async () => {
											try {
												await remove({ data: { id: brand.id } });
												await router.invalidate();
											} catch (cause) {
												setError(cause instanceof Error ? cause.message : "No se pudo eliminar");
											}
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
