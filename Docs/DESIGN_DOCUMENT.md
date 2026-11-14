# Design document

**Last reviewed:** 14 November 2026

## Direction

FocusTV should feel cinematic, editorial and clear. Photography, film, typography and spacing carry the design. Use decorative effects sparingly and preserve approved compositions rather than redesigning them during unrelated work.

The supplied brand guide is `src/Assets/Logos/Focus TV/Branding/focus tv guidlines 2 (2).pdf`. Use the provided logo artwork. Poppins is the main typeface. The layout loads Cormorant Garamond, but the current shared serif token resolves to Georgia and its fallbacks; check the rendered typography before changing it. The shared palette uses `#CB840A` for brand gold and `#A58535` for the logo-gold/hover reference. Theme values and spacing live in `src/styles/tokens.css`.

## Theme and layout

Light is the default; visitors can select dark and their preference is saved locally. Header, footer, controls and page content must work in both. Production Services also uses temporary chapter palettes; these must not overwrite the saved preference.

Use existing container widths, page gutters and CSS Modules. Check mobile, tablet, desktop and large screens when a change affects layout. Keep headings, controls and important content visible without horizontal overflow.

The shared header provides desktop navigation and a mobile menu. The footer keeps the approved invitation, navigation, Instagram and email links. Preserve their responsive layouts and existing logo treatment when working on other sections. Use the shared button components and theme tokens for new controls.

## Current page treatments

- **Home:** full-viewport film hero, company story and four documentary chapters. Each chapter uses its own approved media, copy and, where supplied, featured voices and related marks. Automotive and gaming marks use separate draggable loops.
- **Production Services:** commercial case studies with film posters, click-to-play video and scroll-linked chapter imagery and palettes.
- **About:** text introduction and five illustrated timeline chapters, starting with the 2018 marker.
- **Team:** founder introduction followed by a portrait grid and selected IMDb links.
- **Gallery:** interview stills followed by authored behind-the-scenes rows, with a keyboard-operable image viewer. There is no category filter.
- **Contact:** responsive image backdrop and an in-page enquiry form with optional meeting fields.

The hero's approved click-to-play direction and current autoplay attempt differ. Do not assume either is a new approval; see [project status](PROJECT_STATUS.md).

## Motion and interaction

Lenis provides smooth scrolling and GSAP/ScrollTrigger handles scoped animation. The shared reveal system, editorial reveals, About timeline and Production Services motion have distinct roles. Use the existing behavior when changing these areas and clean up listeners, observers and animations.

Respect `prefers-reduced-motion`: do not rely on motion to reveal content. The custom cursor is for fine-pointer devices and yields to native interaction over video, inputs and dialogs. Maintain keyboard access, clear focus and usable touch controls.

Avoid repetitive reveals, unnecessary glow, excessive card treatments and effects that obscure content. Do not add scroll-jacking or long blocking transitions. Review image crops and interactions on small screens as well as desktop.

## Assets

Keep public photographs and posters as WebP, reuse the same image file wherever it appears, and preserve original image proportions and approved crops. Store files in the existing `public/media/` subject folders. The logo artwork and app icon have separate locations; see [content sources](CONTENT_SOURCES.md).
