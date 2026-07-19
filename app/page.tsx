import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { featuredServices, services } from "@/data/services";
import { HomeHero } from "@/components/hero/HomeHero";
import { BodyAreaSelector } from "@/components/matching/BodyAreaSelector";
import { IntentSelector } from "@/components/matching/IntentSelector";
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

      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="intent-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Start here"
            title="What brings you here today?"
            copy="Choose the closest fit and we will carry that context into the guided matching flow."
          />
          <div className="mt-8">
            <IntentSelector />
          </div>
        </div>
      </section>

      <section className="bg-limestone/45 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="popular-services">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Popular services"
              title="Browse the familiar paths."
              copy="For visitors who already know what they want, these services can be selected directly."
            />
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
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
              <div key={step} className="rounded-md border border-charcoal-olive/10 bg-bone/70 p-5">
                <p className="text-sm font-bold text-clay">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl text-charcoal-olive">{step}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal-olive/70">
                  {index === 0
                    ? "Goals, body areas, pressure, location and timing are collected in one flow."
                    : index === 1
                      ? "A small rules engine returns no more than three service options."
                      : "Availability, service area and suitability notes guide the next booking step."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-charcoal-olive text-bone lg:grid-cols-2">
        <div className="relative min-h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=80"
            alt="Warm bodywork treatment room detail"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-80"
          />
        </div>
        <div className="px-4 py-16 sm:px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-candle">Treatment spotlight</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Advanced and specialty care, handled with restraint.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {spotlightServices.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="group rounded-md border border-bone/15 p-4 transition hover:-translate-y-0.5 hover:border-candle/60">
                <h3 className="font-serif text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-bone/72">{service.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-candle">
                  Review fit <ArrowRight aria-hidden="true" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Body area"
            title="Where are you feeling it?"
            copy="An accessible region selector gives visitors a more natural way to describe what they need."
          />
          <div className="mt-10">
            <BodyAreaSelector />
          </div>
        </div>
      </section>

      <section className="bg-sage px-4 py-16 text-bone sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bone/70">The network model</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A curated front door for independent providers.</h2>
            <p className="mt-5 text-lg leading-8 text-bone/82">
              Customers are matched with independent licensed practitioners according to specialty, service area and availability. Services are performed by participating independent practitioners.
            </p>
          </div>
          <div className="grid gap-3">
            {["Licensure information placeholder", "Certifications placeholder", "Verified reviews placeholder", "Provider screening process placeholder", "Secure request handling placeholder"].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-md border border-bone/15 bg-bone/8 p-4">
                <ShieldCheck aria-hidden="true" className="mt-1 shrink-0 text-candle" size={18} />
                <span className="text-sm leading-6">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader align="center" eyebrow="FAQ" title="Questions before you request a match." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-md border border-charcoal-olive/10 bg-bone/70 p-5">
                <summary className="cursor-pointer font-semibold text-charcoal-olive">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-charcoal-olive/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border-t border-charcoal-olive/15 pt-12 md:flex-row md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-clay">
              <CheckCircle2 aria-hidden="true" size={18} />
              Ready when the visitor is
            </p>
            <h2 className="mt-3 font-serif text-4xl text-charcoal-olive">Let’s find the right session for you.</h2>
          </div>
          <ButtonLink href="/match">Start matching</ButtonLink>
        </div>
      </section>
    </main>
  );
}
