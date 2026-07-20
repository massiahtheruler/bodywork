import Image from "next/image";
import { Sparkles } from "lucide-react";
import { FloatOnScroll, TiltLift } from "@/components/motion/Float";
import { ButtonLink } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="max-w-2xl">
          <FloatOnScroll depth={8}>
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-tide">
              <Sparkles aria-hidden="true" size={16} />
              Miami bodywork matching
            </p>
          </FloatOnScroll>
          <FloatOnScroll depth={11} delay={0.12}>
            <h1 className="font-serif text-5xl leading-[0.96] text-leaf sm:text-6xl lg:text-7xl">
              Find the Right Bodywork for What Your Body Needs.
            </h1>
          </FloatOnScroll>
          <FloatOnScroll depth={9} delay={0.22}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-olive/76">
              Tell us what you are experiencing, where you are located and when you are available. We will help connect you with an appropriate licensed provider.
            </p>
          </FloatOnScroll>
          <FloatOnScroll depth={7} delay={0.32}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/match">Find My Best Treatment</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Browse Services
              </ButtonLink>
            </div>
          </FloatOnScroll>
        </div>
        <div className="relative min-h-[420px] md:min-h-[620px]">
          <FloatOnScroll className="absolute right-0 top-8 h-[72%] w-[82%]" depth={24} delay={0.18}>
            <TiltLift intensity={3} className="hero-media h-full overflow-hidden rounded-t-full rounded-b-md shadow-2xl shadow-charcoal-olive/18">
              <Image
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80"
                alt="Calm massage treatment detail with warm linen and natural light"
                fill
                priority
                sizes="(min-width: 768px) 52vw, 90vw"
                className="object-cover"
              />
            </TiltLift>
          </FloatOnScroll>
          <FloatOnScroll className="absolute bottom-8 left-0 w-[58%]" depth={32} delay={0.36}>
            <TiltLift intensity={4} className="overflow-hidden rounded-md border border-bone/70 bg-bone/78 p-3 shadow-2xl shadow-charcoal-olive/18 backdrop-blur">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80"
                  alt="Hands preparing bodywork oils and towels"
                  fill
                  sizes="(min-width: 768px) 28vw, 58vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-leaf/72">
                Editorial media slot
              </p>
            </TiltLift>
          </FloatOnScroll>
        </div>
      </div>
    </section>
  );
}
