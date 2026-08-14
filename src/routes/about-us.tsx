import { createFileRoute, Link } from "@tanstack/react-router";
import { CiInstagram } from "react-icons/ci";
import { IoLogoWhatsapp, IoStar } from "react-icons/io5";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QUOTE_PHONE } from "@/constants/quote-phone";
import { INSTAGRAM_URL } from "@/constants/social";
import { aboutData } from "@/data/about";

export const Route = createFileRoute("/about-us")({ component: AboutPage });

const WHATSAPP_URL = `https://wa.me/${QUOTE_PHONE}?text=${encodeURIComponent(
	"Hola, vengo de la página de Lucky Shoes y quiero más información.",
)}`;

function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-(--header-height)">
				{/* Hero */}
				<div className="relative overflow-hidden bg-hero">
					<div
						aria-hidden
						className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-160 w-160 rounded-full bg-primary-500/20 blur-[120px]"
					/>
					<Container className="relative flex flex-col items-center gap-8 py-32 sm:py-40">
						<span className="inline-flex items-center gap-2 rounded-full border border-border-color bg-container-light px-5 py-2 text-text-light text-xs backdrop-blur">
							<span aria-hidden="true" className="text-2xl leading-none">
								🇭🇳
							</span>
							{aboutData.hero.eyebrow}
						</span>
						<h1 className="max-w-4xl bg-linear-to-tl from-gray-400 to-white/70 bg-clip-text text-center font-bold text-[3rem] text-transparent sm:text-[4.5rem]">
							{aboutData.hero.headline}
						</h1>
						<p className="max-w-3xl text-center text-lg text-text-light leading-relaxed">
							{aboutData.hero.subHeadline}
						</p>
					</Container>
					<div
						aria-hidden
						className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background"
					/>
				</div>

				<Container className="flex flex-col gap-32 pb-32">
					{/* Stats */}
					<section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
						{aboutData.stats.map((stat) => (
							<div
								key={stat.label}
								className="flex flex-col items-center gap-2 rounded-2xl border border-border-color bg-container-extra-light px-6 py-8 text-center"
							>
								<p className="font-bold text-text-base text-xl tabular-nums">{stat.value}</p>
								<p className="text-sm text-text-light">{stat.label}</p>
							</div>
						))}
					</section>

					{/* Story */}
					<section className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">{aboutData.story.title}</h2>
							<div aria-hidden className="h-1 w-20 animate-neon-flicker rounded-full bg-neon-gradient" />
						</div>
						<div className="flex flex-col gap-6">
							{aboutData.story.paragraphs.map((paragraph) => (
								<p key={paragraph} className="text-md text-text-light leading-relaxed">
									{paragraph}
								</p>
							))}
						</div>
					</section>

					{/* Values */}
					<section className="flex flex-col gap-12">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">Por qué comprarnos a nosotros</h2>
							<p className="text-sm text-text-light">Lo que nos hemos comprometido a cumplir en cada pedido.</p>
						</div>
						<div className="grid gap-6 sm:grid-cols-2">
							{aboutData.values.map((value) => (
								<div
									key={value.title}
									className="flex flex-col gap-3 rounded-2xl border border-border-color bg-container-extra-light p-8 transition-colors hover:border-primary-300/50 hover:bg-container-light"
								>
									<h3 className="font-semibold text-md text-text-base">{value.title}</h3>
									<p className="text-sm text-text-light leading-relaxed">{value.description}</p>
								</div>
							))}
						</div>
					</section>

					{/* How it works */}
					<section className="flex flex-col gap-12">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">Cómo comprar</h2>
							<p className="text-sm text-text-light">Tres pasos y el par es tuyo.</p>
						</div>
						<ol className="grid gap-6 md:grid-cols-3">
							{aboutData.steps.map((step, index) => (
								<li
									key={step.title}
									className="flex flex-col gap-4 rounded-2xl border border-border-color bg-container-extra-light p-8"
								>
									<span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-300 bg-primary-500/20 font-bold text-md text-text-base tabular-nums">
										{index + 1}
									</span>
									<h3 className="font-semibold text-md text-text-base">{step.title}</h3>
									<p className="text-sm text-text-light leading-relaxed">{step.description}</p>
								</li>
							))}
						</ol>
					</section>

					{/* Testimonials */}
					<section className="flex flex-col gap-12">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">{aboutData.testimonials.title}</h2>
							<p className="text-sm text-text-light">{aboutData.testimonials.subtitle}</p>
						</div>
						<div className="grid gap-6 md:grid-cols-3">
							{aboutData.testimonials.items.map((testimonial) => (
								<figure
									key={testimonial.name}
									className="flex flex-col justify-between gap-8 rounded-2xl border border-border-color bg-container-extra-light p-8"
								>
									<div className="flex flex-col gap-4">
										<IoStar aria-hidden className="text-tertiary" size={18} />
										<blockquote className="text-md text-text-base leading-relaxed">“{testimonial.quote}”</blockquote>
									</div>
									<figcaption className="flex flex-col gap-1">
										<span className="font-semibold text-sm text-text-base">{testimonial.name}</span>
										<span className="text-sm text-text-light">{testimonial.location}</span>
									</figcaption>
								</figure>
							))}
						</div>
					</section>

					{/* Brands */}
					<section className="flex flex-col gap-8">
						<div className="flex flex-col gap-3">
							<h2 className="font-semibold text-text-base text-xl">Marcas que manejamos</h2>
							<p className="text-sm text-text-light">Y si no la ves en la lista, pregúntanos: la conseguimos.</p>
						</div>
						<div className="flex flex-wrap gap-3">
							{aboutData.brands.map((brand) => (
								<span
									key={brand}
									className="rounded-full border border-border-color bg-container-light px-5 py-2 text-sm text-text-base"
								>
									{brand}
								</span>
							))}
						</div>
					</section>

					{/* CTA */}
					<section className="relative overflow-hidden rounded-3xl border border-border-color bg-container-extra-light px-8 py-16 text-center sm:px-16">
						<div
							aria-hidden
							className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]"
						/>
						<div className="relative flex flex-col items-center gap-8">
							<h2 className="font-bold text-text-base text-xl sm:text-xxl">{aboutData.cta.title}</h2>
							<p className="max-w-xl text-sm text-text-light leading-relaxed">{aboutData.cta.description}</p>
							<div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
								<Link
									to="/"
									search={{ brand: undefined, search: undefined }}
									hash="catalogo"
									className="flex h-16 w-full items-center justify-center rounded-xl border-[0.1rem] border-primary-300 bg-primary-500 px-10 font-semibold text-sm text-white/90 transition-colors hover:bg-primary-700 hover:shadow-filter-shadow sm:w-auto"
								>
									{aboutData.cta.primary}
								</Link>
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noreferrer"
									className="flex h-16 w-full items-center justify-center gap-3 rounded-xl border-[0.1rem] border-white/[0.08] bg-white/[0.03] px-10 font-medium text-sm text-text-base backdrop-blur transition-colors hover:border-white/[0.16] hover:bg-white/[0.06] sm:w-auto"
								>
									<IoLogoWhatsapp size={20} />
									{aboutData.cta.secondary}
								</a>
								<a
									href={INSTAGRAM_URL}
									target="_blank"
									rel="noreferrer"
									className="flex h-16 w-full items-center justify-center gap-3 rounded-xl border-[0.1rem] border-white/[0.08] bg-white/[0.03] px-10 font-medium text-sm text-text-base backdrop-blur transition-colors hover:border-white/[0.16] hover:bg-white/[0.06] sm:w-auto"
								>
									<CiInstagram size={22} />
									{aboutData.cta.tertiary}
								</a>
							</div>
						</div>
					</section>
				</Container>
			</main>
			<Footer />
		</div>
	);
}
