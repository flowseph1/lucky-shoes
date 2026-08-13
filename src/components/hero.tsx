"use client";

import { CiInstagram } from "react-icons/ci";
import { HiArrowDown } from "react-icons/hi2";
import { Container } from "@/components/container";
import { Button } from "@/components/ui";
import { INSTAGRAM_URL } from "@/constants/social";
import { homeData } from "@/data/home";
import { SectionSubtitle } from "./section-subtitle";
import { SectionTitle } from "./section-title";

export function Hero() {
	const scrollToCatalog = () => {
		document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className="relative overflow-hidden bg-hero">
			{/* Decorative glow */}
			<div
				aria-hidden
				className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-160 w-160 rounded-full bg-primary-500/20 blur-[120px]"
			/>
			<div
				aria-hidden
				className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-logo/10 blur-[120px]"
			/>

			<Container className="relative flex flex-col items-center justify-center gap-10 py-40 sm:py-52">
				<span className="inline-flex items-center gap-3 rounded-full border border-border-color bg-container-light px-5 py-2 text-text-light text-xs backdrop-blur">
					<span className="inline-block h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_var(--color-tertiary)]" />
					{homeData.hero.eyebrow}
				</span>

				<SectionTitle>{homeData.hero.headline}</SectionTitle>
				<SectionSubtitle>{homeData.hero.subHeadline}</SectionSubtitle>

				<div className="flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row">
					<Button
						title={homeData.hero.callToAction}
						intent="primary"
						rounded="xl"
						size="large"
						leftIcon={<HiArrowDown size={20} />}
						onClick={scrollToCatalog}
						className="w-full sm:w-auto"
					/>
					<Button
						title={homeData.hero.callToAction2}
						intent="tertiary"
						rounded="xl"
						size="large"
						leftIcon={<CiInstagram size={24} />}
						onClick={() => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")}
						className="w-full sm:w-auto"
					/>
				</div>
			</Container>

			{/* Fade into the catalog section */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background"
			/>
		</div>
	);
}
