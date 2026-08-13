import { cn } from "@/lib/utils";

const accents = {
	primary: "bg-primary-light text-primary-900",
	secondary: "bg-secondary-light text-secondary",
	tertiary: "bg-tertiary-light text-tertiary",
	neutral: "bg-white/[0.06] text-text-light",
} as const;

export function StatCard({
	label,
	value,
	hint,
	icon,
	accent = "neutral",
}: {
	label: string;
	value: string | number;
	hint?: string;
	icon: React.ReactNode;
	accent?: keyof typeof accents;
}) {
	return (
		<div className="rounded-2xl border border-white/[0.06] bg-neutral-600/70 p-8 transition-colors hover:border-white/[0.12]">
			<div className="flex items-start justify-between gap-4">
				<p className="font-medium text-text-light text-xs uppercase tracking-wider">{label}</p>
				<span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", accents[accent])}>
					{icon}
				</span>
			</div>
			<p className="mt-6 font-bold text-text-base text-xl tabular-nums">{value}</p>
			{hint && <p className="mt-2 text-text-extra-light text-xs">{hint}</p>}
		</div>
	);
}
