"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/the-answer", label: "The Answer", index: "01" },
  { href: "/cast", label: "Cast", index: "02" },
  { href: "/crew", label: "Crew", index: "03" },
  { href: "/gallery", label: "Gallery", index: "04" },
  { href: "/the-answer-ai", label: "The Answer AI", index: "05" },
  { href: "/contact", label: "Contact", index: "06" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change during render
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Container size="lg" className={styles.headerInner}>
          {/* Logo Mark */}
          <Link href="/" className={styles.logo} data-cursor="interactive">
            FOCUSTV
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            {NAV_LINKS.slice(0, 5).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                  data-cursor="interactive"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className={`${styles.actions} ${styles.desktopActions}`}>
            <ThemeToggle />
            <Button href="/contact" variant="primary">
              Contact
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className={styles.mobileControls}>
            <ThemeToggle />
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-cursor="interactive"
            >
              <svg className={styles.hamburgerIcon} viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileOverlayHeader}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => setMobileOpen(false)}
            data-cursor="interactive"
          >
            FOCUSTV
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            data-cursor="interactive"
          >
            <svg className={styles.hamburgerIcon} viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNavLinks} aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
              data-cursor="interactive"
            >
              <span className={styles.mobileNavIndex}>{link.index}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.mobileOverlayFooter}>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
            Creative Studio & Media
          </p>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
