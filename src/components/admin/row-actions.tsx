import { LuPencil, LuTrash2 } from "react-icons/lu";

export function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
	return (
		<div className="flex justify-end gap-2">
			<button
				type="button"
				onClick={onEdit}
				title="Editar"
				aria-label="Editar"
				className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-text-light transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-text-base"
			>
				<LuPencil size={14} />
			</button>
			<button
				type="button"
				onClick={onDelete}
				title="Eliminar"
				aria-label="Eliminar"
				className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-text-light transition-colors hover:border-secondary/30 hover:bg-secondary-light hover:text-secondary"
			>
				<LuTrash2 size={14} />
			</button>
		</div>
	);
}
