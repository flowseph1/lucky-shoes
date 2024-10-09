"use client";

import {
	AddBrandSchema,
	AddBrandSchemaType,
} from "@/components/admin/brand/add-brand-validators";
import { Modal } from "@/components/modal";
import Input from "@/components/ui/form/Input";
import { TextArea } from "@/components/ui/form/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function AddBrandModal() {
	const { register, reset } = useForm<AddBrandSchemaType>({
		resolver: zodResolver(AddBrandSchema),
	});

	const handleAddBrand = () => {
		return;
	};
	return (
		<Modal
			title="Agregar Marca"
			name="add"
			buttonTitle="Agregar"
			buttonAction={handleAddBrand}
			onClose={reset}
		>
			<div className="w-[500px]">
				<div className="grid grid-cols-1 gap-8">
					<Input
						label="Nombre"
						type="text"
						placeholder="Nombre de la marca"
						register={register("name")}
					/>
					<TextArea
						label="Descripción"
						placeholder="Descripción corta de la marca"
						register={register("description")}
						spellCheck={false}
					/>
					<Input
						label="Imagen"
						type="text"
						placeholder="Url de la imagen"
						register={register("image")}
					/>
				</div>
			</div>
		</Modal>
	);
}
