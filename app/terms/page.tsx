import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms placeholder for Miami Bodywork Network.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-md border border-tide/16 bg-mist/44 p-6 shadow-sm shadow-water/12">
        <h1 className="font-serif text-5xl text-leaf">Terms</h1>
        <p className="mt-5 text-base leading-8 text-charcoal-olive/76">
          This placeholder should be replaced with attorney-reviewed terms before launch. It should explain booking requests, provider availability, pricing variability, cancellation handling and the independent provider model.
        </p>
      </article>
    </main>
  );
}
