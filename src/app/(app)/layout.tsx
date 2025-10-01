import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Container className="pb-20">{children}</Container>
			<Footer />
		</>
	);
}
