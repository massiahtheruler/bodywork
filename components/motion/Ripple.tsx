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
    }, 920);
  }

  return { ripples, createRipple };
}

export function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-dot absolute h-7 w-7 rounded-full"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </span>
  );
}
