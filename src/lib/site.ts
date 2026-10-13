import type { Metadata } from "next";

export const SITE_URL = "https://finlaycooper.ca";
export const SITE_NAME = "Finlay Cooper";
export const SITE_DESCRIPTION =
  "Software engineer who ships production systems end to end. Full-stack development, production systems, and game dev.";

/**
 * Per-route metadata. Next merges `openGraph` shallowly, and a route that
 * sets it no longer inherits app/opengraph-image.tsx, so the image is named
 * here explicitly.
 */
export function pageMetadata({
  title,
  path,
  description = SITE_DESCRIPTION,
}: {
  title?: string;
  path: string;
  description?: string;
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      description,
      locale: "en_CA",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Finlay Cooper, software engineer",
        },
      ],
    },
  };
}
