"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";
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

	useLayoutEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowRight" && hasMultiple) onNavigate((activeIndex + 1) % images.length);
			if (event.key === "ArrowLeft" && hasMultiple) onNavigate((activeIndex - 1 + images.length) % images.length);
		}
		const previousOverflow = document.body.style.overflow;
		const previousPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
			document.body.style.paddingRight = previousPaddingRight;
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
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
				onClick={onClose}
			>
				<button
					type="button"
					aria-label="Cerrar"
					onClick={onClose}
					className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-6 sm:right-6"
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
							className="-translate-y-1/2 absolute top-1/2 left-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
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
							className="-translate-y-1/2 absolute top-1/2 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
						>
							<IoChevronForward size={22} />
						</button>
					</>
				)}

				<div
					className="flex h-[min(78vh,48rem)] w-[min(100%,72rem)] items-center justify-center sm:w-[min(90vw,72rem)]"
					onClick={(event) => event.stopPropagation()}
				>
					<motion.img
						key={image.url}
						initial={{ opacity: 0, scale: 0.96 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.96 }}
						transition={{ duration: 0.15 }}
						src={image.url}
						alt={image.alt || ""}
						className="h-full w-full rounded-lg object-contain"
					/>
				</div>

				{hasMultiple && (
					<div className="-translate-x-1/2 absolute bottom-6 left-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
						{activeIndex + 1} / {images.length}
					</div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
