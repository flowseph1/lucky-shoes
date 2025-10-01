"use client";

import { Modal } from "@/components/modal";
import { Input } from "@/components/ui";

export function AddBrandModal() {
	const handleAddBrand = () => {
		return;
	};
	return (
		<Modal title="Agregar Marca" name="add" buttonTitle="Agregar" buttonAction={handleAddBrand}>
			<div className="w-[500px]">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Input label="Nombre" type="text" placeholder="Nombre de la marca" />
					<Input label="Imagen" type="text" placeholder="Url de la imagen" />
					<Input label="Descripción corta" type="text" placeholder="Descripción corta" />
				</div>
			</div>
		</Modal>
	);
}
