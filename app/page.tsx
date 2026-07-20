import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { featuredServices, services } from "@/data/services";
import { HomeHero } from "@/components/hero/HomeHero";
import { HomeMatchPrimer } from "@/components/matching/HomeMatchPrimer";
import { FloatOnScroll, TiltLift } from "@/components/motion/Float";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { organizationJsonLd } from "@/lib/seo/structured-data";

const spotlightIds = ["piezowave", "emf", "red-light", "tmj", "reflexology", "facial-contour"];
const spotlightServices = services.filter((service) => spotlightIds.includes(service.id));

export default function Home() {
  return (
    <main>
      <JsonLd data={organizationJsonLd()} />
      <HomeHero />

      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="home-match-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Custom match"
            title="Start with what you feel, then continue with the details."
            copy="The first two answers stay with the request, so the full matching flow does not ask them again."
          />
          <div className="mt-8">
            <HomeMatchPrimer />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="How matching works"
            title="Simple enough for the visitor, structured enough for the business."
            copy="The platform collects the details that matter before routing the request."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {["Tell us what you need", "Review your recommended options", "Get matched with an available provider"].map((step, index) => (
              <FloatOnScroll key={step} depth={10 + index * 4} delay={index * 0.12}>
                <TiltLift intensity={3}>
                  <div className="h-full rounded-md border border-tide/16 bg-mist/52 p-5 shadow-lg shadow-water/16">
                    <p className="text-sm font-bold text-tide">0{index + 1}</p>
                    <h3 className="mt-4 font-serif text-2xl text-leaf">{step}</h3>
                    <p className="mt-3 text-sm leading-7 text-charcoal-olive/70">
                      {index === 0
                        ? "Goals, body areas, pressure, location and timing are collected in one flow."
                        : index === 1
                          ? "A small rules engine returns no more than three service options."
                          : "Availability, service area and suitability notes guide the next booking step."}
                    </p>
                  </div>
                </TiltLift>
              </FloatOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-water/18 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="popular-services">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Known service paths"
              title="Already know what you want?"
              copy="These are direct service paths for visitors who do not need the guided match first."
            />
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.slice(0, 6).map((service, index) => (
              <FloatOnScroll key={service.id} depth={10 + (index % 3) * 3} delay={index * 0.08}>
                <ServiceCard service={service} />
              </FloatOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-leaf text-bone lg:grid-cols-2">
        <div className="relative min-h-[360px]">
          <FloatOnScroll className="absolute inset-0" depth={18}>
            <Image
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=80"
              alt="Warm bodywork treatment room detail"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
          </FloatOnScroll>
        </div>
        <div className="px-4 py-16 sm:px-6 lg:px-12">
          <FloatOnScroll depth={10}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-water">Specialty paths</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">More specific options, shown after the guided start.</h2>
          </FloatOnScroll>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {spotlightServices.map((service, index) => (
              <FloatOnScroll key={service.id} depth={8 + (index % 2) * 3} delay={index * 0.07}>
                <TiltLift intensity={2.5}>
                  <Link href={`/services/${service.slug}`} className="group block h-full rounded-md border border-water/25 bg-mist/8 p-4 shadow-lg shadow-leaf/10 transition hover:border-water/70 hover:bg-water/12">
                    <h3 className="font-serif text-2xl">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-bone/72">{service.shortDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-water">
                      Review fit <ArrowRight aria-hidden="true" size={15} />
                    </span>
                  </Link>
                </TiltLift>
              </FloatOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foliage px-4 py-16 text-charcoal-olive sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">The network model</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A curated front door for independent providers.</h2>
            <p className="mt-5 text-lg leading-8 text-charcoal-olive/78">
              Customers are matched with independent licensed practitioners according to specialty, service area and availability. Services are performed by participating independent practitioners.
            </p>
          </div>
          <div className="grid gap-3">
            {["Licensure information placeholder", "Certifications placeholder", "Verified reviews placeholder", "Provider screening process placeholder", "Secure request handling placeholder"].map((item, index) => (
              <FloatOnScroll key={item} depth={7 + index * 2} delay={index * 0.07}>
                <div className="flex items-start gap-3 rounded-md border border-water/25 bg-bone/48 p-4 shadow-lg shadow-leaf/10 transition hover:-translate-y-1 hover:border-tide/45 hover:bg-mist/70">
                  <ShieldCheck aria-hidden="true" className="mt-1 shrink-0 text-tide" size={18} />
                  <span className="text-sm leading-6">{item}</span>
                </div>
              </FloatOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader align="center" eyebrow="FAQ" title="Questions before you request a match." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="rounded-md border border-tide/16 bg-mist/44 p-5 shadow-md shadow-water/12 transition hover:-translate-y-1 hover:border-tide/35 hover:shadow-xl hover:shadow-water/18" style={{ transitionDelay: `${index * 20}ms` }}>
                <summary className="cursor-pointer font-semibold text-leaf">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-charcoal-olive/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border-t border-charcoal-olive/15 pt-12 md:flex-row md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-tide">
              <CheckCircle2 aria-hidden="true" size={18} />
              Ready when the visitor is
            </p>
            <h2 className="mt-3 font-serif text-4xl text-leaf">Let’s find the right session for you.</h2>
          </div>
          <ButtonLink href="/match">Start matching</ButtonLink>
        </div>
      </section>
    </main>
  );
}
