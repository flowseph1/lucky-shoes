import Link from 'next/link'

export type TableActionProps = {
	children: React.ReactNode
} & (
	| {
			href: string
			onClick?: (...any: any) => void
	  }
	| {
			onClick: (...any: any) => void
	  }
)

export function TableAction(props: TableActionProps) {
	if ('href' in props) {
		return (
			<Link href={props.href}>
				<button
					onClick={props.onClick}
					className="flex relative w-14 h-14 justify-center items-center rounded-full hover:bg-neutral-500 cursor-pointer"
				>
					{props.children}
				</button>
			</Link>
		)
	}

	return (
		<button
			onClick={props.onClick}
			className="flex relative w-14 h-14 justify-center items-center rounded-full hover:bg-neutral-500 cursor-pointer"
		>
			{props.children}
		</button>
	)
}
