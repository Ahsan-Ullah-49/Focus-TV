# FocusTV Website Rebuild

## Development Plan

**Version:** 1.0  
**Method:** Agile / Incremental  
**Goal:** Build, review, protect, and improve in controlled stages

---

## 1. Development Philosophy

The website will not be generated in one large AI prompt.

Development will happen in small, reviewable vertical slices.

Each slice must:

1. Have a clear requirement
2. Be implemented in isolation
3. Be validated
4. Be reviewed internally
5. Be pushed only when approved
6. Be shown to the client
7. Be revised if needed
8. Be marked Done only after acceptance

Approved work becomes protected from unrelated changes.

---

## 2. Phase 0 - Project Setup

### Goals

- Create GitHub repository
- Create Next.js + TypeScript project
- Add CSS Module architecture
- Add base docs
- Add lint/formatting
- Connect Vercel
- Add initial environment structure

### Deliverables

- Running development build
- GitHub repository
- Vercel preview
- Base folder architecture
- Documentation committed

### Done When

- Clean install works
- `npm run lint` works
- `npm run build` works
- Vercel preview loads
- No page design work has been prematurely added

---

## 3. Phase 1 - Design Foundation

### Goals

- Finalize supporting palette
- Select free font pairing
- Build design tokens
- Add global typography
- Build container/spacing system
- Implement theme architecture
- Establish button/link styles
- Establish media treatment

### Deliverables

- `tokens.css`
- Global theme variables
- Light theme
- Dark theme
- Theme toggle prototype
- Typography preview
- Basic UI primitives

### Client Review

Not necessarily required unless visual direction changes materially.

### Done When

- Light/dark foundation is stable
- Typography feels appropriate
- No section-specific hacks exist in global styles

---

## 4. Phase 2 - Global Layout

### Goals

- Header
- Desktop navigation
- Mobile navigation
- Theme toggle
- Footer
- Custom cursor base
- Smooth scrolling base

### Deliverables

- Site shell
- Responsive navigation
- Theme persistence
- Lenis integration
- Cursor only on supported pointer devices

### Done When

- Keyboard navigation works
- Mobile menu works
- No scroll lock bugs
- Theme persists
- Cursor does not affect touch devices

---

## 5. Phase 3 - Homepage Hero

### Goals

- Cinematic video hero
- Poster/fallback
- Main headline
- Supporting content
- Intro transition

### Special Focus

- Performance
- Responsive crop
- Mobile behavior
- Text readability
- Smooth transition into next section

### Client Review

Required.

### Done When

- Client approves visual direction
- Hero works in light/dark context
- Video does not cause major layout shift
- Mobile hero feels intentional

---

## 6. Phase 4 - Homepage Story

Build one section at a time.

Suggested sequence:

1. FocusTV introduction
2. The Answer introduction
3. Featured personalities
4. Credibility / scale
5. Partners / organizations if approved
6. Production / team highlight
7. Media / visual story
8. Final CTA

### Rule

Do not build all sections before showing the client.

After 1-2 major sections:

- Validate
- Push
- Review
- Adjust direction if necessary

---

## 7. Phase 5 - Cast Page

### Goals

- Structured cast data
- Featured people
- Category filtering
- Responsive cards
- Profile preview interaction

### Important

The cast page may become one of the largest data-driven areas.

Keep data separate from card markup.

### Done When

- All approved cast included
- Important members visually prioritized
- Filters work
- Profile preview works on keyboard/mobile
- No long-page performance issues

---

## 8. Phase 6 - Crew / Production

### Goals

- Creative editorial treatment
- Crew hierarchy
- Production companies
- Responsive layouts
- Motion

### Client Review

Required because this page has creative freedom.

---

## 9. Phase 7 - Gallery / Media

### Goals

- Curated media
- Image optimization
- Video poster strategy
- Lightbox/media viewer if approved

### Performance Rule

Do not load every video player at page load.

---

## 10. Phase 8 - The Answer AI

### Goals

- Coming Soon experience
- Brand-consistent visual
- Minimal approved copy

### Constraint

Do not invent product details.

---

## 11. Phase 9 - Contact and Meeting

### Goals

- Contact form
- Validation
- Email delivery
- Meeting option
- Success/error states
- Spam protection

### Done When

- Test message reaches FocusTV inbox
- Invalid input is rejected
- Mobile form works
- Error state is understandable
- No credentials are exposed

---

## 12. Phase 10 - SEO and Metadata

### Goals

- Page titles
- Descriptions
- Canonicals
- Open Graph
- Sitemap
- robots
- Structured data where useful
- Alt text review
- Internal link review

### Migration

Record old URLs and define redirects.

---

## 13. Phase 11 - Performance and Accessibility Pass

### Check

- Hero video weight
- Images
- Fonts
- Client JS
- Animation smoothness
- Layout shift
- Keyboard usage
- Focus states
- Contrast
- Reduced motion
- Mobile performance

Fix the biggest problems first.

---

## 14. Phase 12 - Browser QA

Test modern:

- Chrome desktop
- Edge
- Firefox
- Safari
- iPhone Safari
- Android Chrome

Test:

- Navigation
- Theme
- Forms
- Cast filter
- Cast profile
- Media
- Cursor fallback
- Smooth scrolling

---

## 15. Phase 13 - Launch Preparation

### Confirm

- Hostinger plan
- Deployment method
- DNS access
- Current email DNS records
- Contact email
- Production environment variables
- Redirect map
- Final content approval
- Final client sign-off

---

## 16. Phase 14 - Production Launch

1. Backup relevant existing site information
2. Deploy new website
3. Point domain
4. Verify SSL
5. Verify `www`/non-`www`
6. Verify redirects
7. Verify contact form
8. Verify email
9. Verify sitemap
10. Submit/verify Search Console if approved
11. Run final smoke test

---

## 17. Client Feedback Workflow

Client feedback should be converted into a scoped task.

Bad task:

> Make the homepage better.

Good task:

> Reduce the hero headline width on desktop, move the supporting copy 24px lower, and make the next-section transition less dramatic. Do not change video crop, header, or theme toggle.

Every feedback prompt to AI should clearly include:

- What to change
- What not to change
- Target breakpoints
- Acceptance criteria

---

## 18. AI Task Workflow

Before coding:

1. Read `AGENTS.md`
2. Read relevant docs
3. Inspect relevant files
4. Explain intended files to modify if the task is significant

During coding:

1. Make smallest safe change
2. Reuse existing tokens/patterns
3. Avoid unrelated refactors

After coding:

1. Review diff
2. Run validation
3. Check responsive behavior
4. Summarize files changed
5. Wait for instruction before commit/push

---

## 19. Task Completion Template

Use this internally after AI work:

```text
Task:
[short task name]

Requirement:
[what was requested]

Files changed:
- ...

Implementation:
- ...

Checks:
- [ ] Desktop
- [ ] Mobile
- [ ] Light theme
- [ ] Dark theme
- [ ] Keyboard/accessibility
- [ ] Lint
- [ ] Build

Unrelated changes:
None

Known issues:
None / list issues
```

---

## 20. Definition of Project Completion

The project is ready for final launch when:

- All required pages exist
- Client has approved the website
- Mobile and desktop are complete
- Contact/meeting flow works
- SEO foundations are complete
- Redirects are prepared
- Build is clean
- No known blocker bugs remain
- Final hosting method is confirmed
- Production smoke test passes
