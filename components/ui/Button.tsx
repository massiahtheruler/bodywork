"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";
import { RippleLayer, useRipple } from "@/components/motion/Ripple";

const variants = {
  primary: "bg-charcoal-olive text-bone hover:-translate-y-0.5 hover:bg-[#1f231e]",
  secondary: "border border-charcoal-olive/25 bg-bone/60 text-charcoal-olive hover:-translate-y-0.5 hover:border-charcoal-olive/50",
  ghost: "text-charcoal-olive hover:bg-charcoal-olive/5",
};

type BaseProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function ButtonLink({
  children,
  variant = "primary",
  className,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { ripples, createRipple } = useRipple();

  return (
    <Link
      {...props}
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-candle",
        variants[variant],
        className,
      )}
      onClick={(event) => {
        createRipple(event.currentTarget, event.clientX, event.clientY);
        props.onClick?.(event);
      }}
    >
      <span className="relative z-10">{children}</span>
      <RippleLayer ripples={ripples} />
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ripples, createRipple } = useRipple();

  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-candle disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        className,
      )}
      onClick={(event) => {
        createRipple(event.currentTarget, event.clientX, event.clientY);
        props.onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          createRipple(event.currentTarget);
        }
        props.onKeyDown?.(event);
      }}
    >
      <span className="relative z-10">{children}</span>
      <RippleLayer ripples={ripples} />
    </button>
  );
}
