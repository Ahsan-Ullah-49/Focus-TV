# FocusTV Website Rebuild

A custom-coded rebuild of the FocusTV website focused on premium presentation, cinematic storytelling, strong performance, responsive design, and maintainable code.

---

## Project Goals

The website is being rebuilt to:

- Present FocusTV as a premium creative studio
- Communicate the scale and credibility of the people involved
- Support sponsorship and brand partnership opportunities
- Attract high-profile guests and business partners
- Introduce FocusTV and The Answer clearly
- Deliver a polished mobile and desktop experience
- Replace the previous WordPress frontend with a clean custom implementation

---

## Core Design Direction

- Cinematic
- Minimal
- Creative
- Modern
- Elegant
- Light theme by default
- Optional dark cinematic theme
- Brand gold: `#BF8B25`
- Full-screen video hero
- Premium smooth scrolling
- Controlled reveal motion
- Custom desktop cursor

The design must avoid a generic AI-generated appearance.

---

## Technology

- Next.js App Router
- TypeScript
- React
- CSS Modules
- CSS Custom Properties
- GSAP + ScrollTrigger
- Lenis
- GitHub
- Vercel previews

No CMS or database is required for the initial release.

---

## Documentation

Read these files before major development work:

- `Docs/PRD.md` - Product requirements
- `Docs/DESIGN_DOCUMENT.md` - Visual and interaction system
- `Docs/TECHNICAL_PLAN.md` - Technical architecture
- `Docs/DEVELOPMENT_PLAN.md` - Development phases and workflow
- `AGENTS.md` - Mandatory AI coding rules
- `Docs/PROJECT_STATUS.md` - Current progress
- `Docs/DECISIONS.md` - Important project decisions
- `CHANGELOG.md` - Project change history

AI coding tools must read `AGENTS.md` before modifying the repository.

---

## Planned Pages

- Home
- About / The Answer
- Cast
- Crew / Production
- Gallery / Media
- The Answer AI
- Contact

Automotive Legends is a separate project and is not part of this website.

---

## Development Workflow

The project is built in small, reviewable stages.

```text
Requirement
   ↓
Implementation
   ↓
Internal review
   ↓
Validation
   ↓
Git commit/push when approved
   ↓
Vercel preview
   ↓
Client review
   ↓
Feedback
   ↓
Revision
   ↓
Done
```

Do not generate or redesign the entire site in one step.

---

## Implemented Components & Architecture

### 1. Global Header (`src/components/layout/Header/`)

- **Fixed Position & Transparency**: The Header is fixed with `position: fixed; z-index: 100`. On initial page load over the Hero video, it begins transparent (`data-header-tone="dark-media"`) ensuring white text and high-contrast navigation over the video surface.
- **Scroll Transition**: When scrolling past 60px (`window.scrollY > 60`), the Header transitions smoothly to a solid background with backdrop blur (`#f5f3ee` in Light mode, `#0b0b0b` in Dark mode).
- **Navigation & Interactions**: Links have animated gold hover indicators (`scaleX` expansion) and persistent active-state indicators. The Contact Us button has an editorial sweep hover effect.
- **Mobile Menu**: Full-screen accessible drawer with body scroll lock, Escape key handler, and auto-focus management.

### 2. Cinematic Hero Section (`src/components/sections/Hero/`)

- **Component**: `HeroPlayer.tsx` embeds the Vimeo cinematic showcase in a responsive iframe and communicates through Vimeo's `postMessage` API; it does not use the Vimeo SDK.
- **Playback Controls**:
  - Starts autoplaying, looping, and muted by default (`playsinline`).
  - Full-surface click/tap and keyboard activation toggle play and pause.
  - Liquid-glass audio toggle allows unmuting/muting with volume restoration.
- **Configuration & Future Replacement**:
  - Video settings are centralized in `src/components/sections/Hero/hero.config.ts`.
  - **To replace the video**:
    1. Update `heroConfig.videoId` with the new Vimeo ID.
    2. Update `heroConfig.hash` with the unlisted privacy hash (`?h=...`).
    3. Update `heroConfig.posterSrc` with the path to the new high-resolution poster image (placed in `public/media/hero/`).
    4. The embed URL generator (`buildVimeoEmbedUrl`) and player API automatically adapt.
- **Poster Fallback**: `public/media/hero/focustv-Hero-poster.png` is displayed immediately before video frames load, preventing layout shifts and blank backgrounds.

### 3. "The Answer to Creation" Intro Section (`src/components/sections/Intro/`)

- **Component**: `Intro.tsx` and `Intro.module.css`.
- **Content**: The `STORY` constant holds the heading, series and host details, three narrative paragraphs, pull quote, and image path/alt text. Body emphasis is rendered by `RichParagraph`.
- **Image**: `public/media/hero/focustv-Intro-poster.webp` (Bugatti design sketch), displayed as a direct rectangular image with a simple border; the approved section does not use feathering or decorative gradients.
- **Responsive layout**: Desktop shows the image and narrative side by side. At tablet widths, the image precedes full-width copy and the heading/details share a row. On mobile, heading details stack and the image uses a 4:3 crop.
- **Motion/theme**: Scoped GSAP/ScrollTrigger reveals run only when reduced motion is not requested. Shared CSS tokens keep light and dark themes aligned.
- **Maintenance**: Edit `STORY` to update approved copy; replace `imageSrc` and `imageAlt` when replacing the image.

### 4. Our Proud Cast Section (`src/components/sections/Cast/`)

- **Component/data**: `Cast.tsx` renders `CAST` from `cast.config.ts`; the data contains the approved 14 names, titles, square WebP paths, and alt text.
- **Portraits**: `public/media/Stills/optimized/1.webp` through `14.webp` are the optimized square versions. Keep their paths and alt text synchronized when replacing images.
- **Layout/motion**: Desktop uses a GSAP/ScrollTrigger layered portrait deck and a sticky editorial introduction. At widths up to 1099px, portrait cards are square and stacked one per row, with the CTA centered after the list. Reduced motion uses a static grid (one column at tablet/mobile sizes).
- **Theme/interaction**: Card surfaces use shared theme tokens; the approved portrait treatment and hover zoom remain scoped to fine-pointer users who have not requested reduced motion.
- **Maintenance**: Update member copy, order, image paths, and alt text in `cast.config.ts`; keep `id` values unique. The CTA links to `/cast`, which is still a placeholder.

Shared design tokens are in `src/styles/tokens.css`; the CTA reuses `src/components/ui/Button/Button.tsx`.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Validation Commands

Before committing or pushing:

```bash
# Type check TypeScript files without emitting
npm run typecheck

# Lint all files with ESLint
npm run lint

# Create an optimized production build (Turbopack)
npm run build
```

There is currently no automated test script or test suite configured.

---

## Environment Variables

Use `.env.local` for local secrets.

Never commit `.env.local`.

Create and maintain `.env.example` with variable names only.

Potential variables may include:

```text
NEXT_PUBLIC_SITE_URL=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_API_KEY=
```

Only add variables that are actually required.

---

## Git Rules

AI assistants must not push automatically.

The project owner decides when to:

- Commit
- Push
- Deploy
- Merge

Use clear commit messages:

```text
feat: build homepage hero
fix: correct mobile cast grid overflow
style: refine dark theme navigation
perf: defer gallery video players
docs: update design system
```

---

## Hosting

### Development / Client Preview

Vercel

### Production

Existing Hostinger environment.

The final deployment approach must be confirmed after checking the client's Hostinger plan and Next.js support.

Existing FocusTV email/DNS records must be preserved during launch.

---

## Content

Some approved text may be migrated from the previous website.

Media will primarily come from original available assets.

Content may be professionally rewritten, but important factual changes require approval.

Never invent:

- Awards
- Partnerships
- People
- Titles
- Companies
- Release dates
- Product features

---

## Project Rule

**Build carefully, approve progressively, and protect everything that is already working.**
