export const faqs = [
  {
    question: "How are providers selected?",
    answer:
      "The network is designed to route requests to participating licensed providers based on service fit, location, appointment needs and stated preferences.",
  },
  {
    question: "Are all providers licensed?",
    answer:
      "Provider licensure details should be verified before launch and shown clearly where available. This prototype reserves space for that verification.",
  },
  {
    question: "Can I request a particular provider?",
    answer:
      "Yes. You can add a preference in the request form, and availability will be reviewed before the next booking step.",
  },
  {
    question: "Is mobile massage available?",
    answer:
      "Mobile availability may vary by ZIP code, provider schedule and service type. The matching flow asks for those details before routing.",
  },
  {
    question: "How is final pricing determined?",
    answer:
      "Published pricing is a starting placeholder. Final pricing may depend on duration, location type, provider availability and selected service.",
  },
  {
    question: "What if I am not sure which service to choose?",
    answer:
      "Use the guided matching flow. It recommends up to three suitable options based on your goals without diagnosing any condition.",
  },
  {
    question: "Is this medical treatment?",
    answer:
      "No. The recommendations are not medical advice, diagnosis or treatment. For medical questions, speak with a qualified healthcare professional.",
  },
  {
    question: "What should I disclose before an appointment?",
    answer:
      "Disclose pregnancy, recent procedures, current injuries, active medical treatment, allergies, mobility needs and any comfort boundaries.",
  },
] as const;
