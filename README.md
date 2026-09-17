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

- `PRD.md` - Product requirements
- `DESIGN_DOCUMENT.md` - Visual and interaction system
- `TECHNICAL_PLAN.md` - Technical architecture
- `DEVELOPMENT_PLAN.md` - Development phases and workflow
- `AGENTS.md` - Mandatory AI coding rules
- `PROJECT_STATUS.md` - Current progress
- `DECISIONS.md` - Important project decisions
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

## Local Development

After the project is initialized:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Validation

Before approved commits:

```bash
npm run lint
npm run build
```

If a separate type-check script exists:

```bash
npm run typecheck
```

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
