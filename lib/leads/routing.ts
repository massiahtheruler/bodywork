import type { LeadSubmission, RoutedLead } from "@/types/lead";

export type LeadDestinationAdapter = {
  send: (lead: RoutedLead) => Promise<void>;
};

const primaryStudio = {
  providerId: "primary-vitality-studio",
  supportedZipCodes: ["33156", "33158", "33173", "33176", "33183", "33186", "33134", "33146", "33143", "33155"],
  supportedServices: [
    "swedish",
    "deep-tissue",
    "sports",
    "prenatal",
    "assisted-stretching",
    "lymphatic",
    "cupping",
    "reflexology",
    "red-light",
    "facial-contour",
    "tmj",
  ],
};

export function routeLead(lead: LeadSubmission): RoutedLead {
  const recommendedOrSelected = [...lead.recommendedServices, ...lead.selectedServices];
  const hasSupportedService =
    recommendedOrSelected.length === 0 ||
    recommendedOrSelected.some((serviceId) => primaryStudio.supportedServices.includes(serviceId));
  const inPrimaryArea = primaryStudio.supportedZipCodes.includes(lead.zipCode);
  const requiresReview =
    lead.suitabilityFlags.some((flag) => flag !== "None of these") ||
    recommendedOrSelected.some((serviceId) => ["piezowave", "emf", "plantar"].includes(serviceId));

  const canAssignPrimary = inPrimaryArea && hasSupportedService && !requiresReview;

  return {
    ...lead,
    id: `lead_${Date.now().toString(36)}`,
    status: canAssignPrimary ? "assigned-primary" : "network-review",
    assignedProviderId: canAssignPrimary ? primaryStudio.providerId : null,
    routingNotes: [
      inPrimaryArea ? "ZIP code is inside primary service area." : "ZIP code needs network routing review.",
      hasSupportedService ? "Requested services overlap primary capabilities." : "Requested service needs a broader network provider.",
      requiresReview ? "Suitability or specialty service requires manual review." : "No manual suitability flag selected.",
    ],
    createdAt: new Date().toISOString(),
  };
}

export const consoleLeadAdapter: LeadDestinationAdapter = {
  async send(lead) {
    console.info("Lead captured for future CRM adapter", {
      id: lead.id,
      status: lead.status,
      assignedProviderId: lead.assignedProviderId,
    });
  },
};
