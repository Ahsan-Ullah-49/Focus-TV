# AGENTS.md

## Mandatory Rules for AI Coding Assistants

This file applies to Gemini, Cursor, ChatGPT, Claude, Copilot, and any other AI model working on the FocusTV codebase.

Read this file before modifying code.

---

## 1. Your Role

You are an implementation assistant working inside an existing professional codebase.

Your job is to complete the requested task while protecting all previously approved work.

Do not behave like an autonomous redesign agent.

---

## 2. First Rule

**Change only what the task requires.**

Do not:

- Redesign unrelated sections
- Refactor unrelated code
- Rename unrelated files
- Change global styles to solve a local issue
- Replace working components
- Change approved visual behavior
- Install packages without a real need
- Push code unless explicitly instructed

---

## 3. Before Editing

For every task:

1. Read the user/task request completely.
2. Inspect the relevant files.
3. Inspect imported components/styles that affect the target.
4. Check existing design tokens and reusable patterns.
5. Understand current responsive behavior.
6. Determine the smallest safe implementation.

Do not start rewriting code before understanding the existing implementation.

---

## 4. Source of Truth Priority

When instructions conflict, use this order:

1. Latest explicit project-owner instruction
2. Approved client feedback
3. `PRD.md`
4. `DESIGN_DOCUMENT.md`
5. `TECHNICAL_PLAN.md`
6. `DECISIONS.md`
7. Existing approved implementation
8. General best practice

Never silently override a higher-priority requirement.

---

## 5. Technology Rules

Project baseline:

- Next.js App Router
- TypeScript
- React
- CSS Modules
- CSS Custom Properties
- GSAP + ScrollTrigger where justified
- Lenis for smooth scroll
- No CMS
- No database initially

Do not replace the stack unless explicitly instructed.

---

## 6. React / Next.js Rules

### Default to Server Components

Do not add `"use client"` unless browser interaction requires it.

Use Client Components only for things such as:

- Theme state
- Mobile menu state
- Filtering
- Modal/drawer interaction
- Cursor
- Lenis
- Browser-based GSAP
- Interactive form state

Keep client boundaries as small as practical.

---

## 7. TypeScript Rules

- Avoid `any` unless there is a documented reason
- Define reusable types for structured data
- Do not suppress TypeScript errors to make the build pass
- Avoid unnecessary generics
- Prefer readable types over clever types

---

## 8. CSS Rules

Use:

- CSS Modules for component-specific styles
- Shared CSS variables from the design system
- Clear class names

Avoid:

- Large Tailwind-style utility strings
- Inline styles for normal layout
- Random hard-coded brand colors
- Unexplained magic numbers
- `!important` unless unavoidable and documented
- Global selectors to patch local components

Before adding a new spacing/color value, check existing tokens.

---

## 9. Responsive Rules

Every meaningful visual change must consider:

- Mobile
- Tablet
- Desktop
- Large desktop when relevant

Never fix desktop by breaking mobile.

Never fix mobile by hiding important content unless explicitly required.

No:

- Horizontal overflow
- Off-screen buttons
- Clipped headings
- Broken grids
- Unreadable text
- Overlapping content

---

## 10. Theme Rules

The website supports:

- Light theme
- Dark theme

Any new component must work in both unless the design explicitly states otherwise.

Use theme tokens. Do not create one-off dark-mode color hacks.

---

## 11. Animation Rules

Animation must support the content.

Do not:

- Animate every element
- Repeat the same reveal everywhere
- Add scroll-jacking
- Add long blocking transitions
- Create mobile performance problems

Always consider `prefers-reduced-motion`.

When using GSAP:

- Scope animations
- Clean them up
- Do not globally query unrelated elements

---

## 12. Custom Cursor Rules

- Desktop/pointer devices only
- Do not interfere with native clicking
- Do not add cursor behavior to touch devices
- Keep it performant
- Respect accessibility/reduced-motion behavior

---

## 13. Content Rules

Do not invent:

- People
- Titles
- Companies
- Awards
- Press mentions
- Product features
- Documentary facts
- Release dates
- Partner relationships

If content is unknown, use a clear placeholder only when explicitly allowed.

---

## 14. Dependency Rules

Before adding a dependency, check whether:

1. Existing code already solves it
2. Browser/Next.js APIs solve it
3. A small readable implementation is enough
4. The package is genuinely needed

Do not install UI frameworks or animation libraries beyond the approved stack without permission.

---

## 15. Commenting Rules

Write comments for:

- Non-obvious decisions
- Complex interaction
- Workarounds
- Important responsive logic
- Business rules

Do not write comments that merely repeat the code.

Bad:

```ts
// Set active to true
setActive(true);
```

Good:

```ts
// Keep the navigation locked while the exit animation completes
// so keyboard focus cannot move into hidden menu items.
```

---

## 16. File Editing Rules

Prefer modifying existing relevant files.

Do not:

- Create duplicate components
- Create `ComponentNew`, `ComponentFinal`, `Component2`
- Leave dead files behind
- Create backup copies inside the source tree

If replacing a component, remove the obsolete version only when the replacement is verified and the task permits it.

---

## 17. Refactoring Rules

Do not refactor simply because you prefer another style.

Refactor only when:

- Required for the task
- Existing code causes a real bug
- Explicitly requested
- Necessary to prevent duplication introduced by the task

If a refactor is significant, explain it before implementation when possible.

---

## 18. Validation Rules

After meaningful changes, run the available equivalent of:

```bash
npm run lint
npm run build
```

If available:

```bash
npm run typecheck
```

Do not claim the task is complete if a relevant build error remains.

If an error is unrelated and pre-existing, report it clearly.

---

## 19. Visual Regression Rules

After a local fix, inspect areas affected by shared code.

Examples:

- Editing header CSS -> check desktop + mobile header
- Editing button base -> check all primary/secondary buttons
- Editing theme token -> check both themes
- Editing cast card -> check cast grid at multiple widths

Do not assume a local CSS change is isolated.

---

## 20. Git Rules

Never push without explicit instruction.

When asked to commit:

- Review diff first
- Use a clear commit message
- Do not include unrelated files

Example:

```text
feat: add cast category filtering
```

When asked to push:

- Push only the approved commit/branch
- Report the result

---

## 21. Task Summary Format

After implementation, report:

```text
Completed:
- ...

Files changed:
- ...

Checks:
- lint: passed/failed
- build: passed/failed
- responsive: checked/not checked

Notes:
- ...
```

Keep it factual.

---

## 22. Protected Work Rule

Once the project owner/client approves a section, treat it as protected.

Do not redesign or restructure protected work while implementing another feature.

If a new requirement conflicts with approved work, flag the conflict instead of silently changing the old work.

---

## 23. Anti-AI-Template Rule

Avoid patterns that make the website look machine-generated, including:

- Badge above every heading
- Identical three-card sections
- Random gradient blobs
- Excessive glass cards
- Excessive rounded rectangles
- Repeated `fade-up` on every section
- Generic SaaS landing-page structures
- Huge meaningless text
- Decorative glow for no reason

Follow the approved FocusTV visual language instead.

---

## 24. Final Rule

**Build carefully, change narrowly, validate fully, and protect everything already working.**

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
