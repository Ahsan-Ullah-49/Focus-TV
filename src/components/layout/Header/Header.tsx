"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Header.module.css";

import Image from "next/image";
import logoPng from "@/Assets/Logos/logo.png";
import whiteLogoPng from "@/Assets/Logos/White-logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/cast", label: "Cast", index: "02" },
  { href: "/crew", label: "Team", index: "03" },
  { href: "/gallery", label: "Gallery", index: "04" },
  { href: "/the-answer-ai", label: "The Answer AI", index: "05" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Ref for the hamburger trigger — focus returns here on menu close
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  // Ref for the first focusable item in the mobile menu
  const firstFocusRef = useRef<HTMLAnchorElement>(null);

  // Close mobile menu on route change (during render is safe for this pattern)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      // Transition Header to solid state after 60px of scroll
      setScrolled(window.scrollY > 60);
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("no-scroll");
      // Move focus into the menu for keyboard users
      requestAnimationFrame(() => {
        firstFocusRef.current?.focus();
      });
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileOpen]);

  // ── Escape key closes menu ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        menuTriggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleMenuClose = () => {
    setMobileOpen(false);
    menuTriggerRef.current?.focus();
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/*
       * data-header-tone controls foreground colour independently of theme.
       * On the homepage, the Hero video sits underneath the transparent header,
       * so we force "dark-media" (warm white text) until scrolled.
       * The .scrolled class drives the solid background state.
       */}
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        data-header-tone={pathname === "/" && !scrolled ? "dark-media" : "light-page"}
      >
        <Container size="lg" className={styles.headerInner}>
          {/* Logo */}
          <Link
            href="/"
            className={styles.logo}
            data-cursor="interactive"
            aria-label="FocusTV Home"
          >
            <Image src={logoPng} alt="FocusTV" priority className={styles.logoImage} />
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
            <ThemeToggle className={styles.headerThemeToggle} />
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>

          {/* Mobile Controls — theme toggle + hamburger */}
          <div className={styles.mobileControls}>
            <ThemeToggle className={styles.headerThemeToggle} />
            <button
              ref={menuTriggerRef}
              type="button"
              className={`${styles.menuButton} ${mobileOpen ? styles.menuButtonOpen : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-cursor="interactive"
            >
              {/* Animated 3-bar hamburger → X */}
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </Container>
      </header>

      {/*
       * Mobile Navigation — double-layer animation
       * Layer 1: .mobileBackdrop  — accent backing slide
       * Layer 2: .mobilePanel     — main content surface
       */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`}
        aria-hidden={!mobileOpen}
        aria-modal={mobileOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Full-screen backdrop blur */}
        <div className={styles.mobileBlurBg} onClick={handleMenuClose} aria-hidden="true" />

        {/* Layer 1 — backing accent */}
        <div className={styles.mobileBackdrop} aria-hidden="true" />

        {/* Layer 2 — main panel */}
        <div className={styles.mobilePanel}>
          {/* Panel header row */}
          <div className={styles.mobileOverlayHeader}>
            <Link
              href="/"
              className={styles.logo}
              onClick={handleLinkClick}
              data-cursor="interactive"
              aria-label="FocusTV Home"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <Image src={whiteLogoPng} alt="FocusTV" className={styles.mobileLogoImage} />
            </Link>
            <button
              type="button"
              className={`${styles.menuButton} ${styles.menuButtonOpen}`}
              onClick={handleMenuClose}
              aria-label="Close menu"
              data-cursor="interactive"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>

          {/* Navigation links with staggered reveal */}
          <nav className={styles.mobileNavLinks} aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={i === 0 ? firstFocusRef : undefined}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                  onClick={handleLinkClick}
                  data-cursor="interactive"
                  tabIndex={mobileOpen ? 0 : -1}
                  style={{ "--link-i": i } as React.CSSProperties}
                >
                  <span className={styles.mobileNavIndex}>{link.index}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className={styles.mobileCtaWrapper}>
            <Button
              href="/contact"
              variant="primary"
              className={styles.mobileCtaButton}
              onClick={handleLinkClick}
            >
              Contact Us
            </Button>
          </div>

          {/* Panel footer */}
          <div className={styles.mobileOverlayFooter}>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
              Creative Studio &amp; Media
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
