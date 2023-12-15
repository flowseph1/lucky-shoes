import "@/styles/globals.css";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <Container>
          <main>{children}</main>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
