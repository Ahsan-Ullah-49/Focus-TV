import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { ProductionMotion } from "@/components/pages/ProductionServices/ProductionMotion";
import { ProductionFilm } from "@/components/pages/ProductionServices/ProductionFilm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Production Services",
  description: "Your Story. Our Expertise. Extraordinary Films.",
  alternates: { canonical: "/production-services" },
};

const films = [
  {
    id: "atlas-fuel",
    palette: "green",
    title: "ATLAS FUEL",
    category: "AUSTRALIAN FUEL SUPPLIER & DISTRIBUTOR",
    poster: "/media/production-services/atlas-laboratory-logo.webp",
    videoId: "1244099030",
    videoHash: "2ff7fdbc96",
    paragraphs: [
      "Atlas Fuel is an established Australian fuel supply and distribution company specialising in premium petrol, high-performance racing fuels and commercial fuel solutions. With a growing presence across Australia’s automotive, motorsport and commercial sectors, Atlas Fuel is building a reputation for quality, performance and reliability.",
      "Focus TV partnered with Atlas Fuel to produce premium cinematic brand films, automotive commercials and high-performance fuel advertising, delivering end-to-end creative strategy, video production and post-production to elevate the brand’s presence in the Australian market.",
    ],
  },
  {
    id: "beast-philanthropy",
    palette: "gold",
    title: "MR BEAST PHILANTHROPY",
    category: "ESG & COMMUNITY IMPACT",
    poster: "/media/gallery/1004315356.webp",
    videoId: "1004315356",
    videoHash: "25ad4635a2",
    paragraphs: [
      "MrBeast, the world’s biggest YouTuber with over 500 million subscribers across his channels, is redefining global philanthropy through large-scale community initiatives.",
      "Focus TV led the creative concept, storytelling, logistics and filming for a Beast Philanthropy initiative supporting a remote Indigenous school in Western Australia. The project generated 6 million views, showcasing the power of ESG storytelling, corporate social responsibility and community impact through film.",
    ],
  },
  {
    id: "danube-group",
    palette: "contrast",
    title: "DANUBE GROUP",
    category: "BILLIONAIRE FOUNDER STORY",
    poster: "/media/gallery/1075036381.webp",
    videoId: "1075036381",
    videoHash: "ba270ecdc4",
    paragraphs: [
      "Founded by billionaire entrepreneur Rizwan Sajan, Danube Group is one of Dubai’s leading business conglomerates, operating across 9 countries with over 3,500 employees and a reported US$2 billion annual turnover in 2022. Its real estate division, Danube Properties, has developed a portfolio valued at over US$7.1 billion",
      "Focus TV produced a cinematic founder documentary showcasing Rizwan Sajan’s extraordinary entrepreneurial journey, his business empire and the vision behind one of Dubai’s most recognised property development brands.",
    ],
  },
];

export default function ProductionServicesPage() {
  return (
    <ProductionMotion films={films.map(({ id, poster }) => ({ id, poster }))}>
      <article className={styles.page} data-production-page>
        <section className={styles.hero} aria-labelledby="production-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy} data-production-copy>
              <h1 id="production-heading">
                Commercial <em>Productions</em>
              </h1>
              <p className={styles.heroLine}>
                Your Story. Our Expertise.
                <br />
                Extraordinary Films.
              </p>
              <p className={styles.introduction}>
                Focus TV is an Australian film production and entertainment company partnering with
                brands, businesses and organisations to create cinematic brand films, corporate
                films and commercial content that captures attention, builds trust and delivers
                impact.
              </p>
              <div className={styles.actions}>
                <Button href="#our-work" variant="text" className={styles.heroButton}>
                  Explore Our Services <span aria-hidden="true">↓</span>
                </Button>
                <Button href="/contact" variant="text" className={styles.heroButton}>
                  Start a Project <span aria-hidden="true">↗</span>
                </Button>
              </div>
            </div>
            <div className={styles.heroScene} data-production-hero-scene aria-hidden="true">
              {films.map((film, index) => (
                <div className={styles.heroPanel} data-flight-origin={film.id} key={film.id}>
                  <Image
                    src={film.poster}
                    alt=""
                    fill
                    sizes="(max-width: 850px) 80vw, 44vw"
                    preload={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.work} id="our-work" aria-labelledby="work-heading">
          <h2 id="work-heading" className={styles.workHeading} data-production-copy>
            Our <em>work</em>
          </h2>
          {films.map((film) => (
            <section
              className={styles.projectStage}
              key={film.id}
              id={film.id}
              data-production-chapter
              data-palette={film.palette}
              aria-labelledby={`${film.id}-heading`}
            >
              <div className={styles.transition} data-flight-corridor aria-hidden="true" />
              <div
                className={styles.chapter}
                data-media-align={film.id === "beast-philanthropy" ? "right" : "left"}
              >
                <div className={styles.filmScene} data-production-scene>
                  <div className={styles.filmPlane} data-production-plane>
                    <ProductionFilm
                      id={film.id}
                      title={film.title}
                      poster={film.poster}
                      videoId={film.videoId}
                      videoHash={film.videoHash}
                    />
                  </div>
                </div>
                <div className={styles.story} data-production-copy>
                  <h3 id={`${film.id}-heading`}>
                    {film.id === "beast-philanthropy" ? (
                      <>
                        <span className={styles.titleLine}>MR BEAST</span>
                        <span className={styles.titleLine}>PHILANTHROPY</span>
                      </>
                    ) : (
                      film.title
                    )}{" "}
                    <span aria-hidden="true">|</span> <em>{film.category}</em>
                  </h3>
                  {film.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </section>
        <div className={styles.pageExit} data-production-exit aria-hidden="true" />
      </article>
    </ProductionMotion>
  );
}
