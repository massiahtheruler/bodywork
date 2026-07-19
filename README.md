# Miami Bodywork Network

Production-oriented prototype for a Miami massage and bodywork lead-generation platform. The public brand is intentionally provider-neutral: it presents a curated network of independent licensed providers, not one studio.

## Project Structure

- `app/` contains App Router pages, dynamic route templates, sitemap, robots and the lead API route.
- `components/` contains layout, hero, service, matching, form, motion, SEO and UI pieces.
- `data/` contains editable brand, navigation, service, concern, FAQ and location data.
- `lib/validation/` contains Zod schemas for client and server validation.
- `lib/matching/` contains the editable rule-based recommendation engine.
- `lib/leads/` contains lead routing and the future destination adapter interface.
- `types/` contains shared domain types.

## Service Data

Services live in `data/services.ts`. Each service includes:

- `id` and `slug`
- display copy
- category
- related concerns and body areas
- pressure level
- durations and starting price placeholder
- provider requirements
- suitability note
- image slot
- SEO metadata
- visible FAQs

To add a service, add one object to `services`. The overview page, dynamic service page, sitemap and matching links can use it automatically.

## Matching Rules

Rules live in `lib/matching/rules.ts`. Each rule maps visitor answers to one service recommendation, with:

- matching concerns
- matching body areas
- preferred approaches
- suitability flags
- plain-English recommendation reason
- review flag
- weight

The engine returns no more than three recommendations and does not diagnose medical conditions.

## Adding a Provider

The prototype includes provider-neutral routing in `lib/leads/routing.ts`.

To add a real provider later:

1. Create a provider data model with ID, service area ZIP codes, supported service IDs, appointment types and profile fields.
2. Replace the current `primaryStudio` constant with typed provider records.
3. Update `routeLead` to choose from provider records instead of one hardcoded primary provider.
4. Add real provider profile data before publishing `/therapists/[slug]` pages.

Do not publish credentials, years of experience or reviews until verified.

## Adding a Location

Locations live in `data/locations.ts`. Add a location object with:

- `slug`
- local headline and description
- ZIP codes
- available service IDs
- local notes
- local FAQs

The dynamic location page and sitemap will pick it up.

## Connecting a Lead Destination

Lead submissions POST to `app/api/leads/route.ts`.

The route validates with `leadSchema`, routes with `routeLead`, then sends through `consoleLeadAdapter`. Replace that adapter with a CRM, email, SMS or booking-platform integration.

Keep vendor clients lazy-initialized inside getter functions so `next build` does not crash when production environment variables are missing.

## Environment Variables

No environment variables are required for the current prototype.

Likely future variables:

- `CRM_API_KEY`
- `LEAD_NOTIFICATION_EMAIL`
- `SMS_PROVIDER_TOKEN`
- `BOOKING_PLATFORM_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Current Placeholders

- Brand name, phone, email and base URL in `data/brand.ts`
- Pricing in `data/services.ts`
- Licensure, certification, screening and review proof on the homepage
- Privacy policy and terms legal language
- Provider profiles
- Final CRM, email, SMS or booking destination
- Final owned photography or video/GIF assets
# bodywork
