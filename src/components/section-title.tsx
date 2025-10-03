export function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="max-w-6xl bg-linear-to-tl from-gray-400 to-white/70 bg-clip-text text-center font-bold text-[3.3rem] text-transparent tracking-normal sm:text-[5rem] md:text-[6rem]">
			{children}
		</h1>
	);
}
