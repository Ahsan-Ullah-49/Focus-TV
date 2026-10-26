import { Container } from "@/components/layout/Container/Container";
import { ProjectMedia } from "./ProjectMedia";
import { STUDIO_PROJECTS } from "./projects.config";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="projects-heading">
      <Container>
        <div className={styles.topline} data-reveal="fade-right">
          <span>Other projects</span>
        </div>
        <div className={styles.intro} data-reveal-group="fade-up" data-reveal-stagger="0.07">
          <h2 id="projects-heading" className={styles.heading}>
            There’s more
            <br />
            <em>to the story.</em>
          </h2>
          <p className={styles.description}>
            Explore more of our documentary work, from Gaming Legends to WA Police. More stories to
            share, more worlds to discover.
          </p>
        </div>
        <div className={styles.projects}>
          {STUDIO_PROJECTS.map((project, index) => (
            <article className={styles.project} key={project.id} data-reveal="zoom-in">
              <ProjectMedia project={project} index={index} />
              <div className={styles.caption}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{project.title}</h3>
                <span className={styles.format}>Documentary</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
