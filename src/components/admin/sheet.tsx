import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export function Sheet({
	open,
	title,
	description,
	onClose,
	children,
}: {
	open: boolean;
	title: string;
	description?: string;
	onClose: () => void;
	children: React.ReactNode;
}) {
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
		document.addEventListener("keydown", onKeyDown);
		document.body.classList.add("lock-scroll");
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.classList.remove("lock-scroll");
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-50 flex justify-end">
					<motion.button
						type="button"
						aria-label="Cerrar"
						onClick={onClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[2px]"
					/>
					<motion.aside
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", stiffness: 320, damping: 34 }}
						className="relative flex h-full w-full max-w-[52rem] flex-col border-white/[0.06] border-l bg-neutral-600"
					>
						<header className="flex items-start justify-between gap-6 border-white/[0.06] border-b px-12 py-9">
							<div>
								<h2 className="font-semibold text-md text-text-base">{title}</h2>
								{description && <p className="mt-1 text-text-extra-light text-xs">{description}</p>}
							</div>
							<button
								type="button"
								onClick={onClose}
								aria-label="Cerrar panel"
								className="-mr-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-light transition-colors hover:bg-hover hover:text-text-base"
							>
								<IoClose size={18} />
							</button>
						</header>
						<div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
					</motion.aside>
				</div>
			)}
		</AnimatePresence>
	);
}
