export function TableAction({
	children,
	onClick,
}: { children: React.ReactNode; onClick: (...any: any) => void }) {
	return (
		<button
			onClick={onClick}
			className="flex relative w-14 h-14 justify-center items-center rounded-full hover:bg-neutral-500 cursor-pointer"
		>
			{children}
		</button>
	)
}
