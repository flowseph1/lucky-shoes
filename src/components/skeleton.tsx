import { cn } from "@/lib/utils";

export function Skeleton({ className, delay }: { className?: string; delay?: number }) {
	return (
		<div
			className={cn("h-10 w-10 animate-pulse rounded-full bg-neutral-900", className)}
			style={{ animationDelay: `${delay}ms` }}
		/>
	);
}
