import { services } from "@/data/services";

export type MatchingInput = {
  concerns: string[];
  bodyAreas: string[];
  preferredApproaches: string[];
  suitabilityFlags: string[];
};

export type Recommendation = {
  serviceId: string;
  title: string;
  reason: string;
  requiresReview: boolean;
};

type MatchingRule = {
  id: string;
  serviceId: string;
  concerns?: string[];
  bodyAreas?: string[];
  approaches?: string[];
  suitabilityFlags?: string[];
  reason: string;
  requiresReview?: boolean;
  weight: number;
};

const matchingRules: MatchingRule[] = [
  {
    id: "relaxation-gentle",
    serviceId: "swedish",
    concerns: ["Relaxation", "Stress", "Not sure"],
    approaches: ["Gentle and relaxing"],
    reason: "A gentler session is a strong fit when your main goal is calm, stress relief or an easier first step.",
    weight: 8,
  },
  {
    id: "firm-tension",
    serviceId: "deep-tissue",
    concerns: ["Neck and shoulder tension", "Lower back discomfort"],
    approaches: ["Firm or deep pressure", "Moderate therapeutic pressure"],
    reason: "Focused therapeutic pressure may fit persistent neck, shoulder or back tension when firm work feels appropriate.",
    weight: 10,
  },
  {
    id: "pregnancy",
    serviceId: "prenatal",
    concerns: ["Pregnancy discomfort"],
    suitabilityFlags: ["Currently pregnant"],
    reason: "Pregnancy-aware positioning and provider training matter here, so prenatal massage is the safest starting recommendation.",
    requiresReview: true,
    weight: 14,
  },
  {
    id: "lymphatic",
    serviceId: "lymphatic",
    concerns: ["Swelling or fluid retention", "Post-procedure support"],
    reason: "Light lymphatic techniques are commonly selected for swelling or post-procedure support, with suitability reviewed first.",
    requiresReview: true,
    weight: 12,
  },
  {
    id: "mobility",
    serviceId: "assisted-stretching",
    concerns: ["Mobility and flexibility"],
    approaches: ["Stretching and mobility"],
    reason: "Guided stretching can be a better fit than massage alone when mobility is the main goal.",
    weight: 9,
  },
  {
    id: "foot",
    serviceId: "reflexology",
    concerns: ["Plantar fasciitis or foot discomfort"],
    bodyAreas: ["Feet / ankles"],
    reason: "Foot-focused work or reflexology can be reviewed when the main concern is foot discomfort.",
    requiresReview: true,
    weight: 9,
  },
  {
    id: "specialty-foot-strain",
    serviceId: "plantar",
    concerns: ["Plantar fasciitis or foot discomfort", "Tendinitis or repetitive strain"],
    reason: "Specialty foot or repetitive-strain concerns should be routed for provider review before booking.",
    requiresReview: true,
    weight: 11,
  },
  {
    id: "jaw",
    serviceId: "tmj",
    concerns: ["TMJ or jaw tension", "Headaches"],
    bodyAreas: ["Head / jaw", "Neck"],
    reason: "A head, jaw and neck focused provider may be a better match than a general full-body session.",
    requiresReview: true,
    weight: 10,
  },
  {
    id: "sports-recovery",
    serviceId: "sports",
    concerns: ["Sports recovery"],
    approaches: ["Moderate therapeutic pressure", "Stretching and mobility"],
    reason: "Sports recovery goals often benefit from a blend of focused massage and mobility-aware pacing.",
    weight: 8,
  },
  {
    id: "technology-assisted",
    serviceId: "piezowave",
    concerns: ["Tendinitis or repetitive strain", "Plantar fasciitis or foot discomfort"],
    approaches: ["Technology-assisted recovery"],
    reason: "Technology-assisted options may be relevant, but equipment access and suitability need manual review.",
    requiresReview: true,
    weight: 10,
  },
];

function countMatches(source: string[], targets?: string[]) {
  if (!targets) return 0;
  return targets.filter((target) => source.includes(target)).length;
}

export function getRecommendations(input: MatchingInput): Recommendation[] {
  const scored = matchingRules
    .map((rule) => {
      const score =
        countMatches(input.concerns, rule.concerns) * rule.weight +
        countMatches(input.bodyAreas, rule.bodyAreas) * 4 +
        countMatches(input.preferredApproaches, rule.approaches) * 5 +
        countMatches(input.suitabilityFlags, rule.suitabilityFlags) * 6;

      return { rule, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const recommendations = new Map<string, Recommendation>();

  for (const { rule } of scored) {
    const service = services.find((item) => item.id === rule.serviceId);
    if (!service || recommendations.has(rule.serviceId)) continue;

    recommendations.set(rule.serviceId, {
      serviceId: service.id,
      title: service.title,
      reason: rule.reason,
      requiresReview: Boolean(rule.requiresReview),
    });

    if (recommendations.size === 3) break;
  }

  if (recommendations.size === 0) {
    const fallback = services.find((service) => service.id === "combination");
    if (!fallback) return [];
    recommendations.set(fallback.id, {
      serviceId: fallback.id,
      title: fallback.title,
      reason: "Your answers point to a blended provider review instead of one obvious service.",
      requiresReview: true,
    });
  }

  return Array.from(recommendations.values()).slice(0, 3);
}
