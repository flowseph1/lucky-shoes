import { Button } from "@/components";
import { AddBrandModal } from "@/components/admin/brand/add-brand-modal";
import BrandsTable from "@/components/admin/brand/brands-table";
import { FragmentContainer } from "@/components/admin/fragment-container";
import { AdminHeading } from "@/components/admin/heading";
import { IoMdAdd } from "react-icons/io";

export interface Brand {
	id: number;
	name: string;
	shortDescription: string | undefined;
	image: string | undefined;
}

const DATA_TABLE: Brand[] = [
	{
		id: 218099,
		name: "Nick",
		shortDescription: "Nick",
		image: "https://1000marcas.net/wp-content/uploads/2019/11/Nike-emblema.jpg",
	},
	{
		id: 218099,
		name: "Nick",
		shortDescription: "Nick",
		image: "https://1000marcas.net/wp-content/uploads/2019/11/Nike-emblema.jpg",
	},

	{
		id: 218099,
		name: "Nick2",
		shortDescription: "Nick 2",
		image: "https://1000marcas.net/wp-content/uploads/2019/11/Nike-emblema.jpg",
	},
];

export default function BrandsPage({ params }: { params: { modal: "add" } }) {
	return (
		<FragmentContainer>
			<AdminHeading
				title="Marcas"
				subtitle="Gestiona las marcas de tu tienda"
			/>
			<div className="flex flex-col gap-6">
				<Button
					title="Agregar Marca"
					intent="primary"
					className="w-fit"
					href="/admin/brands?modal=add"
					leftIcon={<IoMdAdd />}
				/>
				<BrandsTable data={DATA_TABLE} />
			</div>

			<AddBrandModal />
		</FragmentContainer>
	);
}
