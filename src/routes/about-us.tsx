import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const Route = createFileRoute("/about-us")({ component: AboutPage });

function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-(--header-height)">
				<Container>
					<section className="py-16 sm:py-32">
						<h1 className="font-bold text-3xl text-text-base sm:text-5xl">Sobre Lucky Shoes</h1>
					</section>
				</Container>
			</main>
			<Footer />
		</div>
	);
}
