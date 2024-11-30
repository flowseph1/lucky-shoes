import { SearchBar } from '@/components/table/search-bar'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
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
	const table = useReactTable({
		columns: columns as ColumnDef<unknown>[],
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const [term, setTerm] = useState('')

	return (
		<div className="flex flex-col gap-10">
			<SearchBar term={term} setTerm={setTerm} />
			<div className="border border-neutral-300 rounded-md overflow-hidden">
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

					<tbody>
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
					</tbody>

					<tfoot className="w-full">
						<tr className="border-t border-t-neutral-300 bg-neutral-400 w-full">
							{/*  <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select> */}
						</tr>
					</tfoot>
				</table>
				<div className="p-5 flex justify-between">
					<div className="flex gap-2">
						<p className="text-sm">Filas por pagina</p>
						<select
							value={table.getState().pagination.pageSize}
							onChange={(e) => {
								table.setPageSize(Number(e.target.value))
							}}
						>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</div>
					<div>
						<button
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{'<<'}
						</button>
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{'<'}
						</button>
						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							{'>'}
						</button>
						<button
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							{'>>'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
