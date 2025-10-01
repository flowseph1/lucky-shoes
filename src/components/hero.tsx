"use client";

import { Button } from "@/components/ui";
import { homeData } from "@/data/home";
import { SectionSubtitle } from "./section-subtitle";
import { SectionTitle } from "./section-title";

export function Hero() {
	return (
		<div className="flex items-center justify-center py-72 flex-col gap-10 bg-hero">
			<SectionTitle>{homeData.hero.headline}</SectionTitle>
			<SectionSubtitle>{homeData.hero.subHeadline}</SectionSubtitle>

			<div className="flex-col sm:flex-row flex gap-7">
				<Button
					title={homeData.hero.callToAction}
					intent="tertiary"
					rounded="full"
					onClick={() => {}}
				/>
				<Button title={homeData.hero.callToAction2} onClick={() => {}} />
			</div>
		</div>
	);
}
