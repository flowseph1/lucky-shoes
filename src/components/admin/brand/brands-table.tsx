'use client'

import { Table } from '@/components/table'
import { TableAction } from '@/components/table-action'
import { deleteBrand } from '@/lib/actions/brands'
import { Brand } from '@/lib/db/schema'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image'
import { FaEdit } from 'react-icons/fa'
import { FiEdit, FiEdit2, FiEdit3 } from 'react-icons/fi'
import { IoTrash } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'

const columnHelper = createColumnHelper<Brand>()
const columns: ColumnDef<Brand, any>[] = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (info) => <p className="text-sm">{info.getValue()}</p>,
	}),
	columnHelper.accessor('name', {
		header: 'Nombre',
	}),
	columnHelper.accessor('image', {
		header: 'Imagen',
		cell: (info) => (
			<Image
				src={info.getValue()}
				alt="Brand"
				width={40}
				height={40}
				className="rounded-full bg-neutral-900"
			/>
		),
	}),
	columnHelper.accessor('shortDescription', {
		header: 'Descripción',
	}),
	columnHelper.display({
		id: 'actions',
		header: 'Acciones',
		cell: (info) => {
			return (
				<div className="flex gap-3">
					<TableAction onClick={() => deleteBrand(info.row.original.id)}>
						<MdEdit />
					</TableAction>
					<TableAction onClick={() => deleteBrand(info.row.original.id)}>
						<IoTrash />
					</TableAction>
				</div>
			)
		},
	}),
]

export default function BrandsTable({ data }: { data: Brand[] }) {
	return <Table data={data} columns={columns} />
}
