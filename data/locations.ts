export type Location = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  zipCodes: string[];
  availableServiceIds: string[];
  localNotes: string[];
  faqs: { question: string; answer: string }[];
};

export const locations: Location[] = [
  {
    slug: "pinecrest",
    name: "Pinecrest",
    headline: "Bodywork matching for Pinecrest homes and nearby studio appointments.",
    description:
      "Pinecrest requests can be routed by ZIP code, service type and provider availability for studio or mobile options where available.",
    zipCodes: ["33156", "33158"],
    availableServiceIds: ["swedish", "deep-tissue", "prenatal", "assisted-stretching", "lymphatic"],
    localNotes: ["Mobile availability may vary by provider.", "Specialty services may require manual review."],
    faqs: [{ question: "Can I request mobile service in Pinecrest?", answer: "Yes, select mobile or either in the form and include your ZIP code." }],
  },
  {
    slug: "kendall",
    name: "Kendall",
    headline: "Find massage and recovery bodywork options around Kendall.",
    description:
      "Kendall requests are matched by appointment details, service fit and whether the selected provider supports studio, mobile or both.",
    zipCodes: ["33173", "33176", "33183", "33186"],
    availableServiceIds: ["swedish", "deep-tissue", "sports", "cupping", "assisted-stretching"],
    localNotes: ["Evening and weekend availability depends on participating providers."],
    faqs: [{ question: "Do all services cover Kendall?", answer: "No. Availability varies by service, provider and appointment type." }],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    headline: "Curated massage and bodywork requests for Coral Gables.",
    description:
      "Coral Gables clients can request relaxing massage, therapeutic bodywork and selected specialty services through one matching flow.",
    zipCodes: ["33134", "33146"],
    availableServiceIds: ["swedish", "deep-tissue", "prenatal", "lymphatic", "facial-contour"],
    localNotes: ["Parking, building access and mobile setup notes can be included in the request."],
    faqs: [{ question: "Can I choose a female provider?", answer: "You can note a gender preference, and availability will be reviewed." }],
  },
  {
    slug: "south-miami",
    name: "South Miami",
    headline: "Studio and mobile bodywork request routing in South Miami.",
    description:
      "South Miami service requests can be matched to suitable independent providers based on location, timing, goals and selected approach.",
    zipCodes: ["33143", "33155"],
    availableServiceIds: ["swedish", "deep-tissue", "sports", "tmj", "trigger-point"],
    localNotes: ["Manual review is used for specialty technology-assisted services."],
    faqs: [{ question: "What happens after I submit?", answer: "Your preferences and provider availability are reviewed before the next booking step." }],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
