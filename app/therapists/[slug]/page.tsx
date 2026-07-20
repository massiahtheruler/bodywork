import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Provider Profile Placeholder",
  description: "Placeholder architecture for future independent provider profile pages.",
};

export default async function TherapistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-md border border-tide/16 bg-mist/44 p-6 shadow-sm shadow-water/12 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-tide">Provider architecture</p>
        <h1 className="mt-4 font-serif text-5xl text-leaf">Provider profile placeholder</h1>
        <p className="mt-5 text-base leading-8 text-charcoal-olive/76">
          This route is ready for a future provider record with slug <span className="font-semibold">{slug}</span>. Do not publish individual credentials, claims or reviews until real provider data has been verified.
        </p>
        <ButtonLink href="/match" className="mt-6">Request a match instead</ButtonLink>
      </div>
    </main>
  );
}
