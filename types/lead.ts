export type LocationType = "studio" | "mobile" | "either";
export type ContactMethod = "phone" | "email" | "text";
export type LeadStatus = "new" | "assigned-primary" | "network-review";

export type LeadSubmission = {
  selectedServices: string[];
  recommendedServices: string[];
  concerns: string[];
  bodyAreas: string[];
  preferredApproaches: string[];
  locationType: LocationType;
  duration: string;
  preferredDate: string;
  timeWindow: string;
  zipCode: string;
  therapistGenderPreference: string;
  suitabilityFlags: string[];
  suitabilityNotes?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactMethod;
  consent: boolean;
  sourcePage: string;
  utm: Record<string, string>;
};

export type RoutedLead = LeadSubmission & {
  id: string;
  status: LeadStatus;
  assignedProviderId: string | null;
  routingNotes: string[];
  createdAt: string;
};
