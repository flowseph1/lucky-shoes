import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<Container className="flex-1 pt-(--header-height)">{children}</Container>
			<Footer />
		</div>
	);
}
