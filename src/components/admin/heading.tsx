export function AdminHeading({
	title,
	subtitle,
	caption,
	rightButtons,
}: {
	title: string
	caption?: string
	subtitle: string
	rightButtons?: React.ReactNode
}) {
	return (
		<div className="flex justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-4 items-center">
					<h1 className="text-xl font-bold text-white/90">{title}</h1>
					{caption && <p className="text-sm text-white/30 mt-3">{caption}</p>}
				</div>
				<h2>{subtitle}</h2>
			</div>
			{rightButtons}
		</div>
	)
}
