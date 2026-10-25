# Content sources and maintenance

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

- **Other projects:** update title and `video: { kind: "vimeo", id, hash }` or `video: { kind: "file", src, type: "video/mp4" }` in `projects.config.ts`. Vimeo embeds load eagerly and use `preload=auto` to fetch metadata and initial segments with the homepage. Muted autoplay starts when a frame enters view, pauses offscreen, and respects reduced-motion preferences. The native Vimeo player supplies the playback controls and timeline with the FocusTV gold accent; the browser pointer is visible inside the frame while the animated FocusTV cursor hides there. An intentional in-view pause blocks scroll-triggered autoplay until refresh. Hide Vimeo branding, title and byline through embed parameters when the account supports those settings; configure Like and Watch Later in Vimeo's video embed settings. If a local video is used, provide an approved poster in `public/media/`.
- **Cast:** edit the full-directory data for additional profiles/categories. Edit approved homepage `CAST` only when the owner asks to change that protected section. The full directory includes 28 source-backed entries, including organization entries.
- **Crew:** update the seven profiles and Sandbox section in the crew route; avoid conflating production credits with current employment claims.
- **Gallery:** update `galleryFilms` and `galleryStills`, plus local optimized posters. New video players load only after interaction.
- **Contact:** replace `CONTACT_EMAIL` only with the confirmed recipient. The currently published `hammad@darkturquoise-gull-903348.hostingersite.com` appears to be a legacy staging-domain address; its ownership and delivery have not been verified. Social accounts are `the.answer_unlocked` and `focutivity` on Instagram.
- **Homepage footer:** the current approved destinations are Instagram `the.answer_unlocked` and `mailto:hammad@focustv.tv`, in that order. Keep these two icons under the brand note; do not add the other historical Instagram account or Facebook/YouTube without a new client request. The footer uses the same desktop Header logo asset for both themes.
- **Partner logos:** the owner-approved Partners & Media loop contains 55 configured logos, with fourteen Dark variants and three Light variants. It uses a 64px logo height and gap, a draggable left-moving track, and a responsive brand-accent heading. Remaining optional theme-contrast replacements are recorded in `Docs/PROJECT_STATUS.md`. The 72 canonical files and per-logo display settings live in `public/media/Logos/LOGOS/` and `src/components/sections/Partners/partners.config.ts`.

## Before production launch

Confirm final project assets/titles/list; review migrated profiles/credits and Vimeo permissions; confirm recipient and email sending service; check the actual Hostinger plan; approve final content; audit old URLs beyond the two preserved navigation redirects. No production publish or push was requested in this task.
