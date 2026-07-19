"use client";

import { useEffect, useState } from "react";

export function AmbientGlow() {
  const [position, setPosition] = useState({ x: 82, y: 12 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    function handlePointerMove(event: PointerEvent) {
      setPosition({
        x: 82 + (event.clientX / window.innerWidth - 0.5) * 2,
        y: 12 + (event.clientY / window.innerHeight - 0.5) * 2,
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
    >
      <div
        className="ambient-glow absolute h-80 w-80 rounded-full blur-3xl"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          background:
            "radial-gradient(circle, rgba(216, 154, 85, 0.24), rgba(244, 239, 230, 0.08) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}
