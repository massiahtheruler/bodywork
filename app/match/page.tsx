import type { Metadata } from "next";
import { MatchingForm } from "@/components/forms/MatchingForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Find My Treatment",
  description: "Complete a guided bodywork matching request for massage and recovery services in Miami.",
  alternates: { canonical: "/match" },
};

export default async function MatchPage({
  searchParams,
}: {
  searchParams: Promise<{ concern?: string; service?: string; bodyArea?: string | string[] }>;
}) {
  const params = await searchParams;
  const bodyAreas = Array.isArray(params.bodyArea) ? params.bodyArea : params.bodyArea ? [params.bodyArea] : [];

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHeader
          eyebrow="Guided matching"
          title="Help us route the right kind of request."
          copy="This form keeps your answers while you move through each step and shows recommendations before submission."
        />
        <MatchingForm initialConcern={params.concern} initialService={params.service} initialBodyAreas={bodyAreas} />
      </div>
    </main>
  );
}
