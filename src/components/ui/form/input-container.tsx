import { cn } from '@/lib/utils'

export function InputContainer({
	children,
	classNames,
	onClick,
}: {
	children: React.ReactNode
	classNames?: string
	onClick?: () => void
}) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'bg-neutral-300 rounded-md flex items-center ring-1 ring-neutral-50 h-12',
				classNames,
			)}
		>
			{children}
		</div>
	)
}
