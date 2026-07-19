"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";
import { RippleLayer, useRipple } from "@/components/motion/Ripple";

type SelectableCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  children: ReactNode;
};

export function SelectableCard({ selected = false, children, className, ...props }: SelectableCardProps) {
  const { ripples, createRipple } = useRipple();

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      aria-pressed={selected}
      className={cn(
        "relative min-h-16 overflow-hidden rounded-md border px-4 py-4 text-left text-sm font-semibold leading-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-candle",
        selected
          ? "border-charcoal-olive bg-charcoal-olive text-bone shadow-lg"
          : "border-charcoal-olive/15 bg-bone/50 text-charcoal-olive hover:-translate-y-0.5 hover:border-clay/60 hover:bg-white/55",
        className,
      )}
      onClick={(event) => {
        createRipple(event.currentTarget, event.clientX, event.clientY);
        props.onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") createRipple(event.currentTarget);
        props.onKeyDown?.(event);
      }}
    >
      <span className="relative z-10">{children}</span>
      <RippleLayer ripples={ripples} />
    </button>
  );
}
