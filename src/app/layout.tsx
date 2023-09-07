import "@/styles/globals.css";

import { Container } from "@/components/container";
import ProviderWrapper from "@/store/ProviderWrapper";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ProviderWrapper>
          <Container>
            <main className="pt-[var(--header-height)]">{children}</main>
          </Container>
        </ProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}
