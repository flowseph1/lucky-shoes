export function PageHeader({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) {
	return (
		<header className="flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 className="font-bold text-text-base text-xl tracking-tight">{title}</h1>
				{description && <p className="mt-2 text-md text-text-light">{description}</p>}
			</div>
			{actions && <div className="flex items-center gap-4">{actions}</div>}
		</header>
	);
}
