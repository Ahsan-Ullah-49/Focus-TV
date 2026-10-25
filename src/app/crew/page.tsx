import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/pages/Crew/Crew.module.css";

export const metadata: Metadata = {
  title: "The Filmmakers",
  description:
    "Meet the producers, storytellers and production partners behind FocusTV and The Answer.",
  alternates: { canonical: "/crew" },
};

// Names, roles, photographs and credits from https://focustv.tv/crew/.
// Keep the role labels used on the existing production page; omit dated metrics.
const team = [
  {
    name: "Alan Lindsay",
    role: "Executive Producer",
    image: "alan-lindsay",
    description:
      "A producer, director and cinematographer whose documentary work includes Child Soldiers and Paths to the Future.",
  },
  {
    name: "Rachael Soleil",
    role: "Story Producer",
    image: "rachael-soleil",
    description:
      "A television storyteller with credits spanning Shark Tank Australia, The Voice Australia and Outback Truckers.",
  },
  {
    name: "Brett English",
    role: "Assistant Director",
    image: "brett-english",
    description: "Part of the production team bringing The Answer to the screen.",
  },
];

const collaborators = [
  {
    name: "Hubert Krzysztofik",
    role: "Chief Technology Officer",
    image: "hubert-krzysztofik",
    description: "Working at the intersection of film, virtual reality and immersive technology.",
  },
  {
    name: "Daniel Mei-Tal",
    role: "Associate Producer",
    image: "daniel-mei-tal",
    description: "Production experience includes Avatar and the DeepSea Challenger expedition.",
  },
];

export default function CrewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker} data-reveal="rise">
          FocusTV / Production
        </p>
        <div className={styles.headingRow}>
          <h1 data-reveal="rise">
            Behind the lens.
            <br />
            <em>Inside the story.</em>
          </h1>
          <p data-reveal="rise">
            A film begins with a question. It takes a team to bring the answer to life.
          </p>
        </div>
      </header>

      <section className={styles.lead} aria-labelledby="hammad-name">
        <div className={styles.leadPortrait} data-reveal="mask">
          <Image
            src="/media/crew/hammad-chaudhry.webp"
            alt="Hammad Chaudhry"
            fill
            sizes="(max-width: 760px) 90vw, 50vw"
            preload
          />
        </div>
        <div className={styles.leadCopy} data-reveal="rise">
          <p className={styles.role}>Producer & Host</p>
          <h2 id="hammad-name">
            Hammad
            <br /> Chaudhry
          </h2>
          <p className={styles.description}>
            The host at the heart of The Answer. A comedian and film producer, Hammad brings
            curiosity and conversation to a journey across the world.
          </p>
          <Link className={styles.textLink} href="/#the-story">
            Explore the story <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={styles.executive} aria-labelledby="wasam-name">
        <div className={styles.executiveCopy} data-reveal="rise">
          <p className={styles.role}>Executive Producer</p>
          <h2 id="wasam-name">Wasam Chaudhry</h2>
          <p className={styles.description}>Part of the production team behind The Answer.</p>
        </div>
        <div className={styles.executivePortrait} data-reveal="mask">
          <Image
            src="/media/crew/wasam-chaudhry.webp"
            alt="Wasam Chaudhry"
            fill
            sizes="(max-width: 600px) 75vw, 28vw"
          />
        </div>
      </section>

      <section className={styles.teamSection} aria-labelledby="team-heading">
        <div className={styles.sectionHeading} data-reveal="rise">
          <h2 id="team-heading">The art of telling a story.</h2>
          <span>Production team</span>
        </div>
        <div className={styles.teamGrid} data-reveal="stagger">
          {team.map((person) => (
            <article className={styles.teamMember} key={person.image} data-reveal-child>
              <div className={styles.teamPortrait}>
                <Image
                  src={`/media/crew/${person.image}.webp`}
                  alt={person.name}
                  fill
                  sizes="(max-width: 600px) 90vw, 28vw"
                />
              </div>
              <p className={styles.role}>{person.role}</p>
              <h3>{person.name}</h3>
              <p className={styles.description}>{person.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.collaborators} aria-label="Production collaborators">
        {collaborators.map((person) => (
          <article key={person.image} className={styles.collaborator} data-reveal="rise">
            <div className={styles.collaboratorPortrait}>
              <Image
                src={`/media/crew/${person.image}.webp`}
                alt={person.name}
                fill
                sizes="(max-width: 600px) 35vw, 20vw"
              />
            </div>
            <div>
              <p className={styles.role}>{person.role}</p>
              <h3>{person.name}</h3>
              <p className={styles.description}>{person.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.studio} aria-labelledby="studio-heading">
        <div className={styles.studioTop} data-reveal="rise">
          <span>Production partner</span>
          <span>Western Australia</span>
        </div>
        <div className={styles.studioBody}>
          <h2 id="studio-heading" data-reveal="rise">
            Sandbox<span>Production House</span>
          </h2>
          <div className={styles.studioCopy} data-reveal="rise">
            <p>
              A production and post-production studio in Leederville, Western Australia. Bringing
              film, sound, animation and visual effects together under one roof.
            </p>
            <a
              href="https://thesandbox.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Explore Sandbox <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ul className={styles.disciplines} data-reveal="stagger">
          <li data-reveal-child>Production</li>
          <li data-reveal-child>Post-production</li>
          <li data-reveal-child>Sound</li>
          <li data-reveal-child>Animation & VFX</li>
        </ul>
      </section>

      <section className={styles.contact} data-reveal="rise" aria-labelledby="collaborate-heading">
        <p>Stories are made together.</p>
        <Link href="/contact" id="collaborate-heading">
          Let’s make something meaningful. <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
