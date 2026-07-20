"use client";

import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { bodyAreas, intentTiles } from "@/data/concerns";
import { Button } from "@/components/ui/Button";
import { SelectableCard } from "@/components/ui/SelectableCard";

const regionButtons = ["Head / jaw", "Neck", "Shoulders", "Upper back", "Lower back", "Hips", "Legs", "Feet / ankles"];

const intentToConcern: Record<string, string> = {
  "Back discomfort": "Lower back discomfort",
  "Pregnancy support": "Pregnancy discomfort",
  "Swelling and lymphatic support": "Swelling or fluid retention",
  "Flexibility and mobility": "Mobility and flexibility",
  "Head or jaw tension": "TMJ or jaw tension",
};

function normalizeConcern(intent: string) {
  return intentToConcern[intent] ?? intent;
}

export function HomeMatchPrimer() {
  const router = useRouter();
  const [intent, setIntent] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const canContinue = intent.length > 0 && selectedAreas.length > 0;
  const continueLabel = useMemo(() => {
    if (!intent && selectedAreas.length === 0) return "Choose a goal and body area";
    if (!intent) return "Choose a goal";
    if (selectedAreas.length === 0) return "Choose a body area";
    return "Continue matching";
  }, [intent, selectedAreas.length]);

  function toggleArea(area: string) {
    setSelectedAreas((current) => (current.includes(area) ? current.filter((item) => item !== area) : [...current, area]));
  }

  function continueToMatch() {
    if (!canContinue) return;

    const params = new URLSearchParams();
    params.set("concern", normalizeConcern(intent));
    selectedAreas.forEach((area) => params.append("bodyArea", area));
    router.push(`/match?${params.toString()}`);
  }

  return (
    <div className="rounded-md border border-tide/16 bg-mist/38 p-4 shadow-xl shadow-water/14 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section aria-labelledby="intent-heading">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tide">Start here</p>
          <h2 id="intent-heading" className="mt-3 font-serif text-4xl leading-none text-leaf md:text-5xl">
            What brings you here today?
          </h2>
          <p className="mt-4 text-sm leading-7 text-charcoal-olive/74">
            Pick the closest reason. This stays with your request when you continue.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {intentTiles.map((item) => (
              <SelectableCard key={item} selected={intent === item} onClick={() => setIntent(item)}>
                {item}
              </SelectableCard>
            ))}
          </div>
        </section>

        <section aria-labelledby="body-area-heading">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tide">Then tell us where</p>
          <h2 id="body-area-heading" className="mt-3 font-serif text-4xl leading-none text-leaf md:text-5xl">
            Where are you feeling it?
          </h2>
          <p className="mt-4 text-sm leading-7 text-charcoal-olive/74">
            Choose from the body map or the list. You can select more than one area.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-[0.72fr_1fr]">
            <div className="relative mx-auto h-[360px] w-full max-w-[260px]">
              <div className="absolute left-1/2 top-3 h-16 w-16 -translate-x-1/2 rounded-full border border-tide/25 bg-water/38" />
              <div className="absolute left-1/2 top-24 h-36 w-24 -translate-x-1/2 rounded-[48%] border border-leaf/25 bg-foliage/42" />
              <div className="absolute left-[18%] top-28 h-32 w-8 rotate-6 rounded-full border border-tide/20 bg-water/32" />
              <div className="absolute right-[18%] top-28 h-32 w-8 -rotate-6 rounded-full border border-tide/20 bg-water/32" />
              <div className="absolute left-[36%] top-56 h-32 w-9 rounded-full border border-tide/20 bg-water/32" />
              <div className="absolute right-[36%] top-56 h-32 w-9 rounded-full border border-tide/20 bg-water/32" />
              {regionButtons.map((area, index) => (
                <button
                  key={area}
                  type="button"
                  aria-label={`Map: ${area}`}
                  aria-pressed={selectedAreas.includes(area)}
                  onClick={() => toggleArea(area)}
                  className="absolute rounded-full border border-tide/25 bg-bone/92 px-2.5 py-1 text-xs font-semibold text-leaf shadow-sm transition hover:bg-water/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-tide aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-bone"
                  style={{
                    left: `${index % 2 === 0 ? 0 : 58}%`,
                    top: `${8 + index * 9}%`,
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 content-start">
              {bodyAreas.slice(0, 12).map((area) => (
                <SelectableCard key={area} selected={selectedAreas.includes(area)} onClick={() => toggleArea(area)}>
                  {area}
                </SelectableCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-tide/16 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-charcoal-olive/70">
          {canContinue ? "Your next screen will start after these two questions." : "Make one choice in each section to unlock the next step."}
        </p>
        <Button type="button" onClick={continueToMatch} disabled={!canContinue}>
          {continueLabel} <ArrowRight aria-hidden="true" size={16} />
        </Button>
      </div>
    </div>
  );
}
