import type { Metadata } from "next";
import { SITE } from "./constants";

type SeoArgs = {
  title: string;
  description: string;
  path?: string; // e.g. "/programs"
};

export function buildMetadata(args: SeoArgs): Metadata {
  const url = `${SITE.url}${args.path ?? ""}`;
  const fullTitle = `${args.title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description: args.description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: args.description,
      url,
      siteName: SITE.name,
      type: "website"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
