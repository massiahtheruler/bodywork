import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/data/brand";
import { getLocationBySlug, locations } from "@/data/locations";
import { services } from "@/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { locationJsonLd } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `Massage and Bodywork in ${location.name}`,
    description: location.description,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const available = services.filter((service) => location.availableServiceIds.includes(service.id));

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <JsonLd data={locationJsonLd(location)} />
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">{brand.serviceArea}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-charcoal-olive md:text-6xl">{location.headline}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-charcoal-olive/76">{location.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/match?concern=${encodeURIComponent(location.name)}`}>Request a match</ButtonLink>
          <ButtonLink href="/services" variant="secondary">Browse services</ButtonLink>
        </div>
        <section className="mt-14">
          <h2 className="font-serif text-4xl text-charcoal-olive">Available service paths</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {available.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        </section>
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-charcoal-olive/10 bg-bone/70 p-6">
            <h2 className="font-serif text-3xl">Local notes</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-charcoal-olive/74">
              {location.localNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
          <div className="rounded-md border border-charcoal-olive/10 bg-bone/70 p-6">
            <h2 className="font-serif text-3xl">Location FAQ</h2>
            <div className="mt-4 grid gap-4">
              {location.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-7 text-charcoal-olive/72">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
