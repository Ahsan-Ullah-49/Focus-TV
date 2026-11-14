# Content sources and media

**Last reviewed:** 14 November 2026

The owner authorized use of existing FocusTV material and supplied content for this rebuild. Treat the records below as source notes, not independent confirmation of every claim. Client review of copy, credits, current figures and publication rights remains necessary.

## Content sources

| Area                                   | Source and current location                                                                                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Company introduction and original work | Owner direction and supplied copy; `src/components/sections/Intro/` and `src/components/sections/Projects/projects.config.ts`. The legacy [FocusTV site](https://focustv.tv/) and its [project page](https://focustv.tv/test/) were used as references. |
| Production Services                    | Owner-supplied commercial copy and films; `src/app/production-services/page.tsx`. The Atlas poster is a cropped frame from the supplied film.                                                                                                           |
| About                                  | Owner-supplied introduction, timeline and images; `src/app/about/page.tsx`. The Amazon, founder-with-camera and Perth photographs are the supplied files, not stock substitutes.                                                                        |
| Team                                   | Owner-supplied founder title, order and portraits, plus the [legacy crew page](https://focustv.tv/crew/) and credit sources below; `src/app/crew/page.tsx`.                                                                                             |
| Gallery                                | Owner-supplied interview and behind-the-scenes photographs; `src/components/pages/Gallery/gallery.data.ts`. The grid contains 21 stills followed by 11 BTS images.                                                                                      |
| Contact and footer                     | Existing FocusTV contact information and owner-confirmed recipient and footer channels; `src/components/pages/Contact/contact.config.ts` and `src/components/layout/Footer/`.                                                                           |

The project's visual references, including Bugatti and FleetRise, informed layout and pacing; they are not sources for FocusTV facts. Do not describe logos associated with featured people as confirmed sponsors or production partners without evidence. WA Police cast and related marks remain unconfirmed.

## Team portraits and credits

Team order is Hammad Chaudhry, Alan Lindsay, Hubert Krzysztofik, Daniel Mei-Tal, Rachel Soleil, Wasam Chaudhry and Brett English. Image-generation edits were used to align supplied portrait backgrounds with Brett's grey-wall reference and to colorize Wasam's portrait. Hammad's displayed portrait is the edited version of the supplied photograph; the unused original was removed from the public library in the 14 November cleanup. Alan and Rachel's earlier low-resolution portraits were restored at higher resolution. Do not treat these edits as new source photographs.

The repository's prior source review records these links:

- Alan Lindsay: [Child Soldiers](https://www.imdb.com/title/tt6223480/), [Crazy About You](https://www.imdb.com/title/tt5277030/), [Savage Play](https://www.imdb.com/title/tt0114341/) and [Hell on Ice](https://www.imdb.com/title/tt13617016/).
- Hubert Krzysztofik: the [FocusTV biography](https://focustv.tv/test/) names Ted (2012); [Pinks: All Out](https://www.imdb.com/title/tt0913045/fullcredits/) and [Jurassic World VR Expedition](https://www.imdb.com/title/tt8585878/fullcredits/) have credit records. A client reference to Ted 2 was not verified; the site uses Ted (2012).
- Daniel Mei-Tal: [Avatar](https://www.imdb.com/title/tt0499549/fullcredits/) and [Cirque du Soleil: Worlds Away](https://www.metacritic.com/movie/cirque-du-soleil-worlds-away/credits/); the latter is linked on the site to its [IMDb page](https://www.imdb.com/title/tt1792647/fullcredits/).
- Rachel Soleil: [My Kitchen Rules](https://www.imdb.com/title/tt1626459/fullcredits/) and [Holey Moley](https://www.imdb.com/title/tt10133226/fullcredits/). The credits use the name Rachael Soleil; the approved display name is Rachel Soleil.

The review dates in earlier records do not establish that a linked source or a time-sensitive claim remains current. Recheck before publication.

## Video map

Vimeo IDs and unlisted hashes are public embed identifiers, not account credentials. The current source files are authoritative if a film is changed.

| Placement                   | Vimeo ID     | Hash         |
| --------------------------- | ------------ | ------------ |
| Hero and Automotive Legends | `1074560834` | `8084672e6d` |
| The Answer                  | `1075036022` | `417f274a07` |
| Gaming Legends              | `1090472083` | `f7de1ad21b` |
| WA Police: Tech Reloaded    | `1205405287` | `89f0d3a4ac` |
| Atlas Fuel                  | `1244099030` | `2ff7fdbc96` |
| Beast Philanthropy          | `1004315356` | `25ad4635a2` |
| Danube Group                | `1075036381` | `ba270ecdc4` |

The Answer's current embed was identified in the previous source review as a 1:43 promo; final film approval is pending. Other Vimeo films recorded in earlier work include Rorion Gracie (`1075036197`), Ahmed Amwell (`1075035916`) and Dr. Nakamatsu (`996154729`); they are not Gallery videos in the current implementation. Do not assign a film to a production without confirmation.

## Public image library

All 79 public image files are WebP. Keep shared photographs as one file and update every consumer when moving or replacing one. Counts below describe the 14 November cleanup.

| Folder under `public/media/` | Contents                                  | Files |
| ---------------------------- | ----------------------------------------- | ----- |
| `interviews/`                | Interview stills grouped by documentary   | 21    |
| `behind-the-scenes/`         | BTS photographs                           | 11    |
| `team/`                      | Founder and team portraits                | 7     |
| `editorial/`                 | About and company-story photographs       | 4     |
| `backgrounds/`               | Desktop and mobile contact backdrops      | 2     |
| `posters/`                   | Hero, documentary and commercial posters  | 8     |
| `logos/partners/`            | Project marks and theme-specific variants | 26    |

The supplied FocusTV header/footer artwork and brand guide are under `src/Assets/Logos/Focus TV/`. `src/app/icon.png` is the Next.js app icon. All 21 homepage interview stills have been supplied and are named by person and production.

The old Cast page and directory UI were removed; `/cast` redirects. The homepage still uses entries from `src/components/sections/Projects/featured-voices.data.ts`. Unused directory profiles and their portraits were removed. A future directory would need a new page and approved content and portraits.

## Updating media

1. Confirm the owner has approved the image or film and its intended use.
2. Put a WebP image in the appropriate subject folder, or reuse its existing file. Keep logo variants when different themes need them.
3. Update the relevant data or component and check image dimensions, alt text, crops and both themes. Check dynamic paths as well as literal references.
4. Remove an old file only after confirming it is not used elsewhere. Run the project checks and verify the affected pages in a browser.
