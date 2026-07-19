import type { Metadata } from "next";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Provider Disclosure",
  description: "Provider disclosure for the Miami Bodywork Network matching platform.",
  alternates: { canonical: "/provider-disclosure" },
};

export default function ProviderDisclosurePage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-md border border-charcoal-olive/10 bg-bone/72 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Disclosure</p>
        <h1 className="mt-4 font-serif text-5xl text-charcoal-olive">Independent provider network</h1>
        <p className="mt-5 text-base leading-8 text-charcoal-olive/76">{brand.disclosure}</p>
        <p className="mt-4 text-base leading-8 text-charcoal-olive/76">
          Matching recommendations do not constitute medical advice, diagnosis or treatment. Final provider fit, pricing and appointment availability should be confirmed before booking.
        </p>
      </article>
    </main>
  );
}
