export function AdminHeading({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div>
			<h1 className="font-bold text-white/90 text-xl">{title}</h1>
			<h2>{subtitle}</h2>
		</div>
	);
}
