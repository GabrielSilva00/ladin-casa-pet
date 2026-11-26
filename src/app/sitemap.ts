import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cabanapetcafe.com.br";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/agendar`, lastModified: now, priority: 0.9 },
    { url: `${base}/cardapio`, lastModified: now, priority: 0.7 }
  ];
}
