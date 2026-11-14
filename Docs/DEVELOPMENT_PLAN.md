# Development plan

**Last reviewed:** 14 November 2026

The site has a working implementation and is being reviewed incrementally. This plan describes how to finish and maintain it; it does not imply that every launch check has passed.

## Current baseline

The shared layout, six main pages, contact API, theme system, motion, metadata and public image organization are implemented. Route behavior and open issues are recorded in [project status](PROJECT_STATUS.md). Product and design requirements are in [PRD](PRD.md) and [design document](DESIGN_DOCUMENT.md).

## Working on a change

1. Confirm the requested scope and inspect the affected implementation, styles, content and responsive behavior.
2. Check owner decisions, approved work and source records before changing presentation or facts.
3. Make the smallest change that meets the request. Keep components server-rendered unless interaction requires client code.
4. Run lint, typecheck, contact tests and build. Test the affected pages at relevant sizes, themes, motion settings and input methods.
5. Update the relevant documentation and record material changes in the changelog. Report what was checked and what remains unverified.
6. Commit or push only when explicitly instructed.

## Remaining review

- Reconcile the hero implementation with the recorded click-to-play instruction.
- Obtain owner review of the current pages, project descriptions, film selections, people, credits and any time-sensitive figures.
- Confirm the contact sender and test delivery to the real inbox.
- Verify Vimeo embeds, hosting and the production environment; review redirects from the old site.
- Complete browser, device, accessibility and performance checks before requesting launch approval.

Do not add a CMS, database, authentication, payments, analytics or additional dependencies without a confirmed requirement. Do not infer project associations or fill missing content with invented facts.
