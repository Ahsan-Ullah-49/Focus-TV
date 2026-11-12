import type { Metadata } from "next";
import { HomeContact } from "@/components/sections/HomeContact/HomeContact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with FocusTV about productions, partnerships, guest enquiries or a meeting.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <HomeContact />;
}
