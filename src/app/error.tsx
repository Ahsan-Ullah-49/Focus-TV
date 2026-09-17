"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally if required
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        padding: "var(--space-8)",
        maxWidth: "var(--container-sm)",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <h1 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
        An unhandled error occurred in the application.
      </p>
      <button
        onClick={() => reset()}
        type="button"
        style={{
          padding: "var(--space-2) var(--space-4)",
          backgroundColor: "var(--color-brand)",
          color: "#ffffff",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </main>
  );
}
