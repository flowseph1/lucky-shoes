"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

interface ModalProps {
	name: string;
	children: React.ReactNode;
	title?: string;
	buttonTitle?: string;
	buttonAction?: () => void;
}

export function Modal({
	title,
	children,
	name,
	buttonTitle,
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
			className="bg-neutral-600 rounded-xl shadow-xl text-white/90 border-[1px] border-neutral-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div onClick={(e) => e.stopPropagation()} className="">
				{/* Header */}
				{title && (
					<div className="flex justify-between py-5 px-6 border-b-[1px] border-b-neutral-300">
						<p className="text-lg font-semibold">{title}</p>
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
				<div className="min-w-[300px] py-7 px-6 bg-neutral-900">{children}</div>

				{/* Footer */}
				<div
					className={cn(
						"flex justify-between py-5 px-6 border-t-[1px] border-t-neutral-300",
						{
							"!justify-end": !buttonTitle,
						},
					)}
				>
					<Button intent="tertiary" title="Cancelar" onClick={handleClose} />
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
	);
}
