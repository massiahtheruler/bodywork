import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { brand } from "@/data/brand";
import { getServiceBySlug, services } from "@/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${brand.baseUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: brand.baseUrl }, { name: "Services", url: `${brand.baseUrl}/services` }, { name: service.title, url: `${brand.baseUrl}/services/${service.slug}` }])} />
      <section className="grid bg-water/18 lg:grid-cols-2">
        <div className="px-4 py-16 sm:px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tide">{service.category === "massage-bodywork" ? "Massage and bodywork" : "Specialty and recovery"}</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-leaf md:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal-olive/76">{service.longDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/match?service=${service.id}`}>Request this service</ButtonLink>
            <ButtonLink href="/match" variant="secondary">Help me choose</ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <Info title="Best for" value={service.concerns.join(", ")} />
            <Info title="Body areas" value={service.bodyAreas.join(", ")} />
            <Info title="Session lengths" value={`${service.durations.join(" / ")} minutes`} />
            <Info title="Starting price" value={service.startingPrice} />
            <Info title="Provider requirements" value={service.providerRequirements} />
            <Info title="Suitability note" value={service.contraindicationNote} />
          </div>
          <div className="rounded-md border border-tide/16 bg-mist/44 p-6 shadow-sm shadow-water/12">
            <h2 className="font-serif text-3xl text-leaf">Service FAQ</h2>
            <div className="mt-5 grid gap-4">
              {service.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-7 text-charcoal-olive/72">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-tide/16 bg-bone/74 p-5 shadow-sm shadow-water/10">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-tide">{title}</p>
      <p className="mt-3 text-sm leading-7 text-charcoal-olive/76">{value}</p>
    </div>
  );
}
