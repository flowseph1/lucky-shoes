"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

interface GalleryImage {
	url: string;
	alt?: string | null;
}

interface Props {
	images: GalleryImage[];
	activeIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, activeIndex, onClose, onNavigate }: Props) {
	const image = images[activeIndex];
	const hasMultiple = images.length > 1;

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowRight" && hasMultiple) onNavigate((activeIndex + 1) % images.length);
			if (event.key === "ArrowLeft" && hasMultiple) onNavigate((activeIndex - 1 + images.length) % images.length);
		}
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [activeIndex, hasMultiple, images.length, onClose, onNavigate]);

	if (!image) return null;

	return (
		<AnimatePresence>
			<motion.div
				key="lightbox-backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
				onClick={onClose}
			>
				<button
					type="button"
					aria-label="Cerrar"
					onClick={onClose}
					className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
				>
					<IoClose size={22} />
				</button>

				{hasMultiple && (
					<>
						<button
							type="button"
							aria-label="Imagen anterior"
							onClick={(event) => {
								event.stopPropagation();
								onNavigate((activeIndex - 1 + images.length) % images.length);
							}}
							className="-translate-y-1/2 absolute top-1/2 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						>
							<IoChevronBack size={22} />
						</button>
						<button
							type="button"
							aria-label="Siguiente imagen"
							onClick={(event) => {
								event.stopPropagation();
								onNavigate((activeIndex + 1) % images.length);
							}}
							className="-translate-y-1/2 absolute top-1/2 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						>
							<IoChevronForward size={22} />
						</button>
					</>
				)}

				<motion.img
					key={image.url}
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.96 }}
					transition={{ duration: 0.15 }}
					src={image.url}
					alt={image.alt || ""}
					className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
					onClick={(event) => event.stopPropagation()}
				/>

				{hasMultiple && (
					<div className="-translate-x-1/2 absolute bottom-6 left-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
						{activeIndex + 1} / {images.length}
					</div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
