import { pageMetadata } from "@/config/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { HomeContact } from "@/components/sections/HomeContact/HomeContact";

export const metadata = pageMetadata("/contact");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ enquiry?: string | string[] }>;
}) {
  const query = await searchParams;
  return (
    <>
      <PageStructuredData path="/contact" />
      <HomeContact initialMeeting={query.enquiry === "meeting"} />
    </>
  );
}
