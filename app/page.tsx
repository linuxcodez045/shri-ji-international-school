import type { Metadata } from "next";
import { headers } from "next/headers";
import SitePage from "./SitePage";
import { siteData } from "./siteData";

const title = "Shriji International School | Chhata, Mathura";
const description =
  "Explore learning, activities and school life at Shriji International School, a CBSE-affiliated Senior Secondary school on Chhata–Barsana Road, Mathura.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title,
    description,
    themeColor: "#1c1917",
    openGraph: {
      type: "website",
      title,
      description,
      siteName: siteData.school.displayName,
      images: [{ url: ogImage, width: 1680, height: 945, alt: "Shriji International School website preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteData.school.displayName,
  url: siteData.school.domainUrl,
  telephone: siteData.school.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chhata–Barsana Road",
    addressLocality: "Chhata Rural, Mathura",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [siteData.school.instagramUrl, siteData.school.facebookUrl],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SitePage />
    </>
  );
}
