/**
 * FocusTV Hero Video Configuration
 *
 * Centralized settings for the cinematic Hero video player.
 *
 * TO REPLACE THE VIDEO IN THE FUTURE:
 * 1. Change `videoId` to the new Vimeo video ID.
 * 2. Change `hash` to the new unlisted privacy hash parameter (?h=...).
 * 3. Update `posterSrc` if a new preview image is provided.
 * 4. All URL parameters and player listeners will synchronize automatically.
 */

export const heroConfig = {
  // ── Video Identification ────────────────────────────────────────────────────
  videoId: "1074560834",
  hash: "8084672e6d",
  appId: "58479",
  playerId: "0",

  // ── Source URLs & Assets ────────────────────────────────────────────────────
  vimeoOrigin: "https://player.vimeo.com",
  videoUrl: "https://vimeo.com/1074560834/8084672e6d",
  posterSrc: "/media/hero/focustv-Hero-poster.png",
  title: "The Answer — The Birth of the Automobile",

  // ── Playback Settings ───────────────────────────────────────────────────────
  autoplay: true,
  muted: true,
  loop: true,
  playsinline: true,
  unmuteVolume: 0.8, // Volume restored when user clicks unmute (0.0 to 1.0)

  // ── Player Chrome Restrictions ──────────────────────────────────────────────
  // Kept hidden so the custom liquid-glass controls drive playback
  hideControls: true,
  hideTitle: true,
  hideByline: true,
  hidePortrait: true,
  hideBadge: true,
  autopause: false,
  transparent: true,
} as const;

/**
 * Builds the Vimeo embed iframe URL with all query parameters configured.
 */
export function buildVimeoEmbedUrl(): string {
  const params = new URLSearchParams({
    h: heroConfig.hash,
    badge: heroConfig.hideBadge ? "0" : "1",
    autopause: heroConfig.autopause ? "1" : "0",
    player_id: heroConfig.playerId,
    app_id: heroConfig.appId,
    autoplay: heroConfig.autoplay ? "1" : "0",
    muted: heroConfig.muted ? "1" : "0",
    loop: heroConfig.loop ? "1" : "0",
    playsinline: heroConfig.playsinline ? "1" : "0",
    controls: heroConfig.hideControls ? "0" : "1",
    title: heroConfig.hideTitle ? "0" : "1",
    byline: heroConfig.hideByline ? "0" : "1",
    portrait: heroConfig.hidePortrait ? "0" : "1",
    transparent: heroConfig.transparent ? "1" : "0",
    background: "0",
    api: "1", // Enables postMessage Player API communication
    color: "000000",
  });

  return `${heroConfig.vimeoOrigin}/video/${heroConfig.videoId}?${params.toString()}`;
}
