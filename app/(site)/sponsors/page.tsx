import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "Sponsors/Donate",
  description: "Support living history programming through sponsorships, donations, and in-kind contributions.",
  path: "/sponsors"
});

export default function SponsorsPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Sponsors / Donate</h1>
        <p className="mt-2 text-ink/80">
          Sponsorships help fund public educational programming, costuming upkeep, safety equipment, and travel logistics.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { name: "Community Sponsor", desc: "Logo on sponsor page + event mention when applicable." },
            { name: "Heritage Sponsor", desc: "Includes Community benefits + featured recognition at select events." },
            { name: "Presenting Sponsor", desc: "Top placement + coordinated recognition package for partner venues." }
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
              <h2 className="text-base font-semibold">{t.name}</h2>
              <p className="mt-2 text-sm text-ink/80">{t.desc}</p>
              <div className="mt-5 text-xs text-ink/70">Details finalized per event and venue policies.</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-black/10 bg-sand p-6">
          <div className="text-sm font-semibold">Donations</div>
          <div className="mt-2 text-sm text-ink/80">
            Add your donation link here (Stripe, PayPal, Givebutter, etc.). Keep commercial/film fundraising on a separate domain/brand.
          </div>
        </div>
      </Container>
    </section>
  );
}
