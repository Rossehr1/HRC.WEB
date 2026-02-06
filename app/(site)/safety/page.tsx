import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "Safety & Standards",
  description: "Public-facing safety guidelines, rehearsal requirements, and venue coordination expectations.",
  path: "/safety"
});

export default function SafetyPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Safety & Standards</h1>
        <p className="mt-2 text-ink/80">
          All demonstrations are conducted under professional safety protocols. Never attempt reenactments without training and supervision.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
            <h2 className="text-base font-semibold">Core principles</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li>• Rehearsed blocking and controlled areas</li>
              <li>• Audience boundaries and clear sightlines</li>
              <li>• Designated safety lead on-site</li>
              <li>• Venue policy compliance</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
            <h2 className="text-base font-semibold">Venue coordination</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li>• Pre-event walkthrough when possible</li>
              <li>• Load-in and staging plan</li>
              <li>• Emergency access maintained</li>
              <li>• Clear communication with event staff</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-xs text-ink/70">
          Note: specific weapon/blank policies, distance requirements, and PPE guidance should be documented in an internal SOP and shared with venues as needed.
        </div>
      </Container>
    </section>
  );
}
