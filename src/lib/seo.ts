// Production origin, used for canonical URLs and social previews.
// Keep in sync with public/robots.txt and public/sitemap.xml.
export const SITE_URL = "https://thijar.com";
export const SITE_NAME = "THIJAR";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageSeo {
  path: string;
  title: string;
  description: string;
}

/** Route `head()` payload: title, description, canonical, Open Graph and Twitter tags */
export function pageHead({ path, title, description }: PageSeo) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: url },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
