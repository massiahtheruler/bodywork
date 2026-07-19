export type ServiceCategory = "massage-bodywork" | "specialty-recovery";

export type PressureLevel = "gentle" | "moderate" | "firm" | "varies";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  concerns: string[];
  bodyAreas: string[];
  pressureLevel: PressureLevel;
  durations: number[];
  startingPrice: string;
  providerRequirements: string;
  contraindicationNote: string;
  featured: boolean;
  image: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
  };
  faqs: ServiceFaq[];
};
