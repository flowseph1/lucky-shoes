import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
	IoArrowBackOutline,
	IoChevronBack,
	IoChevronForward,
	IoExpandOutline,
	IoHeart,
	IoHeartOutline,
} from "react-icons/io5";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ImageLightbox } from "@/components/sneaker/image-lightbox";
import { NewSneakerBadge } from "@/components/sneaker/new-sneaker-badge";
import { QuoteForm } from "@/components/sneaker/quote-form";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { useFavorites } from "@/lib/hooks/use-favorites";
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
	const gallery = sneaker.images.length ? sneaker.images : [{ url: sneaker.image, alt: sneaker.name }];
	const [activeImage, setActiveImage] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const isAvailable = sneaker.availability !== "No disponible";
	const hasMultipleImages = gallery.length > 1;
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.some((favorite) => favorite.id === sneaker.id);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-(--header-height)">
				<Container className="flex w-full flex-col gap-28 py-20">
					<div className="grid w-full grid-cols-1 gap-14 md:grid-cols-2 md:gap-16 xl:gap-24">
						<div className="col-span-full flex items-center justify-between">
							<Link
								to="/"
								search={{ brand: undefined, search: undefined }}
								className="flex w-fit items-center gap-2 rounded-full border border-border-color bg-container-extra-light px-4 py-2 font-medium text-sm text-text-light transition-colors hover:text-text-base"
							>
								<IoArrowBackOutline size={14} />
								Volver
							</Link>
							<button
								type="button"
								aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
								aria-pressed={isFavorite}
								onClick={() => toggleFavorite(sneaker)}
								className="flex items-center gap-2 rounded-full border border-border-color bg-container-extra-light px-4 py-2 font-medium text-sm text-text-light transition-colors hover:text-text-base"
							>
								{isFavorite ? <IoHeart size={16} className="text-tertiary" /> : <IoHeartOutline size={16} />}
								{isFavorite ? "En favoritos" : "Agregar a favoritos"}
							</button>
						</div>
						<div className="flex flex-col-reverse gap-4 md:flex-row">
							{hasMultipleImages && (
								<div className="flex max-w-full gap-3 overflow-x-auto pb-1 md:max-h-none md:w-24 md:shrink-0 md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0">
									{gallery.map((image, index) => (
										<button
											key={`${image.url}-${index}`}
											type="button"
											aria-pressed={index === activeImage}
											onClick={() => setActiveImage(index)}
											className={`h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
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
							<div className="group relative flex-1">
								<button
									type="button"
									onClick={() => setIsLightboxOpen(true)}
									className="relative block w-full overflow-hidden rounded-3xl border border-border-color bg-gradient-to-b from-container-light to-container-extra-light"
								>
									<img
										src={gallery[activeImage].url}
										alt={gallery[activeImage].alt || sneaker.name}
										className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<span className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white opacity-0 shadow-black/30 shadow-lg transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
										<IoExpandOutline size={18} />
									</span>
								</button>
								{sneaker.isNew && (
									<div className="pointer-events-none absolute top-5 left-5">
										<NewSneakerBadge />
									</div>
								)}
								{hasMultipleImages && (
									<>
										<button
											type="button"
											aria-label="Imagen anterior"
											onClick={() => setActiveImage((current) => (current - 1 + gallery.length) % gallery.length)}
											className="-translate-y-1/2 absolute top-1/2 left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
										>
											<IoChevronBack size={20} />
										</button>
										<button
											type="button"
											aria-label="Siguiente imagen"
											onClick={() => setActiveImage((current) => (current + 1) % gallery.length)}
											className="-translate-y-1/2 absolute top-1/2 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
										>
											<IoChevronForward size={20} />
										</button>
									</>
								)}
							</div>
						</div>
						<section className="flex flex-col gap-7">
							<p className="w-fit rounded-full border border-border-color px-4 py-1 text-text-light text-xs">
								{sneaker.brand.name}
							</p>
							<div className="flex flex-col gap-4">
								<h1 className="font-bold text-text-base text-xl tracking-tight">{sneaker.name}</h1>
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
						<section className="flex w-full flex-col gap-8">
							<div className="flex items-center gap-3">
								<span className="h-6 w-1 shrink-0 animate-neon-flicker rounded-full bg-neon-gradient" />
								<h2 className="font-bold text-2xl">También te puede interesar</h2>
							</div>
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{related.map((item) => (
									<SneakerItem key={item.id} sneaker={item} />
								))}
							</div>
						</section>
					)}
				</Container>
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
