# AyurPractice SPA – Project Overview



## What this project is

A single-page web app for Ayurvedic diet management used by practitioners to assess dosha, generate a personalized diet plan, and print/share a professional chart for patients. Built with React + TypeScript, Vite, Tailwind, and shadcn/ui.



## Tech stack

- React 18, TypeScript, Vite

- UI: Tailwind CSS, shadcn/ui (Radix primitives), lucide-react icons

- State/data: local component state + mock data in `src/data/*`

- Routing: React Router v6 with simple auth guard via `localStorage`

- Utilities: TanStack Query (ready), date-fns, recharts (available)



## App routes

All routes are declared in `src/App.tsx`.

- Public

  - `/login` → `pages/Login.tsx` (sets `localStorage['ayur-token']`)

- Protected (require token; wrapped by `WebsiteLayout`)

  - `/` → `pages/Dashboard.tsx`

  - `/patients` → `pages/PatientList.tsx`

  - `/patients/:id` → `pages/PatientProfile.tsx` (also `PatientProfileNew.tsx` exists)

  - `/patients/:patientId/diet-chart/new` → `pages/NewDietChart.tsx` (legacy generator)

  - `/patients/:patientId/diet-chart/generator` → `pages/DietPlanGenerator.tsx` (legacy)

  - `/assessment` and `/assessment/:patientId` → `pages/DoshaAssessment.tsx`

  - `/diet-plan/generator` → `pages/DietPlanGeneratorNew.tsx` (primary generator)

  - `/diet-chart/:patientId/generated` → `pages/GeneratedDietChart.tsx`

  - `/appointments` → `pages/Appointments.tsx`

  - `/appointments/new` → `pages/NewAppointment.tsx`

  - `/compliance` → `pages/ComplianceTracking.tsx`

  - `/profile` → `pages/Profile.tsx`

  - `*` → `pages/NotFound.tsx`



Notes

- `ProtectedRoute`/`PublicRoute` in `components/ProtectedRoute.tsx` gate access using `localStorage['ayur-token']`.

- The “Core 6 screens” prioritized for demo are implemented: Login, Dashboard, Patient Profile, Dosha Assessment, Diet Plan Generator (new), Generated Diet Chart.



## What’s implemented (demo-ready)

- Login: mocked auth, polished UI

- Dashboard: widgets and sample appointments/stats

- Patient Database: 25 realistic profiles in `data/patients.ts`

- Dosha Assessment: questionnaire + computed distribution

- Diet Plan Generator (new): dosha-driven, preference-aware generation with nutritional summary and guidelines; 2s “AI” delay

- Generated Diet Chart: print/share friendly, aligned with new plan structure

- UI kit: shadcn components and website layout/navigation



## What remains or could be improved

- Persistence/API

  - Replace mock data with backend APIs for patients, foods, appointments, assessments, and saved diet plans

  - Implement “Save to Patient Records” on generator/chart pages

- Auth

  - Real authentication + refresh tokens; move token storage to HTTP-only cookies

- PDF export

  - Generate true PDFs server-side (Puppeteer) or client-side (jsPDF) and store/share from cloud

- Data model

  - Version diet plans, track compliance, history, and notes per patient

- Tests & QA

  - Unit tests for generator logic, e2e flow, print-layout checks

- Accessibility & i18n

  - ARIA, keyboard nav, color-contrast; language switching



## Data used in this project

All current data is mocked locally under `src/data/`.

- `patients.ts`

  - `demoPatients`: 25 profiles with demographics, dosha distribution, conditions, medications, last/next visits, compliance, notes

  - `todaysAppointments`, `dashboardStats`: sample dashboard data

- `foods.ts`

  - `foodDatabase`: 25 curated items (grains, proteins, vegetables, spices, fruits, fats, sweeteners) with Ayurvedic properties (rasa, virya, vipaka), gunas, `doshaEffects` (0–1 compatibility), nutritional values, benefits, contraindications, preparation tips

  - `ayurvedicPrinciples`: guidelines per primary dosha

- `assessment.ts`

  - `doshaAssessmentQuestions`: 6-question quiz

  - `doshaDescriptions`: per-dosha traits and balancing tips



Which of these should come from the backend/cloud

- Patients: list/details, photo storage, conditions, medications, visit history

- Appointments: schedule, status, reminders

- Diet plans: generated plans saved per patient, versioning, audit trail

- Assessment results: saved outcomes over time

- Authentication/authorization: users, roles, sessions

- Assets & files: generated PDFs, patient avatars → object storage (S3/GCS) with signed URLs

- Master data: food catalog with Ayurvedic attributes; editable in an admin CMS



## How the diet plan generation works (current)

- Inputs: selected patient (primary dosha inferred), preferences (diet type, allergies, dislikes, special requirements)

- Logic: filters foods where `doshaEffects[primaryDosha] >= 0.7`, respects allergies, composes breakfast/lunch/dinner with main/protein/vegetables/spices; picks spices per dosha/time and includes preparation and Ayurvedic notes

- Output: plan with `morning`, `afternoon`, `evening`, `nutritionalSummary` (ranges by dosha), `ayurvedicPrinciples`, and a `doshaAnalysis`

- UX: shows plan instantly after a 2s simulated “AI processing” delay; can navigate to a print-friendly chart



## Repository layout (high level)

- `src/pages/*`: all feature pages mentioned in routes

- `src/components/ui/*`: shadcn components and `website-layout`

- `src/components/ProtectedRoute.tsx`: auth gate wrappers

- `src/data/*`: all mock data discussed above

- `src/lib/*`: helpers like `appointments.ts`, `utils.ts`



## Demo flow

1) Login (any credentials) → 2) Dashboard → 3) Pick a patient → 4) Assessment (optional) → 5) Diet Plan Generator (set preferences, generate) → 6) View/Print Generated Diet Chart



## Completed vs pending (quick view)

- Completed: Core 6 screens, 25-patient DB, 25-food DB with gunas, new generator + chart, print-friendly UI

- Pending: Real APIs, save/export flows, auth hardening, server/cloud storage, testing
