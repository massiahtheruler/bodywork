"use client";

import { useRouter } from "next/navigation";
import { intentTiles } from "@/data/concerns";
import { SelectableCard } from "@/components/ui/SelectableCard";

export function IntentSelector() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-9">
      {intentTiles.map((intent, index) => (
        <SelectableCard
          key={intent}
          className={index % 3 === 0 ? "md:col-span-3" : index % 3 === 1 ? "md:col-span-2" : "md:col-span-4"}
          onClick={() => router.push(`/match?concern=${encodeURIComponent(intent)}`)}
        >
          {intent}
        </SelectableCard>
      ))}
    </div>
  );
}
