# Product requirements

**Project:** FocusTV website rebuild

**Last reviewed:** 14 November 2026

**Status:** In development and owner review

## Purpose

Present FocusTV as an Australian film production and entertainment company. The site should make the company's original documentaries, commercial work, people and contact routes easy to understand. It should help potential guests, sponsors, brands and production partners assess the company's work.

## Scope

The current site includes:

- A homepage introducing FocusTV and presenting The Answer, Automotive Legends, Gaming Legends and WA Police: Tech Reloaded.
- Production Services, with Atlas Fuel, Beast Philanthropy and Danube Group case studies.
- About, with the owner-supplied company introduction and five timeline chapters.
- Team, with the founder, six team members and selected credit links.
- Gallery, with 21 interview stills, 11 behind-the-scenes photographs and an image viewer.
- Contact, with enquiry categories and optional meeting preferences.

The Answer is a FocusTV production, not a separate company site. `/cast` and `/meet-the-cast` currently redirect to Production Services. Do not restore the directory or add pages without an owner request.

## Content and presentation

Use owner-supplied content, approved assets and verified source material. Do not invent people, affiliations, production credits, awards, dates or product claims. Logos grouped with featured voices do not by themselves establish a sponsorship or production partnership. WA Police participants and associated marks remain unconfirmed.

Use the supplied FocusTV brand artwork, Poppins and the existing editorial serif. Light is the default theme; dark is available to visitors. Preserve approved layouts and keep content legible and usable across mobile, tablet and desktop.

The owner directed that the hero start with a poster and play on request. Current code attempts playback while the hero is visible for visitors who permit motion. This is a known mismatch, not a revised requirement; see [project status](PROJECT_STATUS.md).

## Contact

Visitors can send a general, partnership, production or guest enquiry. Name, email and message are required; phone is optional. The server sends the form to `hammad@focustv.tv` through Resend when configured. A meeting request records optional date, time and time-zone preferences; it does not book a meeting. The form reports success or failure on the page and retains entered details after an error. Live delivery still needs to be tested.

## Quality and delivery

Use semantic markup, keyboard-accessible controls, visible focus states and reduced-motion alternatives. Preserve responsive layouts and avoid horizontal overflow. Optimize images and defer third-party media where practical. Maintain metadata, canonicals, sitemap and robots rules.

The original performance targets are LCP at or below 2.5 seconds, CLS below 0.1 and INP at or below 200 milliseconds where practical. These are goals, not measured results for the current site. Test current Chrome, Safari, Edge and Firefox, including iOS and Android devices where available.

The stack is Next.js App Router, React, TypeScript, CSS Modules, CSS custom properties, GSAP/ScrollTrigger and Lenis. The initial scope has no CMS, database, accounts, payments or CRM. Any change to that scope needs an owner decision.

## Release criteria

A change is ready for review when it meets the request, protects approved work, passes lint, typecheck and build, and has been checked at relevant widths and themes. Launch also requires content approval, working production email, Vimeo and hosting verification, and a legacy URL review. Details are in [project status](PROJECT_STATUS.md).
