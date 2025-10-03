"use client";

import { motion } from "framer-motion";
import { TbShoeOff } from "react-icons/tb";

export function EmptyList() {
	return (
		<motion.div
			className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl py-20 text-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="rounded-full border border-border-color bg-container-light p-6">
				<TbShoeOff size={48} className="text-text-extra-light" />
			</div>
			<div className="flex flex-col gap-3">
				<p className="font-semibold text-lg text-text-base">No se encontraron zapatillas</p>
				<p className="text-sm text-text-light">Prueba a cambiar los filtros o vuelve a intentarlo más tarde</p>
			</div>
		</motion.div>
	);
}
