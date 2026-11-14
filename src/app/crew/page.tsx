import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import alanPortrait from "../../../public/media/crew/alan-lindsay.webp";
import rachelPortrait from "../../../public/media/crew/rachael-soleil.webp";
import founderPortrait from "../../../public/media/crew/founder.webp";
import wasamPortrait from "../../../public/media/crew/wasam-chaudhry.webp";
import { EditorialMotion } from "@/components/motion/EditorialMotion";
import styles from "@/components/pages/Crew/Crew.module.css";

export const metadata: Metadata = {
  title: "Focus TV team",
  description: "Hammad Chaudhry — Founder, CEO & Producer, Focus TV Studios.",
  alternates: { canonical: "/crew" },
};

// Owner-approved order and original crew portraits. Source-backed film titles
// replace the previous descriptive biographies; credit links lead to IMDb.
type TeamPerson = {
  name: string;
  role: string;
  image: string;
  portrait?: StaticImageData;
  credits: { title: string; href: string }[];
};
const team: TeamPerson[] = [
  {
    name: "Alan Lindsay",
    role: "Executive Producer",
    image: "alan-lindsay",
    portrait: alanPortrait,
    credits: [
      { title: "Child Soldiers", href: "https://www.imdb.com/title/tt6223480/" },
      { title: "Crazy About You", href: "https://www.imdb.com/title/tt5277030/" },
      { title: "Savage Play", href: "https://www.imdb.com/title/tt0114341/" },
      { title: "Hell on Ice", href: "https://www.imdb.com/title/tt13617016/" },
    ],
  },
  {
    name: "Hubert Krzysztofik",
    role: "Chief Technology Officer",
    image: "hubert-krzysztofik",
    credits: [
      { title: "Ted (2012)", href: "https://www.imdb.com/title/tt1637725/fullcredits/" },
      { title: "Pinks: All Out", href: "https://www.imdb.com/title/tt0913045/fullcredits/" },
      {
        title: "Jurassic World VR Expedition",
        href: "https://www.imdb.com/title/tt8585878/fullcredits/",
      },
    ],
  },
  {
    name: "Daniel Mei-Tal",
    role: "Associate Producer",
    image: "daniel-mei-tal",
    credits: [
      { title: "Avatar", href: "https://www.imdb.com/title/tt0499549/fullcredits/" },
      {
        title: "Cirque du Soleil: Worlds Away",
        href: "https://www.imdb.com/title/tt1792647/fullcredits/",
      },
    ],
  },
  {
    name: "Rachel Soleil",
    role: "Story Producer",
    image: "rachael-soleil",
    portrait: rachelPortrait,
    credits: [
      { title: "My Kitchen Rules", href: "https://www.imdb.com/title/tt1626459/fullcredits/" },
      { title: "Holey Moley (USA)", href: "https://www.imdb.com/title/tt10133226/fullcredits/" },
    ],
  },
  {
    name: "Wasam Chaudhry",
    role: "Executive Producer",
    image: "wasam-chaudhry",
    portrait: wasamPortrait,
    credits: [],
  },
  { name: "Brett English", role: "Assistant Director", image: "brett-english", credits: [] },
];

export default function CrewPage() {
  return (
    <EditorialMotion>
      <article className={styles.page}>
        <header className={styles.intro}>
          <h1 data-editorial-reveal="heading">
            Focus TV <em>team</em>
          </h1>
        </header>
        <section className={styles.lead} aria-labelledby="hammad-name">
          <div className={styles.portraitFrame} data-editorial-reveal="image">
            <div className={styles.leadPortrait}>
              <Image
                src={founderPortrait}
                alt="Hammad Chaudhry"
                fill
                quality={95}
                sizes="(max-width: 760px) 92vw, 50vw"
                preload
              />
            </div>
          </div>
          <div className={styles.leadCopy} data-editorial-reveal="right">
            <h2 id="hammad-name">
              Hammad
              <br /> Chaudhry
            </h2>
            <p className={styles.founderRole}>Founder, CEO &amp; Producer</p>
            <p className={styles.studioName}>Focus TV Studios</p>
          </div>
        </section>
        <section className={styles.teamGrid} aria-label="Focus TV team">
          {team.map((person, index) => (
            <article
              className={styles.teamMember}
              key={person.image}
              data-editorial-reveal="card"
              data-editorial-delay={(index % 3) * 0.06}
            >
              <div className={styles.portraitFrame}>
                <div className={styles.teamPortrait}>
                  <Image
                    src={person.portrait ?? `/media/crew/${person.image}.webp`}
                    alt={person.name}
                    fill
                    quality={95}
                    sizes="(max-width: 600px) 92vw, (max-width: 1050px) 46vw, 30vw"
                  />
                </div>
              </div>
              <h2>{person.name}</h2>
              <p className={styles.role}>{person.role}</p>
              {person.credits.length > 0 && (
                <div className={styles.credits}>
                  <span className={styles.creditLabel}>IMDb</span>
                  <ul aria-label={`${person.name} IMDb credits`}>
                    {person.credits.map((credit) => (
                      <li key={credit.href}>
                        <a href={credit.href} target="_blank" rel="noopener noreferrer">
                          {credit.title}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </section>
      </article>
    </EditorialMotion>
  );
}
