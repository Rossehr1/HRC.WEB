import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/constants";

const nav = [
  { href: "/programs", label: "Programs" },
  { href: "/book-us", label: "Book Us" },
  { href: "/join", label: "Join" },
  { href: "/about", label: "About" },
  { href: "/sponsors", label: "Sponsors/Donate" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-paper/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="no-underline">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
              <span className="hidden text-sm text-ink/70 md:inline">•</span>
              <span className="hidden text-sm text-ink/70 md:inline">{SITE.tagline}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm no-underline hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/book-us"
            className="rounded-md bg-oxblood px-3 py-2 text-sm font-medium text-paper no-underline hover:opacity-90"
          >
            Request Booking
          </Link>
        </div>
      </Container>
    </header>
  );
}
