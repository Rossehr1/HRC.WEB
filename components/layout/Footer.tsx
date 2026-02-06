import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-sand">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold">{SITE.name}</div>
            <div className="mt-2 text-sm text-ink/80">{SITE.tagline}</div>
            <div className="mt-4 text-sm text-ink/70">
              Educational performances and living history demonstrations under professional safety protocols.
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Explore</div>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="/programs" className="no-underline hover:underline">Programs</Link>
              <Link href="/safety" className="no-underline hover:underline">Safety & Standards</Link>
              <Link href="/media-kit" className="no-underline hover:underline">Media Kit</Link>
              <Link href="/contact" className="no-underline hover:underline">Contact</Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Contact</div>
            <div className="mt-2 text-ink/80">
              <div>Email: <a className="no-underline hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              {SITE.phone ? <div className="mt-1">Phone: {SITE.phone}</div> : null}
            </div>
            <div className="mt-4 text-xs text-ink/60">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
