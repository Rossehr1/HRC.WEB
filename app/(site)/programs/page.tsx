import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "Programs",
  description: "Living history demonstrations, family-friendly shows, and educational workshops with safety-first protocols.",
  path: "/programs"
});

const programs = [
  {
    title: "Living History Demonstrations",
    bullets: ["Interpretation + Q&A", "Period-correct costuming and props", "Flexible runtime"]
  },
  {
    title: "Family-Friendly Old West Show",
    bullets: ["Scripted, comedic-leaning tone", "Clear educational framing", "Venue requirements apply"]
  },
  {
    title: "Workshops / Talks",
    bullets: ["History, costuming, and research", "Audience-appropriate content", "Ideal for schools and museums"]
  }
];

export default function ProgramsPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Programs</h1>
            <p className="mt-2 text-ink/80">
              Offerings are tailored to your venue, audience, and space. All programming follows safety-first standards.
            </p>
          </div>
          <Link
            href="/book-us"
            className="inline-flex w-fit rounded-md bg-oxblood px-4 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90"
          >
            Request Booking
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {programs.map((p) => (
            <div key={p.title} className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
              <h2 className="text-base font-semibold">{p.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                {p.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <div className="mt-5 rounded-lg border border-black/10 bg-sand p-3 text-xs text-ink/80">
                Safety note: live demonstrations require minimum distances, controlled areas, and trained personnel.
                See <Link href="/safety" className="ml-1">Safety & Standards</Link>.
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
