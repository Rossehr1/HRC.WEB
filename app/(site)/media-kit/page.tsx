import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({
  title: "Media Kit",
  description: "Logos, boilerplate, approved photos, and press contact information.",
  path: "/media-kit"
});

export default function MediaKitPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Media Kit</h1>
        <p className="mt-2 text-ink/80">
          Provide approved assets for partners and press. Add downloadable PDFs and image packages in /public/media-kit.
        </p>

        <div className="mt-8 rounded-xl border border-black/10 bg-paper p-6 shadow-sm">
          <div className="text-sm font-semibold">Downloads</div>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            <li>• One-sheet PDF (placeholder)</li>
            <li>• Logos (placeholder)</li>
            <li>• Approved photos (placeholder)</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
