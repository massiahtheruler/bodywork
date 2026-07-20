"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { bodyAreas, treatmentConcerns } from "@/data/concerns";
import { services } from "@/data/services";
import { getRecommendations, type Recommendation } from "@/lib/matching/rules";
import { leadSchema, type LeadFormValues } from "@/lib/validation/lead";
import { Button } from "@/components/ui/Button";
import { SelectableCard } from "@/components/ui/SelectableCard";

const approaches = [
  "Gentle and relaxing",
  "Moderate therapeutic pressure",
  "Firm or deep pressure",
  "Stretching and mobility",
  "Technology-assisted recovery",
  "Recommend an approach",
] as const;

const locationTypes = [
  { label: "Studio", value: "studio" },
  { label: "Mobile", value: "mobile" },
  { label: "Either", value: "either" },
] as const;

const suitabilityOptions = ["Currently pregnant", "Recent surgery or cosmetic procedure", "Current injury", "Receiving medical treatment for this concern", "None of these"] as const;
const exclusiveMultiSelectOptions: Partial<Record<"concerns" | "bodyAreas" | "preferredApproaches" | "suitabilityFlags" | "selectedServices", string>> = {
  preferredApproaches: "Recommend an approach",
  suitabilityFlags: "None of these",
};

const defaultValues: LeadFormValues = {
  selectedServices: [],
  recommendedServices: [],
  concerns: [],
  bodyAreas: [],
  preferredApproaches: [],
  locationType: "either",
  duration: "60",
  preferredDate: "",
  timeWindow: "",
  zipCode: "",
  therapistGenderPreference: "No preference",
  suitabilityFlags: ["None of these"],
  suitabilityNotes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContactMethod: "text",
  consent: true,
  sourcePage: "/match",
  utm: {},
};

type MatchingFormProps = {
  initialBodyAreas?: string[];
  initialConcern?: string;
  initialService?: string;
};

type SubmissionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; recommendations: Recommendation[]; values: LeadFormValues };

export function MatchingForm({ initialBodyAreas = [], initialConcern, initialService }: MatchingFormProps) {
  const hasHomePrimerAnswers = Boolean(initialConcern) && initialBodyAreas.length > 0;
  const [step, setStep] = useState(hasHomePrimerAnswers ? 2 : 0);
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: {
      ...defaultValues,
      bodyAreas: initialBodyAreas,
      concerns: initialConcern ? [initialConcern] : [],
      selectedServices: initialService ? [initialService] : [],
    },
  });

  const watched = useWatch({ control: form.control });
  const currentValues = { ...defaultValues, ...watched };
  const recommendations = useMemo(
    () =>
      getRecommendations({
        concerns: currentValues.concerns,
        bodyAreas: currentValues.bodyAreas,
        preferredApproaches: currentValues.preferredApproaches,
        suitabilityFlags: currentValues.suitabilityFlags,
      }),
    [currentValues.concerns, currentValues.bodyAreas, currentValues.preferredApproaches, currentValues.suitabilityFlags],
  );

  function toggleArray(field: "concerns" | "bodyAreas" | "preferredApproaches" | "suitabilityFlags" | "selectedServices", value: string) {
    const current = form.getValues(field);
    const exclusiveOption = exclusiveMultiSelectOptions[field];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    const normalizedNext =
      exclusiveOption && value === exclusiveOption && !current.includes(value)
        ? [exclusiveOption]
        : exclusiveOption
          ? next.filter((item) => item !== exclusiveOption)
          : next;

    form.setValue(field, normalizedNext, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function handleSubmit(values: LeadFormValues) {
    setSubmission({ status: "loading" });
    const recommendedServices = recommendations.map((recommendation) => recommendation.serviceId);
    const payload = { ...values, recommendedServices };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json()) as { message?: string };
      setSubmission({ status: "error", message: result.message ?? "Something went wrong. Please review your request." });
      return;
    }

    setSubmission({ status: "success", recommendations, values: payload });
  }

  if (submission.status === "success") {
    return <SuccessState values={submission.values} recommendations={submission.recommendations} onEdit={() => setSubmission({ status: "idle" })} />;
  }

  const errors = form.formState.errors;
  const progress = Math.round(((step + 1) / 6) * 100);
  const firstEditableStep = hasHomePrimerAnswers ? 2 : 0;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="rounded-md border border-tide/16 bg-bone/80 p-4 shadow-xl shadow-water/18 sm:p-6">
      <div className="mb-7">
        <div className="flex items-center justify-between text-sm font-semibold text-charcoal-olive/70">
          <span>Step {step + 1} of 6</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-water/34">
          <div className="h-full rounded-full bg-tide transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 0 ? (
        <Step title="Goals and concerns" error={errors.concerns?.message}>
          <CardGrid>{treatmentConcerns.map((concern) => <Option key={concern} selected={currentValues.concerns.includes(concern)} onClick={() => toggleArray("concerns", concern)}>{concern}</Option>)}</CardGrid>
        </Step>
      ) : null}

      {step === 1 ? (
        <Step title="Body areas" error={errors.bodyAreas?.message}>
          <CardGrid>{bodyAreas.map((area) => <Option key={area} selected={currentValues.bodyAreas.includes(area)} onClick={() => toggleArray("bodyAreas", area)}>{area}</Option>)}</CardGrid>
        </Step>
      ) : null}

      {step === 2 ? (
        <Step title="Preferred approach" error={errors.preferredApproaches?.message}>
          <CardGrid>{approaches.map((approach) => <Option key={approach} selected={currentValues.preferredApproaches.includes(approach)} onClick={() => toggleArray("preferredApproaches", approach)}>{approach}</Option>)}</CardGrid>
          <RecommendationPreview recommendations={recommendations} />
        </Step>
      ) : null}

      {step === 3 ? (
        <Step title="Appointment details">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-charcoal-olive">Location type</legend>
            <CardGrid>
              {locationTypes.map((option) => (
                <Option key={option.value} selected={currentValues.locationType === option.value} onClick={() => form.setValue("locationType", option.value, { shouldDirty: true, shouldValidate: true })}>
                  {option.label}
                </Option>
              ))}
            </CardGrid>
          </fieldset>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Desired duration" error={errors.duration?.message}>
              <select {...form.register("duration")} className="field">
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="75">75 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </Field>
            <Field label="Preferred date" error={errors.preferredDate?.message}>
              <input {...form.register("preferredDate")} type="date" className="field" />
            </Field>
            <Field label="Preferred time window" error={errors.timeWindow?.message}>
              <select {...form.register("timeWindow")} className="field">
                <option value="">Choose a window</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Flexible</option>
              </select>
            </Field>
            <Field label="ZIP code" error={errors.zipCode?.message}>
              <input {...form.register("zipCode")} inputMode="numeric" className="field" placeholder="33176" />
            </Field>
            <Field label="Therapist gender preference" error={errors.therapistGenderPreference?.message}>
              <select {...form.register("therapistGenderPreference")} className="field">
                <option>No preference</option>
                <option>Female provider preferred</option>
                <option>Male provider preferred</option>
              </select>
            </Field>
          </div>
        </Step>
      ) : null}

      {step === 4 ? (
        <Step title="Suitability questions" error={errors.suitabilityFlags?.message}>
          <CardGrid>{suitabilityOptions.map((option) => <Option key={option} selected={currentValues.suitabilityFlags.includes(option)} onClick={() => toggleArray("suitabilityFlags", option)}>{option}</Option>)}</CardGrid>
          <Field label="Anything else we should know?" error={errors.suitabilityNotes?.message} className="mt-5">
            <textarea {...form.register("suitabilityNotes")} className="field min-h-28 resize-y" placeholder="Optional notes about comfort, access, medical restrictions or provider preferences." />
          </Field>
        </Step>
      ) : null}

      {step === 5 ? (
        <Step title="Contact">
          <p className="mb-5 rounded-md bg-water/22 p-4 text-sm leading-7 text-charcoal-olive/76">
            Your answers help us recommend a suitable provider and service. They do not constitute medical advice or a diagnosis.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="First name" error={errors.firstName?.message}><input {...form.register("firstName")} className="field" /></Field>
            <Field label="Last name" error={errors.lastName?.message}><input {...form.register("lastName")} className="field" /></Field>
            <Field label="Email" error={errors.email?.message}><input {...form.register("email")} type="email" className="field" /></Field>
            <Field label="Phone" error={errors.phone?.message}><input {...form.register("phone")} type="tel" className="field" /></Field>
            <Field label="Preferred contact method" error={errors.preferredContactMethod?.message}>
              <select {...form.register("preferredContactMethod")} className="field">
                <option value="text">Text</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </Field>
          </div>
          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-charcoal-olive/76">
            <input {...form.register("consent")} type="checkbox" className="mt-1 h-4 w-4 accent-tide" />
            I agree to be contacted about this booking request and understand that provider availability, pricing and service areas may vary.
          </label>
          {errors.consent?.message ? <p className="mt-2 text-sm font-semibold text-red-700">{errors.consent.message}</p> : null}
        </Step>
      ) : null}

      {submission.status === "error" ? <p className="mt-5 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{submission.message}</p> : null}

      <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <Button type="button" variant="secondary" onClick={() => setStep((current) => Math.max(firstEditableStep, current - 1))} disabled={step === firstEditableStep}>
          <ArrowLeft aria-hidden="true" size={16} /> Back
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={() => setStep((current) => Math.min(5, current + 1))}>
            Next <ArrowRight aria-hidden="true" size={16} />
          </Button>
        ) : (
          <Button type="submit" disabled={submission.status === "loading"}>
            {submission.status === "loading" ? "Sending request..." : "Submit request"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Step({ title, error, children }: { title: string; error?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}>
      <h2 id={title.toLowerCase().replace(/\s+/g, "-")} className="font-serif text-3xl text-leaf">{title}</h2>
      {error ? <p className="mt-2 text-sm font-semibold text-red-700">{error}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function Option({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return <SelectableCard selected={selected} onClick={onClick}>{children}</SelectableCard>;
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-leaf">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}

function RecommendationPreview({ recommendations }: { recommendations: Recommendation[] }) {
  if (recommendations.length === 0) return null;

  return (
    <div className="mt-6 rounded-md border border-tide/16 bg-water/18 p-4">
      <p className="text-sm font-bold text-leaf">Current recommendations</p>
      <div className="mt-3 grid gap-3">
        {recommendations.map((recommendation) => (
          <div key={recommendation.serviceId} className="text-sm leading-6 text-charcoal-olive/76">
            <span className="font-semibold text-charcoal-olive">{recommendation.title}: </span>
            {recommendation.reason}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessState({ values, recommendations, onEdit }: { values: LeadFormValues; recommendations: Recommendation[]; onEdit: () => void }) {
  const selectedNames = values.selectedServices
    .map((serviceId) => services.find((service) => service.id === serviceId)?.title)
    .filter((title): title is string => Boolean(title));

  return (
    <div className="rounded-md border border-tide/16 bg-bone/80 p-6 shadow-xl shadow-water/18">
      <CheckCircle2 aria-hidden="true" className="text-tide" size={34} />
      <h2 className="mt-4 font-serif text-4xl text-leaf">Your request has been received.</h2>
      <p className="mt-4 text-base leading-8 text-charcoal-olive/76">
        We’re reviewing your treatment preferences and provider availability. You’ll receive the next booking step shortly.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Summary title="Selected goals" items={values.concerns} />
        <Summary title="Recommended services" items={recommendations.map((item) => item.title)} />
        <Summary title="Selected services" items={selectedNames.length ? selectedNames : ["No direct service selected"]} />
        <Summary title="Requested schedule" items={[`${values.duration} minutes`, values.preferredDate, values.timeWindow, values.zipCode]} />
      </div>
      <p className="mt-6 rounded-md bg-water/22 p-4 text-sm leading-7 text-charcoal-olive/76">
        Contact expectation: we will use your preferred contact method first, then follow up by email or phone if needed.
      </p>
      <Button type="button" variant="secondary" className="mt-6" onClick={onEdit}>
        Edit request
      </Button>
    </div>
  );
}

function Summary({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-tide/16 bg-mist/44 p-4">
      <p className="text-sm font-bold text-leaf">{title}</p>
      <ul className="mt-3 grid gap-1 text-sm leading-6 text-charcoal-olive/72">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
