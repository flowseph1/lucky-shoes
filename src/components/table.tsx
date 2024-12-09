import { FilterNotFound } from '@/components/table/filter-not-found'
import { Pagination } from '@/components/table/pagination'
import { SearchBar } from '@/components/table/search-bar'
import { Button } from '@/components/ui/buttons'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export function Table({
	columns,
	data,
}: {
	columns: ColumnDef<any, any>[]
	data: unknown[]
}) {
	const [term, setTerm] = useState('')

	const table = useReactTable({
		columns: columns as ColumnDef<unknown>[],
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		filterFns: {
			search: (row, columnId, filterValue) => {
				const value = row.getValue(columnId)
				if (typeof value !== 'string') return false
				return value.toLowerCase().includes(filterValue.toLowerCase())
			},
		},
		state: {
			globalFilter: term,
		},
	})

	return (
		<div className="flex flex-col gap-10">
			<SearchBar term={term} setTerm={setTerm} />
			<div className="border border-neutral-300 rounded-md">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="bg-neutral-900">
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-4 text-left text-sm font-medium"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody className="relative">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="border-t border-t-neutral-300 hover:bg-neutral-900 text-sm"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
						{table.getRowModel().rows.length === 0 && (
							<FilterNotFound term={term} setTerm={setTerm} />
						)}
					</tbody>
				</table>
				<Pagination table={table} />
			</div>
		</div>
	)
}
