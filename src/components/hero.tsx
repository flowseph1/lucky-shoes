"use client";

import { CiInstagram } from "react-icons/ci";
import { Button } from "@/components/ui";
import { homeData } from "@/data/home";
import { SectionSubtitle } from "./section-subtitle";
import { SectionTitle } from "./section-title";

export function Hero() {
	return (
		<div className="flex flex-col items-center justify-center gap-10 bg-hero py-52">
			<SectionTitle>{homeData.hero.headline}</SectionTitle>
			<SectionSubtitle>{homeData.hero.subHeadline}</SectionSubtitle>

			<div className="flex flex-col gap-7 sm:flex-row">
				<Button
					title={homeData.hero.callToAction2}
					intent="tertiary"
					rounded="full"
					leftIcon={<CiInstagram size={24} />}
					onClick={() => {}}
				/>
				{/* <Button title={homeData.hero.callToAction2} onClick={() => {}} /> */}
			</div>
		</div>
	);
}
