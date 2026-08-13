import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const Route = createFileRoute("/about-us")({ component: AboutPage });

function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 pt-32">
				<h1>Sobre Lucky Shoes</h1>
			</main>
			<Footer />
		</div>
	);
}
