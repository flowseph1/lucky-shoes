export function Colors({ colors }: { colors: string[] }) {
	return (
		<div className="w-fit rounded-full border border-border-color px-4 py-1">
			{colors.map((color) => (
				<div key={color} className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
					<p>{color}</p>
				</div>
			))}
		</div>
	);
}
