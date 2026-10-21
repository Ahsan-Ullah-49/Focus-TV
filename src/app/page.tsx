import React from "react";
import { Hero } from "@/components/sections/Hero/Hero";
import { Intro } from "@/components/sections/Intro/Intro";
import { Cast } from "@/components/sections/Cast/Cast";
import { Partners } from "@/components/sections/Partners/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Cast />
      <Partners />
    </>
  );
}
