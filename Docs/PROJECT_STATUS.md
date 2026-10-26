# FocusTV Website Rebuild

## Project Status

**Last Updated:** 26 October 2026
**Current Stage:** Homepage complete through footer — full site owner review
**Overall Status:** In Progress

## Current implementation

- Six active routes are implemented: Home, Cast, Crew, Gallery, The Answer AI and Contact. The Answer AI is intentionally a Coming Soon page. The standalone `/the-answer` page was removed at the owner's request; its series story remains on the homepage.
- Homepage sequence: Hero → The Story → Our Proud Cast → Partners & Media → Other Projects → shared Footer.
- The homepage footer is finalized after client review: Instagram and email are the only footer social/contact icons; the footer uses the Header's desktop logo in both themes, a centered vertical mobile navigation and a responsive side-by-side invitation. The wordmark reveal is shared by both themes and optically centered across screen sizes.
- Partners & Media is complete and owner-approved for the current supplied artwork: 55 active logos, 17 theme images, a larger branded heading, and a draggable left-moving loop. NetEase, Nissan, PBD Podcast, Silent Hill 2 and Universal Music Group use fixed-width slots to keep the marquee stable across themes. All 72 logo files are consolidated in `public/media/Logos/LOGOS/`.
- Optional future contrast replacements requested from the owner: Dark variants for DARPA, Gracie, IO Interactive, John Hughes, Moon Express, NILU and Ubisoft; Light variants for Apple, Beast Philanthropy, Gameloft, Hagerty and LifeAfter. These do not block completion of the current section.
- Other Projects is complete for the two owner-provided Gaming Legends and WA Police Vimeo films. Browser-lazy iframe loading defers each player until it approaches view; muted autoplay begins when its frame enters view and pauses offscreen. Vimeo's native controls and timeline use the FocusTV gold accent. The browser pointer is visible over the interactive iframe while the animated FocusTV cursor hides inside it and resumes on the host page. A manual pause blocks scroll-triggered autoplay until refresh. Further titles/posters can be added after client confirmation.
- The homepage retains The Answer's editorial series narrative and film preview; Cast has 28 source-backed profiles, filters and a keyboard-accessible viewer; Crew has seven profiles and the Sandbox production partner; Gallery has six verified films and six selected interview stills.
- Contact includes enquiry types and optional meeting preferences. The action opens a populated email draft; the website does not send mail. Confirm the published staging-domain recipient and connect/test production delivery before launch.
- Shared footer, reference-style section reveals, Lenis synchronization, dual-theme layouts, canonical metadata, social preview defaults, sitemap and two legacy navigation redirects are implemented.
- Protected homepage sections remain intact. No new dependency, commit, push or deployment was made.
- Owner-requested asset cleanup removed 57 unused images, duplicate logo copies and a generated debug log. The owner supplied 18 additional marks and theme artwork; the duplicate Danube Group entry has since been merged. There are now 55 partner logos and 115 public files (approximately 21.12 MiB), plus two imported brand logos and the App Router icon outside `public/`.

### Validation for this pass

The route-count and browser results below describe the complete seven-route review version before the owner's 25 October removal of `/the-answer`. The current route set has six entries.

- Lint: passed.
- Typecheck: passed.
- Build: passed (all seven planned pages prerendered).
- Production preview: all seven routes, canonical metadata, both themes at 320px, meeting-query hydration and the seven-route sitemap passed a Chromium smoke check. Formatting and `git diff --check` also passed.
- Browser: all seven routes checked at 375, 768 and 1440 pixels in both themes (42 combinations); no horizontal overflow, broken loaded images or runtime exceptions found. Cast category/profile, media viewer, keyboard/Escape/focus restoration, mobile menu, meeting-prefill, whitespace validation, route changes/back navigation, reduced-motion changes, redirects and 404 checks passed in Chromium.
- Partners & Media: all 55 logo entries and 72 referenced image paths verified; both theme selections, drag interaction, fixed logo slots and responsive heading checked at desktop and mobile widths with no horizontal overflow.
- Other Projects finalization: lint, typecheck, production build and 320/375/768/1440px responsive checks passed; a mocked Vimeo iframe confirmed the gold/native-control URL settings, working seek input, and custom-cursor hide/restore behavior. The live Vimeo player did not load in the isolated browser environment, so its rendered controls still need a check in the owner's browser.
- Native on-device Safari/Firefox testing and real inbox delivery were not performed. No email was sent during validation.
- Additional 320px and 1920px checks covered both themes. A 320px AI letterform overflow was corrected by making its font size fluid and rechecked. Route scroll positioning was corrected using Next's smooth-scroll integration attribute.

### Homepage footer completion — 26 October 2026

- Homepage source and shared footer were reviewed; the unused React import and unused arrow direction branch were removed. The wordmark's responsive optical spacing and the client-approved social-link order have focused comments.
- Lint, typecheck, production build, Prettier and `git diff --check`: passed.
- Footer browser review covered light and dark themes from 320px through 1440px. The CTA remained in one row with its label beneath the arrow, Explore stayed vertically stacked on mobile, and no horizontal page overflow appeared.

### Footer interaction fix — 26 October 2026

- Kept the email destination on the footer envelope icon and removed the extra visible address from “Get in touch,” per the owner's correction.
- The oversized decorative wordmark no longer receives pointer events, so it cannot cover the Instagram, email, and Explore links while the footer is scrolled or revealed.
- The email icon retains its native `mailto:hammad@focustv.tv` destination.
- Lint, typecheck and production build are checked for this fix; no design changes were made.

### Shared section reveals — 26 October 2026

- Replaced the route-cover transition and separate Story/Cast intro reveals with one scoped GSAP/ScrollTrigger system, using directional fades, blur/zoom and direct-child group staggers across the homepage, active routes and footer.
- Reveals start near the viewport, play once and finish during fast scrolling; reduced-motion preferences show content immediately. The desktop Cast card deck remains its separate scroll-linked interaction.
- Checked all six active routes at a 390px viewport: each returned HTTP 200, no horizontal overflow appeared, and a fast scroll left no reveal target hidden. Reduced-motion visibility also passed.
- Lint, typecheck, production build, Prettier and `git diff --check`: passed.

### Outstanding before launch

1. Client review of the new pages, migrated copy/credits and overall visual direction.
2. Confirm whether more projects, titles, or posters should join the completed Gaming Legends and WA Police entries.
3. Confirm email recipient, configure a sending service if on-site submission is required, and verify delivery to the real inbox.
4. Confirm Hostinger deployment compatibility, Vimeo playback permissions and hide Like/Watch Later in each video's Embed Appearance settings, full legacy URL redirects, DNS and final launch approval.

Source and maintenance details: `CONTENT_SOURCES.md`. The records below describe earlier milestones.

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

- The 21 October milestone delivered Hero, The Story, and Our Proud Cast; the current sequence is listed above.
- The Hero uses a configured Vimeo iframe, direct postMessage controls, and a local poster fallback.
- The Story section uses the approved editorial composition, current copy, theme tokens, and the Bugatti sketch at `public/media/hero/focustv-Intro-poster.webp`.
- Our Proud Cast uses the 14 supplied entries in `cast.config.ts` and square optimized WebP portraits. Desktop uses the scroll-driven deck; tablet and mobile use a one-card-per-row layout with the CTA after the cards.
- Story and Cast use the shared PageMotion reveal markers; the desktop Cast deck remains an independent scroll-linked scene. Reduced-motion preferences show static visible content. Theme styling comes from shared tokens.
- Final code and documentation audit is complete. Lint, typecheck, and production build pass; mobile, tablet, desktop, theme, and reduced-motion behavior were checked in a local browser.
- No automated test script or test suite is currently configured.
- The original `/cast` placeholder has now been replaced by the complete filterable roster.

---

## 5. Active Review

The complete review version and documentation are ready for the owner's next round of changes. No push has been made.

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

No remaining implementation input blocks the requested review version. Production content, email delivery and hosting confirmations are listed above.

---

## 8. Next Recommended Action

Review the audited implementation and diff. Commit or push only when the project owner explicitly requests it.
