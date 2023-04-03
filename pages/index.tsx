import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Filters, MainLayout, Products, Subtitle } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <MainLayout className={inter.className} title="Lucky Shoes | Inicio">
                <div className="pt-10">
                    <Subtitle subtitle="Recomendaciones" className="mb-10" />
                    <Filters className="mb-14" />
                    <Products />
                </div>
            </MainLayout>
        </>
    );
}
