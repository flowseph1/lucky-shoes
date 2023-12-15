"use client";

import { Button } from "@/components/ui";
import { HomeData } from "@/types";
import { ReactNode } from "react";
import {
  SiAdidas,
  SiFila,
  SiJordan,
  SiNewbalance,
  SiNike,
  SiPuma,
  SiReebok,
} from "react-icons/si";
import { Logo } from "./logo";
import { SectionTitle } from "./section-title";
import { SectionSubtitle } from "./section-subtitle";

export function Hero({ data }: { data: HomeData["hero"] }) {
  return (
    <div className="flex items-center justify-center py-72 flex-col gap-10 bg-hero">
      {/*  <div className=" px-6 py-2 rounded-full bg-white/5 backdrop-blur text-sm font-semibold border-[1px] border-white/10">
        <p>Descubre el Universo 🌌</p>
      </div> */}
      <SectionTitle>Underground Vibes: Explora tu Estilo Urbano</SectionTitle>
      <SectionSubtitle>
        Exclusiva colección de sneakers que combinan comodidad, tendencia y
        estilo urbano.
      </SectionSubtitle>

      <div className="flex-col sm:flex-row flex gap-7">
        <Button title="Descubrir Marcas" intent="tertiary" rounded="full" />
        <Button title="Ir a Instagram" />
      </div>
    </div>
  );
}

const ICON_SIZE = 40;

const BrandsIcons = [
  {
    icon: <SiNike size={ICON_SIZE} />,
  },
  {
    icon: <SiAdidas size={ICON_SIZE} />,
  },

  {
    icon: <SiPuma size={ICON_SIZE} />,
  },
  {
    icon: <SiReebok size={ICON_SIZE} />,
  },
  {
    icon: <SiNewbalance size={ICON_SIZE} />,
  },

  {
    icon: <SiFila size={ICON_SIZE} />,
  },

  {
    icon: <SiJordan size={ICON_SIZE} />,
  },
];

function HeroImage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      {BrandsIcons.map((brand, index) => (
        <Brand key={index} {...brand} />
      ))}
    </div>
  );
}

function Brand({ icon }: { icon: ReactNode }) {
  return (
    <div className="rounded-md border border-neutral-100 bg-neutral-600 p-2 ">
      {icon}
    </div>
  );
}
