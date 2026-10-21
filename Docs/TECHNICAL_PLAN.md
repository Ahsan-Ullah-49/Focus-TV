# FocusTV Website Rebuild

## Technical Plan

**Version:** 1.0  
**Status:** Development baseline  
**Framework:** Next.js App Router  
**Language:** TypeScript  
**Styling:** CSS Modules + CSS Custom Properties  
**Animation:** GSAP + ScrollTrigger  
**Smooth Scrolling:** Lenis  
**Repository:** GitHub  
**Preview Hosting:** Vercel

---

## 1. Technical Objective

Build a fast, maintainable, mostly static marketing/media website with premium motion and minimal backend requirements.

The project must remain understandable to a frontend developer with HTML, CSS, JavaScript, and basic React knowledge.

Complexity must only be introduced when it solves a real requirement.

---

## 2. Technical Principles

1. Prefer simple code over clever code.
2. Prefer Server Components by default.
3. Add Client Components only where browser interaction requires them.
4. Keep JavaScript payload low.
5. Keep content separate from presentation where practical.
6. Use reusable components, but do not over-componentize trivial markup.
7. Protect approved sections from unrelated changes.
8. Keep dependencies minimal.
9. Every meaningful change must pass validation before being marked done.
10. AI tools must follow repository rules in `AGENTS.md`.

---

## 3. Primary Stack

### Framework

Next.js with App Router

### Language

TypeScript

### UI

React

### Styling

CSS Modules for component styling  
Global CSS only for:

- Reset/base styles
- Design tokens
- Typography foundations
- Site-wide utilities when genuinely shared

### Motion

GSAP + ScrollTrigger

### Smooth Scroll

Lenis

### Forms

Next.js server-side endpoint / server action depending on final implementation

### Validation

A shared validation schema is preferred.

### Hosting During Development

Vercel

### Source Control

GitHub

### Production Hosting

Existing Hostinger environment, subject to compatibility review before launch.

---

## 4. Proposed Repository Structure

```text
focustv/
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── video/
│   └── social/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── cast/
│   │   ├── crew/
│   │   ├── gallery/
│   │   ├── the-answer-ai/
│   │   ├── contact/
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Navigation/
│   │   ├── sections/
│   │   ├── ui/
│   │   ├── media/
│   │   └── motion/
│   │
│   ├── data/
│   │   ├── cast.ts
│   │   ├── crew.ts
│   │   ├── navigation.ts
│   │   └── site.ts
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── seo/
│   │   ├── validation/
│   │   ├── forms/
│   │   └── utils/
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── globals.css
│   │   └── utilities.css
│   │
│   └── types/
│
├── .env.example
├── .gitignore
├── AGENTS.md
├── Docs/
│   ├── DECISIONS.md
│   ├── DESIGN_DOCUMENT.md
│   ├── DEVELOPMENT_PLAN.md
│   ├── PRD.md
│   ├── PROJECT_STATUS.md
│   └── TECHNICAL_PLAN.md
├── CHANGELOG.md
├── README.md
```

This is a baseline structure. Avoid creating empty folders only to match the diagram.

---

## 5. Server vs Client Component Rules

### Default

All components should be Server Components unless they require browser-only behavior.

### Use Client Components for

- Theme toggle
- Mobile navigation state
- Cast filtering
- Cast modal/drawer state
- Custom cursor
- Lenis integration
- GSAP interaction where browser APIs are required
- Form interaction if required
- Media controls that need local state

### Avoid

Adding `"use client"` at page level only because one child is interactive.

Instead, isolate the interactive child.

---

## 6. Data Strategy

No CMS is required.

Content should live in structured data files where useful.

Example:

```ts
export type CastMember = {
  id: string;
  name: string;
  title?: string;
  company?: string;
  category: CastCategory;
  image: string;
  featured?: boolean;
};
```

Benefits:

- Easy future updates
- Less duplicate markup
- Consistent cast cards
- Easy filtering
- Easy migration if a CMS is ever added

Do not move every line of page copy into data files. Static page-specific content may remain inside the relevant page/section when that is clearer.

---

## 7. Styling Architecture

### `tokens.css`

Contains:

- Colors
- Theme values
- Type scale
- Spacing
- Container widths
- Radius
- Z-index tokens
- Motion duration tokens

### `globals.css`

Contains:

- Reset
- Base typography
- Body styles
- Selection
- Global focus baseline
- Media defaults

### CSS Modules

Use for:

- Section layout
- Component-specific interaction
- Responsive design
- Component states

### Rules

- Avoid random `!important`
- Avoid global selectors for component fixes
- Avoid unexplained hard-coded colors
- Avoid duplicated breakpoint rules across many files where a shared token can solve the issue
- Prefer logical properties where helpful

---

## 8. Theme Architecture

Theme is controlled with a document-level data attribute.

Example:

```html
<html data-theme="light"></html>
```

or

```html
<html data-theme="dark"></html>
```

Use CSS custom properties so components do not require separate light/dark CSS files.

Theme preference:

1. Stored user preference if present
2. Otherwise project default is light

Avoid initial flash by applying the stored preference before the page visually renders.

---

## 9. Animation Architecture

Create a small motion layer rather than scattering unrelated animation code everywhere.

Suggested responsibilities:

```text
components/motion/
├── SmoothScrollProvider.tsx
├── Reveal.tsx
├── ParallaxMedia.tsx
└── useReducedMotion.ts
```

Not every animation must become a reusable component.

### GSAP Rules

- Scope animations to their component
- Clean up GSAP contexts
- Do not query unrelated DOM globally
- Do not create unnecessary timelines
- Avoid scroll-jacking
- Test mobile performance
- Use reduced-motion fallback

### Lenis Rules

- One site-level instance
- Coordinate with ScrollTrigger
- Do not initialize multiple instances
- Do not override touch behavior unnecessarily

---

## 10. Video Strategy

The hero video is one of the biggest performance risks.

Preferred order:

1. Optimized local/self-hosted MP4/WebM if source is available
2. Strong poster image
3. Load video after critical visual content where appropriate
4. Avoid heavy Vimeo iframe as the first-paint background

Video requirements:

- Muted
- Autoplay where appropriate
- `playsInline`
- Poster
- Explicit sizing/crop
- Mobile-safe
- No sound without explicit user action

Gallery videos may use Vimeo or another provider, but player loading should be deferred until interaction where practical.

---

## 11. Image Strategy

Use Next.js image optimization where compatible with final hosting.

Requirements:

- Correct dimensions
- Appropriate `sizes`
- Avoid giant source files
- Use modern formats where possible
- Meaningful alt text
- Decorative images use empty alt where appropriate
- Avoid loading off-screen high-resolution media eagerly

For launch, revalidate the image strategy against the final Hostinger deployment method.

---

## 12. Form Architecture

Initial contact fields:

- Name
- Email
- Phone
- Message
- Optional meeting request

### Requirements

- Client-side usability
- Server-side validation
- Sanitized input
- Spam protection
- Rate limiting where practical
- Error state
- Success state
- No secrets in frontend code

### Email

Use the designated FocusTV email recipient.

The actual sending service must be selected during implementation based on:

- Zero/additional-cost requirement
- Hostinger/Vercel compatibility
- Reliability
- Ease of maintenance

Do not hardcode credentials.

---

## 13. Meeting Booking

Preferred decision path:

### Option A

Free booking service integration if the client is happy with it.

### Option B

Meeting-request fields in the contact flow:

- Preferred date
- Preferred time
- Timezone
- Message

FocusTV follows up manually.

Avoid building a custom calendar engine in v1.

---

## 14. SEO Architecture

Implement from the beginning.

### Required

- Metadata per page
- Canonical URLs
- Open Graph
- Social images
- Semantic headings
- Sitemap
- robots
- Internal links
- Alt text
- Structured data where useful

### Migration

Before launch:

- Crawl/record existing public URLs
- Identify URLs worth preserving
- Create redirects where new paths differ
- Verify no important links become 404s

The old WordPress design is irrelevant, but its URL history may still matter.

---

## 15. Accessibility

Baseline requirements:

- Semantic HTML first
- Keyboard navigation
- Visible focus
- Labels for fields
- Accessible menu
- Accessible modal/drawer
- ESC close behavior
- Focus trapping where required
- Color contrast
- `prefers-reduced-motion`
- Touch target sizing

Do not add ARIA where native semantic HTML already solves the problem.

---

## 16. Performance Targets

Aim for:

- LCP around or below 2.5s under reasonable conditions
- CLS below 0.1
- INP around or below 200ms where practical

### Performance Rules

- Minimize Client Components
- Avoid unnecessary libraries
- Defer non-critical media
- Optimize hero media
- Avoid multiple web fonts
- Avoid large animation payloads
- Split heavy interactions
- Test production builds, not only dev mode

---

## 17. Browser Support

Target modern:

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

No special support work for obsolete browsers unless the client later requests it.

---

## 18. Git Workflow

Initial recommendation:

- `main` = stable client-preview branch
- Feature work can happen locally or in short-lived branches when useful
- Do not create unnecessary branch complexity for small changes

### Commit Style

Use clear commits such as:

```text
feat: build cinematic homepage hero
feat: add cast category filters
fix: prevent mobile navigation overflow
style: refine dark theme cast cards
perf: defer gallery video players
docs: update technical plan
```

### Push Rule

AI must not push automatically.

Push only when instructed after local review/validation.

---

## 19. Validation Commands

Final scripts depend on project setup, but every significant task should normally validate:

```bash
npm run lint
npm run build
```

If type checking is separated:

```bash
npm run typecheck
```

Do not mark work complete when the production build is failing.

---

## 20. Environment Variables

Create `.env.example`.

Potential variables:

```text
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Only add variables actually used.

Never commit `.env.local`.

---

## 21. Logging and Error Handling

For forms:

- Log useful server-side failures
- Do not expose API keys or internal errors to visitors
- Provide friendly error messages
- Keep enough context for debugging

Avoid complex logging infrastructure unless needed.

---

## 22. Deployment Plan

### Development

GitHub -> Vercel preview deployment

### Client Review

Use live Vercel preview URL.

### Production

Before launch:

1. Confirm Hostinger plan and Node.js support
2. Decide full Next.js deployment vs static-compatible strategy
3. Confirm DNS access
4. Preserve email DNS records
5. Verify redirects
6. Verify forms
7. Run final SEO checks
8. Deploy new site
9. Verify domain + SSL
10. Verify email is unaffected

---

## 23. Security Checklist

- Validate all form input server-side
- Never expose API credentials
- Keep dependencies updated during development
- Avoid unsafe HTML injection
- Sanitize externally sourced content
- Use secure headers where appropriate
- Add basic abuse/spam protection to forms

---

## 24. Package Policy

Before installing any package, ask:

1. Does the platform already solve this?
2. Can this be written clearly in a small amount of code?
3. Is the package maintained?
4. Does it add meaningful runtime weight?
5. Will a future junior developer understand why it exists?

Do not install large UI kits.

---

## 25. Definition of Technically Done

A task is technically done when:

- Requirement is implemented
- Relevant responsive states are checked
- Light/dark theme works where relevant
- No unrelated section has regressed
- Accessibility basics are preserved
- Lint passes
- Type checking passes where configured
- Production build passes
- Changed code is readable
- Documentation is updated when the decision affects architecture
