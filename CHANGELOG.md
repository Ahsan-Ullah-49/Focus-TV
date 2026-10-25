# FocusTV Website Rebuild

## Changelog

All notable project-level changes and milestones should be recorded here.

Format is inspired by Keep a Changelog, but kept intentionally simple.

---

## [Unreleased]

### Added — Other Projects Vimeo films (25 October 2026)

- Added the owner-supplied Gaming Legends and WA Police Vimeo embeds with their privacy hashes.
- Loaded both responsive 16:9 players with the homepage; muted autoplay starts as each frame enters view and pauses while it is offscreen. Vimeo playback controls remain available, with an accessible sound toggle above each frame and reduced-motion support.
- Removed the “FocusTV Films” topline label, tightened the section's top spacing, and highlighted the italic “to the story.” heading line with the FocusTV brand color.

### Corrected — Partner theme artwork and duplicate (25 October 2026)

- Merged the duplicate Danube Group marks into one horizontal logo entry with matching Light and Dark artwork.
- Added the supplied DICE, Extreme Makeover, LEAP and Silent Hill 2 Dark assets, plus Identity V and JOE Films Light assets. Kept the DICE black canvas blended into the dark section and normalized Silent Hill 2's white artwork for dark-theme contrast.
- Consolidated the six supplied theme files into `public/media/Logos/LOGOS/` and removed their staging copies. The final loop has 55 unique brands and 72 image files; remaining requested variants are tracked in `Docs/PROJECT_STATUS.md`.

### Finalized — Partner logo section (25 October 2026)

- Increased the heading size and contrast, adding a restrained FocusTV-gold rule while preserving the section's compact uppercase treatment on both themes.
- Audited the loop data, theme asset selection, responsive slot sizing, drag/pause behavior, and reduced-motion handling. Removed obsolete contrast flags from marks that now have dedicated theme artwork and corrected comments to match the active fixed slots and black-canvas assets.
- Marked Partners & Media complete for the current supplied artwork. Remaining contrast replacements are optional follow-up and documented in `Docs/PROJECT_STATUS.md`.

### Completed — Partners & Media section (25 October 2026)

- Replaced the template-direction label with the clear heading “Brands & organizations we’ve worked with.”
- Connected all 38 active logos to normalized fallbacks and the supplied nine Dark / one Light variants, preserving the supplied variant colors.
- Enlarged NetEase, Nissan and PBD Podcast in fixed-width slots so their marquee positions stay steady across theme changes.
- Verified the 48 referenced logo image paths, both themes, mobile overflow, lint, typecheck and production build.

### Expanded — Partner logo library (25 October 2026)

- Reviewed the two client-supplied logo collections against the active set, added 18 new distinct marks, and retained Universal Music Group's supplied Dark and Light artwork.
- Consolidated 56 partner marks and eleven theme-specific images into `public/media/Logos/LOGOS/` with canonical brand/theme filenames; removed duplicate source copies.
- Updated the loop data and documentation. Requested additional Dark/Light artwork is listed in `Docs/PROJECT_STATUS.md`.

### Changed — Partner logo selection (25 October 2026)

- Removed The Telegraph, The Weekly Times, News.com.au and Herald Sun from the active partner list, template fallback list and normalized image assets at the owner's request. The loop now contains 38 logos.

### Removed — Unused asset cleanup (25 October 2026)

- Removed 42 unreferenced original logo PNGs, 14 original cast SVGs and the unused duplicate favicon, as requested by the owner. At the cleanup milestone, all 85 runtime public images, both imported brand logos and the App Router icon remained.
- At the earlier cleanup milestone, removed 89 unreferenced logo source copies from `public/media/Logos/All Logos/` and `public/media/Logos/company logos/` under the owner's keep-only-used-assets instruction; the subsequent 56-logo expansion is recorded above.
- Reduced public assets from 47,251,484 to 11,950,838 bytes at that milestone; later owner-supplied theme variants are recorded in the Partners & Media completion above.
- Removed the generated Chromium `debug.log` and ignored it to prevent accidental commits. Existing Git history is unchanged.

### Added — Full site review version (25 October 2026)

- Homepage Other Projects section after the existing partner logo loop, with configurable media slots for the owner-requested Gaming and WA Police documentaries.
- Shared responsive footer with conversation CTA, complete navigation, published social links, official theme-aware logo and oversized wordmark.
- Completed The Answer, Cast, Crew, Gallery and Contact routes; designed the intentionally Coming Soon The Answer AI page.
- Full filterable cast directory, native profile dialog, verified crew profiles, optimized local portraits and six verified gallery films with keyboard media viewer.
- Scoped GSAP page entrance/section reveal layer, Lenis synchronization, reduced-motion fallback and dialog scroll-lock handling.
- Optional meeting enquiry fields and honest email-draft contact flow; production sender and recipient confirmation remain pending.
- Per-page canonicals, social preview defaults, full sitemap, branded 404/error states and legacy cast/contact redirects.
- Content-source/maintenance record and updated product, design, technical, development and decision documentation.

### Fixed — Completion audit

- Restored the native cursor in browser top-layer dialogs and for reduced-motion users.
- Matched preview indexing behavior between metadata and robots rules.
- Fixed route scroll positioning by declaring Next's smooth-scroll integration attribute.
- Preserved existing homepage layouts and motion while connecting completed routes.

### Changed

- Rebuilt the homepage cast section as an editorial introduction and scroll-driven portrait cascade
- Replaced the Story section's previous gradient and feathered treatment with the approved editorial image-and-copy composition
- Refined Story and Cast tablet/mobile layouts, including full-width Story copy and square single-column Cast cards
- Added optimized WebP variants for the 14 numbered cast stills; the unused original SVGs were later removed in the owner-requested asset cleanup above
- Added the “Explore Full Cast” CTA linking to `/cast`

### Fixed

- Corrected Cast image `sizes` so single-column tablet portraits request a suitable source size
- Prevented the Cast image hover zoom when reduced motion is preferred
- Made the Hero play/pause surface keyboard operable and limited player messages to its configured Vimeo iframe

---

## [0.6.0] - 2026-10-13

### Added (Sprint 2B & Sprint 3)

- Cinematic Vimeo hero video integration with postMessage API communication (`HeroPlayer.tsx`)
- Centralized Hero video configuration in `src/components/sections/Hero/hero.config.ts`
- High-resolution video poster fallback (`public/media/hero/focustv-Hero-poster.png`)
- Custom liquid-glass audio toggle and full-screen video click-to-play/pause
- Homepage Introduction Section: "The Answer to Creation" (`src/components/sections/Intro/`)
- Monochrome / grayscale gradient typography on "The Answer" (charcoal → graphite → silver → ivory)
- Cinematic uppercase gold title with dimensional emboss on "TO CREATION"
- Dual-tier host credit: "Hosted by Hammad Chaudhry"
- 1.5× body paragraph font size with proportional line-height and selective bold emphasis
- Art-directed signature pull quote "Turning thoughts into reality." with champagne/gold/ivory gradient and gold accent line
- Multi-layer feathering system (`imageFeatherLeft`, `imageFeatherRight`, `imageFeatherTop`, `imageFeatherBottom`, `imageTone`) and radial edge mask
- Zero image hover pop/zoom: stable, still photograph
- Responsive mobile & tablet layout: complete editorial text content first, full-width edge-to-edge image placed underneath with vertical gradient transition
- Full Light Theme (`#f5f3ee`) and Dark Theme (`#0b0b0b`) support with zero visual regressions

---

## [0.5.0] - 2026-09-20

### Added / Changed

- Finalized responsive FocusTV Header and navigation
- Integrated official desktop/mobile logo assets
- Added theme-aware Header contrast and Light Theme default
- Finalized animated navigation states and Contact Us CTA
- Finalized responsive gold/glass mobile navigation drawer

---

## [0.4.0] - 2026-09-18

### Added (Sprint 2A — Header Finalization)

- Official FocusTV `logo.png` in Header via `next/image` with retina support
- Official `favicon.png` registered as App Router `icon.png`
- Final desktop navigation links: Home, Cast, Team, Gallery, The Answer AI + Contact CTA
- Final mobile navigation links matching desktop
- Transparent Header over hero, solid Header after scroll via `IntersectionObserver` sentinel
- Smooth `300ms` transparent → solid state transition with backdrop blur
- Animated thin gold underline on nav link hover (scaleX left-to-right)
- Persistent gold underline on active navigation link
- Cinematic dark-sweep hover effect on Contact button (pseudo-element wipe)
- Temporary clean `100svh` homepage placeholder for header contrast testing

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
