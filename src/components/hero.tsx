"use client";

import { Button } from "@/components/ui";
import { homeData } from "@/data/home";
import Link from "next/link";
import { CiInstagram } from "react-icons/ci";
import { SectionSubtitle } from "./section-subtitle";
import { SectionTitle } from "./section-title";

export function Hero() {
	return (
		<div className="flex items-center justify-center py-64 flex-col gap-10 bg-hero">
			<SectionTitle>{homeData.hero.headline}</SectionTitle>
			<SectionSubtitle>{homeData.hero.subHeadline}</SectionSubtitle>

			<div className="flex-col sm:flex-row flex gap-7">
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
