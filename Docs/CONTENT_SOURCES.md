# Content sources and maintenance

## About, Gallery and Team revisions — 14 November 2026

The owner supplied `public/media/about/Amazon.webp`, `public/media/about/Founder.webp`, `public/media/editorial/Perth.webp`, `public/media/crew/Hammad.webp` and all eleven photographs in `public/media/New BTS/`. About has a text-only hero, the owner-confirmed 2018 start marker, Amazon in chapter one, the camera-side founder photograph in chapter two, a smaller complete Steve Wozniak image in chapter three, Patrick Bet-David/Naveen Jain/Franz von Holzhausen BTS shots in chapter four, and Perth in chapter five. Following the owner's correction, About images use their intrinsic proportions with the existing rounded corners and shadow; fixed-ratio containers, borders and background bands are removed. The 2018 marker is 32px lower at desktop and mobile sizes.

Gallery retains all 21 original interview stills first, in their existing Steve-first order and original grid styling. All eleven new BTS photos follow below them: Steve Wozniak, Patrick Bet-David, Naveen Jain, Mohamed Hadid, Aubrey Marcus, Franz von Holzhausen, Chris Bangle, Jason Cammisa and Sasha Selipanov. Five authored rows use column widths proportional to the image ratios, aligning top and bottom edges without cropping or empty cells. The eight landscapes stay 16:9 and the three square photos stay 1:1. Narrow mobile screens stack the BTS photographs at full width. The viewer retains the same 32-photo sequence. The owner's subsequent hover request applies the same zoom to both Gallery groups and a thin moving gold edge to every Gallery photo. About photographs have a subtle gold outline drawn over the image edge. These decorations do not change layout dimensions; Gallery zoom and border motion are disabled for reduced-motion preferences.

Additional Team credit links were checked on 14 November 2026:

- Alan Lindsay: [Savage Play](https://www.imdb.com/title/tt0114341/) and [Hell on Ice](https://www.imdb.com/title/tt13617016/) list him as director.
- Hubert Krzysztofik: [Jurassic World VR Expedition](https://www.imdb.com/title/tt8585878/fullcredits/) lists him as director of technical operations.
- Daniel Mei-Tal: [Cirque du Soleil: Worlds Away's full credits](https://www.metacritic.com/movie/cirque-du-soleil-worlds-away/credits/) name him as assistant to James Cameron; its displayed link points to the [corresponding IMDb title](https://www.imdb.com/title/tt1792647/fullcredits/).
- Rachel Soleil: IMDb's [My Kitchen Rules](https://www.imdb.com/title/tt1626459/fullcredits/) and [Holey Moley](https://www.imdb.com/title/tt10133226/fullcredits/) credits list her as **Rachael Soleil**, post producer. The approved display name stays Rachel Soleil. These are screen credits, not award claims. No further unverified titles or awards were added.

The IMDb label and linked titles are enlarged. Brett English's original portrait is the background reference for the other team portraits. Team's founder portrait now uses the newly supplied `public/media/crew/Hammad.webp`, with the grey wall background edit saved to `public/media/crew/founder.webp`; the supplied source remains intact. Wasam's portrait is now colorized. Built-in imagegen performed these edits, and the selected results were encoded as lossless WebP in the existing crew assets. The other edited portraits remain `public/media/crew/alan-lindsay.webp`, `hubert-krzysztofik.webp`, `daniel-mei-tal.webp`, `rachael-soleil.webp` and `wasam-chaudhry.webp`.

Initial portrait prompt set (one edit per team member, original portrait as image 1 and Brett as image 2; Wasam's monochrome treatment was subsequently replaced by the color edit below):

> Use case: identity-preserve. Asset type: Focus TV team portrait background replacement. Image 1 is the EDIT TARGET portrait; image 2 (Brett English) is a BACKGROUND STYLE REFERENCE ONLY. Replace ONLY the background of image 1 with the same clean charcoal-grey horizontal exterior wall panels visible behind Brett in image 2. Match the soft grey lighting and quiet panel spacing; no extra objects or text. Preserve the target person's exact identity, face, expression, gaze, skin texture, hair, hat if present, eyeglasses, headphones, pose, hands, clothing and any held award exactly. Keep target subject framing and scale; show all of the original subject without trimming their head or shoulders. Do not borrow Brett's face or clothes. Do not beautify, retouch skin, change age or invent features. Retain any existing monochrome treatment of the target. Remove the original background cleanly around hair and clothing; no halos. Keep the target image's original aspect ratio and deliver a sharp high-resolution photographic edit.

Follow-up founder prompt (`crew/Hammad.webp` as the edit target, Brett as the background reference; output `crew/founder.webp`):

> Use case: identity-preserve. Edit target: image 1, the supplied square Hammad Chaudhry portrait seated in a dark blazer and light shirt before a red curtain. Image 2, Brett English, is a BACKGROUND STYLE REFERENCE ONLY. Replace only the red curtain background of image 1 with the clean charcoal-grey horizontal wall panels from image 2, matching the other Focus TV team portraits. Preserve Hammad's precise face and identity, age, smile, teeth, eyes, hair, beard, pose, skin texture, clothing, seated posture and the complete original square framing. Do not beautify or change his facial features, expression, body or clothes. No cropping or zooming, no new objects, no text, no added people. Realistic photo edit, clean subject edges, sharp full-resolution output. Keep the original 1:1 aspect ratio.

Follow-up Wasam prompt (existing grey-wall Wasam portrait as the edit target, Brett as the background reference; output `crew/wasam-chaudhry.webp`):

> Use case: identity-preserve. Edit target image 1: Wasam Chaudhry's existing monochrome team portrait in a dark textured suit jacket and white open-collar shirt, hands in pockets, against horizontal grey wall panels. Colorize ONLY the person naturally. Keep a realistic medium warm-brown skin tone, dark brown eyes, black hair and beard, charcoal-black jacket, white shirt, subdued dark pocket square. Preserve the exact same facial identity, face geometry, expression, hairstyle, beard, skin detail, pose, hands, clothes, seams, lapel pin, body proportions, camera angle, framing and source aspect ratio. Do not change the background layout, panel spacing or subject shape. Image 2 is only the wall-color and photographic-style reference for continuity with the Focus TV team. Keep the background a neutral charcoal-grey matching Brett's wall, and retain soft natural photographic lighting. No new objects, no face retouching or beautification, no cropping, no text. Deliver a sharp color photograph.

## Interview still organization — 12 November 2026

The 21 original featured-voice stills now live in `public/media/Stills/the-answer/`, `automotive-legends/` and `gaming-legends/`. Filenames identify their project order and person. Harada and Fawzi use the newly supplied originals, replacing their promotional artwork. Shared source mappings update all homepage, directory, profile and gallery consumers. The old numbered `optimized/` paths below are historical; the complete rename map is in `MISSING_INTERVIEW_STILLS.md`. All homepage featured-voice stills have now been supplied.

## Asset cleanup — 12 November 2026

Current runtime images use WebP, including transparent logos and header/footer artwork; `src/app/icon.png` remains the small framework favicon. The supplied brand-guide PDF is retained as project documentation. The homepage uses only the active project logo groups; unused logo artwork, duplicate branding files and the unrendered Atlas assets were removed. Theme variants, image dimensions and display settings are preserved. Missing active Crew, Gallery and cast source photographs were restored from the committed originals to avoid broken pages.

The Answer now embeds official Vimeo `1075036022` (`417f274a07`), verified by oEmbed as **The Answer - Turning Thoughts Into Reality** (103 seconds). Its local MP4, the obsolete compression script and the unused `ffmpeg-static` dependency were removed. Film posters remain local WebP thumbnails. Historical asset paths below describe earlier versions and may refer to files removed or converted during this cleanup. Current paths are authoritative in the source config files.

New-still mappings and outstanding owner confirmations are tracked in `MISSING_INTERVIEW_STILLS.md`.

## Owner-directed revision — 7 November 2026

The owner identifies the hero film as Automotive Legends and requests automotive, gaming and WA Police documentary chapters on the company homepage. The legacy [FocusTV project page](https://focustv.tv/test/) groups automotive and gaming participants separately. Displayed brand marks are associated with featured participants; they are not presented as verified production partners. WA Police cast and marks remain unconfirmed. Official artwork and the four-page brand guide are in `src/Assets/Logos/Focus TV/`.

Updated 26 October 2026. The owner authorized reuse of content and images from the existing FocusTV site for this redesign. This records implementation sources; final client copy review is still pending.

## Source records

| Area                                        | Source                                                                                                                | Local implementation                                                                    |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Homepage story and featured cast            | Previously approved local content and owner assets                                                                    | `src/components/sections/Intro/`, `src/components/sections/Cast/cast.config.ts`         |
| The Answer synopsis and series details      | [Existing homepage](https://focustv.tv/) and approved Story copy                                                      | `src/components/sections/Intro/`; series preview remains on the homepage                |
| Full cast                                   | [Meet the Cast](https://focustv.tv/meet-the-cast/) plus approved local 14                                             | `src/components/pages/CastDirectory/cast-directory.data.ts`; `public/media/cast-extra/` |
| Crew and production company                 | [Crew](https://focustv.tv/crew/)                                                                                      | `src/app/crew/page.tsx`; `public/media/crew/`                                           |
| Gallery films                               | Six Vimeo embeds from the existing homepage; titles, durations and posters from the same films' Vimeo oEmbed metadata | `src/components/pages/Gallery/gallery.data.ts`; `public/media/gallery/`                 |
| Gallery interview stills                    | Six selections from approved local cast images                                                                        | `public/media/Stills/optimized/`                                                        |
| Contact and social links                    | [Contact page](https://focustv.tv/contact-us/) and original homepage footer                                           | `src/components/pages/Contact/contact.config.ts`                                        |
| Homepage footer channels and treatment      | Client's 26 October confirmation and supplied footer references                                                       | `src/components/layout/Footer/Footer.tsx`; Instagram and `mailto:hammad@focustv.tv`     |
| Other Projects subjects                     | Owner's request, 23 October 2026                                                                                      | `src/components/sections/Projects/projects.config.ts`                                   |
| Gaming Legends video                        | Vimeo embed supplied by the owner, 25 October 2026; ID `1090472083`, hash `f7de1ad21b`                                | `src/components/sections/Projects/projects.config.ts`; `VimeoProjectPlayer.tsx`         |
| WA Police video                             | Vimeo embed supplied by the owner, 25 October 2026; ID `1205405287`, hash `89f0d3a4ac`                                | `src/components/sections/Projects/projects.config.ts`; `VimeoProjectPlayer.tsx`         |
| Footer design direction                     | Owner screenshots; [Bugatti](https://www.bugatti.com/en)                                                              | `src/components/layout/Footer/`                                                         |
| Editorial spacing and interaction direction | [FleetRise Logistics](https://fleetriselogistics.com/) and existing approved FocusTV design                           | Scoped page/section styles and `PageMotion`                                             |

Original WordPress HTML was inspected as source material only. Legacy lorem ipsum, newsletter form and dated business metrics were not carried over. A downloaded image labelled as a potential Sandbox studio image proved to be an unrelated event flyer and was removed unused.

## Film map

| Vimeo ID   | Display title                                                       | Access hash | Duration     |
| ---------- | ------------------------------------------------------------------- | ----------- | ------------ |
| 1074560834 | The Birth of the Automobile — existing approved hero/series preview | 8084672e6d  | Not asserted |
| 1075036022 | Turning Thoughts Into Reality                                       | 417f274a07  | 1:43         |
| 1004315356 | Beast Philanthropy                                                  | 25ad4635a2  | 2:30         |
| 1075036381 | Rizwan Sajan (Danube Group)                                         | ba270ecdc4  | 2:11         |
| 1075036197 | Rorion Gracie                                                       | df3374554c  | 2:07         |
| 1075035916 | Ahmed Amwell                                                        | 36cd6f698c  | 1:16         |
| 996154729  | Dr. Nakamatsu                                                       | aaeb75791c  | 1:03         |

Do not assign these films to the new Gaming or WA Police slots without client confirmation. Their identities were not verified as either requested project. Public embed hashes are media identifiers, not private account credentials.

## Maintenance

### Active asset folders after cleanup (25 October 2026)

Only runtime media copies are retained. The 42 original PNGs directly in `public/media/Logos/`, 14 SVGs directly in `public/media/Stills/`, unused `src/Assets/Logos/favicon.png`, and duplicate logo-source files were removed at the owner's request. After removing four media logos, the owner supplied nine Dark and one Light variant, then sent two logo collections and six theme-specific replacements. We retained 18 additional marks and one additional Universal Music Group theme file; duplicate Danube Group artwork was consolidated into a single entry. The current logo set has 55 marks and 72 image files in one folder. The current `public/` tree has 115 files and is approximately 21.12 MiB, down from 47.25 MB before cleanup; previous Git history has not been rewritten.

| Active location                  | Used by                                                                  | Files |
| -------------------------------- | ------------------------------------------------------------------------ | ----- |
| `public/media/Logos/LOGOS/`      | 55 base logos and 17 theme-specific logo files                           | 72    |
| `public/media/Stills/optimized/` | Our Proud Cast, cast directory, series and gallery                       | 14    |
| `public/media/cast-extra/`       | Additional cast profiles                                                 | 14    |
| `public/media/crew/`             | Crew portraits                                                           | 7     |
| `public/media/gallery/`          | Film preview posters                                                     | 6     |
| `public/media/hero/`             | Hero, series and Story imagery                                           | 2     |
| `src/Assets/Logos/`              | Header brand marks; footer reuses the desktop Header logo in both themes | 2     |
| `src/app/icon.png`               | Browser/site icon, Next.js metadata convention                           | 1     |

Keep configured filenames and intrinsic dimensions synchronized when replacing or removing logos. `partners.config.ts` maps each base, Dark or Light filename from the single `LOGOS/` folder. Preserve the supplied brand colors. Do not recolor assets globally. Keep user-provided filenames as canonical lowercase brand slugs, with `-dark` or `-light` on theme variants.

### Updating content

- **Other projects:** update title and `video: { kind: "vimeo", id, hash }` or `video: { kind: "file", src, type: "video/mp4" }` in `projects.config.ts`. Vimeo embeds use browser-lazy loading; muted autoplay starts when a frame enters view, pauses offscreen, and respects reduced-motion preferences. The native Vimeo player supplies the playback controls and timeline with the FocusTV gold accent; the browser pointer is visible inside the frame while the animated FocusTV cursor hides there. An intentional in-view pause blocks scroll-triggered autoplay until refresh. Hide Vimeo branding, title and byline through embed parameters when the account supports those settings; configure Like and Watch Later in Vimeo's video embed settings. If a local video is used, provide an approved poster in `public/media/`.
- **Cast:** edit the full-directory data for additional profiles/categories. Edit approved homepage `CAST` only when the owner asks to change that protected section. The full directory includes 28 source-backed entries, including organization entries.
- **Crew:** update the seven profiles and linked IMDb titles in the crew route; preserve the owner-approved order. The Sandbox section and descriptive biographies were removed at the owner's request.
- **Gallery:** update `galleryPhotos` and `galleryCategories`; use verified photographs only. The gallery now has image filtering and a still-image lightbox, with no film player.
- **About:** update the owner-supplied introduction and five chapters in `src/app/about/page.tsx`. The timeline uses the existing artwork and photographs with literal image descriptions.
- The approved Contact recipient is `hammad@focustv.tv`. Social accounts are `the.answer_unlocked` and `focutivity` on Instagram.
- **Homepage footer:** the current approved destinations are Instagram `the.answer_unlocked` and `mailto:hammad@focustv.tv`, in that order. Keep these two icons under the brand note; do not add the other historical Instagram account or Facebook/YouTube without a new client request. The footer uses the coloured FocusTV logo variants for light and dark surfaces.
- **Partner logos:** the owner-approved Partners & Media loop contains 55 configured logos, with fourteen Dark variants and three Light variants. It uses a 64px logo height and gap, a draggable left-moving track, and a responsive brand-accent heading. Remaining optional theme-contrast replacements are recorded in `Docs/PROJECT_STATUS.md`. The 72 canonical files and per-logo display settings live in `public/media/Logos/LOGOS/` and `src/components/sections/Partners/partners.config.ts`.

## Before production launch

Confirm final project assets/titles/list; review migrated profiles/credits and Vimeo permissions; confirm recipient and email sending service; check the actual Hostinger plan; approve final content; audit old URLs beyond the two preserved navigation redirects. No production publish or push was requested in this task.

## Production Services — 12 November 2026

The commercial production copy is transcribed from the owner-supplied client messages. Atlas Fuel uses original Focus TV Vimeo film `1244099030` (access hash `2ff7fdbc96`). The current poster, `public/media/production-services/atlas-laboratory-logo.webp`, is the opening laboratory-door logo shot at 1 second: extracted from the original film and cropped to 16:9 after removing the encoded letterbox bars, keeping the Atlas logo in view. Beast Philanthropy and Danube Group retain the verified Vimeo IDs and stills listed above. The temporary page palettes follow the visitor's saved preference: light → Atlas green → gold → dark → light, or dark → Atlas green → gold → light → dark. Automatic changes never overwrite that saved preference.

## About, Team and Gallery — 13 November 2026

The owner-supplied client messages provide the About introduction and all five timeline chapters, the founder title, team order, Gallery categories and removals. About reuses current project artwork, the founder portrait, identifiable interview stills and the existing production photograph. No photograph is labelled as the Amazon rainforest or original backyard studio. Gallery uses the production photograph, Aubrey Marcus, Li Wei of NetEase Games and the existing Hammad/Dr. Nakamatsu interview still; no stock photography or substitute identities are introduced.

The compact Aubrey and NetEase WebP files are served directly in both the Gallery grid and its lightbox, avoiding a redundant runtime encoding step. Larger BTS photographs retain Next.js image optimization.

The team order is Hammad Chaudhry, Alan Lindsay, Hubert Krzysztofik, Daniel Mei-Tal, Rachel Soleil, Wasam Chaudhry and Brett English. Existing named portraits are retained. The [original crew page](https://focustv.tv/crew/) supplies the established roles and confirms Daniel's Avatar work. IMDb records back Alan's [Child Soldiers](https://www.imdb.com/title/tt6223480/) and [Crazy About You](https://www.imdb.com/title/tt5277030/) credits. Hubert's [Focus TV biography](https://focustv.tv/test/) names **Ted (2012)**, while [IMDb's Pinks: All Out credits](https://www.imdb.com/title/tt0913045/fullcredits/) name him as an on-line editor. The client wrote “Ted 2”; that sequel could not be verified, so the supported Ted (2012) title is used and the discrepancy has been reported to the owner. Credit links point to the corresponding IMDb records, without adding new biographical paragraphs.

About Us replaces The Answer AI in the shared navigation and sitemap. The existing AI route remains accessible for old bookmarks; the request removes its navigation tab. The homepage and Production Services content are preserved.

## Editorial motion and asset refinement — 13 November 2026

About’s cinematic hero uses a 1920×1080 frame from the existing Focus TV footage of Hammad Chaudhry with Dr. Nakamatsu; its chapter-five image is a 1920×1080 Dubai skyline frame from the verified Danube documentary. Chapter one retains the supplied 1920×1080 _The Answer_ artwork and displays it uncropped. The scroll treatment uses the approved GSAP stack with scoped, reversible reveals and reduced-motion fallbacks.

The original Alan Lindsay and Rachel Soleil crew files were 282×329 and 275×319 pixels respectively. Identity-preserving restoration created higher-resolution WebP versions (1161×1355 and 1164×1351) from those same supplied portraits; no person, credit or role was changed. Their framed treatment is CSS-only.

Gallery filtering was removed at the owner’s request. The grid presents the supplied square interview stills only, ordered with the owner-requested featured names first; Steve Wozniak is again the first Gallery portrait.
