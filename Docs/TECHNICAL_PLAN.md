# Technical plan

**Last reviewed:** 14 November 2026

## Stack and structure

The application uses Next.js 16.3.5 App Router, React 19.2.8 and strict TypeScript. Component styles use CSS Modules; shared tokens and base styles are in `src/styles/` and `src/app/globals.css`. GSAP/ScrollTrigger and Lenis provide animation and scrolling. Versions and scripts are defined in `package.json` and locked by `package-lock.json`.

Routes and metadata are in `src/app/`; the shared layout supplies theme, smooth scrolling, header, footer, cursor and page motion. Prefer Server Components, adding client boundaries for state, browser APIs or interaction. Relevant local Next.js documentation in `node_modules/next/dist/docs/` must be read before changing framework code.

Content is local. Homepage films, cast and logo mappings live in `src/components/sections/Projects/projects.config.ts` and its imported data; Production Services films and About chapters live in their page files; Gallery uses `src/components/pages/Gallery/gallery.data.ts`. See [content sources](CONTENT_SOURCES.md) before editing factual material.

Shared navigation and footer are in `src/components/layout/`; reusable controls are in `src/components/ui/`; providers are in `src/components/providers/`; and page-specific code is under `src/components/pages/`. `src/app/error.tsx` and `src/app/not-found.tsx` provide error and 404 views.

## Theme and motion

`ThemeProvider` persists the visitor's light/dark preference in local storage. A head script applies it early to reduce theme flash. Production Services temporarily sets page palettes and restores the saved theme when leaving.

`SmoothScrollProvider` coordinates Lenis and ScrollTrigger, stops scrolling for open dialogs or the mobile menu, and disables Lenis for reduced motion. Page and editorial reveals are scoped to their components. Production Services and About have additional page-specific motion. Preserve cleanup and reduced-motion handling when editing these systems.

## Images and video

Public website images are WebP under `public/media/`; use the existing image rather than adding a duplicate. See the folder and source map in [content sources](CONTENT_SOURCES.md). Header/footer artwork is imported from `src/Assets/Logos/Focus TV/`; the Next.js site icon is `src/app/icon.png`. `next/image` handles image delivery where used; some interview stills are deliberately unoptimized.

The hero uses an eager Vimeo iframe for visitors without reduced motion, starts playback when ready and visible, and retries muted if audible playback fails. Reduced motion shows the poster. This differs from the owner-directed click-to-play requirement and needs review.

Homepage documentary players use lazy Vimeo iframes, native controls, visibility-based muted playback and a retry/direct-link fallback. Reduced motion prevents automatic playback. Production Services creates a Vimeo iframe after a play click and stops another commercial film when a new one starts. Vimeo access, privacy and embed settings must be verified in a real browser.

## Contact API

`POST /api/contact` accepts JSON from the site's form and sends mail through Resend to `CONTACT_EMAIL` in `contact.config.ts`. The client validates fields, uses an idempotency key and keeps entered details on error. The server checks origin, content type, request size, a honeypot and field values, and applies an in-memory per-client and per-instance limit. These limits are per process and are not a shared distributed rate limiter. No message is stored in a database.

Set `CONTACT_FROM_EMAIL` to a verified sender and `MAIL_API_KEY` to a valid Resend key in the hosting environment. Missing values result in a 503 response. Do not expose the key to client code or commit it. Test real delivery and reply-to behavior before launch.

## SEO and routes

`src/config/site.ts` sets the canonical production URL. `src/config/seo.ts` supplies unique page metadata and the shared indexing policy. `sitemap.ts` lists the six main pages and Gallery images. Set `SITE_INDEXABLE=false` before building a non-Vercel staging deployment; Vercel previews and development are blocked by default.

`src/components/seo/StructuredData.tsx` renders factual JSON-LD on the server. `src/app/opengraph-image.tsx` generates the shared branded social card. This is an image endpoint, not a new website page. See [SEO and search visibility](SEO.md) for the implementation, audit limits and launch actions.

Redirects are defined in `next.config.ts`: `/cast` and `/meet-the-cast` are temporary redirects to `/production-services`; `/contact-us` permanently redirects to `/contact`. Audit other legacy URLs before launch.

The removed `/the-answer-ai` URL returns the site's 404 page and is not listed in the sitemap or navigation.

## Operations and checks

Use `npm ci`, then `npm run dev`. Before completing a meaningful change, run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`; check affected responsive layouts, themes and reduced motion as appropriate. The contact tests mock Resend and do not send email.

Production hosting is planned for Hostinger but compatibility is unverified. Confirm a supported Node runtime, Next.js server and image optimization, environment variables, proxy headers and outbound Resend access before launch. Vercel preview hosting is a plan, not a confirmed deployment. See [deployment guide](DEPLOYMENT.md).
