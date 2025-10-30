import type { MetadataRoute } from "next";

const BASE_URL = "https://ingenierobenech.com.uy";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  return isProd
    ? {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
      }
    : {
        rules: [{ userAgent: "*", disallow: "/" }],
      };
}
