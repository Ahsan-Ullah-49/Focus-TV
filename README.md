# FocusTV website

The FocusTV website presents the company, its documentary productions, commercial work, team and photography. It is a custom Next.js application; it does not use WordPress, a CMS or a database.

This README describes the current codebase as reviewed on 14 November 2026. The site is still under owner review and is not documented here as launched.

## Requirements and setup

Use Node.js 20.9.0 or later and npm. Install the locked dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Google fonts are loaded through `next/font/google`; the build may need access to the font service if they are not cached.

Copy `.env.example` to `.env.local` when configuring contact delivery. `CONTACT_FROM_EMAIL` must be a verified Resend sender and `MAIL_API_KEY` must be a valid Resend API key. Without both, the contact API returns an unavailable response. Never commit real credentials. Canonical URLs use `src/config/site.ts`.

## Pages

| URL                    | Purpose                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `/`                    | Company introduction and The Answer, Automotive Legends, Gaming Legends and WA Police productions |
| `/production-services` | Commercial work for Atlas Fuel, Beast Philanthropy and Danube Group                               |
| `/about`               | Company introduction and five-part timeline                                                       |
| `/crew`                | Founder, team members and selected credit links                                                   |
| `/gallery`             | Interview stills and behind-the-scenes photographs with an image viewer                           |
| `/contact`             | Enquiry form and optional meeting preferences                                                     |

`/cast` and `/meet-the-cast` temporarily redirect to `/production-services`; `/contact-us` permanently redirects to `/contact`. There are no separate Cast or `/the-answer` pages. Cast data used by the homepage remains in the repository; see [content sources](Docs/CONTENT_SOURCES.md).

The home hero has a documented discrepancy: the 8 November owner direction called for click-to-play, but the current component attempts playback when it is ready and visible. Reduced-motion visitors receive the poster. Resolve this with the owner before changing the behavior; see [project status](Docs/PROJECT_STATUS.md).

## Code and content

- `src/app/` contains routes, metadata, the contact API and global styles.
- `src/components/` contains the shared layout, page sections, motion, forms and media components.
- `src/config/site.ts` contains the canonical production URL and default site description.
- `src/config/seo.ts` contains page titles, descriptions, canonicals, social metadata and the shared indexing policy. Server-rendered structured data is under `src/components/seo/`.
- `src/styles/tokens.css` contains the shared theme, type, spacing and motion tokens.
- `public/media/` holds the website's WebP images. Shared images have one canonical file; see [content sources](Docs/CONTENT_SOURCES.md) for the folder map.
- `src/Assets/Logos/Focus TV/` contains the supplied brand artwork and guide. `src/app/icon.png` is the framework site icon.

The homepage project data is in `src/components/sections/Projects/projects.config.ts`; film data for Production Services lives in its page file. Gallery data is in `src/components/pages/Gallery/gallery.data.ts`. Content is maintained in the repository and must be checked against its source before publication.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

For visual changes, also check affected pages at mobile and desktop widths, both themes and reduced motion. Use `npm run format:check` to check formatting. The last documented image cleanup checks and their limits are in [project status](Docs/PROJECT_STATUS.md).

## Deployment and contact delivery

The intended production host is Hostinger, subject to confirming that the selected plan supports the Next.js server, image optimization and the Node contact route. Vercel has been considered for previews. Neither hosting nor live email delivery is confirmed by the repository. See the [deployment guide](Docs/DEPLOYMENT.md) for DNS, Resend and launch checks.

## Project documents

- [Product requirements](Docs/PRD.md)
- [Design document](Docs/DESIGN_DOCUMENT.md)
- [Technical plan](Docs/TECHNICAL_PLAN.md)
- [Development plan](Docs/DEVELOPMENT_PLAN.md)
- [Project status](Docs/PROJECT_STATUS.md)
- [Decision log](Docs/DECISIONS.md)
- [Content sources and media](Docs/CONTENT_SOURCES.md)
- [Deployment guide](Docs/DEPLOYMENT.md)
- [SEO and search visibility](Docs/SEO.md)
- [Changelog](CHANGELOG.md)
- [Repository instructions](AGENTS.md)
