import React from "react";
import { Hero } from "@/components/sections/Hero/Hero";
import { Intro } from "@/components/sections/Intro/Intro";
import { Cast } from "@/components/sections/Cast/Cast";
import { Partners } from "@/components/sections/Partners/Partners";
import { Projects } from "@/components/sections/Projects/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <h1 className="visually-hidden">FocusTV — stories worth telling</h1>
      <Hero />
      <Intro />
      <Cast />
      <Partners />
      <Projects />
    </>
  );
}
