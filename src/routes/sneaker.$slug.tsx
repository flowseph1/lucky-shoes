import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { IoArrowBackOutline, IoExpandOutline } from "react-icons/io5";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ImageLightbox } from "@/components/sneaker/image-lightbox";
import { QuoteForm } from "@/components/sneaker/quote-form";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { getPublicSneaker, getRelatedSneakers } from "@/lib/server/catalog";

export const Route = createFileRoute("/sneaker/$slug")({
	loader: async ({ params }) => {
		const sneaker = await getPublicSneaker({ data: params });
		const related = await getRelatedSneakers({ data: { brandId: sneaker.brandId, excludeSlug: sneaker.slug } });
		return { sneaker, related };
	},
	component: SneakerPage,
});

function formatPrice(price: number) {
	return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
}

function SneakerPage() {
	const { sneaker, related } = Route.useLoaderData();
	const gallery = [{ url: sneaker.image, alt: sneaker.name }, ...sneaker.images];
	const [activeImage, setActiveImage] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const isAvailable = sneaker.availability !== "No disponible";

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex w-full flex-col gap-28 px-6 pt-52 pb-24">
				<div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 md:grid-cols-2 md:gap-16 xl:gap-24">
					<div className="col-span-full">
						<Link
							to="/"
							search={{ brand: undefined, search: undefined }}
							className="flex w-fit items-center gap-2 rounded-full border border-border-color bg-container-extra-light px-4 py-2 font-medium text-sm text-text-light transition-colors hover:text-text-base"
						>
							<IoArrowBackOutline size={14} />
							Volver
						</Link>
					</div>
					<div className="flex flex-col-reverse gap-4 md:flex-row">
						{gallery.length > 1 && (
							<div className="flex gap-3 overflow-x-auto md:w-20 md:shrink-0 md:flex-col md:overflow-visible">
								{gallery.map((image, index) => (
									<button
										key={`${image.url}-${index}`}
										type="button"
										aria-pressed={index === activeImage}
										onClick={() => setActiveImage(index)}
										className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
											index === activeImage
												? "border-primary-300 shadow-[0_0_16px_-2px_var(--color-primary-500)]"
												: "border-transparent opacity-70 hover:border-border-color hover:opacity-100"
										}`}
									>
										<img src={image.url} alt={image.alt || sneaker.name} className="h-full w-full object-cover" />
									</button>
								))}
							</div>
						)}
						<div className="relative flex-1">
							<div className="-inset-10 pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,rgba(71,0,216,0.35),transparent_70%)] blur-2xl" />
							<button
								type="button"
								onClick={() => setIsLightboxOpen(true)}
								className="group relative block w-full overflow-hidden rounded-3xl border border-border-color bg-gradient-to-b from-container-light to-container-extra-light"
							>
								<img
									src={gallery[activeImage].url}
									alt={gallery[activeImage].alt || sneaker.name}
									className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<span className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
									<IoExpandOutline size={18} />
								</span>
							</button>
						</div>
					</div>
					<section className="flex flex-col gap-7">
						<p className="w-fit rounded-full border border-border-color px-4 py-1 text-text-light text-xs">
							{sneaker.brand.name}
						</p>
						<div className="flex flex-col gap-4">
							<h1 className="font-bold text-text-base text-title tracking-tight">{sneaker.name}</h1>
							<p className="max-w-[52ch] text-text-light leading-relaxed">
								{sneaker.longDescription ?? sneaker.shortDescription}
							</p>
						</div>
						{sneaker.price != null && (
							<p className="font-bold text-text-base text-xxl tabular-nums tracking-tight [text-shadow:0_0_36px_rgba(71,0,216,0.45)]">
								{formatPrice(sneaker.price)}
							</p>
						)}
						{sneaker.color && (
							<div className="flex items-center gap-2 pt-2 text-sm">
								<div className="h-px w-full max-w-10 bg-border-gradient" />
								<span
									className="h-3 w-3 shrink-0 rounded-full border border-border-color"
									style={{ backgroundColor: sneaker.color }}
								/>
								<span className="text-text-light">Color</span>
								<span className="font-semibold">{sneaker.color}</span>
							</div>
						)}
						<div className="h-px w-full bg-border-gradient" />
						{isAvailable ? (
							<QuoteForm sneakerName={sneaker.name} />
						) : (
							<p className="rounded-2xl border border-border-color bg-container-extra-light p-5 text-sm text-text-light">
								Este modelo no está disponible por ahora. Vuelve pronto o explora otros pares abajo.
							</p>
						)}
					</section>
				</div>
				{related.length > 0 && (
					<section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
						<div className="flex items-center gap-3">
							<span className="h-6 w-1 shrink-0 rounded-full bg-filter-gradient" />
							<h2 className="font-bold text-2xl">También te puede interesar</h2>
						</div>
						<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
							{related.map((item) => (
								<SneakerItem key={item.id} sneaker={item} />
							))}
						</div>
					</section>
				)}
			</main>
			<Footer />
			{isLightboxOpen && (
				<ImageLightbox
					images={gallery}
					activeIndex={activeImage}
					onClose={() => setIsLightboxOpen(false)}
					onNavigate={setActiveImage}
				/>
			)}
		</div>
	);
}
