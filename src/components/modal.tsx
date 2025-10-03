"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ModalProps {
	name: string;
	children: React.ReactNode;
	title?: string;
	buttonTitle?: string;
	buttonAction?: () => void;
}

export function Modal({ title, children, name, buttonTitle, buttonAction }: ModalProps) {
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
	const handleClose = () => {
		router.replace(pathname);
		dialogRef.current?.close();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(handleToggleModalEffect, [p]);

	return (
		<motion.dialog
			ref={dialogRef}
			onClick={handleClose}
			className="rounded-xl border border-neutral-50 bg-neutral-600 text-white/90 shadow-xl"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div onClick={(e) => e.stopPropagation()} className="">
				{/* Header */}
				{title && (
					<div className="flex justify-between border-b border-b-neutral-300 px-6 py-5">
						<p className="font-semibold text-lg">{title}</p>
						<button type="button" onClick={handleClose} className="flex h-10 w-10 items-center justify-center">
							<IoClose />
						</button>
					</div>
				)}

				{/* Body */}
				<div className="min-w-[300px] bg-neutral-900 px-6 py-7">{children}</div>

				{/* Footer */}
				<div
					className={cn("flex justify-between border-t border-t-neutral-300 px-6 py-5", {
						"justify-end!": !buttonTitle,
					})}
				>
					<Button intent="tertiary" title="Cancelar" onClick={handleClose} />
					{buttonTitle && buttonAction && <Button intent="primary" title={buttonTitle} onClick={buttonAction} />}
				</div>
			</div>
		</motion.dialog>
	);
}
