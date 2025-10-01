export function AdminHeading({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<div>
			<h1 className="text-xl font-bold text-white/90">{title}</h1>
			<h2>{subtitle}</h2>
		</div>
	);
}
