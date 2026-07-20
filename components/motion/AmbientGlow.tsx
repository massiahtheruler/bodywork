"use client";

import { useEffect, useState } from "react";

export function AmbientGlow() {
  const [position, setPosition] = useState({ x: 82, y: 12 });
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    function handlePointerMove(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      setPosition({
        x: 82 + (x / 100 - 0.5) * 3,
        y: 12 + (y / 100 - 0.5) * 3,
      });
      setCursorPosition({ x, y });
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
            "radial-gradient(circle, rgba(185, 216, 220, 0.3), rgba(159, 183, 159, 0.14) 45%, transparent 72%)",
        }}
      />
      <div
        className="cursor-halo absolute h-44 w-44 rounded-full blur-2xl"
        style={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
          background:
            "radial-gradient(circle, rgba(185, 216, 220, 0.2), rgba(95, 127, 107, 0.09) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
