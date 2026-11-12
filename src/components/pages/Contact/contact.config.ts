export const CONTACT_EMAIL = "hammad@focustv.tv";
export const CONTACT_PAGE_HREF = "/contact";
export const MEETING_CONTACT_HREF = "/contact?enquiry=meeting";
export const CONTACT_FORM_ENDPOINT = "/api/contact";

export const INQUIRY_TYPES = [
  "General enquiry",
  "Partnership & sponsorship",
  "Production enquiry",
  "Guest enquiry",
] as const;
export const MEETING_REQUEST = "Meeting request";

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  timezone: 80,
  message: 1800,
} as const;

export const CONTACT_SOCIALS = [
  {
    label: "The Answer",
    handle: "@the.answer_unlocked",
    href: "https://www.instagram.com/the.answer_unlocked/",
  },
  { label: "Focutivity", handle: "@focutivity", href: "https://www.instagram.com/focutivity/" },
] as const;
