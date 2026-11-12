import { Hero } from "@/components/sections/Hero/Hero";
import { Intro } from "@/components/sections/Intro/Intro";
import { Projects } from "@/components/sections/Projects/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Projects />
    </>
  );
}
