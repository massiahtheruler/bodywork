import Link from "next/link";
import { brand } from "@/data/brand";
import { footerNavigation, navigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-water/20 bg-leaf text-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl">{brand.name}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-bone/75">{brand.disclosure}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-water">Explore</p>
          <div className="mt-4 grid gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-bone/78 hover:text-water">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-water">Details</p>
          <div className="mt-4 grid gap-3">
            {footerNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-bone/78 hover:text-water">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
