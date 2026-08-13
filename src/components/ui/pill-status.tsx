import { Badge } from "./badge";

export interface StatusVariantProps {
	variant?: "active" | "inactive" | null;
}

export function PillStatus({ variant = "active" }: StatusVariantProps) {
	const active = variant !== "inactive";
	return (
		<Badge tone={active ? "success" : "danger"} dot>
			{active ? "Activo" : "Inactivo"}
		</Badge>
	);
}
