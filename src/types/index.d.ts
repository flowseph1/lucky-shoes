import type { Sneaker } from "@/types/sneaker";

export type SneakersData = Sneaker[];

export type Hero = {
	headline: string;
	subheadline: string;
	callToAction: string;
	callToActionLink: string;
};

export interface ApiResponse<T> {
	status: string;
	code: number | string;
	data: T;
}

export interface HomeData {
	hero: Hero;
}
