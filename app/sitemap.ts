import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = [
    "",
    "/about",
    "/programs",
    "/book-us",
    "/join",
    "/sponsors",
    "/safety",
    "/media-kit",
    "/contact"
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
