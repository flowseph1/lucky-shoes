import { cn } from "@/lib/utils";

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("rounded-2xl border border-white/[0.06] bg-neutral-600/70 backdrop-blur-sm", className)}>
			{children}
		</div>
	);
}

export function PanelHeader({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) {
	return (
		<div className="flex items-center justify-between gap-8 border-white/[0.06] border-b px-10 py-8">
			<div className="min-w-0">
				<h3 className="truncate font-semibold text-md text-text-base">{title}</h3>
				{description && <p className="mt-1 truncate text-text-extra-light text-xs">{description}</p>}
			</div>
			{actions}
		</div>
	);
}
