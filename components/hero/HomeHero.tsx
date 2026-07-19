import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="settle max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-clay">
            <Sparkles aria-hidden="true" size={16} />
            Miami bodywork matching
          </p>
          <h1 className="font-serif text-5xl leading-[0.96] text-charcoal-olive sm:text-6xl lg:text-7xl">
            Find the Right Bodywork for What Your Body Needs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-olive/76">
            Tell us what you are experiencing, where you are located and when you are available. We will help connect you with an appropriate licensed provider.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/match">Find My Best Treatment</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Browse Services
            </ButtonLink>
          </div>
        </div>
        <div className="settle relative min-h-[420px] md:min-h-[620px]" style={{ animationDelay: "120ms" }}>
          <div className="hero-media absolute right-0 top-8 h-[72%] w-[82%] overflow-hidden rounded-t-full rounded-b-md shadow-2xl shadow-charcoal-olive/12">
            <Image
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80"
              alt="Calm massage treatment detail with warm linen and natural light"
              fill
              priority
              sizes="(min-width: 768px) 52vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-8 left-0 w-[58%] overflow-hidden rounded-md border border-bone/70 bg-bone/75 p-3 shadow-xl backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80"
                alt="Hands preparing bodywork oils and towels"
                fill
                sizes="(min-width: 768px) 28vw, 58vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-olive/70">
              Editorial media slot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
