export type ProjectVideo =
  | { kind: "vimeo"; id: string; hash?: string }
  | { kind: "file"; src: string; type: "video/mp4" | "video/webm" };

export type StudioProject = {
  id: string;
  title: string;
  subject: string;
  poster?: string;
  video?: ProjectVideo;
};

// The owner supplied both documentary subjects and their Vimeo embed IDs/hashes.
// Keep later project additions here; never infer unprovided titles or media.
export const STUDIO_PROJECTS: StudioProject[] = [
  {
    id: "gaming",
    title: "Gaming Legends",
    subject: "Gaming Legends",
    video: { kind: "vimeo", id: "1090472083", hash: "f7de1ad21b" },
  },
  {
    id: "wa-police",
    title: "WA Police",
    subject: "WA Police",
    video: { kind: "vimeo", id: "1205405287", hash: "89f0d3a4ac" },
  },
];
