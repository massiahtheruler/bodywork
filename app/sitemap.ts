import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/match", "/how-it-works", "/contact", "/privacy", "/terms", "/provider-disclosure"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const locationRoutes = locations.map((location) => `/locations/${location.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes].map((route) => ({
    url: `${brand.baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
