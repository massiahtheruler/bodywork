import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { ButtonLink } from "@/components/ui/Button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group grid overflow-hidden rounded-md border border-charcoal-olive/10 bg-bone/65 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-charcoal-olive/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">
            {service.durations.join(" / ")} min · {service.startingPrice}
          </p>
          <h3 className="mt-2 font-serif text-3xl leading-tight text-charcoal-olive">{service.title}</h3>
          <p className="mt-3 text-sm leading-7 text-charcoal-olive/72">{service.shortDescription}</p>
        </div>
        <div className="text-sm text-charcoal-olive/72">
          <span className="font-semibold text-charcoal-olive">Best for: </span>
          {service.concerns.slice(0, 3).join(", ")}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-olive hover:text-clay">
            Learn more <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <ButtonLink href={`/match?service=${service.id}`} variant="secondary" className="min-h-10 px-4 py-2">
            Select this treatment
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
