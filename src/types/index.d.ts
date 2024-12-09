import { Sneaker } from '@/types/sneaker'

export type SneakersData = Sneaker[]

export type Hero = {
	headline: string
	subheadline: string
	callToAction: string
	callToActionLink: string
}

export interface HomeData {
	hero: Hero
}

export interface LabelValue {
	label: string
	value: string
}
