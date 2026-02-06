import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "Join",
  description: "Volunteer and member roles: performers, costuming, props, logistics, and safety support.",
  path: "/join"
});

export default function JoinPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Join / Volunteer</h1>
        <p className="mt-2 text-ink/80">
          We welcome performers and non-performing support roles. Training and safety standards apply to all members.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
            <h2 className="text-base font-semibold">Roles</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li>• Performer / interpreter</li>
              <li>• Costuming / wardrobe</li>
              <li>• Props / set dressing</li>
              <li>• Logistics / load-in support</li>
              <li>• Safety officer support</li>
              <li>• Research / script support</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
            <h2 className="text-base font-semibold">New member pathway</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink/80">
              <li>Intro conversation + interests</li>
              <li>Observe a rehearsal or event</li>
              <li>Training + safety orientation</li>
              <li>Shadow role → active participation</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 text-sm text-ink/80">
          To express interest, use the <a href="/contact">Contact</a> form and select "Joining/Volunteer."
        </div>
      </Container>
    </section>
  );
}
