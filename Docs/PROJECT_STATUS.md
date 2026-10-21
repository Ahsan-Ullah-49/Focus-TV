# FocusTV Website Rebuild

## Project Status

**Last Updated:** 21 October 2026
**Current Stage:** Homepage sections — final implementation audit (OWNER REVIEW)
**Overall Status:** In Progress

---

## 1. Completed

### Discovery

- Client discovery questionnaire completed
- Primary business objectives identified
- Primary audience identified
- Visual direction confirmed
- Theme direction confirmed
- Cast direction confirmed
- Contact requirements confirmed
- Content rewrite permission confirmed
- Analytics/CRM current state confirmed

### Product

- PRD v1.0 prepared

### Technical Decisions

- Next.js selected
- TypeScript selected
- CSS Modules selected
- CSS Custom Properties selected
- GSAP + ScrollTrigger selected
- Lenis selected
- GitHub workflow selected
- Vercel preview workflow selected
- No CMS
- No database initially
- Hostinger planned for production, compatibility to be verified

### Sprint 0 - Foundation

- Next.js App Router initial setup
- TypeScript & strict configuration
- Base folder structure (`src/app`, `src/config`, `src/styles`)
- Core animation packages added (`gsap`, `lenis`)
- Global CSS, design tokens, utility baseline
- Prettier formatting & ESLint flat config setup
- SEO infrastructure (`robots.ts`, `sitemap.ts`, Vercel preview protection)
- Error boundary & 404 handler baseline
- Environment configuration baseline (`.env.example`)
- Full build and typecheck verification passed

### Sprint 1 - Visual Foundation + Global Site Shell

- Refined design token system (`tokens.css`) for Light and Dark themes
- Typography foundation (`Manrope` sans-serif + `Cormorant Garamond` editorial serif via `next/font`)
- Light theme (`#f5f3ee` warm off-white, `#121212` charcoal text) & Dark theme (`#0b0b0b` deep charcoal, `#f3f0e8` warm text)
- Zero-flash inline head script theme initialization & `ThemeProvider` state persistence
- Accessible `ThemeToggle` component with Sun/Moon SVG icons
- Sticky global `Header` with logo text mark, desktop navigation, and contact action button
- Accessible full-screen `MobileNav` overlay menu with numbered items, Escape key listener, and scroll lock
- Single application-level Lenis smooth scrolling integration with reduced motion fallback
- Fine-pointer custom desktop cursor tracking (`CustomCursor`) with hover states for interactive targets
- Reusable primitives (`Container`, `Section`, `Button`)
- Temporary homepage canvas (`src/app/page.tsx`) demonstrating typography, palette, theme toggle, and smooth scrolling
- Minimal placeholder pages for all routes (`/the-answer`, `/cast`, `/crew`, `/gallery`, `/the-answer-ai`, `/contact`)

---

### Sprint 2A — Header Finalization

- Official FocusTV `logo.png` integrated into Header via `next/image` (replaces temporary text mark)
- Official `favicon.png` registered as `src/app/icon.png` via Next.js App Router conventions
- Final desktop navigation: Home, Cast, Team, Gallery, The Answer AI (with Contact as a CTA button)
- Final mobile navigation: matching the desktop link set
- Header uses `position: fixed` and starts transparent over the hero
- Scroll detection drives the transparent → solid header state change
- Scrolled state: Light theme warm off-white + backdrop blur / Dark theme deep charcoal + backdrop blur
- Nav link hover: text transitions to brand gold + thin animated gold underline grows left-to-right
- Active nav link: persistent gold underline indicator
- Contact button: cinematic dark-sweep hover (pseudo-element `scaleX` wipe from left)

---

### Sprint 2B — Cinematic Hero Video Finalization

- Vimeo-hosted cinematic video player with postMessage API communication (`HeroPlayer.tsx`)
- Centralized configuration in `src/components/sections/Hero/hero.config.ts` (`videoId`, `hash`, `posterSrc`)
- Autoplay, muted looping, click-to-play/pause, and liquid-glass audio toggle
- High-resolution fallback poster (`public/media/hero/focustv-Hero-poster.png`)
- Fully responsive across desktop, tablet, and mobile devices
- All Hero changes verified and approved

---

### Homepage Sections — Implementation Complete

- Home renders Hero, The Story, and Our Proud Cast in sequence from `src/app/page.tsx`.
- The Hero uses a configured Vimeo iframe, direct postMessage controls, and a local poster fallback.
- The Story section uses the approved editorial composition, current copy, theme tokens, and the Bugatti sketch at `public/media/hero/focustv-Intro-poster.webp`.
- Our Proud Cast uses the 14 supplied entries in `cast.config.ts` and square optimized WebP portraits. Desktop uses the scroll-driven deck; tablet and mobile use a one-card-per-row layout with the CTA after the cards.
- Story and Cast use scoped GSAP/ScrollTrigger reveals and provide static behavior when reduced motion is requested. Theme styling comes from shared tokens.
- Final code and documentation audit is complete. Lint, typecheck, and production build pass; mobile, tablet, desktop, theme, and reduced-motion behavior were checked in a local browser.
- No automated test script or test suite is currently configured.
- `/cast` remains a placeholder page; the homepage CTA currently routes there.

---

## 5. Active Review

The implemented Home page sections and audited diff are ready for owner review. No push has been made.

---

## 6. Risks

### Hero Video Dependency

The Hero currently depends on a third-party Vimeo iframe for playback; the local poster remains visible until player frames are available. Final hosting and playback behavior should be checked before launch.

### AI Regression

Mitigation:
Strict `AGENTS.md`, small scoped tasks, review diffs before commit.

### Production Hosting Compatibility

Mitigation:
Check Hostinger plan before final deployment architecture is locked.

### Design Becoming Generic

Mitigation:
Use the Design Document, reference sites, varied compositions, and client review after major sections.

### Too Much Motion

Mitigation:
Motion review, reduced-motion support, mobile performance testing.

---

## 7. Current Blockers

No immediate blocker for project setup.

Production deployment details remain intentionally deferred until the Hostinger plan is confirmed.

---

## 8. Next Recommended Action

Review the audited implementation and diff. Commit or push only when the project owner explicitly requests it.
