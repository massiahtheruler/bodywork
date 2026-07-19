import { brand } from "@/data/brand";
import type { Location } from "@/data/locations";
import type { Service } from "@/types/service";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.baseUrl,
    email: brand.email,
    telephone: brand.phone,
    areaServed: brand.serviceArea,
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    areaServed: brand.serviceArea,
    provider: {
      "@type": "Organization",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: service.startingPrice,
      availability: "https://schema.org/LimitedAvailability",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function locationJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} in ${location.name}`,
    description: location.description,
    areaServed: {
      "@type": "Place",
      name: location.name,
    },
    provider: {
      "@type": "Organization",
      name: brand.name,
    },
  };
}
