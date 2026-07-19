"use client";

import { useState } from "react";
import { bodyAreas } from "@/data/concerns";
import { SelectableCard } from "@/components/ui/SelectableCard";

const regionButtons = ["Head / jaw", "Neck", "Shoulders", "Upper back", "Lower back", "Hips", "Legs", "Feet / ankles"];

export function BodyAreaSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(area: string) {
    setSelected((current) => (current.includes(area) ? current.filter((item) => item !== area) : [...current, area]));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="relative mx-auto h-[520px] w-full max-w-sm">
        <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full border border-charcoal-olive/25 bg-limestone" />
        <div className="absolute left-1/2 top-28 h-48 w-32 -translate-x-1/2 rounded-[48%] border border-charcoal-olive/25 bg-sand/60" />
        <div className="absolute left-[24%] top-32 h-44 w-10 rotate-6 rounded-full border border-charcoal-olive/20 bg-limestone" />
        <div className="absolute right-[24%] top-32 h-44 w-10 -rotate-6 rounded-full border border-charcoal-olive/20 bg-limestone" />
        <div className="absolute left-[38%] top-72 h-48 w-12 rounded-full border border-charcoal-olive/20 bg-limestone" />
        <div className="absolute right-[38%] top-72 h-48 w-12 rounded-full border border-charcoal-olive/20 bg-limestone" />
        {regionButtons.map((area, index) => (
          <button
            key={area}
            type="button"
            onClick={() => toggle(area)}
            className="absolute rounded-full border border-charcoal-olive/20 bg-bone/90 px-3 py-1 text-xs font-semibold text-charcoal-olive shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-candle"
            style={{
              left: `${index % 2 === 0 ? 4 : 62}%`,
              top: `${10 + index * 9}%`,
            }}
          >
            {area}
          </button>
        ))}
      </div>
      <div>
        <p className="mb-4 text-sm leading-7 text-charcoal-olive/72">
          Choose from the visual region map or use the buttons below. Both controls update the same selection.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {bodyAreas.slice(0, 12).map((area) => (
            <SelectableCard key={area} selected={selected.includes(area)} onClick={() => toggle(area)}>
              {area}
            </SelectableCard>
          ))}
        </div>
      </div>
    </div>
  );
}
