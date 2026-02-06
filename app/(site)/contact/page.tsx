import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Historic Reenactors Collaborative, Inc. for bookings, partnerships, and membership inquiries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-ink/80">For bookings, partnerships, media, or joining/volunteering.</p>
        <div className="mt-8 max-w-2xl">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
