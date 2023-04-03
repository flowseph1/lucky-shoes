import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { Container } from "../ui";
import { Header } from "../header";
import { Footer } from "../footer";

interface Props {
    title?: string;
}

const MainLayout: React.FC<HTMLAttributes<HTMLDivElement> & Props> = ({ children, title }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />

            <main className="mt-[var(--navigation-height)]">
                <Container>{children}</Container>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
