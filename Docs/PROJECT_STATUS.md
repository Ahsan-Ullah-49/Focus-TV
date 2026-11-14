# Project status

**Last reviewed:** 14 November 2026

**Stage:** Implementation and owner review

## Current state

The main routes are Home, Production Services, About, Team, Gallery and Contact. The Answer AI page has been removed. `/cast` and `/meet-the-cast` temporarily redirect to Production Services; `/contact-us` permanently redirects to Contact. The Answer's story remains on the homepage.

The homepage contains the FocusTV introduction and four documentary chapters. Production Services contains three commercial case studies. About has a five-chapter timeline. Team contains seven people including the founder. Gallery contains 21 interview stills and 11 behind-the-scenes photographs. Contact submits to a server route when Resend is configured.

The 14 November media cleanup left 79 public WebP images organized by subject. The cleanup removed 29 unused images and retained shared files and the theme-specific logo artwork in use. The unused Cast page and directory UI have been removed; the homepage still uses shared cast data. Restoring a directory would require a new page and approved portraits.

## Known discrepancies

The owner direction recorded on 8 November called for a poster and central play control on the home hero, without autoplay. The current `HeroPlayer.tsx` instead attempts to play when Vimeo is ready and the hero is visible for visitors who allow motion, with a muted fallback if audible playback is blocked. It shows a poster under reduced motion. The code does not currently provide the documented central play button or a direct Vimeo fallback for the hero. Reconcile this with the owner before changing the implementation; the existing direction has not been superseded by this documentation update.

The layout loads Cormorant Garamond, while `tokens.css` sets `--font-serif` to Georgia and its fallbacks. A local production-browser check on 14 November found Georgia as the computed font on the About heading's editorial emphasis. Review the intended font before changing the existing presentation.

## Last checks

Page metadata, social previews, factual structured data and the image sitemap have been added. The approved visible text and design are preserved. Search rankings and live indexing still depend on deployment and search-engine processing. See [SEO and search visibility](SEO.md) for the implementation and Lighthouse limitations.

The contact API has automated tests for successful mock delivery, meeting preferences, request validation, missing configuration, provider failures and per-client rate limiting. The tests do not contact Resend or verify delivery to a real inbox. Deployment, DNS and sender setup are documented in [DEPLOYMENT.md](DEPLOYMENT.md).

During the 14 November image cleanup:

- `npm run lint`, `npm run typecheck` and `npm run build` passed.
- An image audit found 79 referenced public images, all WebP, with no missing references or exact pixel duplicates.
- Chromium loaded images on the six main pages at 375px and 1440px in light and dark themes, with reduced motion enabled. The check found no broken images or horizontal overflow. Vimeo was blocked during that check, so it did not verify live playback.

These results are a snapshot of that work, not a substitute for checking later changes. Native Safari/Firefox and real device testing were not part of that image check.

## Before launch

1. Resolve the hero behavior against the owner direction and confirm current layouts and copy.
2. Configure the verified Resend sender and API key, then test a real enquiry and reply-to in the destination inbox.
3. Check all Vimeo films and embedding permissions on the intended domain and devices. Confirm the final The Answer film and any missing WA Police participants or marks.
4. Confirm the Hostinger plan supports the application, including the Node contact route, image optimization, environment variables and outbound email API requests.
5. Review factual claims, credits, image rights, legacy redirects, SEO and indexing on the actual production and preview environments.
6. Complete cross-browser, device, accessibility and performance checks and obtain launch approval.
