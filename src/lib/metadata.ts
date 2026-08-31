import type { Metadata } from "next";

/** Sin esto el openGraph del layout —que describe la home— viaja en todas las páginas. */
export function pageMetadata({
  title,
  description,
  locale,
}: {
  title: string;
  description: string;
  locale: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, locale, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
