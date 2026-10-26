# FocusTV Website Rebuild

## Product Requirements Document (PRD)

**Version:** 1.2 — homepage footer completion, 26 October 2026

**Status:** Approved — implementation in progress
**Project:** FocusTV Website Rebuild  
**Domain:** focustv.tv  
**Primary Language:** English  
**Project Type:** Premium Creative Studio / Media Website  
**Development Approach:** Custom Code, Mobile-First, Agile  
**Primary Framework:** Next.js  
**Date:** September 2026

---

## 1. Executive Summary

FocusTV requires a complete rebuild of its existing website.

The new website will not reuse the WordPress frontend architecture. The owner has authorized https://focustv.tv/ as the factual source for existing copy, people, credits, photographs and film embeds. Preserve approved local content where it differs from the legacy site, omit legacy placeholder text, and record imported sources in `Docs/CONTENT_SOURCES.md`.

The new website will be developed as a custom-coded digital experience designed to represent FocusTV as a high-level creative studio working with internationally recognized personalities, brands, business leaders, creators, investors, and production partners.

The website must immediately communicate credibility, creative quality, professionalism, and the scale of the people associated with FocusTV.

The final experience should feel cinematic, modern, minimal, creative, and highly polished without becoming visually distracting or unnecessarily complex.

The website will use a premium light theme by default and will also provide a cinematic dark theme that visitors can switch to manually.

---

## 2. Product Vision

The FocusTV website should function as the digital representation of the quality and credibility of the FocusTV brand.

When a new visitor arrives, the website should make it clear that FocusTV:

- Operates at a professional international level
- Works with influential and recognizable people
- Produces high-quality creative and documentary work
- Is capable of working with premium brands, sponsors, and business partners
- Has a serious and established creative identity

The experience should feel intentionally designed rather than generated from a template.

---

## 3. FocusTV Positioning

Based on client feedback, FocusTV will primarily be positioned as a **Creative Studio**.

The website may also communicate documentary, production, media, and collaborative work, but the broader brand should not be presented as only a single documentary project.

---

## 4. Primary Business Objectives

### 4.1 Establish FocusTV as a Premium and Credible Brand

The website must visually and verbally represent the level of people and organizations associated with FocusTV.

### 4.2 Attract Sponsors and Brand Partnerships

The website should support business development by creating confidence in potential sponsors, partners, and collaborators.

---

## 5. Secondary Objectives

The website should also support:

- High-profile guest acquisition
- Investor and business partner interest
- Production and distribution conversations
- Public understanding of FocusTV
- Awareness of The Answer
- General business inquiries
- Meeting requests
- Media and industry credibility

---

## 6. Target Audience

Primary:

- High-profile guests
- Brands / sponsors
- Investors / business partners

Secondary:

- Production partners
- Media / press
- Distributors
- General viewers
- Creative professionals

---

## 7. First-Minute Visitor Experience

Within approximately the first minute, visitors should understand:

- Who FocusTV is
- The credibility and scale of the people involved
- What The Answer is
- The quality of FocusTV's productions
- The level of people and organizations FocusTV works with

The homepage should communicate these ideas progressively rather than attempting to explain everything inside the hero.

---

## 8. Success Criteria

The website is successful when it:

- Looks significantly more professional than the previous website
- Correctly represents the level of people FocusTV works with
- Helps attract partnerships, sponsors, and high-profile guests
- Clearly communicates FocusTV and The Answer
- Feels premium on desktop and mobile
- Loads quickly and feels smooth
- Looks intentionally designed rather than template-generated
- Is easy for the development team to maintain and update

---

## 9. Design Direction

Approved visual direction:

- Cinematic
- Minimal
- Creative
- Modern
- Simple, clean, and elegant

The design should rely primarily on:

- Typography
- Photography
- Video
- Composition
- Whitespace
- Controlled motion
- Subtle background details
- Strong visual hierarchy

Decoration should always have a purpose.

---

## 10. Theme System

### Light Theme

Default experience using Gold + White/Off-white + Dark text.

### Dark Theme

Optional cinematic experience using Gold + Black/Dark Charcoal + Light text.

### Primary Brand Color

`#BF8B25`

The theme should use shared design tokens/CSS variables. User preference should persist between visits.

---

## 11. Typography

The FocusTV logo uses Segoe UI Regular / 400.

The website may use additional free commercial-use fonts that provide a premium editorial/cinematic character.

Typography must remain:

- Professional
- Readable
- Modern
- Appropriate for international audiences
- Free for commercial use

---

## 12. Website Architecture

Primary pages:

- Home
- Cast
- Crew / Production
- Gallery / Media
- The Answer AI
- Contact

The Answer series story remains on the homepage. Per the owner's 25 October 2026 instruction, it does not have a separate `/the-answer` page or footer navigation link.

No additional major pages should be created without a confirmed requirement.

Automotive Legends is a separate project and is not part of this website.

---

## 13. Homepage Requirements

The homepage will open with a full-screen cinematic video hero.

The client has delegated the content sequence after the hero to the project team.

The homepage should progressively communicate FocusTV's identity, credibility, The Answer, notable people, partnerships, production quality, and contact opportunities.

Only a curated selection of the most internationally recognizable personalities should be featured on the homepage.

### Owner Scope Update (23–24 October 2026)

The required homepage order is Hero → The Story → Our Proud Cast → Partners & Media → Other Projects → shared Footer. Preserve the approved first four sections. The owner requests completion of all existing planned routes in this implementation pass, with subsequent design review and revisions.

### Other Projects

- Show FocusTV work beyond The Answer directly after the logo loop.
- Owner-supplied projects: Gaming Legends and WA Police documentaries, with Vimeo embed IDs and privacy hashes.
- Additional projects, posters and any future copy await client confirmation.
- Keep two clearly labelled documentary slots for the supplied films, without fabricated release dates, credentials or additional projects.
- Store projects in structured local data so approved video/poster assets can be added without rebuilding the section.
- Load the supplied Vimeo embeds with the homepage and preload metadata plus initial video segments. Start each video muted when its media frame enters view, pause it outside view, and respect reduced-motion preferences.
- Use Vimeo's native playback controls and timeline with the FocusTV gold accent. Hide Vimeo branding, title and byline where the account's embed settings support it. Responsive media frames use the videos' 16:9 aspect ratio.
- Keep native pointer input enabled on the Vimeo iframe. The browser pointer is visible inside the cross-origin player and the animated FocusTV cursor hides there, resuming on the host page. An intentional pause prevents later scroll-triggered autoplay until refresh.

### Footer and Remaining Pages

Complete The Answer, Cast, Crew, Gallery, Contact and the deliberately limited The Answer AI Coming Soon page. Use FleetRise for editorial rhythm and interaction references, Bugatti and the owner's supplied footer images for restrained navigation columns, clear contact routes and oversized brand typography. Keep the FocusTV visual identity and both themes.

The client confirmed the final homepage footer on 26 October 2026: link Instagram first and email second, using only those two destinations; reuse the Header's desktop logo asset in both footer themes; keep the invitation heading beside its arrow on tablet/mobile with “Let's talk” below the arrow; and center the single-column mobile Explore links. Keep the wordmark fade consistent across themes and its visible side margins balanced at each responsive size.

---

## 14. Hero Experience

Requirements:

- Full viewport presentation
- Optimized cinematic video
- Responsive crop
- Strong poster/fallback image
- Muted autoplay where allowed
- `playsInline`
- Mobile-friendly behavior
- Clear headline/branding
- Controlled transition into the next section

Avoid using a heavy Vimeo iframe as the initial background if an optimized native asset is available.

---

## 15. Cast Page

The Cast page will contain the complete approved cast.

Requirements:

- High-profile people receive greater prominence
- Category filtering
- Responsive cast cards
- Smooth filter transitions
- All approved cast remains discoverable

Final categories will be based on actual cast data.

---

## 16. Cast Cards and Profiles

Default card content:

- Photograph
- Name
- Title and/or company

Additional information may appear through an expanded card, modal, drawer, overlay, or similar interaction.

The final interaction will be defined in the Design Document.

---

## 17. Crew / Production

Crew members and production companies remain on the same page.

The page should feel creative and editorial rather than like a conventional employee directory.

---

## 18. The Answer AI

The Answer AI page will currently function as **Coming Soon**.

Do not invent features, product claims, timelines, or descriptions.

---

## 19. Gallery / Media

The gallery will showcase curated high-quality photography and video.

It should not become an uncurated media archive.

Performance-conscious loading is required.

---

## 20. Contact Experience

The Contact page should support:

- General inquiries
- Meeting requests
- Sponsorship/partnership inquiries
- Production opportunities
- Guest participation inquiries

Core fields:

- Name
- Email
- Phone
- Message

Meeting booking is optional.

The current implementation opens a populated draft in the visitor's email application and explicitly requires the visitor to review and send it. It does not submit mail from a server or report delivery. This is a working interim flow while the production recipient and sending service are confirmed; inbox delivery remains a launch requirement. The legacy site currently publishes a Hostinger staging-domain recipient, which must be confirmed before launch.

---

## 21. Meeting Booking

Use the simplest reliable zero/low-cost approach.

Potential options:

- Free scheduling platform
- Preferred date/time request
- Lightweight custom request flow

Do not build a custom calendar engine for v1.

---

## 22. Content Strategy

Existing factual copy and media may be reused from https://focustv.tv/ under the owner's explicit authorization. Source records and pending confirmations live in `Docs/CONTENT_SOURCES.md`.

The content team may improve copy, biographies, grammar, clarity, and tone.

Important rewritten content must be approved before publication.

Do not change factual information for stylistic reasons.

---

## 23. Media Assets

Original high-quality photographs, logos, and footage are available.

Assets should be:

- Optimized
- Responsively sized
- Cropped intentionally
- Converted to suitable formats where useful
- Used consistently

---

## 24. Motion and Interaction

Approved direction:

- Lenis for smooth scrolling
- GSAP + ScrollTrigger for controlled motion

Motion may include:

- Text reveals
- Image reveals
- Stagger
- Parallax
- Mask transitions
- Section entrances
- Subtle background movement
- Controlled scaling
- Hover interactions

Do not repeat one animation pattern mechanically throughout the site.

The owner requests smooth scrolling and a reveal treatment across the major sections. Use the shared, scoped GSAP/ScrollTrigger system with directional fades, blur/zoom and grouped staggers, following the owner-provided reference. Reveals should start near the viewport, play once and complete during fast scrolling; reduced-motion users receive the final visible state. Do not use a route-cover curtain. Keep the desktop Cast card deck as its separate scroll-linked interaction. Motion must not intercept normal links, browser history or keyboard navigation. This owner-directed update supersedes the earlier route-curtain and per-section motion treatment.

---

## 25. Custom Cursor

Use a subtle custom cursor on supported desktop pointer devices.

It may react to:

- Links
- Cast profiles
- Videos
- Images
- Interactive elements

No custom cursor on touch devices.

---

## 26. Responsive Design

Use a mobile-first implementation approach while treating desktop and mobile as equally important final experiences.

The site must work across:

- Small mobile
- Standard mobile
- Large mobile
- Tablet
- Laptop
- Desktop
- Large desktop

No horizontal overflow, clipped headings, broken grids, off-screen controls, or unusable navigation.

---

## 27. Technical Stack

- Next.js App Router
- TypeScript
- React
- CSS Modules
- CSS Custom Properties
- GSAP + ScrollTrigger
- Lenis
- GitHub
- Vercel previews
- Hostinger production hosting subject to compatibility check
- No CMS
- No database initially
- No admin panel

---

## 28. Code Quality Requirements

The codebase must prioritize readability and maintainability.

Requirements:

- Clear naming
- Logical components
- Consistent folder structure
- Reusable design tokens
- Scoped styling
- Meaningful comments
- No unexplained magic values
- No unnecessary abstractions
- No unnecessary dependencies
- No global CSS hacks for local problems

---

## 29. AI Development Rules

AI coding assistants must:

- Inspect relevant files before editing
- Change only what the task requires
- Protect approved work
- Avoid unrelated refactors
- Avoid unnecessary packages
- Validate after meaningful changes
- Never push unless explicitly instructed

Detailed rules live in `AGENTS.md`.

---

## 30. Performance Requirements

Target strong Core Web Vitals.

Approximate goals:

- LCP <= 2.5s under reasonable conditions
- CLS < 0.1
- INP <= 200ms where practical

Use:

- Minimal client JavaScript
- Optimized images
- Optimized fonts
- Lazy loading
- Controlled video loading
- Reduced third-party scripts
- Efficient animation
- Code splitting
- Caching where appropriate

---

## 31. SEO Requirements

Implement SEO from the beginning.

Include:

- Unique titles
- Meta descriptions
- Canonical URLs
- Open Graph
- Social preview images
- Semantic headings
- Internal links
- Alt text
- Sitemap
- robots.txt
- Structured data where useful

Before replacing WordPress, review existing public URLs and create permanent redirects where appropriate.

---

## 32. Analytics

No analytics stack currently exists.

The architecture should allow later addition of:

- Google Analytics
- Google Search Console
- Other tracking if approved

Search Console setup is recommended around launch.

---

## 33. CRM

No CRM is required for v1.

Incoming inquiries can be handled through the FocusTV email address.

---

## 34. Accessibility

Use modern accessibility best practices:

- Semantic HTML
- Keyboard navigation
- Visible focus
- Form labels
- Good contrast
- Logical headings
- Meaningful alt text
- Reduced-motion support
- Correct interactive semantics
- Touch-friendly controls

---

## 35. Browser Support

Target modern:

- Chrome
- Safari
- Edge
- Firefox
- iOS
- Android

Legacy browser support is not a major project requirement.

---

## 36. Development Workflow

Use incremental Agile delivery:

**Requirement -> Design Direction -> Implementation -> Internal Review -> Validation -> Git Commit/Push when approved -> Vercel Preview -> Client Review -> Feedback -> Revision -> Approval**

---

## 37. Cost Constraints

Prefer:

- Free/open-source frontend libraries
- Free fonts
- Free Vercel previews
- Existing Hostinger hosting
- Existing professional email
- Free/existing services where possible

Do not introduce paid recurring software without approval.

---

## 38. Out of Scope

Initial release excludes:

- WordPress
- CMS
- Admin dashboard
- User accounts
- Authentication
- E-commerce
- Payments
- Newsletter
- CRM implementation
- Complex calendar backend
- Large database
- Automotive Legends
- Unnecessary Three.js/WebGL features

---

## 39. Definition of Done

A feature/section is Done when:

- Requirement is implemented
- Desktop works
- Mobile works
- Intermediate layouts work
- Both themes work where applicable
- Accessibility basics are maintained
- Motion behaves correctly
- Reduced-motion fallback exists where relevant
- No unrelated approved area is broken
- TypeScript/lint/build validation passes
- Client feedback has been addressed when required

---

## 40. Core Project Principle

**Present FocusTV with the level of quality, credibility, and creative confidence that matches the people and organizations it works with.**

The website should be cinematic without being distracting, minimal without being empty, creative without becoming confusing, and modern without depending on temporary trends.
