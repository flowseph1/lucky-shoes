import { IoSparkles } from "react-icons/io5";

export function NewSneakerBadge() {
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-primary-500 px-3 py-1.5 font-semibold text-white text-xxs uppercase tracking-[0.08em] ring-2 ring-primary-500/20 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
			<IoSparkles aria-hidden="true" size={13} />
			Nuevo
		</span>
	);
}
