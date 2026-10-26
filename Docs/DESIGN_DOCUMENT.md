# FocusTV Website Rebuild

## Design Document

**Version:** 1.1 — scope update, 25 October 2026

**Status:** Design baseline  
**Project:** FocusTV Website Rebuild  
**Primary Brand Color:** `#BF8B25`  
**Default Theme:** Light  
**Secondary Theme:** Dark cinematic  
**Design Keywords:** Cinematic, minimal, creative, modern, elegant

---

## 1. Purpose

This document defines the visual and interaction principles for the FocusTV website.

It is not intended to freeze every section before development. The project will evolve through implementation and client review, but all new design decisions must stay inside the system defined here unless the team intentionally updates this document.

The goal is to avoid inconsistent design, generic AI-generated layouts, unnecessary visual effects, and redesigning approved sections without reason.

---

## 2. Core Design Principle

The website must look appropriate when shown to high-profile guests, sponsors, investors, brands, production partners, and internationally recognized creative professionals.

The visual standard should feel:

- Premium without looking expensive for the sake of it
- Cinematic without becoming dark or dramatic everywhere
- Minimal without feeling empty
- Creative without becoming confusing
- Modern without depending on short-lived design trends
- Detailed without becoming visually noisy

Content, people, photography, video, typography, and composition should create the premium feel. Decorative effects are secondary.

---

## 3. Design References

Reference websites are inspiration only. The final FocusTV design must be original.

### Bugatti

Use as inspiration for:

- Smooth scrolling feel
- Controlled transitions
- High-end pacing
- Large visual moments
- Premium motion restraint

### Apple

Use as inspiration for:

- Strong hierarchy
- Clear typography
- Whitespace
- Product-style storytelling
- Precise alignment
- Intentional responsive behavior

### Real Business Connections

Use as inspiration for:

- Reveal animation ideas
- Section-level details
- Background accents
- Progressive visual storytelling

### Fleet Rise Logistics

Use as inspiration for:

- Custom cursor direction
- Typography energy
- Interaction details

### Fantasy / Huge / Pixel Melbourne / Vibro Digital / Samsung / Bano Qabil

Use selectively for:

- Editorial layouts
- Typography
- Navigation
- Spacing
- Image treatment
- Motion
- Content hierarchy

No layout, interaction, or visual treatment should be copied directly.

---

## 4. Brand Color System

### Core Brand Color

`--color-brand: #BF8B25;`

Gold is the primary accent. It must be used deliberately.

Use gold for:

- Key interactive states
- Small visual accents
- Selected labels
- Important lines or borders
- Active filters
- Theme toggle details
- Key CTA emphasis where appropriate

Avoid:

- Large gold backgrounds without a strong reason
- Multiple gold gradients
- Constant gold glows
- Using gold on every heading or button

---

## 5. Light Theme

The light theme is the default experience.

Suggested token direction:

```css
:root {
  --color-brand: #bf8b25;

  --color-bg: #f7f5f0;
  --color-surface: #ffffff;
  --color-surface-soft: #efede7;

  --color-text: #111111;
  --color-text-muted: #686868;
  --color-border: rgba(17, 17, 17, 0.12);
}
```

These values are a starting system, not untouchable final values.

### Light Theme Character

- Warm off-white rather than sterile white everywhere
- Dark charcoal text rather than forcing pure black
- Gold used as a controlled accent
- Strong photography
- Clean negative space
- Subtle section separators

---

## 6. Dark Theme

Suggested direction:

```css
[data-theme="dark"] {
  --color-bg: #0c0c0c;
  --color-surface: #141414;
  --color-surface-soft: #1b1b1b;

  --color-text: #f4f1e9;
  --color-text-muted: #a5a5a5;
  --color-border: rgba(255, 255, 255, 0.12);
}
```

### Dark Theme Character

- Near-black / charcoal rather than flat black everywhere
- Warm white text
- Same FocusTV gold
- Cinematic image treatment
- Controlled contrast
- No unnecessary neon effects

---

## 7. Theme Toggle

The header will include a visible but unobtrusive theme switch.

Requirements:

- Default theme: Light
- User can switch to dark
- Preference persists between page visits
- No obvious theme flash on initial load
- Toggle must be keyboard accessible
- Toggle must have a text alternative / accessible label
- Theme transition should feel smooth but fast
- Do not animate every CSS property during theme switching

---

## 8. Typography

### Existing Brand Context

The FocusTV logo currently uses Segoe UI Regular / 400.

The website is not required to use Segoe UI for all interface and editorial text.

### Typography Direction

Use a free commercial-use type system with:

- A strong display typeface for major statements
- A clean modern sans-serif for body and interface text

The final pairing should feel cinematic and editorial while remaining highly readable.

### Typography Rules

- Avoid generic AI-style oversized headings on every section
- Avoid using all caps for long text
- Use large display type only when hierarchy requires it
- Keep paragraphs comfortable to read
- Use controlled line lengths
- Mobile typography must be separately tuned
- Use fluid sizing with `clamp()` where appropriate

Suggested scale direction:

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.375rem;

--display-sm: clamp(2rem, 5vw, 4rem);
--display-md: clamp(2.75rem, 7vw, 6rem);
--display-lg: clamp(3.5rem, 10vw, 9rem);
```

Final values should be adjusted during implementation.

---

## 9. Layout System

### General Principles

- Mobile-first
- Clear content width rules
- Strong left/right alignment
- Controlled asymmetry
- Generous spacing
- Sections should not all use identical grids

### Suggested Container Tokens

```css
--container-sm: 720px;
--container-md: 1080px;
--container-lg: 1440px;
--page-gutter: clamp(1rem, 3vw, 3rem);
```

### Vertical Rhythm

Use shared spacing tokens rather than random values.

Example:

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
--space-32: 8rem;
```

Not every section should use the same vertical padding.

---

## 10. Header and Navigation

The header must feel premium and minimal.

### Desktop

Expected content:

- FocusTV logo
- Main navigation
- Theme toggle
- Contact / meeting CTA where appropriate

Possible behavior:

- Transparent over hero
- Becomes solid / blurred only when needed for readability
- Changes state after scrolling
- May reduce height slightly after the hero

### Mobile

- Larger responsive logo maintaining brand presence
- Right-side partial-width drawer (approx. 2/3 width)
- Official `White-logo` displayed cleanly inside drawer
- FocusTV gold/glass visual treatment (`#BF8B25` base with blur)
- Double-layer transition opening sequence
- Blurred cinematic background dimming the underlying page
- Dedicated Contact Us CTA with tactile active states
- Theme toggle remains accessible
- Menu feels designed for mobile, not like compressed desktop navigation

Avoid:

- Oversized navigation animation
- Complex mega menus
- Unnecessary dropdowns

---

## 11. Homepage Hero

The homepage hero is a full-screen cinematic video experience.

### Required Elements

- Full viewport visual
- Optimized video or cinematic fallback image
- FocusTV positioning statement / headline
- Supporting line if required
- Controlled CTA or scroll cue
- Header integration

### Video Rules

- Muted autoplay where allowed
- `playsInline`
- Poster image
- Correct crop across breakpoints
- No important face/text hidden behind UI
- Reduced data/performance fallback where needed
- Do not depend on a heavy Vimeo iframe for the initial visual if an optimized asset can be provided

### Motion

The hero may include:

- Gentle video scale
- Title reveal
- Controlled fade/clip
- Scroll transition into the next section

Avoid:

- Excessive text layers
- Multiple CTAs
- Fast motion
- Large decorative particles

---

## 12. Homepage Content Flow

The client has delegated the final flow to the project team.

Proposed narrative direction:

1. Cinematic Hero
2. FocusTV positioning / introduction
3. The Answer introduction
4. Selected high-profile personalities
5. FocusTV credibility / scale
6. Selected brands, companies, or collaborators where approved
7. Production / crew credibility
8. Selected media / visual storytelling
9. Contact / partnership CTA

This flow can change during design if a stronger narrative emerges.

Every section must have a clear role. No filler sections.

### Current Homepage Implementation (26 October 2026)

`src/app/page.tsx` renders Hero → The Story → Our Proud Cast → Partners & Media → Other Projects. The shared Footer follows the page. This owner-confirmed sequence supersedes the earlier proposed narrative; do not add filler sections to match that proposal.

- **Hero:** `src/components/sections/Hero/` contains the responsive Vimeo iframe player, direct postMessage controls, and a local poster at `public/media/hero/focustv-Hero-poster.png`. Video ID, privacy hash, playback settings, and poster path are maintained in `hero.config.ts`. The player supports a keyboard-operable full-surface play/pause control and a mute toggle.
- **The Story:** `src/components/sections/Intro/Intro.tsx` owns the approved copy in `STORY`; `Intro.module.css` owns its responsive editorial layout. The image is `public/media/hero/focustv-Intro-poster.webp`. Desktop places image and narrative side by side; tablet stacks the image before the full-width narrative; mobile also stacks heading details. Colors follow shared light/dark tokens. Reveal attributes use the shared `PageMotion` system and resolve to visible content when reduced motion is requested. To update copy, edit `STORY`; to replace the image, update `STORY.imageSrc` and `STORY.imageAlt`.
- **Our Proud Cast:** `src/components/sections/Cast/Cast.tsx` renders data from `cast.config.ts`; `Cast.module.css` defines the layout and card treatments. The 14 optimized square portraits are `public/media/Stills/optimized/1.webp` through `14.webp`. Desktop uses a scroll-driven portrait deck; widths up to 1099px use one square card per row and place the CTA after the cards. Reduced-motion users get a static layout. Update people, titles, image paths, and alt text in `cast.config.ts`, keeping each `id` unique.

Hero video playback depends on the external Vimeo player. The `/cast` route now opens the full filterable roster and profile viewer.

- **Partners & Media:** `Partners.tsx` maps 55 logo records from `partners.config.ts` into the draggable left-moving loop. The section heading is “Brands & organizations we’ve worked with,” set in responsive uppercase typography with a FocusTV brand-color rule. All 72 base and theme-specific images live in `public/media/Logos/LOGOS/`; fourteen Dark variants and three Light variants are selected by theme, including both supplied Universal Music Group versions. Keep the approved 64px base height and 64px gap. NetEase, Nissan, PBD Podcast, Silent Hill 2 and Universal Music Group use fixed-width slots so theme changes do not shift their positions. PONG's and DICE's black-canvas Dark variants use screen blending against the dark surface. The section is complete for the current supplied assets; optional future contrast replacements are tracked in `Docs/PROJECT_STATUS.md`.
- **Other Projects:** `src/components/sections/Projects/` uses an asymmetrical pair of 16:9 media frames, an editorial heading and restrained numbered captions. Frames stack on mobile. “There’s more to the story” uses the brand gold for its italic second line. The Gaming Legends and WA Police Vimeo embeds use browser-lazy loading, play muted when each frame enters view, and pause outside view. Vimeo's native player supplies the controls and timeline with the FocusTV gold accent. The browser pointer is visible inside the interactive iframe; the animated FocusTV cursor hides inside it and resumes on the host page. An intentional pause suppresses scroll-triggered autoplay until refresh, and reduced-motion preferences suppress automatic playback. Branding, title and byline are hidden through supported Vimeo settings.
- **Footer:** `src/components/layout/Footer/` combines the conversation CTA, the Header's desktop logo asset in both themes, content navigation, and the client-approved Instagram and email links below the brand note. Mobile/tablet keeps the invitation heading beside the arrow, with “Let's talk” beneath it; Explore links form one centered vertical column. The full-width FocusTV wordmark uses the shared section reveal in both themes and is optically centered at responsive sizes. Contact actions use the existing enquiry routes; no extra contact details or newsletter controls are invented.

### Other Route Compositions

- **The Answer series:** presented in the homepage Story section; there is no separate `/the-answer` route.
- **Cast:** prominent opening profiles, six category controls, full roster and native accessible profile dialog.
- **Crew:** alternating producer compositions, supporting production team and a typographic Sandbox production-company section.
- **Gallery:** curated film posters and interview stills in varied editorial sizes, opened in an accessible media viewer.
- **AI:** minimal type-led Coming Soon treatment, no feature claims or countdown.
- **Contact:** generous title, compact contact details and a straightforward enquiry form with optional meeting fields. Email draft behavior is explained next to the action.

### Shared Motion

`PageMotion` wraps the route `<main>` from the root layout and scopes shared ScrollTrigger reveals; Footer motion is mounted independently. Use `data-reveal` on a single element or `data-reveal-group` on a wrapper whose direct children should stagger. Available variants are `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out` and `soft`. Reveals start close to the viewport, play once, finish on fast scroll, and clear their temporary inline styles when complete. Reduced-motion preferences show the final state immediately. The desktop Cast card deck remains a separate scroll-linked scene; route navigation has no cover transition.

---

## 13. Cast Experience

The Cast page should balance discoverability and prestige.

### Structure

- Opening statement
- Featured / high-profile members
- Category controls
- Full cast grid/list
- Expandable profile interaction

### Card Default Content

- Photo
- Name
- Title and/or company

### Profile Expansion

Possible patterns:

- Modal
- Side drawer
- Full-screen overlay

Preferred direction:
A refined overlay or side drawer that keeps the visitor on the Cast page.

### Filtering

- Fast
- Clear active state
- No page reload
- Smooth but brief animation
- Accessible keyboard interaction

---

## 14. Crew / Production Experience

The Crew page should not look like a corporate employee directory.

Use:

- Editorial composition
- Alternating layouts
- Strong portrait photography
- Production company identity
- Role hierarchy
- Controlled reveal motion

Keep:

- Names
- Roles
- Companies
- Important context

Avoid:

- One repeated card format for every person
- Overly decorative timelines unless the content justifies them

---

## 15. The Answer AI

The page is a teaser only.

Recommended direction:

- Minimal
- Mysterious
- Strong type
- Controlled motion
- Limited content
- Possible abstract visual or subtle branded background

Do not fabricate features, product descriptions, timelines, or claims.

---

## 16. Gallery / Media

The gallery should feel curated.

Possible approach:

- Mixed-size editorial image grid
- Featured large media blocks
- Lightbox / full-screen viewer
- Video thumbnails with explicit play states

Avoid:

- Generic masonry gallery without hierarchy
- Loading every video immediately
- Repetitive identical thumbnails

---

## 17. Contact Experience

The contact page should feel premium and simple.

Core fields:

- Name
- Email
- Phone
- Message

Optional:

- Request a meeting

Potential page structure:

- Short positioning statement
- Form
- Meeting option
- Professional FocusTV contact details
- Relevant social links

The form should not feel like a long lead-generation questionnaire.

---

## 18. Buttons and Links

### Primary CTA

Use for:

- Contact
- Meeting
- Important next action

### Secondary CTA

Use for:

- Learn more
- View cast
- Explore project

### Rules

- Avoid pill buttons everywhere
- Avoid excessive rounded corners
- Use simple geometry
- Hover state should feel intentional
- Underlines may be used for editorial text links
- Focus states must remain visible

---

## 19. Radius and Surface Rules

The site should not look like a collection of floating SaaS cards.

Use radii sparingly.

Possible direction:

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
```

Large media can use subtle radius or no radius depending on composition.

Glassmorphism is not a global design language. It may only be used where it serves a specific interaction.

---

## 20. Background Details

Small details are encouraged, especially in otherwise minimal sections.

Possible details:

- Fine grid lines
- Subtle rules
- Low-opacity text or numbering
- Editorial labels
- Slow background parallax
- Cropped shapes
- Gold line accents
- Section counters
- Fine grain/noise if performance-friendly

Details must remain subtle and not compete with the content.

Avoid:

- Random gradient blobs
- Repeating glow circles
- Decorative objects added only because space looks empty

---

## 21. Motion Language

Motion should feel premium and controlled.

### Main Motion Tools

- Lenis for smooth scrolling
- GSAP
- ScrollTrigger

### Preferred Motion Types

- Directional fade and blur
- Restrained scale/zoom
- Staggered groups where the content benefits from sequence
- Section-specific scroll-linked movement, such as the desktop Cast deck
- Subtle hover or background movement where it supports the interaction

### Rules

- Not every section should animate in the same way
- Avoid 1-second+ animations for ordinary interface interactions
- Motion should not block navigation
- Avoid scroll hijacking
- Maintain responsive performance
- Disable/reduce non-essential motion for `prefers-reduced-motion`

---

## 22. Smooth Scrolling

Smooth scrolling should be inspired by premium automotive websites, but must remain usable.

Requirements:

- Smooth, not slow
- Native-feeling control
- Keyboard navigation must still work
- Anchor links must work
- Touch scrolling must remain natural
- Disable or simplify where the environment requires it
- Avoid forcing users into long scroll-controlled sequences

---

## 23. Custom Cursor

Desktop only.

Possible behavior:

- Native browser cursor hidden
- Custom gold arrow with gold center dot
- Trailing ring with independent smooth lag
- Short, elegant gold dot trail that reduces in size
- Light theme: Gold ring with subtle glow
- Dark theme: White ring with subtle glow
- Interactive state: Custom branded pointer/hand icon

Requirements:

- No custom cursor on touch devices
- Respect user accessibility settings
- Never remove the ability to identify interactive targets
- Keep pointer movement performant
- Avoid oversized or distracting animation

---

## 24. Responsive Strategy

The site is mobile-first.

Primary design validation ranges:

- Small mobile: 320-389px
- Standard mobile: 390-479px
- Large mobile: 480-767px
- Tablet: 768-1023px
- Laptop: 1024-1279px
- Desktop: 1280-1599px
- Large desktop: 1600px+

These are validation ranges, not a requirement to create a breakpoint at every value.

Layouts should change when the content needs it.

---

## 25. Accessibility Design Rules

- Maintain readable contrast in both themes
- Interactive controls require visible focus
- Keyboard users must access navigation and overlays
- Use semantic buttons and links
- Forms require labels
- Do not encode meaning using color only
- Cast modal/drawer requires focus management
- ESC should close overlays where appropriate
- Reduced-motion preference must be supported

---

## 26. Anti-Patterns

Do not introduce:

- Generic AI-generated section templates
- Gradient-heavy visual design
- Repeated glowing cards
- Excessive glassmorphism
- Excessive pill components
- Repeated title + paragraph + three-card layout
- Random badge above every heading
- Huge display text without narrative value
- Decorative 3D/WebGL for no reason
- Scroll effects that delay access to content
- Identical reveal animation across the whole site

---

## 27. Design Review Checklist

Before a section is marked design-approved:

- Does it look appropriate for FocusTV's audience?
- Does it support the page story?
- Is the hierarchy immediately clear?
- Does it work in light theme?
- Does it work in dark theme?
- Is mobile intentionally designed?
- Are details subtle rather than decorative noise?
- Is motion adding value?
- Does the section look distinct from a generic AI template?
- Are images and typography doing most of the visual work?

---

## 28. Change Control

Once a section is approved:

- Treat it as protected
- Do not redesign it while working on another section
- Only modify it when a new requirement affects it
- Record major visual decisions in `DECISIONS.md`
- Update this document if the design system itself changes
