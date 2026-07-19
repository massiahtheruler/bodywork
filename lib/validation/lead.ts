import { z } from "zod";

export const leadSchema = z.object({
  selectedServices: z.array(z.string()),
  recommendedServices: z.array(z.string()),
  concerns: z.array(z.string()).min(1, "Choose at least one goal or concern."),
  bodyAreas: z.array(z.string()).min(1, "Choose at least one body area."),
  preferredApproaches: z.array(z.string()).min(1, "Choose a preferred approach."),
  locationType: z.enum(["studio", "mobile", "either"], {
    error: "Choose studio, mobile or either.",
  }),
  duration: z.string().min(1, "Choose a desired duration."),
  preferredDate: z.string().min(1, "Choose a preferred date."),
  timeWindow: z.string().min(1, "Choose a time window."),
  zipCode: z.string().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP code."),
  therapistGenderPreference: z.string().min(1, "Choose a provider preference."),
  suitabilityFlags: z.array(z.string()).min(1, "Choose one suitability option."),
  suitabilityNotes: z.string().max(800, "Keep notes under 800 characters.").optional(),
  firstName: z.string().min(2, "Enter your first name."),
  lastName: z.string().min(2, "Enter your last name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(10, "Enter a phone number."),
  preferredContactMethod: z.enum(["phone", "email", "text"], {
    error: "Choose how you prefer to be contacted.",
  }),
  consent: z.literal(true, {
    error: "Consent is required before submitting.",
  }),
  sourcePage: z.string(),
  utm: z.record(z.string(), z.string()),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
