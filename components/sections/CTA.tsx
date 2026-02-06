import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function CTA() {
  return (
    <section className="py-12">
      <Container>
        <div className="rounded-2xl border border-black/10 bg-sand p-8 md:flex md:items-center md:justify-between">
          <div>
            <div className="text-xl font-semibold">Planning an event?</div>
            <div className="mt-2 text-sm text-ink/80">
              Send details and we'll respond with availability, requirements, and a recommended program.
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/book-us"
              className="inline-flex rounded-md bg-oxblood px-4 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90"
            >
              Request Booking
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
