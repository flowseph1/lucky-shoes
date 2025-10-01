export function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="text-[3.3rem] sm:text-[5rem] md:text-[6rem] text-center font-bold max-w-6xl tracking-normal bg-linear-to-tl from-gray-400 to-white/70 bg-clip-text text-transparent">
			{children}
		</h1>
	);
}
