import { Hero } from "@/components/sections/Hero/Hero";
import { Intro } from "@/components/sections/Intro/Intro";
import { Projects } from "@/components/sections/Projects/Projects";
import { pageMetadata } from "@/config/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <PageStructuredData path="/" />
      <Hero />
      <Intro />
      <Projects />
    </>
  );
}
