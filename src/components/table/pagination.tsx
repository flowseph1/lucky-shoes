import { InputContainer } from '@/components/ui/form/input-container'
import { Select } from '@/components/ui/form/select'
import { LabelValue } from '@/types'
import { Table } from '@tanstack/react-table'
import { IconType } from 'react-icons'
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md'

const PAGES_SIZE: LabelValue[] = [
	{
		label: '10',
		value: '10',
	},
	{
		label: '20',
		value: '20',
	},
	{
		label: '30',
		value: '30',
	},
	{
		label: '40',
		value: '40',
	},
	{
		label: '50',
		value: '50',
	},
]

export function Pagination({
	table,
}: {
	table: Table<any>
}) {
	return (
		<div className="p-5 flex justify-between border-t border-t-neutral-300">
			<div className="flex gap-4 items-center">
				<p className="text-sm">Filas por pagina</p>
				<Select
					options={PAGES_SIZE}
					value={table.getState().pagination.pageSize.toString()}
					onValueChange={(value) => table.setPageSize(Number(value))}
				/>
			</div>
			<div className="flex gap-4">
				<PaginationButton
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
					icon={MdOutlineKeyboardDoubleArrowLeft}
				/>
				<PaginationButton
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					icon={MdOutlineKeyboardArrowLeft}
				/>
				<PaginationButton
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					icon={MdOutlineKeyboardArrowRight}
				/>
				<PaginationButton
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
					icon={MdOutlineKeyboardDoubleArrowRight}
				/>
			</div>
		</div>
	)
}

export function PaginationButton({
	icon,
	disabled,
	onClick,
}: {
	icon: IconType
	disabled: boolean
	onClick: () => void
}) {
	const Icon = icon

	return (
		<button onClick={onClick} disabled={disabled}>
			<InputContainer classNames="px-4 cursor-pointer hover:bg-neutral-500">
				<Icon size={18} />
			</InputContainer>
		</button>
	)
}
