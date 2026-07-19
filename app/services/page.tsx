import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Services",
  description: "Browse massage, bodywork and specialty recovery services available through Miami Bodywork Network.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const massage = services.filter((service) => service.category === "massage-bodywork");
  const specialty = services.filter((service) => service.category === "specialty-recovery");

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services"
          title="A service catalog built to grow."
          copy="Each service is stored as typed data, so new treatments can be added without rewriting the page layout."
        />
        <ServiceGroup title="Massage and Bodywork" services={massage} />
        <ServiceGroup title="Specialty and Recovery" services={specialty} />
      </div>
    </main>
  );
}

function ServiceGroup({ title, services: groupServices }: { title: string; services: typeof services }) {
  return (
    <section className="mt-12" aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}>
      <h2 id={title.toLowerCase().replace(/\s+/g, "-")} className="font-serif text-4xl text-charcoal-olive">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groupServices.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </section>
  );
}
