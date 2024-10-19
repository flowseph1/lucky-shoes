"use client";

import {
	AddBrandSchema,
	AddBrandSchemaType,
} from "@/components/admin/brand/add-brand-validators";
import { Modal } from "@/components/modal";
import Input from "@/components/ui/form/Input";
import { InputFile } from "@/components/ui/form/input-file";
import { TextArea } from "@/components/ui/form/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

export function AddBrandModal() {
	const { register, reset, control } = useForm<AddBrandSchemaType>({
		resolver: zodResolver(AddBrandSchema),
	});
	const fields = useWatch({
		control,
	});
	const formStatus = AddBrandSchema.safeParse(fields);
	console.log(
		"src/components/admin/brand/add-brand-modal.tsx | #22 -> formStatus",
		JSON.stringify(formStatus, null, 4),
	);

	const handleAddBrand = () => {
		return;
	};
	return (
		<Modal
			title="Agregar Marca"
			name="add"
			buttonTitle="Agregar"
			buttonAction={handleAddBrand}
			disabled={!formStatus.success}
			onClose={reset}
		>
			<div className="w-[500px]">
				<div className="grid grid-cols-1 gap-8">
					<Input label="Nombre" type="text" register={register("name")} />
					<TextArea
						label="Descripción"
						register={register("description")}
						spellCheck={false}
					/>
					<InputFile
						label="Imagen"
						type="file"
						control={control}
						name="image"
						accept="image/*"
						subtitle="PNG, JPG, SVG"
					/>
				</div>
			</div>
		</Modal>
	);
}
