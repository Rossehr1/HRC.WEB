import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "About",
  description: "Mission, values, and how Historic Reenactors Collaborative, Inc. partners with venues.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="mt-4 text-ink/80">
          Historic Reenactors Collaborative, Inc. is a nonprofit-style living history organization focused on education,
          preservation, and public programming. We collaborate with museums, schools, and community venues to bring
          historically grounded Old West interpretation to audiences of all ages.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Mission</h2>
        <p className="mt-2 text-ink/80">
          Deliver accurate, family-friendly historical programming through storytelling, demonstration, and performance—anchored in safety-first standards.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How we work</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink/80">
          <li>Venue intake (space, audience, schedule, policies)</li>
          <li>Program recommendation + safety requirements</li>
          <li>Performance day run-of-show, load-in, and debrief</li>
        </ol>
      </Container>
    </section>
  );
}
