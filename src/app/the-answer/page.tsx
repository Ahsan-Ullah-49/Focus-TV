import React from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";

export const metadata = {
  title: "The Answer",
};

export default function TheAnswerPage() {
  return (
    <Section spacing="lg" style={{ paddingTop: "calc(var(--header-height) + var(--space-12))" }}>
      <Container size="md">
        <h1 style={{ fontSize: "var(--display-md)", marginBottom: "var(--space-4)" }}>
          The Answer
        </h1>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--color-text-secondary)" }}>
          Coming during development.
        </p>
      </Container>
    </Section>
  );
}
