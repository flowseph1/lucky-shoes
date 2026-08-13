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
		<header className="flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
			<div>
				<h1 className="font-bold text-text-base text-xl tracking-tight">{title}</h1>
				{description && <p className="mt-2 text-md text-text-light">{description}</p>}
			</div>
			{actions && <div className="flex items-center gap-4 [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>}
		</header>
	);
}
