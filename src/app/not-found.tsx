import Link from "next/link";

export default function NotFound() {
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
        404 - Page Not Found
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
        The requested page could not be located.
      </p>
      <Link
        href="/"
        style={{
          color: "var(--color-brand)",
          textDecoration: "underline",
        }}
      >
        Return to Home
      </Link>
    </main>
  );
}
