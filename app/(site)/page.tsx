import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { CTA } from "@/components/sections/CTA";

export const metadata = buildMetadata({
  title: "Home",
  description: "Historically grounded, family-friendly living history programs for museums, schools, and community events.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CTA />
    </>
  );
}
