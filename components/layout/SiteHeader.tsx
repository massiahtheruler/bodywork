"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { brand } from "@/data/brand";
import { navigation } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-tide/15 bg-bone/86 backdrop-blur-xl">
      <div className="border-b border-water/20 bg-leaf text-bone">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <span>Miami, FL service area</span>
          <a href={`tel:${brand.phone}`} className="inline-flex items-center gap-2 hover:text-water">
            <Phone aria-hidden="true" size={14} />
            {brand.phone}
          </a>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="font-serif text-2xl font-semibold leading-none text-leaf">
          {brand.logoText}
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-charcoal-olive/70 hover:text-leaf">
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/match" className="min-h-10 px-4 py-2">
            Book Now
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-tide/25 bg-mist/50 text-leaf lg:hidden"
          aria-label="Open mobile menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </nav>
      {isOpen ? (
        <div className="border-t border-tide/15 bg-mist/92 px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-base font-semibold text-charcoal-olive hover:bg-water/22 hover:text-leaf"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/match" onClick={() => setIsOpen(false)}>
              Book Now
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
