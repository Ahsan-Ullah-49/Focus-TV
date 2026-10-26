import Image from "next/image";
import styles from "./Intro.module.css";

type StorySegment = {
  text: string;
  bold?: boolean;
};

const STORY = {
  headingLine1: "The Answer",
  headingLine2: "to Creation",
  host: {
    prefix: "Hosted by",
    name: "Hammad Chaudhry",
  },
  paragraphs: [
    {
      segments: [
        {
          text: "The Answer is a six-part documentary series following host Hammad Chaudhry on a journey across the world, meeting ",
        },
        {
          text: "inspiring innovators, entrepreneurs, billionaires, philanthropists, technology visionaries, and gaming legends",
          bold: true,
        },
        { text: "." },
      ],
    },
    {
      segments: [
        { text: "Through their stories, the series explores " },
        { text: "the journeys, decisions, and ideas behind their success", bold: true },
        { text: " — tracing how world-defining companies, inventions, and movements came to be." },
      ],
    },
    {
      segments: [
        { text: "More than a docuseries, The Answer explores how people " },
        { text: "turn thoughts into reality", bold: true },
        {
          text: ", shape the world around them, and help others become masters of their own destiny.",
        },
      ],
    },
  ],
  pullQuote: "Turning thoughts into reality.",
  imageSrc: "/media/hero/focustv-Intro-poster.webp",
  imageAlt:
    "A hand sketching a luxury automobile, representing the creative journey at the heart of The Answer",
};

function RichParagraph({ segments }: { segments: StorySegment[] }) {
  return (
    <p className={styles.para}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className={styles.paraEmphasis}>
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </p>
  );
}

export function Intro() {
  return (
    <section className={styles.story} id="the-story" aria-labelledby="story-heading">
      <div className={styles.inner}>
        <div className={styles.sectionEyebrow} data-reveal="fade-down">
          <span className={styles.eyebrowLabel}>The Story</span>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span className={styles.brandLabel}>FocusTV</span>
        </div>

        <div
          className={styles.headingRegion}
          data-reveal-group="fade-up"
          data-reveal-stagger="0.08"
        >
          <h2 id="story-heading" className={styles.heading}>
            <span className={styles.headingLine1}>{STORY.headingLine1}</span>
            <em className={styles.headingLine2}>{STORY.headingLine2}</em>
          </h2>

          <aside className={styles.storyDetails} aria-label="Series details">
            <div className={styles.seriesFact}>
              <span className={styles.seriesNumber}>Six</span>
              <span className={styles.seriesLabel}>parts of a documentary series</span>
            </div>
            <p className={styles.hostCredit}>
              <span className={styles.hostPrefix}>{STORY.host.prefix}</span>
              <span className={styles.hostName}>{STORY.host.name}</span>
            </p>
          </aside>
        </div>

        <div className={styles.contentGrid}>
          <figure className={styles.imagePanel} data-reveal="fade-right">
            <Image
              src={STORY.imageSrc}
              alt={STORY.imageAlt}
              fill
              sizes="(max-width: 960px) 100vw, 54vw"
              className={styles.image}
            />
          </figure>

          <div className={styles.storyContent}>
            <div
              className={styles.narrative}
              data-reveal-group="fade-left"
              data-reveal-stagger="0.08"
            >
              {STORY.paragraphs.map((paragraph, index) => (
                <RichParagraph key={index} segments={paragraph.segments} />
              ))}
            </div>

            <blockquote className={styles.pullQuote} data-reveal="fade-up">
              <span className={styles.pullAccentLine} aria-hidden="true" />
              <p className={styles.pullText}>{STORY.pullQuote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
