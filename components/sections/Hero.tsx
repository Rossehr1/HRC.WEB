import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Living history for museums, schools, and community events
            </h1>
            <p className="mt-4 text-lg text-ink/80">
              Historic Reenactors Collaborative, Inc. delivers historically grounded, family-friendly Old West
              interpretation through scripted demonstrations, education, and storytelling—built on safety-first standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-us"
                className="rounded-md bg-oxblood px-4 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90"
              >
                Book a Show
              </Link>
              <Link
                href="/join"
                className="rounded-md border border-black/15 bg-paper px-4 py-2.5 text-sm font-medium no-underline hover:bg-black/5"
              >
                Join / Volunteer
              </Link>
            </div>
            <div className="mt-6 text-sm text-ink/70">
              Clear separation: nonprofit education programs are presented here; commercial film promotions should remain on separate brand properties.
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
              <div className="text-sm font-semibold">Quick Facts</div>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                <li>• Historically grounded scripts & interpretation</li>
                <li>• Family-friendly tone for public venues</li>
                <li>• Safety-first weapon/blank protocols</li>
                <li>• Flexible formats: demos, shows, workshops</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
