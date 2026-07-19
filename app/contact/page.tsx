import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Miami Bodywork Network about provider matching, booking requests and service availability.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Contact"
          title="Questions before submitting a request?"
          copy="Use the guided form for booking requests. Use contact for network questions, provider inquiries and general availability questions."
        />
        <div className="rounded-md border border-charcoal-olive/10 bg-bone/72 p-6">
          <div className="grid gap-4">
            <a href={`tel:${brand.phone}`} className="flex items-center gap-3 rounded-md border border-charcoal-olive/10 p-4 hover:bg-limestone/35">
              <Phone aria-hidden="true" size={20} />
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="flex items-center gap-3 rounded-md border border-charcoal-olive/10 p-4 hover:bg-limestone/35">
              <Mail aria-hidden="true" size={20} />
              {brand.email}
            </a>
          </div>
          <ButtonLink href="/match" className="mt-6">
            Submit a booking request
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
