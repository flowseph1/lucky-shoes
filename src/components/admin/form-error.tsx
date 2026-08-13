import { LuCircleAlert } from "react-icons/lu";
import { cn } from "@/lib/utils";

export function FormError({ message, className }: { message: string; className?: string }) {
	return (
		<p
			className={cn(
				"flex items-start gap-3 rounded-lg border border-secondary/25 bg-secondary-light px-5 py-4 text-secondary text-sm",
				className,
			)}
		>
			<LuCircleAlert size={15} className="mt-0.5 shrink-0" />
			{message}
		</p>
	);
}
