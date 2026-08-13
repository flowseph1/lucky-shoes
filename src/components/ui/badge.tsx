import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(
	"inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-1.5 font-medium text-xs leading-none",
	{
		variants: {
			tone: {
				neutral: "border-white/[0.08] bg-white/[0.04] text-text-light",
				success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
				danger: "border-secondary/25 bg-secondary-light text-secondary",
				info: "border-tertiary/25 bg-tertiary-light text-tertiary",
				accent: "border-primary-border bg-primary-light text-primary-900",
			},
		},
		defaultVariants: { tone: "neutral" },
	},
);

interface BadgeProps extends VariantProps<typeof badge> {
	children: React.ReactNode;
	dot?: boolean;
	className?: string;
}

export function Badge({ children, tone, dot, className }: BadgeProps) {
	return (
		<span className={badge({ tone, className })}>
			{dot && <span className="size-1.5 rounded-full bg-current" />}
			{children}
		</span>
	);
}
