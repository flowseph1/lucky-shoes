import { cn } from "@/lib/utils";

export function DataTable({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className="overflow-x-auto">
			<table className={cn("w-full border-collapse text-left", className)}>{children}</table>
		</div>
	);
}

export function Th({
	children,
	className,
	align = "left",
}: {
	children?: React.ReactNode;
	className?: string;
	align?: "left" | "right";
}) {
	return (
		<th
			className={cn(
				"whitespace-nowrap border-white/[0.06] border-b bg-neutral-700/60 px-10 py-5 font-medium text-text-extra-light text-xs uppercase tracking-wider",
				align === "right" && "text-right",
				className,
			)}
		>
			{children}
		</th>
	);
}

export function Td({
	children,
	className,
	align = "left",
}: {
	children?: React.ReactNode;
	className?: string;
	align?: "left" | "right";
}) {
	return (
		<td className={cn("px-10 py-6 align-middle text-sm", align === "right" && "text-right", className)}>{children}</td>
	);
}

export function Tr({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
	return (
		<tr
			className={cn(
				"border-white/[0.04] border-b transition-colors last:border-b-0 hover:bg-white/[0.02]",
				onClick && "cursor-pointer",
			)}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.currentTarget === event.target && onClick && (event.key === "Enter" || event.key === " ")) {
					event.preventDefault();
					onClick();
				}
			}}
			tabIndex={onClick ? 0 : undefined}
		>
			{children}
		</tr>
	);
}

export function EmptyState({
	icon,
	title,
	description,
	action,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	action?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 px-5 py-16 text-center sm:px-10 sm:py-24">
			<span className="flex size-16 items-center justify-center rounded-full bg-white/[0.04] text-text-extra-light">
				{icon}
			</span>
			<p className="font-semibold text-md text-text-base">{title}</p>
			<p className="max-w-md text-sm text-text-light">{description}</p>
			{action && <div className="mt-4">{action}</div>}
		</div>
	);
}
