import { cn } from "@/lib/utils";

export const Container = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<div className={cn("mx-auto h-full max-w-520 px-5", className)}>
			{children}
		</div>
	);
};
