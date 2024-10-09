"use client";

import { cn, sleep } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/buttons";

interface ModalProps {
	name: string;
	children: React.ReactNode;
	title?: string;
	buttonTitle?: string;
	onClose?: () => void;
	buttonAction?: () => void;
}

function Modal_({
	title,
	children,
	name,
	buttonTitle,
	onClose,
	buttonAction,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const p = searchParams.get("modal");

	const handleToggleModalEffect = () => {
		if (!p) return;

		if (p === name) {
			dialogRef.current?.showModal();
		}
	};
	const handleClose = async () => {
		router.replace(pathname);
		await sleep(400);
		onClose && onClose();
		dialogRef.current?.close();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(handleToggleModalEffect, [p]);

	return (
		<AnimatePresence>
			{p === name && (
				<motion.dialog
					ref={dialogRef}
					onClick={handleClose}
					className="bg-neutral-600 rounded-xl shadow-xl text-white/90 border-[1px] border-neutral-50 backdrop:bg-black/30"
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							e.preventDefault();
							handleClose();
						}
					}}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
				>
					<div onClick={(e) => e.stopPropagation()} className="">
						{/* Header */}
						{title && (
							<div className="flex justify-between py-5 px-6 border-b-[1px] border-b-neutral-400 bg-neutral-900">
								<p className="text-[1.7rem] font-semibold text-text-base">
									{title}
								</p>
								<button
									type="button"
									onClick={handleClose}
									className="flex justify-center items-center w-10 h-10"
								>
									<IoClose />
								</button>
							</div>
						)}

						{/* Body */}
						<div className="min-w-[300px] py-7 px-6 bg-neutral-900">
							{children}
						</div>

						{/* Footer */}
						<div
							className={cn(
								"flex justify-end py-5 px-6 border-t-[1px] border-t-neutral-400 bg-neutral-900/40",
							)}
						>
							{/* <Button intent="ghost" title="Cancelar" onClick={handleClose} /> */}
							{buttonTitle && buttonAction && (
								<Button
									intent="primary"
									title={buttonTitle}
									onClick={buttonAction}
								/>
							)}
						</div>
					</div>
				</motion.dialog>
			)}
		</AnimatePresence>
	);
}

export const Modal = memo(Modal_);
