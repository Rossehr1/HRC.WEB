import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata = buildMetadata({
  title: "Book Us",
  description: "Request a booking: venue details, audience, program type, and schedule windows.",
  path: "/book-us"
});

export default function BookUsPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Book Us</h1>
        <p className="mt-2 text-ink/80">
          Share the basics and we'll respond with availability, venue requirements, and a recommended program.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <BookingForm />
          </div>
          <aside className="md:col-span-4">
            <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
              <div className="text-sm font-semibold">Venue requirements (high level)</div>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                <li>• Clear performance area + audience boundary</li>
                <li>• Event contact on-site for load-in/run-of-show</li>
                <li>• Safety briefing + compliance with venue policies</li>
              </ul>
              <div className="mt-4 text-xs text-ink/70">
                Detailed requirements depend on the program and venue layout.
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
