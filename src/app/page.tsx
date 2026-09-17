import React from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Button } from "@/components/ui/Button/Button";

export default function HomePage() {
  return (
    <div style={{ paddingTop: "calc(var(--header-height) + var(--space-8))" }}>
      {/* Overview Canvas Section */}
      <Section spacing="lg">
        <Container size="lg">
          <p
            style={{
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-brand)",
              fontWeight: 600,
              marginBottom: "var(--space-4)",
            }}
          >
            Sprint 1 — Visual Foundation Preview
          </p>
          <h1
            style={{
              fontSize: "var(--display-lg)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: "var(--space-6)",
              maxWidth: "1100px",
            }}
          >
            FocusTV Creative Studio Baseline
          </h1>
          <p
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--color-text-secondary)",
              maxWidth: "760px",
              lineHeight: "var(--line-height-relaxed)",
              marginBottom: "var(--space-8)",
            }}
          >
            Demonstrating global typography, restrained brand gold accents, light/dark theme
            persistence, responsive navigation shell, smooth scrolling, and custom cursor tracking.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
            <Button href="/contact" variant="primary">
              Explore Contact
            </Button>
            <Button href="/cast" variant="secondary">
              View Cast Baseline
            </Button>
            <Button href="/the-answer" variant="text">
              Read Editorial Statement →
            </Button>
          </div>
        </Container>
      </Section>

      {/* Typography Hierarchy Section */}
      <Section spacing="lg" style={{ backgroundColor: "var(--color-surface)" }}>
        <Container size="lg">
          <h2
            style={{
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-brand)",
              marginBottom: "var(--space-8)",
            }}
          >
            Typography & Editorial Hierarchy
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Display MD (Sans-Serif Primary)
              </p>
              <h3 style={{ fontSize: "var(--display-md)", fontWeight: 700 }}>
                Cinematic Media & Production
              </h3>
            </div>

            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Display Statement (Serif Secondary Accent)
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  fontStyle: "italic",
                  lineHeight: 1.2,
                  color: "var(--color-text)",
                }}
              >
                “Representing international credibility, creative scale, and story discipline.”
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Body Copy Lead
              </p>
              <p
                style={{
                  fontSize: "var(--text-lg)",
                  color: "var(--color-text-secondary)",
                  maxWidth: "800px",
                }}
              >
                The visual foundation utilizes generous negative space, crisp typography hierarchy,
                subtle border rules, and restrained brand gold details to establish a premium
                digital experience across all screen sizes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Theme System & Color Palette Section */}
      <Section spacing="lg">
        <Container size="lg">
          <h2
            style={{
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-brand)",
              marginBottom: "var(--space-8)",
            }}
          >
            Design System Tokens & Palette
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {/* Swatch 1: Brand Gold */}
            <div
              style={{
                padding: "var(--space-6)",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  height: "60px",
                  backgroundColor: "var(--color-brand)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "var(--space-3)",
                }}
              />
              <p style={{ fontWeight: 600, color: "var(--color-text)" }}>Brand Gold</p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                #BF8B25
              </p>
            </div>

            {/* Swatch 2: Background */}
            <div
              style={{
                padding: "var(--space-6)",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  height: "60px",
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "var(--space-3)",
                }}
              />
              <p style={{ fontWeight: 600, color: "var(--color-text)" }}>Background</p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                var(--color-bg)
              </p>
            </div>

            {/* Swatch 3: Surface */}
            <div
              style={{
                padding: "var(--space-6)",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  height: "60px",
                  backgroundColor: "var(--color-surface-muted)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "var(--space-3)",
                }}
              />
              <p style={{ fontWeight: 600, color: "var(--color-text)" }}>Muted Surface</p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                var(--color-surface-muted)
              </p>
            </div>

            {/* Swatch 4: Primary Text */}
            <div
              style={{
                padding: "var(--space-6)",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  height: "60px",
                  backgroundColor: "var(--color-text)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "var(--space-3)",
                }}
              />
              <p style={{ fontWeight: 600, color: "var(--color-text)" }}>Primary Text</p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                var(--color-text)
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Spacing Section to verify Smooth Scroll & Header State */}
      <Section spacing="lg" style={{ borderTop: "1px solid var(--color-border)" }}>
        <Container size="lg">
          <div style={{ padding: "var(--space-12) 0", textAlign: "center" }}>
            <h4
              style={{
                fontSize: "var(--text-xl)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                marginBottom: "var(--space-4)",
              }}
            >
              Global Site Shell Verification Complete
            </h4>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              The global visual foundation, Lenis smooth scrolling, theme switching, desktop cursor
              tracking, and mobile overlay menu are ready for Sprint 2 homepage development.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
