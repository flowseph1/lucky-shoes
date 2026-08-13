import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "@/components/ui/buttons";

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Eliminar",
	cancelLabel = "Cancelar",
	loading = false,
	onConfirm,
	onCancel,
}: {
	open: boolean;
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	loading?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onCancel();
		document.addEventListener("keydown", onKeyDown);
		document.body.classList.add("lock-scroll");
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.classList.remove("lock-scroll");
		};
	}, [open, onCancel]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
					<motion.button
						type="button"
						aria-label="Cerrar"
						onClick={onCancel}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[2px]"
					/>
					<motion.div
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="confirm-dialog-title"
						initial={{ opacity: 0, scale: 0.96, y: 8 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.96, y: 8 }}
						transition={{ type: "spring", stiffness: 380, damping: 32 }}
						className="relative w-full max-w-[42rem] rounded-2xl border border-white/[0.06] bg-neutral-600 p-5 sm:p-10"
					>
						<div className="flex items-start gap-4 sm:gap-6">
							<div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary-light text-secondary">
								<LuTriangleAlert size={18} />
							</div>
							<div className="min-w-0">
								<h2 id="confirm-dialog-title" className="font-semibold text-md text-text-base">
									{title}
								</h2>
								{description && <p className="mt-2 text-sm text-text-light">{description}</p>}
							</div>
						</div>

						<div className="mt-8 flex flex-col-reverse gap-2 sm:mt-10 sm:flex-row sm:justify-end sm:gap-4">
							<Button type="button" intent="ghost" title={cancelLabel} onClick={onCancel} disabled={loading} />
							<Button
								type="button"
								intent="ghost-danger"
								title={loading ? "Eliminando…" : confirmLabel}
								onClick={onConfirm}
								disabled={loading}
							/>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
