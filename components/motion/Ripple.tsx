"use client";

import { useRef, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function useRipple() {
  const idRef = useRef(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function createRipple(element: HTMLElement, clientX?: number, clientY?: number) {
    const rect = element.getBoundingClientRect();
    const nextRipple = {
      id: idRef.current++,
      x: clientX === undefined ? rect.width / 2 : clientX - rect.left,
      y: clientY === undefined ? rect.height / 2 : clientY - rect.top,
    };

    setRipples((current) => [...current, nextRipple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== nextRipple.id));
    }, 560);
  }

  return { ripples, createRipple };
}

export function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-dot absolute h-6 w-6 rounded-full bg-[rgba(244,239,230,0.45)]"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </span>
  );
}
