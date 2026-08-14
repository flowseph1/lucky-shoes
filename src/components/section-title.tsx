function GradientLine({ children }: { children: React.ReactNode }) {
	return <span className="bg-linear-to-tl from-gray-400 to-white/70 bg-clip-text text-transparent">{children}</span>;
}

function HighlightWord({ children }: { children: React.ReactNode }) {
	return (
		<span className="neon-shadow relative z-10 inline-block animate-flicker align-baseline font-madi text-[1.8em] text-logo-secondary leading-[7px]">
			{children}
		</span>
	);
}

function renderLine(line: string, highlight?: string) {
	if (!highlight || !line.includes(highlight)) return <GradientLine>{line}</GradientLine>;

	const [before, ...rest] = line.split(highlight);
	const after = rest.join(highlight);

	return (
		<GradientLine>
			{before.trim() && `${before.trim()} `}
			<HighlightWord>{highlight}</HighlightWord>
			{after.trim() && ` ${after.trim()}`}
		</GradientLine>
	);
}

export function SectionTitle({ children, highlight }: { children: React.ReactNode; highlight?: string }) {
	if (typeof children !== "string") {
		return (
			<h1 className="max-w-6xl text-balance bg-linear-to-tl from-gray-400 to-white/70 bg-clip-text text-center font-bold text-[3.3rem] text-transparent tracking-normal sm:text-[5rem] md:text-[6rem]">
				{children}
			</h1>
		);
	}

	const lines = children.split("|");

	return (
		<h1 className="flex max-w-6xl flex-col items-center text-center font-bold text-[3.3rem] leading-[1.05] tracking-normal sm:text-[5rem] md:text-[6rem]">
			{lines.map((line) => (
				<span key={line}>{renderLine(line, highlight)}</span>
			))}
		</h1>
	);
}
