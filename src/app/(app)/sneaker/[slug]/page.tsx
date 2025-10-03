import { notFound } from "next/navigation";
import { Header } from "@/app/(app)/sneaker/[slug]/_components/header";
import { ImageCarousel } from "@/app/(app)/sneaker/[slug]/_components/image-carousel";
import { OtherProducts } from "@/app/(app)/sneaker/[slug]/_components/other-products";
import { QuoteForm } from "@/app/(app)/sneaker/[slug]/_components/quote-form";
import { SneakerInfo } from "@/app/(app)/sneaker/[slug]/_components/sneaker-info";
import { getSneakerBySlug } from "@/lib/api/sneakers";

interface SneakerPageProps {
	params: Promise<{ slug: string }>;
}

export default async function SneakerPage({ params }: SneakerPageProps) {
	const { slug } = await params;
	const sneaker = await getSneakerBySlug(slug);

	if (!sneaker) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-20 pt-24 pb-36">
			<Header sneakerName={sneaker.name} />
			<section className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr]">
				<ImageCarousel mainImage={sneaker.image} images={sneaker.images} sneaker={sneaker} />
				<div className="flex flex-col gap-8">
					<SneakerInfo sneaker={sneaker} />
					<QuoteForm sneaker={sneaker} />
					{/* {sneaker.color && <Colors colors={[sneaker.color]} />} */}
				</div>
			</section>
			<OtherProducts />
		</div>
	);
}
