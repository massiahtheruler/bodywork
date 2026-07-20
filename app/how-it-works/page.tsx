import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how Miami Bodywork Network collects preferences and routes booking requests to suitable independent providers.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  ["Share your needs", "Tell us your goals, pressure preference, body areas, appointment type and ZIP code."],
  ["Review recommendations", "A rule-based matching engine suggests up to three service paths without diagnosing medical conditions."],
  ["Provider routing", "The request is reviewed for service area, suitability, availability and provider scope."],
  ["Next booking step", "You receive the next step based on the best available provider path."],
] as const;

export default function HowItWorksPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How it works"
          title="A clearer path from body concern to booking request."
          copy="The site is built for qualified lead capture first. It gives visitors enough guidance to choose, then routes the request behind the scenes."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, copy], index) => (
            <article key={title} className="rounded-md border border-tide/16 bg-mist/44 p-5 shadow-sm shadow-water/12">
              <p className="text-sm font-bold text-tide">0{index + 1}</p>
              <h2 className="mt-4 font-serif text-3xl text-leaf">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal-olive/72">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-md bg-leaf p-6 text-bone md:p-8">
          <h2 className="font-serif text-4xl">Independent provider disclosure</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-bone/78">
            Our network of independent licensed providers performs services according to their own availability, service areas and professional scope. The customer experience stays simple while provider routing remains editable in one backend module.
          </p>
          <ButtonLink href="/match" variant="secondary" className="mt-6">
            Start a request
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
