# FocusTV Website Rebuild

## Changelog

All notable project-level changes and milestones should be recorded here.

Format is inspired by Keep a Changelog, but kept intentionally simple.

---

## [Unreleased]

### Planned for Sprint 2

- Full-screen cinematic video hero
- Video poster/fallback and responsive cropping
- Hero reveal animation and transition into content

---

## [0.3.0] - 2026-09-18

### Added

- Completed Sprint 1 Visual Foundation
- Finalized premium custom cursor with theme-aware ring glow, tailored interactive pointer, and precise gold trail dot scaling

---

## [0.2.0] - 2026-09-17

### Added

- Google Fonts integration via `next/font`: `Manrope` (modern primary sans-serif) & `Cormorant Garamond` (editorial serif accent)
- Expanded CSS design token system (`tokens.css`) for Light theme (`#f5f3ee` warm off-white, `#121212` charcoal) and Dark theme (`#0b0b0b` deep charcoal, `#f3f0e8` warm white)
- Zero-flash inline theme initialization script in `<head>` and persistent `ThemeProvider` context synced with `localStorage`
- Accessible `ThemeToggle` component with SVG sun/moon icons
- Fixed/sticky global `Header` with logo text mark, desktop navigation, active link state, and contact action button
- Full-screen responsive `MobileNav` overlay menu with numbered links, keyboard Escape handler, and body scroll locking
- Single application-level `Lenis` smooth scrolling provider (`SmoothScrollProvider`) with `prefers-reduced-motion` detection
- Desktop fine-pointer `CustomCursor` tracking component with smooth lerp movement and hover scaling on interactive targets
- Reusable layout & UI primitives (`Container`, `Section`, `Button`)
- Sprint 1 visual system preview canvas (`src/app/page.tsx`) demonstrating typography, color palette, button states, and smooth scrolling
- Minimal placeholder routes for `/the-answer`, `/cast`, `/crew`, `/gallery`, `/the-answer-ai`, and `/contact`

---

## [0.1.0] - 2026-09-17

### Added

- Next.js App Router initialization with TypeScript (`src/` architecture)
- Core future animation stack dependencies (`gsap`, `lenis`)
- CSS custom property design token system (`tokens.css`) supporting light and dark theme variables
- Global CSS reset, typography baseline, focus accessibility, and reduced motion fallback (`globals.css`)
- Reusable utility classes (`utilities.css`)
- Site configuration (`site.ts`) with site name, description, and canonical production URL
- Environment-aware SEO routing (`robots.ts`, `sitemap.ts`) with automatic preview environment indexing prevention
- Minimal App Router error boundary (`error.tsx`) and 404 page (`not-found.tsx`)
- Code formatting and linting setup (`.prettierrc`, `.prettierignore`, `eslint.config.mjs`)
- Environment variable baseline (`.env.example`)

- Client discovery completed
- Product requirements established
- Visual direction established
- Technical stack selected
- Agile development workflow defined
- AI coding rules defined

### Added

- PRD v1.0
- Design Document v1.0
- Technical Plan v1.0
- Development Plan v1.0
- AGENTS.md
- README.md
- Project Status
- Decision Log

### Technical Direction

- Next.js App Router
- TypeScript
- React
- CSS Modules
- CSS Custom Properties
- GSAP + ScrollTrigger
- Lenis
- GitHub
- Vercel previews

### Design Direction

- Premium light theme
- Optional cinematic dark theme
- Brand gold `#BF8B25`
- Full-screen cinematic video hero
- Custom desktop cursor
- Controlled reveal animation
- Mobile-first responsive design

---

## Release Process

When a milestone is completed, add an entry such as:

```text
## [0.1.0] - YYYY-MM-DD

### Added
- Homepage hero
- Theme system

### Changed
- Refined mobile navigation

### Fixed
- Prevented cast card overflow on small screens
```

Do not record every tiny CSS adjustment. Record meaningful project changes.
