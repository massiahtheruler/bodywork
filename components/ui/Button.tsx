"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";
import { RippleLayer, useRipple } from "@/components/motion/Ripple";

const variants = {
  primary: "bg-leaf text-bone shadow-lg shadow-leaf/18 hover:-translate-y-0.5 hover:bg-tide hover:shadow-water/35",
  secondary: "border border-tide/35 bg-mist/72 text-charcoal-olive shadow-sm shadow-water/20 hover:-translate-y-0.5 hover:border-leaf/45 hover:bg-water/35",
  ghost: "text-leaf hover:bg-water/18 hover:text-charcoal-olive",
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
        "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide",
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
        "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide disabled:cursor-not-allowed disabled:opacity-55",
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
