import { AddModal } from '@/components/admin/brand/add-modal'
import BrandsTable from '@/components/admin/brand/brands-table'
import { FragmentContainer } from '@/components/admin/fragment-container'
import { AdminHeading } from '@/components/admin/heading'
import { Button } from '@/components/ui/buttons'
import { getBrands } from '@/lib/api/brands'
import { getUuid } from '@/lib/utils'
import { IoMdAdd } from 'react-icons/io'

export default async function BrandsPage({
	params,
}: { params: { modal: 'add' } }) {
	const brands = await getBrands()

	return (
		<FragmentContainer>
			<AdminHeading
				title="Marcas"
				caption={`(Total ${brands.length.toString()})`}
				subtitle="Gestiona las marcas de tu tienda"
				rightButtons={
					<Button
						title="Agregar Marca"
						intent="primary"
						className="w-fit"
						href="/admin/brands?modal=add"
						leftIcon={<IoMdAdd />}
					/>
				}
			/>
			<BrandsTable data={brands} />
			<AddModal key={getUuid()} />
		</FragmentContainer>
	)
}
