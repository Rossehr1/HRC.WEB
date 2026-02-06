import { Container } from "@/components/layout/Container";

const items = [
  {
    title: "Historically Grounded",
    body: "Programs are built around research, costuming, period-correct detail, and clear educational context."
  },
  {
    title: "Family-Friendly",
    body: "Appropriate for museums, festivals, schools, and public venues—without sensationalism."
  },
  {
    title: "Safety-First",
    body: "Professional safety policies, rehearsed blocking, and venue requirements to protect performers and audiences."
  }
];

export function ValueProps() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((x) => (
            <div key={x.title} className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
              <div className="text-base font-semibold">{x.title}</div>
              <p className="mt-2 text-sm text-ink/80">{x.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
