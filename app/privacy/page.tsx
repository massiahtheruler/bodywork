import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy placeholder for Miami Bodywork Network.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage title="Privacy Policy" copy="This placeholder should be replaced with attorney-reviewed privacy language before launch. It should cover lead data, contact consent, analytics, retention, vendor integrations and user rights." />;
}

function PolicyPage({ title, copy }: { title: string; copy: string }) {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-md border border-tide/16 bg-mist/44 p-6 shadow-sm shadow-water/12">
        <h1 className="font-serif text-5xl text-leaf">{title}</h1>
        <p className="mt-5 text-base leading-8 text-charcoal-olive/76">{copy}</p>
      </article>
    </main>
  );
}
