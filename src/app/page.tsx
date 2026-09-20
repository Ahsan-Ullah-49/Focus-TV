import React from "react";

export default function HomePage() {
  return (
    <>
      <div id="top-sentinel" style={{ position: "absolute", top: 0, height: 1, width: "100%" }} />
      <section
        style={{
          minHeight: "100svh",
          backgroundColor: "var(--color-bg)",
          /* Provide enough scroll room to test intersection observer */
          paddingBottom: "150vh",
        }}
      >
        {/* Intentionally empty for Header contrast testing */}
      </section>
    </>
  );
}
