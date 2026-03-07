# Folio — Full Application Build

## TL;DR

> **Quick Summary**: Build the complete Folio SaaS application — a personal website builder that extracts LinkedIn profile data, lets users pick a template, and programmatically deploys a static site to Vercel. Greenfield Next.js 14 project with Clerk auth, Supabase DB, Dodo Payments, Proxycurl LinkedIn scraping, and Anthropic bio cleanup.
>
> **Deliverables**:
> - Landing page with hero, template gallery, pricing, FAQ
> - Paywall flow (`/start`) with Dodo Payments checkout
> - Build wizard (`/build`) — LinkedIn extraction → template selection with live preview → Vercel deploy
> - Dashboard (`/dashboard`) — site management, template swap, domain guide, billing
> - 5 functional placeholder templates (ivory-editorial, noir-minimal, forest-link, violet-pro, grid-bright)
> - 7 API routes (checkout, webhooks, extract, deploy, customer-portal, sites CRUD, clerk webhook)
> - Full TDD test suite (vitest)
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Task 1 → Task 8 → Task 13 → Task 17 → Task 18 → F1-F4

---

## Context

### Original Request
Build the full Folio application from project.md spec. Folio is a personal website builder that generates a live, hosted website from a user's LinkedIn profile. The owner's moat is template designs — we build the infrastructure that powers them.

### Interview Summary
**Key Discussions**:
- **Payment provider**: User explicitly chose Dodo Payments over Stripe — all payment references updated
- **Landing page**: No existing HTML file — building from the project.md spec fresh
- **Templates**: Building 5 functional placeholder templates (visually distinct, using design system) — owner replaces with final designs later
- **Test strategy**: TDD with vitest — write failing tests first, then implement
- **AI provider**: Anthropic claude-sonnet-4-6 for bio cleanup (build prompt overrides project.md's OpenAI reference)

**Research Findings**:
- **Dodo Payments SDK**: 3 packages — `dodopayments` (core), `@dodopayments/nextjs` (App Router adapter with Checkout/Webhooks/CustomerPortal), `dodopayments-checkout` (frontend embed). Checkout via `dodo.checkoutSessions.create()`, webhooks via Standard Webhooks spec (HMAC SHA256)
- **Dodo subscription states**: 7 states (pending, active, on_hold, paused, cancelled, expired, failed) — more than originally spec'd
- **Dodo customer management**: Pre-create customers on signup, deduplicate by email, use `customer_id` for checkout sessions

### Metis Review
**Identified Gaps** (addressed):
- **Proxycurl sunsetting risk**: Website now redirects to NinjaPear. API still works but future uncertain → Abstract behind `LinkedInExtractor` interface for easy swap
- **Proxycurl 404s cost credits**: 404 responses still consume 1 credit → Validate LinkedIn URL format before API call
- **Deploy architecture**: Per-user Next.js builds are too heavy → Use `renderToStaticMarkup()` server-side with pre-generated template CSS. No per-user build step needed
- **Clerk→Supabase sync**: Need webhook to create Supabase user record when Clerk user signs up
- **Clerk→Dodo sync**: Pre-create Dodo customer on Clerk signup for clean checkout flow
- **Template CSS isolation**: Use Tailwind prefix `tmpl-` for template styles to prevent collisions with main app
- **Wildcard subdomain**: Use `*.folio.dev` CNAME → `cname.vercel-dns.com` for user site subdomains
- **Vercel plan requirements**: Pro plan ($20/mo) needed for production (6000 deploys/day, 12 concurrent builds)

---

## Work Objectives

### Core Objective
Build a complete, production-ready Folio SaaS application where users can sign up, pay, extract their LinkedIn profile, choose a template, and deploy a live personal website — all within a single Next.js 14 application.

### Concrete Deliverables
- Next.js 14 app with 4 routes: `/`, `/start`, `/build`, `/dashboard`
- 7 API routes: `/api/checkout`, `/api/webhooks/dodo`, `/api/webhooks/clerk`, `/api/extract`, `/api/deploy`, `/api/sites`, `/api/customer-portal`
- 5 template React components with typed `ProfileData` props
- Template registry at `/lib/templates.ts`
- Static site generation service using `renderToStaticMarkup()`
- Supabase schema (users + sites tables)
- Full vitest test suite covering all services and API routes

### Definition of Done
- [ ] `npm run build` completes without errors
- [ ] `npm run test` — all tests pass
- [ ] All 4 pages render and are navigable
- [ ] Clerk auth protects `/build` and `/dashboard`
- [ ] Dodo Payments checkout creates a subscription
- [ ] LinkedIn URL extraction returns populated ProfileData
- [ ] Template preview renders with extracted data
- [ ] Vercel deploy creates a live site
- [ ] Dashboard shows user's sites

### Must Have
- Dark gold/cream design system (CSS vars: --bg: #0e0d0c, --cream: #f0ead8, --gold: #c9a84c) across ALL pages
- Playfair Display (headings) + DM Sans (body) + DM Mono (code/labels) — no other fonts
- TypeScript strict mode, Zod validation on all API routes, no `any` types
- Mobile responsive (Tailwind `md:` breakpoints)
- Loading, error, and empty states on every UI component
- LinkedIn URL validation before Proxycurl call (reject non-`/in/` URLs)
- LinkedInExtractor interface abstracting Proxycurl (for future provider swap)
- 7 Dodo subscription states handled (pending, active, on_hold, paused, cancelled, expired, failed)
- Pre-create Dodo customer on Clerk signup
- Paywall enforced before build/deploy (free users can only preview first 5 templates)

### Must NOT Have (Guardrails)
- No Inter, Roboto, or system fonts — ever
- No purple gradients on white backgrounds
- No Twitter/Instagram extraction in V1 (show "Coming soon" labels)
- No agency white-labeling or custom template uploads
- No auto-updating when socials change
- No per-user Next.js/Vite build step — use `renderToStaticMarkup()` for static HTML generation
- No `any` types, no `@ts-ignore`, no `as any` casts
- No OpenAI — use Anthropic claude-sonnet-4-6 for all AI calls
- No Stripe — use Dodo Payments for all payment flows
- No excessive comments or JSDoc on obvious code
- No premature abstraction beyond the LinkedInExtractor interface

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (greenfield)
- **Automated tests**: TDD (RED → GREEN → REFACTOR)
- **Framework**: vitest + @testing-library/react
- **Setup task**: Task 7 in Wave 1

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Library/Module**: Use Bash (node/tsx REPL) — Import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation, ALL independent):
├── Task 1: Project scaffolding + Next.js config [quick]
├── Task 2: Design system — CSS vars, fonts, Tailwind theme, global styles [visual-engineering]
├── Task 3: TypeScript type definitions — ProfileData, TemplateProps, User, Site [quick]
├── Task 4: Supabase setup — client, schema SQL, typed query helpers [quick]
├── Task 5: Clerk auth — ClerkProvider, middleware, user.created webhook [quick]
├── Task 6: Dodo Payments client setup + types [quick]
└── Task 7: Vitest + testing infrastructure [quick]

Wave 2 (After Wave 1 — core services + landing page, MAX PARALLEL):
├── Task 8: Template system — registry, interface, 5 placeholder components (depends: 2, 3) [deep]
├── Task 9: LinkedIn extractor — interface + Proxycurl + URL validation (depends: 3) [unspecified-high]
├── Task 10: Anthropic bio cleanup service (depends: 3) [quick]
├── Task 11: Dodo checkout API + Clerk→Dodo customer sync (depends: 4, 5, 6) [unspecified-high]
├── Task 12: Dodo webhook handler — full subscription lifecycle (depends: 4, 6) [unspecified-high]
├── Task 13: Vercel deploy service — renderToStaticMarkup + API upload (depends: 3, 8) [deep]
└── Task 14: Landing page — all sections from spec (depends: 2) [visual-engineering]

Wave 3 (After Wave 2 — app pages, integration):
├── Task 15: Paywall page /start (depends: 11, 14) [visual-engineering]
├── Task 16: Build wizard — LinkedIn input + extraction UI (depends: 9, 10) [visual-engineering]
├── Task 17: Build wizard — Template selection + live preview (depends: 8, 16) [visual-engineering]
├── Task 18: Build wizard — Deploy flow + success state (depends: 13, 17) [visual-engineering]
├── Task 19: Dashboard — site listing + site cards (depends: 4) [visual-engineering]
└── Task 20: Dashboard — edit, re-deploy, domain guide, billing (depends: 12, 13, 19) [visual-engineering]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 8 → Task 13 → Task 17 → Task 18 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 7 (Waves 1 & 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1-7 | — | 8-14 | 1 |
| 8 | 2, 3 | 13, 17 | 2 |
| 9 | 3 | 16 | 2 |
| 10 | 3 | 16 | 2 |
| 11 | 4, 5, 6 | 15 | 2 |
| 12 | 4, 6 | 20 | 2 |
| 13 | 3, 8 | 18, 20 | 2 |
| 14 | 2 | 15 | 2 |
| 15 | 11, 14 | — | 3 |
| 16 | 9, 10 | 17 | 3 |
| 17 | 8, 16 | 18 | 3 |
| 18 | 13, 17 | — | 3 |
| 19 | 4 | 20 | 3 |
| 20 | 12, 13, 19 | — | 3 |

### Agent Dispatch Summary

- **Wave 1**: **7 tasks** — T1 → `quick`, T2 → `visual-engineering`, T3 → `quick`, T4 → `quick`, T5 → `quick`, T6 → `quick`, T7 → `quick`
- **Wave 2**: **7 tasks** — T8 → `deep`, T9 → `unspecified-high`, T10 → `quick`, T11 → `unspecified-high`, T12 → `unspecified-high`, T13 → `deep`, T14 → `visual-engineering`
- **Wave 3**: **6 tasks** — T15-T18 → `visual-engineering`, T19 → `visual-engineering`, T20 → `visual-engineering`
- **Wave FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Project Scaffolding + Next.js Configuration

  **What to do**:
  - Run `npx create-next-app@latest folio --typescript --tailwind --app --src-dir --no-import-alias` inside `/Users/namanshiroha/folio/`
  - Install all dependencies: `npm install @clerk/nextjs @supabase/supabase-js dodopayments @dodopayments/nextjs framer-motion @anthropic-ai/sdk zod`
  - Install dev dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom @types/react @types/node`
  - Configure `tsconfig.json`: set `strict: true`, ensure path aliases (`@/*` → `./src/*`)
  - Create `.env.local.example` with all required env vars (see below)
  - Create `.env.local` with placeholder values
  - Update `next.config.js` (or `.mjs`): add image domains for LinkedIn avatars (`media.licdn.com`)
  - Add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`
  - Initialize git repo: `git init`

  **Environment variables for `.env.local.example`**:
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  CLERK_WEBHOOK_SECRET=
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  DODO_PAYMENTS_API_KEY=
  DODO_PAYMENTS_WEBHOOK_KEY=
  DODO_PAYMENTS_RETURN_URL=http://localhost:3000/build
  DODO_PAYMENTS_ENVIRONMENT=test_mode
  DODO_PRODUCT_PRO=
  DODO_PRODUCT_AGENCY=
  PROXYCURL_API_KEY=
  ANTHROPIC_API_KEY=
  VERCEL_API_TOKEN=
  VERCEL_TEAM_ID=
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```

  **Must NOT do**:
  - Do not add any fonts yet (Task 2)
  - Do not configure Clerk middleware yet (Task 5)
  - Do not write any page content

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward scaffolding with well-defined commands, no creative decisions
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No design work in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: Tasks 8-14 (all Wave 2 tasks depend on project existing)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:70-102` — Tech stack section specifying Next.js 14, Tailwind, Framer Motion, and all dependencies

  **External References**:
  - Next.js 14 App Router: `https://nextjs.org/docs/app`
  - create-next-app: `https://nextjs.org/docs/getting-started/installation`

  **WHY Each Reference Matters**:
  - project.md tech stack section defines exact framework versions and dependencies to install
  - Next.js docs confirm correct create-next-app flags for App Router + TypeScript + Tailwind

  **Acceptance Criteria**:

  - [ ] `npm run build` completes without errors
  - [ ] `npm run test` runs (even if 0 tests found — vitest configured in Task 7)
  - [ ] `tsconfig.json` has `"strict": true`
  - [ ] `.env.local.example` contains all 16 environment variables listed above
  - [ ] `package.json` has all required dependencies

  **QA Scenarios**:

  ```
  Scenario: Project builds successfully
    Tool: Bash
    Preconditions: All dependencies installed
    Steps:
      1. Run `npm run build` in /Users/namanshiroha/folio/folio
      2. Check exit code is 0
      3. Verify `.next` directory exists
    Expected Result: Build completes with exit code 0, .next directory created
    Failure Indicators: Non-zero exit code, TypeScript errors, missing dependencies
    Evidence: .sisyphus/evidence/task-1-build-success.txt

  Scenario: Strict TypeScript catches errors
    Tool: Bash
    Preconditions: tsconfig.json configured
    Steps:
      1. Run `npx tsc --noEmit` in project directory
      2. Verify exit code 0
    Expected Result: No type errors
    Failure Indicators: Type errors in output
    Evidence: .sisyphus/evidence/task-1-tsc-check.txt
  ```

  **Commit**: YES (standalone)
  - Message: `chore(init): scaffold Next.js 14 project with core dependencies`
  - Files: `folio/**`
  - Pre-commit: `npm run build`

- [ ] 2. Design System — CSS Variables, Fonts, Tailwind Theme, Global Styles

  **What to do**:
  - Install Google Fonts via `next/font/google`: Playfair Display (400, 400i, 700, 700i), DM Sans (300, 400, 500), DM Mono (400)
  - Configure fonts in `src/app/layout.tsx` using `next/font/google` — apply CSS variable approach (`variable` prop) so fonts are available via CSS custom properties
  - Set up CSS custom properties in `src/app/globals.css`:
    ```css
    :root {
      --bg: #0e0d0c;
      --bg2: #141310;
      --bg3: #1c1a17;
      --cream: #f0ead8;
      --cream-dim: #c4b99a;
      --gold: #c9a84c;
      --gold-light: #e8c96a;
      --font-display: var(--font-playfair-display);
      --font-body: var(--font-dm-sans);
      --font-mono: var(--font-dm-mono);
    }
    ```
  - Extend `tailwind.config.ts` to use these CSS variables:
    - Colors: `bg`, `bg2`, `bg3`, `cream`, `cream-dim`, `gold`, `gold-light`
    - Font families: `display` (Playfair Display), `body` (DM Sans), `mono` (DM Mono)
  - Style `globals.css` with base layer: body background `var(--bg)`, text `var(--cream)`, default font `var(--font-body)`
  - Create `src/components/ui/` directory for shared UI components (empty for now — establishes convention)
  - Set scrollbar styling for the dark theme
  - Add selection color styling (gold highlight on cream text)

  **Must NOT do**:
  - Do not use Inter, Roboto, or system-ui fonts anywhere
  - Do not use purple gradients on white backgrounds
  - Do not install font files manually — use `next/font/google` for the main app

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system work involving typography, color tokens, and Tailwind theme configuration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Design system setup requires understanding of CSS custom properties, Tailwind theming, and font optimization
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser testing needed for config files

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-7)
  - **Blocks**: Tasks 8, 14 (template system and landing page need design tokens)
  - **Blocked By**: None (will create the files — Task 1 creates the project but this task can create any missing dirs)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:74-77` — Frontend stack specifying fonts and styling approach

  **External References**:
  - Build prompt "Design System" section — exact CSS variable values and font rules
  - Next.js font optimization: `https://nextjs.org/docs/app/building-your-application/optimizing/fonts`
  - Tailwind CSS theming: `https://tailwindcss.com/docs/customizing-colors`

  **WHY Each Reference Matters**:
  - project.md confirms exact font families; build prompt provides exact hex values for all CSS variables
  - Next.js font docs show the `variable` prop approach for CSS custom property-based font loading
  - Tailwind docs show how to extend theme with CSS variables

  **Acceptance Criteria**:

  - [ ] `globals.css` contains all 7 CSS custom properties (--bg through --gold-light)
  - [ ] `tailwind.config.ts` extends colors and fontFamily with CSS variable references
  - [ ] `layout.tsx` loads Playfair Display, DM Sans, and DM Mono via `next/font/google`
  - [ ] Body defaults to dark background (#0e0d0c) and cream text (#f0ead8)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Design tokens render correctly
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running (`npm run dev`)
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert `document.body` computed background-color is `rgb(14, 13, 12)` (--bg: #0e0d0c)
      3. Assert `document.body` computed color is `rgb(240, 234, 216)` (--cream: #f0ead8)
      4. Assert CSS variable `--gold` resolves to `#c9a84c` via `getComputedStyle(document.documentElement).getPropertyValue('--gold')`
      5. Take screenshot
    Expected Result: Dark background, cream text, all CSS variables defined
    Failure Indicators: White background, black text, missing CSS variables
    Evidence: .sisyphus/evidence/task-2-design-tokens.png

  Scenario: Fonts load correctly
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Check that `document.fonts.check('16px "Playfair Display"')` returns true (after fonts load)
      3. Check that `document.fonts.check('16px "DM Sans"')` returns true
      4. Verify no font-loading errors in console
    Expected Result: Both fonts loaded and available
    Failure Indicators: Font check returns false, fallback fonts visible
    Evidence: .sisyphus/evidence/task-2-fonts-loaded.png
  ```

  **Commit**: YES (groups with Task 3)
  - Message: `feat(design): add design system, types, and global styles`
  - Files: `src/app/globals.css`, `src/app/layout.tsx`, `tailwind.config.ts`
  - Pre-commit: `npx tsc --noEmit`

- [ ] 3. TypeScript Type Definitions

  **What to do**:
  - Create `src/types/index.ts` — central type exports
  - Create `src/types/profile.ts`:
    ```typescript
    export interface ProfileData {
      name: string;
      headline: string;
      bio: string;
      location: string;
      avatar_url: string;
      linkedin_url: string;
      twitter_url?: string;
      instagram_url?: string;
      experience: Experience[];
      skills: string[];
      custom_links: CustomLink[];
    }
    export interface Experience { title: string; company: string; dates: string; }
    export interface CustomLink { label: string; url: string; }
    ```
  - Create `src/types/template.ts`:
    ```typescript
    export interface TemplateProps { profile: ProfileData; accentColor?: string; }
    export interface TemplateMeta { name: string; slug: string; tag: 'light' | 'dark'; previewImage: string; isPremium: boolean; }
    export interface TemplateEntry { Component: React.ComponentType<TemplateProps>; meta: TemplateMeta; defaultProps: TemplateProps; }
    ```
  - Create `src/types/database.ts`:
    ```typescript
    export type SubscriptionStatus = 'pending' | 'active' | 'on_hold' | 'paused' | 'cancelled' | 'expired' | 'failed';
    export type PlanType = 'free' | 'pro' | 'agency';
    export interface DbUser { id: string; email: string; dodo_customer_id: string | null; subscription_id: string | null; subscription_status: SubscriptionStatus; plan: PlanType; created_at: string; }
    export interface DbSite { id: string; user_id: string; template_id: string; vercel_project_id: string | null; vercel_url: string | null; custom_domain: string | null; profile_data: ProfileData; created_at: string; updated_at: string; }
    ```
  - Create `src/types/api.ts` — Zod schemas for API request/response validation:
    ```typescript
    // ExtractRequest, DeployRequest, CheckoutRequest schemas
    ```

  **Must NOT do**:
  - Do not use `any` types
  - Do not import from external packages here — pure type definitions only

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure TypeScript type definitions — no logic, no UI
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4-7)
  - **Blocks**: Tasks 8, 9, 10, 13 (all services need types)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:112-154` — Data models section with User, Site, ProfileData TypeScript definitions

  **External References**:
  - Build prompt "Template component interface" section — TemplateProps definition
  - Build prompt "Data Models" section — exact field types

  **WHY Each Reference Matters**:
  - project.md data models are the authoritative schema — types must match exactly
  - Build prompt adds `accentColor` to TemplateProps which project.md doesn't have — include it

  **Acceptance Criteria**:

  - [ ] `npx tsc --noEmit` passes with no errors
  - [ ] `ProfileData` interface has all 12 fields from project.md
  - [ ] `SubscriptionStatus` union has all 7 Dodo states
  - [ ] `TemplateMeta` includes `isPremium` boolean for paywall enforcement
  - [ ] Zod schemas created for all API inputs

  **QA Scenarios**:

  ```
  Scenario: Types compile correctly
    Tool: Bash
    Preconditions: TypeScript configured with strict mode
    Steps:
      1. Run `npx tsc --noEmit` in project directory
      2. Verify exit code 0
      3. Grep output for errors related to src/types/
    Expected Result: Clean compilation, no type errors
    Failure Indicators: Any TypeScript error in output
    Evidence: .sisyphus/evidence/task-3-types-compile.txt

  Scenario: Types are importable
    Tool: Bash
    Preconditions: Types files created
    Steps:
      1. Create a temporary test file that imports all exported types
      2. Run `npx tsc --noEmit` to verify imports resolve
      3. Delete temporary file
    Expected Result: All type imports resolve correctly
    Failure Indicators: Module not found errors, unresolved imports
    Evidence: .sisyphus/evidence/task-3-types-import.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `feat(design): add design system, types, and global styles`
  - Files: `src/types/**`
  - Pre-commit: `npx tsc --noEmit`

- [ ] 4. Supabase Setup — Client, Schema SQL, Typed Query Helpers

  **What to do**:
  - Create `src/lib/supabase.ts` — export two clients:
    - `supabaseClient` (browser, uses anon key): for client components
    - `supabaseAdmin` (server, uses service role key): for API routes
  - Create `supabase/schema.sql` with the complete database schema:
    ```sql
    CREATE TABLE users (
      id TEXT PRIMARY KEY,              -- Clerk user ID
      email TEXT NOT NULL,
      dodo_customer_id TEXT,
      subscription_id TEXT,
      subscription_status TEXT DEFAULT 'pending',
      plan TEXT DEFAULT 'free',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE sites (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      template_id TEXT NOT NULL,
      vercel_project_id TEXT,
      vercel_url TEXT,
      custom_domain TEXT,
      profile_data JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- RLS policies
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can read own data" ON users FOR SELECT USING (id = current_setting('request.jwt.claims')::json->>'sub');
    CREATE POLICY "Service role full access users" ON users FOR ALL USING (current_setting('role') = 'service_role');
    CREATE POLICY "Users can read own sites" ON sites FOR SELECT USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
    CREATE POLICY "Service role full access sites" ON sites FOR ALL USING (current_setting('role') = 'service_role');
    ```
  - Create `src/lib/db.ts` — typed query helper functions:
    - `getUser(clerkId: string): Promise<DbUser | null>`
    - `upsertUser(user: Partial<DbUser> & { id: string; email: string }): Promise<DbUser>`
    - `updateUserPlan(clerkId: string, plan: PlanType, subscriptionId: string, status: SubscriptionStatus): Promise<void>`
    - `getSitesByUser(userId: string): Promise<DbSite[]>`
    - `createSite(site: Omit<DbSite, 'id' | 'created_at' | 'updated_at'>): Promise<DbSite>`
    - `updateSite(siteId: string, updates: Partial<DbSite>): Promise<DbSite>`
    - `deleteSite(siteId: string): Promise<void>`

  **Must NOT do**:
  - Do not use `any` for Supabase responses — type all returns with `DbUser`/`DbSite`
  - Do not expose service role key to client components

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Supabase client setup with typed wrappers — well-documented pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5-7)
  - **Blocks**: Tasks 11, 12, 19, 20 (payments and dashboard need DB)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:108-154` — Data models defining exact schema

  **External References**:
  - Supabase JS client: `https://supabase.com/docs/reference/javascript`
  - Supabase RLS: `https://supabase.com/docs/guides/auth/row-level-security`
  - Build prompt "Database Schema" section — exact SQL for tables

  **WHY Each Reference Matters**:
  - project.md data models are the authoritative schema for table structure
  - Build prompt SQL is the starting point but needs amendments (dodo_customer_id, subscription_status, subscription_id columns added per Metis review)

  **Acceptance Criteria**:

  - [ ] `supabase/schema.sql` contains both tables with all columns including `dodo_customer_id`, `subscription_id`, `subscription_status`
  - [ ] `src/lib/supabase.ts` exports `supabaseClient` and `supabaseAdmin`
  - [ ] `src/lib/db.ts` exports all 7 typed query functions
  - [ ] `npx tsc --noEmit` passes
  - [ ] No `any` types in any Supabase code

  **QA Scenarios**:

  ```
  Scenario: Supabase clients initialize without errors
    Tool: Bash
    Preconditions: Environment variables set (can use dummy values for type checking)
    Steps:
      1. Run `npx tsc --noEmit` — verify no type errors in lib/supabase.ts or lib/db.ts
      2. Verify supabaseClient uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
      3. Verify supabaseAdmin uses SUPABASE_SERVICE_ROLE_KEY
    Expected Result: Clean types, correct env var usage
    Failure Indicators: Type errors, wrong env var names
    Evidence: .sisyphus/evidence/task-4-supabase-types.txt

  Scenario: Schema SQL is valid
    Tool: Bash
    Preconditions: schema.sql file exists
    Steps:
      1. Read supabase/schema.sql
      2. Verify it contains CREATE TABLE users with columns: id, email, dodo_customer_id, subscription_id, subscription_status, plan, created_at
      3. Verify it contains CREATE TABLE sites with columns: id, user_id, template_id, vercel_project_id, vercel_url, custom_domain, profile_data, created_at, updated_at
      4. Verify RLS policies exist for both tables
    Expected Result: Complete schema with all columns and RLS
    Failure Indicators: Missing columns, missing RLS policies
    Evidence: .sisyphus/evidence/task-4-schema-valid.txt
  ```

  **Commit**: YES (groups with Tasks 5, 6, 7)
  - Message: `feat(infra): configure Supabase, Clerk, Dodo Payments, and vitest`
  - Files: `src/lib/supabase.ts`, `src/lib/db.ts`, `supabase/schema.sql`
  - Pre-commit: `npx tsc --noEmit`

- [ ] 5. Clerk Auth — ClerkProvider, Middleware, User Webhook

  **What to do**:
  - Wrap app in `ClerkProvider` in `src/app/layout.tsx`
  - Create `src/middleware.ts` using `clerkMiddleware()`:
    - Protect `/build` and `/dashboard` routes (require authentication)
    - Allow `/`, `/start`, `/api/webhooks/*` as public routes
  - Create `src/app/api/webhooks/clerk/route.ts`:
    - Verify Clerk webhook signature using `svix` package (install it: `npm install svix`)
    - Handle `user.created` event:
      1. Extract email and Clerk user ID from payload
      2. Create user record in Supabase via `upsertUser()`
      3. Pre-create Dodo Payments customer via `dodo.customers.create({ email, name, metadata: { clerk_user_id } })`
      4. Store `dodo_customer_id` in Supabase user record
    - Handle `user.deleted` event: clean up user data
  - Create sign-in / sign-up pages using Clerk's pre-built components:
    - `src/app/sign-in/[[...sign-in]]/page.tsx` — Clerk `<SignIn />` component
    - `src/app/sign-up/[[...sign-up]]/page.tsx` — Clerk `<SignUp />` component
    - Style with dark theme to match design system

  **Must NOT do**:
  - Do not build custom auth UI — use Clerk's pre-built components
  - Do not expose Clerk secret key to client

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Clerk setup following their Next.js docs
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 6-7)
  - **Blocks**: Task 11 (Dodo checkout needs user context)
  - **Blocked By**: None

  **References**:

  **External References**:
  - Clerk Next.js quickstart: `https://clerk.com/docs/quickstarts/nextjs`
  - Clerk middleware: `https://clerk.com/docs/references/nextjs/clerk-middleware`
  - Clerk webhooks: `https://clerk.com/docs/integrations/webhooks`
  - Dodo customer creation (from research): `dodo.customers.create({ email, name, metadata })`

  **WHY Each Reference Matters**:
  - Clerk docs define the exact middleware configuration and webhook payload shapes
  - Dodo customer pre-creation pattern from Metis review ensures clean payment flow later

  **Acceptance Criteria**:

  - [ ] `middleware.ts` protects `/build` and `/dashboard`, allows public routes
  - [ ] `/api/webhooks/clerk` handles `user.created` with Supabase upsert + Dodo customer creation
  - [ ] Sign-in and sign-up pages render with Clerk components
  - [ ] `npx tsc --noEmit` passes

  **QA Scenarios**:

  ```
  Scenario: Protected routes redirect unauthenticated users
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, user NOT signed in
    Steps:
      1. Navigate to `http://localhost:3000/build`
      2. Assert redirect to Clerk sign-in page (URL contains `/sign-in`)
      3. Navigate to `http://localhost:3000/dashboard`
      4. Assert redirect to Clerk sign-in page
      5. Navigate to `http://localhost:3000/`
      6. Assert page loads normally (no redirect)
    Expected Result: /build and /dashboard redirect; / loads normally
    Failure Indicators: Protected routes load without auth, public routes redirect
    Evidence: .sisyphus/evidence/task-5-auth-redirect.png

  Scenario: Clerk webhook validates signature
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. Send POST to `http://localhost:3000/api/webhooks/clerk` with empty body and no signature headers
      2. Assert response status is 401 or 400
    Expected Result: Webhook rejects unsigned requests
    Failure Indicators: 200 response to unsigned request
    Evidence: .sisyphus/evidence/task-5-webhook-reject.txt
  ```

  **Commit**: YES (groups with Tasks 4, 6, 7)
  - Message: `feat(infra): configure Supabase, Clerk, Dodo Payments, and vitest`
  - Files: `src/middleware.ts`, `src/app/api/webhooks/clerk/route.ts`, `src/app/sign-in/**`, `src/app/sign-up/**`
  - Pre-commit: `npx tsc --noEmit`

- [ ] 6. Dodo Payments Client Setup + Types

  **What to do**:
  - Create `src/lib/dodo.ts` — shared Dodo Payments client:
    ```typescript
    import DodoPayments from 'dodopayments';
    export const dodo = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: (process.env.DODO_PAYMENTS_ENVIRONMENT ?? 'test_mode') as 'test_mode' | 'live_mode',
      webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
    });
    ```
  - Create `src/lib/billing.ts` — billing helper functions:
    - `createCheckoutSession(productId: string, customerId: string, metadata: Record<string, string>): Promise<{ checkoutUrl: string; sessionId: string }>`
    - `getSubscription(subscriptionId: string)` — fetch subscription details
    - `cancelSubscription(subscriptionId: string)` — cancel a subscription
    - `getCustomerPortalUrl(customerId: string)` — generate portal redirect URL
    - `changePlan(subscriptionId: string, newProductId: string)` — upgrade/downgrade
  - Add Dodo-specific Zod schemas to `src/types/api.ts`:
    - `CheckoutRequestSchema` — validates `{ productId: string; userId: string }`
    - `WebhookPayloadSchema` — validates webhook body structure

  **Must NOT do**:
  - No Stripe imports or references anywhere
  - Do not hardcode product IDs — use environment variables

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Client setup and typed wrappers — straightforward SDK configuration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-5, 7)
  - **Blocks**: Tasks 11, 12 (checkout and webhooks need client)
  - **Blocked By**: None

  **References**:

  **External References**:
  - Dodo Payments Node SDK: `https://github.com/dodopayments/dodopayments-node` (v2.20.0)
  - `@dodopayments/nextjs` adapter: `https://docs.dodopayments.com/developer-resources/nextjs-adaptor`
  - Dodo API reference: `https://docs.dodopayments.com/api-reference`

  **WHY Each Reference Matters**:
  - SDK repo has TypeScript examples for client initialization and all API methods
  - Next.js adapter docs show Checkout/Webhooks/CustomerPortal exports for route handlers
  - API reference defines all request/response shapes for checkout sessions and subscriptions

  **Acceptance Criteria**:

  - [ ] `src/lib/dodo.ts` exports configured DodoPayments client
  - [ ] `src/lib/billing.ts` exports 5 typed helper functions
  - [ ] All functions use Dodo SDK methods, not raw HTTP
  - [ ] Product IDs come from env vars (DODO_PRODUCT_PRO, DODO_PRODUCT_AGENCY)
  - [ ] `npx tsc --noEmit` passes

  **QA Scenarios**:

  ```
  Scenario: Dodo client types compile
    Tool: Bash
    Preconditions: dodopayments package installed
    Steps:
      1. Run `npx tsc --noEmit`
      2. Verify no errors in src/lib/dodo.ts or src/lib/billing.ts
    Expected Result: Clean compilation
    Failure Indicators: Type errors, missing SDK types
    Evidence: .sisyphus/evidence/task-6-dodo-types.txt

  Scenario: Billing helpers have correct signatures
    Tool: Bash
    Preconditions: Files created
    Steps:
      1. Verify `createCheckoutSession` accepts (productId, customerId, metadata) and returns Promise<{ checkoutUrl, sessionId }>
      2. Verify `cancelSubscription` accepts subscriptionId string
      3. Verify no hardcoded product IDs (grep for price_ or prod_ literals)
    Expected Result: Correct signatures, no hardcoded IDs
    Failure Indicators: Wrong parameter types, hardcoded values
    Evidence: .sisyphus/evidence/task-6-billing-signatures.txt
  ```

  **Commit**: YES (groups with Tasks 4, 5, 7)
  - Message: `feat(infra): configure Supabase, Clerk, Dodo Payments, and vitest`
  - Files: `src/lib/dodo.ts`, `src/lib/billing.ts`
  - Pre-commit: `npx tsc --noEmit`

- [ ] 7. Vitest + Testing Infrastructure

  **What to do**:
  - Create `vitest.config.ts` at project root:
    ```typescript
    import { defineConfig } from 'vitest/config';
    import react from '@vitejs/plugin-react';
    import path from 'path';
    export default defineConfig({
      plugins: [react()],
      test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
      },
      resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    });
    ```
  - Create `src/test/setup.ts` — global test setup:
    - Import `@testing-library/jest-dom`
    - Mock `next/navigation` (useRouter, useSearchParams, usePathname)
    - Mock environment variables
  - Create `src/test/mocks/` directory with mock factories:
    - `src/test/mocks/profile.ts` — factory for ProfileData test fixtures
    - `src/test/mocks/supabase.ts` — mock Supabase client
    - `src/test/mocks/dodo.ts` — mock Dodo Payments client
  - Create `src/lib/__tests__/db.test.ts` — first test to verify setup works:
    ```typescript
    import { describe, it, expect } from 'vitest';
    describe('db helpers', () => {
      it('placeholder test to verify vitest runs', () => {
        expect(true).toBe(true);
      });
    });
    ```
  - Verify `npm run test` executes and passes

  **Must NOT do**:
  - Do not use Jest — use vitest
  - Do not skip the setup file — it's needed for React component testing later

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard vitest configuration — no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-6)
  - **Blocks**: All subsequent tasks (TDD requires test infrastructure)
  - **Blocked By**: None

  **References**:

  **External References**:
  - Vitest config: `https://vitest.dev/config/`
  - Testing Library React: `https://testing-library.com/docs/react-testing-library/intro/`
  - Vitest with Next.js: `https://nextjs.org/docs/app/building-your-application/testing/vitest`

  **WHY Each Reference Matters**:
  - Vitest config docs define environment options and plugin setup for React
  - Next.js testing docs show the recommended path alias and mock configurations

  **Acceptance Criteria**:

  - [ ] `npm run test` runs and passes (1 placeholder test)
  - [ ] `vitest.config.ts` configured with jsdom, react plugin, and path aliases
  - [ ] `src/test/setup.ts` exists with jest-dom import and next/navigation mocks
  - [ ] Mock factories created for ProfileData, Supabase, Dodo
  - [ ] `npm run test:watch` starts in watch mode

  **QA Scenarios**:

  ```
  Scenario: Vitest runs successfully
    Tool: Bash
    Preconditions: vitest and dependencies installed
    Steps:
      1. Run `npm run test` in project directory
      2. Verify exit code 0
      3. Verify output shows "1 passed"
    Expected Result: 1 test passes, exit code 0
    Failure Indicators: Non-zero exit, configuration errors, no tests found
    Evidence: .sisyphus/evidence/task-7-vitest-run.txt

  Scenario: Mock factories produce valid types
    Tool: Bash
    Preconditions: Mock files created
    Steps:
      1. Run `npx tsc --noEmit`
      2. Verify no type errors in src/test/mocks/
    Expected Result: All mocks type-check correctly
    Failure Indicators: Type errors in mock files
    Evidence: .sisyphus/evidence/task-7-mocks-types.txt
  ```

  **Commit**: YES (groups with Tasks 4, 5, 6)
  - Message: `feat(infra): configure Supabase, Clerk, Dodo Payments, and vitest`
  - Files: `vitest.config.ts`, `src/test/**`
  - Pre-commit: `npm run test`

- [ ] 8. Template System — Registry, Interface, 5 Placeholder Components

  **What to do**:
  - Create template directory structure:
    ```
    src/templates/
      ivory-editorial/
        Component.tsx
        meta.ts
      noir-minimal/
        Component.tsx
        meta.ts
      forest-link/
        Component.tsx
        meta.ts
      violet-pro/
        Component.tsx
        meta.ts
      grid-bright/
        Component.tsx
        meta.ts
    ```
  - Create `src/lib/templates.ts` — template registry:
    ```typescript
    export const templates: Record<string, TemplateEntry> = { ... }
    export function getTemplate(slug: string): TemplateEntry | undefined
    export function getTemplateList(): TemplateMeta[]
    export function getFreeTemplates(): TemplateMeta[]  // first 5
    export function getPremiumTemplates(): TemplateMeta[]
    ```
  - Build 5 visually distinct placeholder templates — each must:
    - Accept `TemplateProps` (profile: ProfileData, accentColor?: string)
    - Render all ProfileData fields: name, headline, bio, avatar, experience list, skills, links
    - Use the design system fonts (Playfair Display headings, DM Sans body)
    - Use Tailwind CSS with inline classes (no external CSS files — templates must be self-contained for static generation)
    - Be visually distinct from each other:
      - `ivory-editorial`: Light cream background, editorial layout, large serif headings, single-column
      - `noir-minimal`: Dark background (#0e0d0c), split grid layout, minimal text, high contrast
      - `forest-link`: Dark green (#1a2e1a) background, centered link-in-bio style, circular avatar, stacked links
      - `violet-pro`: Deep purple (#2d1b4e) header section, stat grid, professional card layout
      - `grid-bright`: White background, colorful accent stripe, CSS grid info layout, bright and clean
  - Each `meta.ts` exports:
    ```typescript
    export const meta: TemplateMeta = {
      name: 'Ivory Editorial',
      slug: 'ivory-editorial',
      tag: 'light',
      previewImage: '/templates/ivory-editorial/preview.png',
      isPremium: false, // first 5 are free
    };
    ```
  - Create `defaultProps` for each template with realistic placeholder data (not "Lorem ipsum" — use a fictional profile: "Alex Rivera, Senior Product Designer at Figma")
  - Write TDD tests in `src/templates/__tests__/registry.test.ts`:
    - Test all 5 templates are registered
    - Test `getTemplate()` returns correct entry
    - Test `getFreeTemplates()` returns 5 templates
    - Test each template component renders without errors with defaultProps

  **Must NOT do**:
  - Do not use external CSS files for templates — inline Tailwind only
  - Do not use Inter, Roboto, or system fonts in templates
  - Do not create placeholder preview images (owner provides these — use a gray placeholder box)
  - Do not make templates overly complex — clean, minimal, but visually distinct

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 5 distinct template components + registry + tests — significant creative + technical work
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Templates require thoughtful visual design even as placeholders — layout, typography, color choices
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not testing in browser in this task — component-level testing only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-14)
  - **Blocks**: Tasks 13, 17 (deploy service and template picker need templates)
  - **Blocked By**: Tasks 2, 3 (needs design system tokens and type definitions)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:160-187` — Templates System section with directory structure, exports, and interface

  **External References**:
  - Build prompt "Template System" section — component interface, meta structure, and 5 template descriptions
  - Build prompt "Templates Gallery" — how templates appear in the landing page and build wizard

  **WHY Each Reference Matters**:
  - project.md defines the canonical template interface (Component, meta, defaultProps exports)
  - Build prompt template descriptions give creative direction for each placeholder design
  - Gallery context helps understand how templates need to look as preview cards

  **Acceptance Criteria**:

  - [ ] 5 template directories exist with Component.tsx and meta.ts each
  - [ ] `src/lib/templates.ts` exports registry with all 5 templates
  - [ ] Each template renders all ProfileData fields (name, headline, bio, avatar, experience, skills, links)
  - [ ] Each template is visually distinct (different color scheme, layout)
  - [ ] `npm run test` passes all template registry tests
  - [ ] `npx tsc --noEmit` passes

  **QA Scenarios**:

  ```
  Scenario: All templates render without errors
    Tool: Bash
    Preconditions: Templates and tests created
    Steps:
      1. Run `npm run test -- --reporter=verbose src/templates`
      2. Verify all tests pass
      3. Verify each template component renders with defaultProps
    Expected Result: All template tests pass, no rendering errors
    Failure Indicators: Render errors, missing props, failed assertions
    Evidence: .sisyphus/evidence/task-8-template-tests.txt

  Scenario: Templates are visually distinct
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, templates importable
    Steps:
      1. Create a temporary test page that renders each template side by side
      2. Navigate to the test page
      3. Take full-page screenshot
      4. Visually verify 5 distinct designs (different backgrounds, layouts)
    Expected Result: 5 clearly different template designs visible
    Failure Indicators: Templates look identical, broken layouts
    Evidence: .sisyphus/evidence/task-8-templates-visual.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(templates): add template system with 5 placeholder components`
  - Files: `src/templates/**`, `src/lib/templates.ts`
  - Pre-commit: `npm run test`

- [ ] 9. LinkedIn Extractor — Interface + Proxycurl Implementation + URL Validation

  **What to do**:
  - Create `src/lib/extractors/types.ts` — extractor interface:
    ```typescript
    export interface LinkedInExtractor {
      extract(linkedinUrl: string): Promise<ProfileData>;
    }
    ```
  - Create `src/lib/extractors/proxycurl.ts` — Proxycurl implementation:
    - Implement `LinkedInExtractor` interface
    - Call Proxycurl API: `GET https://nubela.co/proxycurl/api/v2/linkedin?url={url}`
    - Map Proxycurl response fields to `ProfileData`:
      - `full_name` → `name`
      - `headline` → `headline`
      - `summary` → `bio` (may be null — handle gracefully)
      - `city` + `state` + `country_full_name` → `location`
      - `profile_pic_url` → `avatar_url`
      - `experiences[]` → `experience[]` (map `title`, `company`, `starts_at`/`ends_at`)
      - `skills[]` → `skills`
      - `public_identifier` → construct `linkedin_url`
    - Handle missing/null fields with sensible defaults (empty string, empty array)
    - Handle error responses: 404 (profile not found), 401 (bad API key), 429 (rate limit)
  - Create `src/lib/extractors/validate-url.ts`:
    - `validateLinkedInUrl(url: string): { valid: boolean; error?: string }`
    - Must match pattern: `linkedin.com/in/<slug>` (with or without https://, www.)
    - Reject company URLs (`/company/`), school URLs (`/school/`), job URLs (`/jobs/`)
    - Reject empty slugs
    - Normalize URL (add https:// if missing)
  - Create `src/lib/extractors/index.ts` — factory:
    ```typescript
    export function createExtractor(): LinkedInExtractor {
      return new ProxycurlExtractor(process.env.PROXYCURL_API_KEY!);
    }
    ```
  - Write TDD tests:
    - `src/lib/extractors/__tests__/validate-url.test.ts` — URL validation with valid/invalid cases
    - `src/lib/extractors/__tests__/proxycurl.test.ts` — mock API responses, verify mapping

  **Must NOT do**:
  - Do not call Proxycurl in tests — mock all HTTP calls
  - Do not extract Twitter/Instagram data — those fields should be empty/undefined
  - Do not skip URL validation — every credit costs money

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: API integration with data mapping, error handling, and URL validation — moderate complexity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 10-14)
  - **Blocks**: Task 16 (build wizard needs extraction)
  - **Blocked By**: Task 3 (needs ProfileData type)

  **References**:

  **External References**:
  - Proxycurl API docs: `https://nubela.co/proxycurl/docs`
  - Proxycurl Person Profile endpoint: `https://nubela.co/proxycurl/docs#people-api-person-profile-endpoint`

  **WHY Each Reference Matters**:
  - Proxycurl docs define exact response shape and field names for mapping to ProfileData
  - API docs show authentication (Bearer token), rate limits, and error codes

  **Acceptance Criteria**:

  - [ ] `LinkedInExtractor` interface defined in `src/lib/extractors/types.ts`
  - [ ] `ProxycurlExtractor` implements the interface with full field mapping
  - [ ] URL validator rejects company/school/job URLs and empty slugs
  - [ ] URL validator accepts valid `/in/` profile URLs with various formats
  - [ ] All tests pass: `npm run test -- src/lib/extractors`
  - [ ] Error handling covers 404, 401, 429 responses

  **QA Scenarios**:

  ```
  Scenario: URL validation rejects invalid LinkedIn URLs
    Tool: Bash
    Preconditions: Tests written
    Steps:
      1. Run `npm run test -- src/lib/extractors/__tests__/validate-url.test.ts --reporter=verbose`
      2. Verify tests cover: valid /in/ URLs, company URLs (rejected), empty slugs (rejected), missing protocol (accepted after normalization)
    Expected Result: All validation tests pass
    Failure Indicators: Invalid URLs accepted, valid URLs rejected
    Evidence: .sisyphus/evidence/task-9-url-validation.txt

  Scenario: Proxycurl mapping handles missing fields
    Tool: Bash
    Preconditions: Tests with mock data written
    Steps:
      1. Run `npm run test -- src/lib/extractors/__tests__/proxycurl.test.ts --reporter=verbose`
      2. Verify test covers: full profile response, profile with null summary, profile with empty experiences
    Expected Result: All mapping tests pass, nulls handled gracefully
    Failure Indicators: Null pointer errors, missing field defaults
    Evidence: .sisyphus/evidence/task-9-proxycurl-mapping.txt
  ```

  **Commit**: YES (groups with Task 10)
  - Message: `feat(extraction): LinkedIn extractor with Proxycurl + Anthropic bio cleanup`
  - Files: `src/lib/extractors/**`
  - Pre-commit: `npm run test`

- [ ] 10. Anthropic Bio Cleanup Service

  **What to do**:
  - Create `src/lib/ai/bio-cleanup.ts`:
    ```typescript
    import Anthropic from '@anthropic-ai/sdk';

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    export async function cleanupBio(rawBio: string): Promise<string> {
      if (!rawBio || rawBio.trim().length === 0) return '';

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are a professional copywriter. Rewrite this LinkedIn bio to be sharp, confident, and human — 2-3 sentences max. Remove jargon. Keep all facts accurate. First person. Return only the rewritten bio, nothing else.\n\nBio: ${rawBio}`
        }],
      });

      // Extract text from response
      return response.content[0].type === 'text' ? response.content[0].text.trim() : rawBio;
    }
    ```
  - Handle edge cases:
    - Empty/null bio → return empty string (don't call API)
    - Very short bio (< 20 chars) → return as-is (not worth rewriting)
    - API error → return original bio (graceful degradation)
    - Rate limit → retry once with exponential backoff
  - Write TDD tests in `src/lib/ai/__tests__/bio-cleanup.test.ts`:
    - Mock Anthropic SDK
    - Test empty bio returns empty string
    - Test short bio returns unchanged
    - Test normal bio calls API and returns cleaned text
    - Test API error returns original bio

  **Must NOT do**:
  - Do not use OpenAI — Anthropic only
  - Do not call the real API in tests — mock everything
  - Do not change the prompt — use exactly the one specified in the build prompt

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single function with Anthropic SDK call — small, focused task
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 9, 11-14)
  - **Blocks**: Task 16 (build wizard uses bio cleanup after extraction)
  - **Blocked By**: Task 3 (needs type definitions)

  **References**:

  **External References**:
  - Anthropic TypeScript SDK: `https://github.com/anthropics/anthropic-sdk-typescript`
  - Anthropic messages API: `https://docs.anthropic.com/en/api/messages`
  - Build prompt "Claude prompt for bio cleanup" — exact prompt text

  **WHY Each Reference Matters**:
  - SDK docs show `messages.create()` call signature and response structure
  - Build prompt provides the exact system prompt to use — do not modify

  **Acceptance Criteria**:

  - [ ] `cleanupBio()` function exported from `src/lib/ai/bio-cleanup.ts`
  - [ ] Uses Anthropic claude-sonnet-4-6 model
  - [ ] Empty/short bios bypass API call
  - [ ] API errors gracefully degrade to original bio
  - [ ] All tests pass: `npm run test -- src/lib/ai`

  **QA Scenarios**:

  ```
  Scenario: Bio cleanup handles all edge cases
    Tool: Bash
    Preconditions: Tests with mocked Anthropic SDK
    Steps:
      1. Run `npm run test -- src/lib/ai/__tests__/bio-cleanup.test.ts --reporter=verbose`
      2. Verify tests pass for: empty bio, short bio, normal bio, API error
    Expected Result: All 4+ test cases pass
    Failure Indicators: Missing edge case handling, API errors not caught
    Evidence: .sisyphus/evidence/task-10-bio-cleanup.txt
  ```

  **Commit**: YES (groups with Task 9)
  - Message: `feat(extraction): LinkedIn extractor with Proxycurl + Anthropic bio cleanup`
  - Files: `src/lib/ai/**`
  - Pre-commit: `npm run test`

- [ ] 11. Dodo Payments Checkout API + Clerk→Dodo Customer Sync

  **What to do**:
  - Create `src/app/api/checkout/route.ts` — POST handler:
    - Validate request body with Zod: `{ productId: string; planType: 'pro' | 'agency' }`
    - Get current user via `auth()` from `@clerk/nextjs/server`
    - Look up user's `dodo_customer_id` from Supabase
    - Create checkout session via `dodo.checkoutSessions.create()`:
      ```typescript
      {
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: { customer_id: dodoCustId },
        return_url: `${process.env.DODO_PAYMENTS_RETURN_URL}?userId=${userId}`,
        metadata: { clerk_user_id: userId, plan_type: planType },
      }
      ```
    - Return `{ checkoutUrl: session.checkout_url, sessionId: session.session_id }`
  - Handle edge cases:
    - User has no `dodo_customer_id` → create Dodo customer on the fly, save to Supabase, then proceed
    - User already has active subscription → return error "Already subscribed"
    - Invalid productId → 400 error
  - Write TDD tests in `src/app/api/checkout/__tests__/route.test.ts`:
    - Test successful checkout session creation (mock Dodo SDK)
    - Test missing customer ID → auto-create flow
    - Test already subscribed → 400 error
    - Test invalid input → Zod validation error

  **Must NOT do**:
  - No Stripe references
  - Do not hardcode product IDs — use `DODO_PRODUCT_PRO` and `DODO_PRODUCT_AGENCY` env vars
  - Do not allow checkout without Clerk authentication

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: API route with auth integration, Dodo SDK, Supabase queries, and edge case handling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-10, 12-14)
  - **Blocks**: Task 15 (paywall page needs checkout endpoint)
  - **Blocked By**: Tasks 4, 5, 6 (needs Supabase, Clerk, Dodo)

  **References**:

  **External References**:
  - Dodo checkout sessions: `https://docs.dodopayments.com/api-reference/checkout-sessions/create-checkout-session`
  - `@clerk/nextjs` server auth: `https://clerk.com/docs/references/nextjs/auth`
  - Dodo research (from interview): `dodo.checkoutSessions.create()` returns `{ checkout_url, session_id }`

  **WHY Each Reference Matters**:
  - Dodo docs define checkout session request/response shapes
  - Clerk auth docs show how to get user ID in API routes via `auth()`
  - Research confirmed return URL gets `?subscription_id=` and `?status=` query params

  **Acceptance Criteria**:

  - [ ] POST `/api/checkout` creates Dodo checkout session and returns `{ checkoutUrl }`
  - [ ] Zod validation rejects invalid requests (missing productId, wrong planType)
  - [ ] Auto-creates Dodo customer if user doesn't have one
  - [ ] Returns 400 for already-subscribed users
  - [ ] All tests pass: `npm run test -- src/app/api/checkout`

  **QA Scenarios**:

  ```
  Scenario: Checkout API creates session
    Tool: Bash (curl)
    Preconditions: Dev server running, user authenticated (use Clerk test token)
    Steps:
      1. POST http://localhost:3000/api/checkout with body: {"productId": "test_prod_id", "planType": "pro"}
      2. Include Clerk auth header
      3. Assert response status 200
      4. Assert response body contains `checkoutUrl` string starting with "https://"
    Expected Result: 200 with valid checkout URL
    Failure Indicators: Non-200 status, missing checkoutUrl, auth errors
    Evidence: .sisyphus/evidence/task-11-checkout-api.txt

  Scenario: Checkout rejects unauthenticated requests
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. POST http://localhost:3000/api/checkout with body: {"productId": "test", "planType": "pro"}
      2. Do NOT include Clerk auth header
      3. Assert response status 401
    Expected Result: 401 Unauthorized
    Failure Indicators: 200 response without auth
    Evidence: .sisyphus/evidence/task-11-checkout-noauth.txt
  ```

  **Commit**: YES (groups with Task 12)
  - Message: `feat(payments): Dodo checkout, webhooks, and customer sync`
  - Files: `src/app/api/checkout/**`
  - Pre-commit: `npm run test`

- [ ] 12. Dodo Webhook Handler — Full Subscription Lifecycle

  **What to do**:
  - Create `src/app/api/webhooks/dodo/route.ts` using `@dodopayments/nextjs` Webhooks adapter:
    ```typescript
    import { Webhooks } from '@dodopayments/nextjs';

    export const POST = Webhooks({
      webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

      onSubscriptionActive: async (payload) => { /* activate plan */ },
      onSubscriptionRenewed: async (payload) => { /* extend access */ },
      onSubscriptionOnHold: async (payload) => { /* restrict access */ },
      onSubscriptionCancelled: async (payload) => { /* revoke at period end */ },
      onSubscriptionExpired: async (payload) => { /* hard revoke */ },
      onSubscriptionPlanChanged: async (payload) => { /* update plan tier */ },
      onPaymentSucceeded: async (payload) => { /* log payment */ },
      onPaymentFailed: async (payload) => { /* notify user */ },
    });
    ```
  - For each subscription event, update Supabase user record:
    - `subscription.active` → set plan to 'pro'/'agency' (derive from product_id), status to 'active', store subscription_id
    - `subscription.renewed` → update status to 'active' (in case it was on_hold)
    - `subscription.on_hold` → set status to 'on_hold' (payment failed)
    - `subscription.cancelled` → set status to 'cancelled'
    - `subscription.expired` → set plan to 'free', status to 'expired', clear subscription_id
    - `subscription.plan_changed` → update plan tier based on new product_id
  - Use `metadata.clerk_user_id` from webhook payload to identify the user
  - Implement idempotency: use `webhook-id` header to skip duplicate events (store processed webhook IDs in memory or check Supabase before processing)
  - Write TDD tests in `src/app/api/webhooks/dodo/__tests__/route.test.ts`:
    - Test each subscription event updates DB correctly
    - Test invalid signature returns 401
    - Test duplicate webhook (same webhook-id) is skipped

  **Must NOT do**:
  - Do not use Stripe webhook handling patterns
  - Do not process webhooks synchronously if they take > 10s (acknowledge immediately)
  - Do not trust payload without signature verification (the adapter handles this)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Webhook handler with 6+ event types, DB updates, idempotency — moderate complexity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-11, 13-14)
  - **Blocks**: Task 20 (dashboard billing needs subscription status)
  - **Blocked By**: Tasks 4, 6 (needs Supabase and Dodo client)

  **References**:

  **External References**:
  - `@dodopayments/nextjs` Webhooks: `https://docs.dodopayments.com/developer-resources/nextjs-adaptor`
  - Dodo webhook events: `https://docs.dodopayments.com/developer-resources/webhooks`
  - Standard Webhooks spec: `https://standardwebhooks.com/`

  **WHY Each Reference Matters**:
  - Adapter docs show exact handler function names (`onSubscriptionActive`, etc.)
  - Webhook docs list all event types and their payload structures
  - Research confirmed 7 subscription states and specific payload fields

  **Acceptance Criteria**:

  - [ ] Webhook route handles all 6 subscription events + 2 payment events
  - [ ] Each event updates correct Supabase user fields
  - [ ] Invalid signatures return 401 (adapter handles automatically)
  - [ ] Idempotency prevents duplicate processing
  - [ ] All tests pass: `npm run test -- src/app/api/webhooks/dodo`

  **QA Scenarios**:

  ```
  Scenario: Webhook rejects invalid signatures
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. POST http://localhost:3000/api/webhooks/dodo with body: {"type":"subscription.active","data":{}}
      2. Include fake webhook-id, webhook-signature, webhook-timestamp headers
      3. Assert response status 401
    Expected Result: 401 — invalid signature rejected
    Failure Indicators: 200 response with fake signature
    Evidence: .sisyphus/evidence/task-12-webhook-reject.txt

  Scenario: Subscription lifecycle updates DB correctly
    Tool: Bash
    Preconditions: Tests with mocked Dodo adapter and Supabase
    Steps:
      1. Run `npm run test -- src/app/api/webhooks/dodo/__tests__/route.test.ts --reporter=verbose`
      2. Verify tests cover: active → on_hold → active (reactivation) → cancelled → expired
    Expected Result: All lifecycle tests pass, DB updates verified
    Failure Indicators: Missing state transitions, wrong plan assignments
    Evidence: .sisyphus/evidence/task-12-webhook-lifecycle.txt
  ```

  **Commit**: YES (groups with Task 11)
  - Message: `feat(payments): Dodo checkout, webhooks, and customer sync`
  - Files: `src/app/api/webhooks/dodo/**`
  - Pre-commit: `npm run test`

- [ ] 13. Vercel Deploy Service — Static HTML Generation + API Upload

  **What to do**:
  - Create `src/lib/deploy/generate-html.ts`:
    - `generateStaticSite(templateId: string, profileData: ProfileData): { html: string; css: string }`
    - Use `renderToStaticMarkup()` from `react-dom/server` to render the template component with profile data
    - Wrap output in a complete HTML shell:
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{name} — {headline}</title>
        <meta name="description" content="{bio truncated to 155 chars}">
        <meta property="og:title" content="{name}">
        <meta property="og:description" content="{headline}">
        <meta property="og:image" content="{avatar_url}">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
        <style>{tailwind CSS output for template}</style>
      </head>
      <body>{rendered HTML}</body>
      </html>
      ```
    - For Tailwind CSS in generated sites: include a pre-compiled CSS file per template (generated at build time using Tailwind's `@apply` or extracted from template classes)
  - Create `src/lib/deploy/vercel.ts`:
    - `deployToVercel(projectName: string, files: { path: string; content: string }[]): Promise<{ url: string; projectId: string }>`
    - Use Vercel REST API v13:
      1. Check if project exists: `GET /v9/projects/{name}?teamId={teamId}`
      2. If not, create project: `POST /v10/projects` with `{ name, framework: null, buildCommand: null }`
      3. Upload files: `POST /v2/files` with file content, get SHA
      4. Create deployment: `POST /v13/deployments` with file list (SHA refs) and `framework: null`
      5. Poll deployment status until ready: `GET /v13/deployments/{id}?teamId={teamId}`
    - Add `teamId` query parameter to ALL Vercel API calls
    - Return `{ url: deployment.url, projectId: project.id }`
  - Create `src/lib/deploy/index.ts` — orchestrator:
    ```typescript
    export async function deploySite(templateId: string, profileData: ProfileData, userId: string): Promise<{ url: string; projectId: string }>
    ```
    - Generate HTML from template + data
    - Create project name: `folio-{userId-slug}` (sanitized, max 63 chars)
    - Deploy to Vercel
    - Save site record to Supabase
  - Create `src/app/api/deploy/route.ts` — POST handler:
    - Validate with Zod: `{ templateId: string; profileData: ProfileData }`
    - Require Clerk auth
    - Check user has active paid plan (not 'free')
    - Call `deploySite()`
    - Return `{ url, projectId }`
  - Write TDD tests:
    - `src/lib/deploy/__tests__/generate-html.test.ts` — test HTML generation with each template
    - `src/lib/deploy/__tests__/vercel.test.ts` — mock Vercel API, test deploy flow
    - `src/app/api/deploy/__tests__/route.test.ts` — test API route with auth and plan checks

  **Must NOT do**:
  - Do NOT run `next build` or Vite per user — use `renderToStaticMarkup()` only
  - Do not skip `teamId` on Vercel API calls
  - Do not allow free plan users to deploy
  - Do not create more than one Vercel project per user

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex service involving SSR, Vercel API integration, file orchestration, and multi-step deployment
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: This is backend/infrastructure work, not visual

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-12, 14)
  - **Blocks**: Tasks 18, 20 (build deploy step and dashboard re-deploy need this)
  - **Blocked By**: Tasks 3, 8 (needs types and template components for renderToStaticMarkup)

  **References**:

  **External References**:
  - Vercel Deployments API: `https://vercel.com/docs/rest-api/endpoints/deployments`
  - Vercel Projects API: `https://vercel.com/docs/rest-api/endpoints/projects`
  - Vercel File Uploads: `https://vercel.com/docs/rest-api/endpoints#upload-deployment-files`
  - React renderToStaticMarkup: `https://react.dev/reference/react-dom/server/renderToStaticMarkup`

  **WHY Each Reference Matters**:
  - Vercel API docs define exact endpoints, auth headers, and response shapes for project creation and deployment
  - renderToStaticMarkup docs confirm it produces HTML without React hydration attributes — perfect for static sites
  - Metis review confirmed: SHA-based file upload with `framework: null` and `buildCommand: null` skips Vercel's build step

  **Acceptance Criteria**:

  - [ ] `generateStaticSite()` produces valid HTML with meta tags, fonts, and template content
  - [ ] `deployToVercel()` creates project, uploads files, creates deployment, and returns URL
  - [ ] `/api/deploy` requires auth and active paid plan
  - [ ] Free users get 403 error on deploy attempt
  - [ ] All tests pass: `npm run test -- src/lib/deploy src/app/api/deploy`

  **QA Scenarios**:

  ```
  Scenario: Static HTML generation produces valid output
    Tool: Bash
    Preconditions: Tests with mock template
    Steps:
      1. Run `npm run test -- src/lib/deploy/__tests__/generate-html.test.ts --reporter=verbose`
      2. Verify generated HTML contains: <!DOCTYPE html>, <title> with profile name, og:title meta tag, rendered template content
    Expected Result: Valid HTML with all required elements
    Failure Indicators: Missing doctype, empty body, missing meta tags
    Evidence: .sisyphus/evidence/task-13-html-generation.txt

  Scenario: Deploy API rejects free users
    Tool: Bash (curl)
    Preconditions: Dev server running, free-tier user authenticated
    Steps:
      1. POST http://localhost:3000/api/deploy with body: {"templateId": "ivory-editorial", "profileData": {...}}
      2. Include Clerk auth for free-tier user
      3. Assert response status 403
      4. Assert error message indicates plan upgrade needed
    Expected Result: 403 Forbidden with upgrade message
    Failure Indicators: 200 response for free user
    Evidence: .sisyphus/evidence/task-13-deploy-paywall.txt
  ```

  **Commit**: YES (standalone)
  - Message: `feat(deploy): Vercel deploy service with static HTML generation`
  - Files: `src/lib/deploy/**`, `src/app/api/deploy/**`
  - Pre-commit: `npm run test`

- [ ] 14. Landing Page — All Sections from Spec

  **What to do**:
  - Build `src/app/page.tsx` — the complete landing page with these sections (in order):
    1. **Nav**: Fixed top nav with logo ("Folio" in Playfair Display italic), links (Templates, How it Works, Pricing), gold CTA button "Get Started"
    2. **Hero**: Bold headline in Playfair Display (e.g., "Your LinkedIn. Your Website. In Minutes."), subheading in DM Sans, primary gold CTA button, social proof counter ("X sites launched")
    3. **Ticker**: Scrolling horizontal feature strip (auto-scroll, CSS animation) with features like "AI-Powered", "Instant Deploy", "Custom Domain", "SEO Ready"
    4. **Templates Gallery**: Horizontal scroll container with drag-to-scroll. Template cards showing preview images (placeholder gray boxes for now), template name, light/dark tag. Locked cards for premium templates with gold lock icon and "Upgrade to Pro"
    5. **How It Works**: 4-step process cards (1. Paste LinkedIn URL, 2. AI Extracts Profile, 3. Pick a Template, 4. Go Live). Include an animated terminal visual using Framer Motion (typing animation showing CLI-style deploy output)
    6. **Pricing**: 3-tier pricing cards (Starter free / Pro $12/mo / Agency $49/mo) with feature lists. Gold border on Pro (recommended). CTA buttons on each tier
    7. **Domain CTA**: Section linking to Namecheap, Google Domains, Cloudflare with UTM params
    8. **Build CTA / Input Form**: LinkedIn URL input field + email input + "Build My Site" gold button. This captures leads — form submits to `/start` route
    9. **FAQ**: Accordion component (Framer Motion animated expand/collapse) with 6-8 questions
    10. **Footer**: Logo, nav links, copyright, social links
  - Use Framer Motion for:
    - Scroll-triggered section animations (fade-in-up on viewport enter)
    - Ticker auto-scroll
    - Terminal typing animation in How It Works
    - FAQ accordion expand/collapse
  - All sections must use the dark gold/cream design system
  - Mobile responsive: stack columns on mobile, horizontal scroll becomes vertical on small screens
  - Create reusable components in `src/components/landing/`:
    - `Navbar.tsx`, `Hero.tsx`, `Ticker.tsx`, `TemplatesGallery.tsx`, `HowItWorks.tsx`, `PricingSection.tsx`, `DomainCta.tsx`, `BuildForm.tsx`, `FaqSection.tsx`, `Footer.tsx`

  **Must NOT do**:
  - No Inter, Roboto, or system fonts
  - No purple gradients on white
  - No auto-playing video
  - Do not build the form submission logic (just UI + navigation to /start)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Full landing page with 10 sections, animations, responsive design — heavy frontend work
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Landing page design requires visual polish, animation timing, layout decisions
  - **Skills Evaluated but Omitted**:
    - `copywriting`: Copy is defined in spec, no creative writing needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-13)
  - **Blocks**: Task 15 (paywall page follows landing page CTA)
  - **Blocked By**: Task 2 (needs design system tokens and fonts)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:31-41` — Landing page sections spec

  **External References**:
  - Build prompt "Pages & Sections > Landing Page" — full section breakdown
  - Framer Motion: `https://www.framer.com/motion/`
  - Build prompt "Design System" — exact colors and font rules

  **WHY Each Reference Matters**:
  - project.md defines all 10 sections with specific content requirements
  - Build prompt provides design system constraints that must be followed exactly
  - Framer Motion docs for scroll-triggered animations and layout animations

  **Acceptance Criteria**:

  - [ ] All 10 sections present: Nav, Hero, Ticker, Templates Gallery, How It Works, Pricing, Domain CTA, Build Form, FAQ, Footer
  - [ ] Design system applied: dark background, cream text, gold accents, correct fonts
  - [ ] Framer Motion animations: scroll reveals, ticker auto-scroll, terminal typing, FAQ accordion
  - [ ] Mobile responsive: all sections stack properly on small screens
  - [ ] Build form navigates to `/start` on submit
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Landing page renders all sections
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert page title contains "Folio"
      3. Assert nav element exists with links: "Templates", "How it Works", "Pricing"
      4. Assert hero section has h1 heading
      5. Scroll to pricing section — assert 3 pricing cards visible
      6. Assert FAQ section has at least 6 accordion items
      7. Assert footer exists at bottom
      8. Take full-page screenshot
    Expected Result: All 10 sections render correctly with design system colors
    Failure Indicators: Missing sections, wrong colors, broken layout
    Evidence: .sisyphus/evidence/task-14-landing-full.png

  Scenario: Landing page is mobile responsive
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812 (iPhone 14)
      2. Navigate to `http://localhost:3000`
      3. Assert no horizontal scrollbar on body
      4. Assert nav collapses to mobile menu (hamburger)
      5. Scroll through entire page — verify no content overflow
      6. Take full-page screenshot
    Expected Result: Clean mobile layout, no overflow, all sections accessible
    Failure Indicators: Horizontal scroll, overlapping content, unreadable text
    Evidence: .sisyphus/evidence/task-14-landing-mobile.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(landing): build landing page with all sections`
  - Files: `src/app/page.tsx`, `src/components/landing/**`
  - Pre-commit: `npm run build`

- [ ] 15. Paywall Page — /start

  **What to do**:
  - Create `src/app/start/page.tsx` — plan selection + checkout redirect:
    - Two-column layout: left = plan details, right = plan cards
    - Show two plan cards (Pro $12/mo, Agency $49/mo) with feature comparison:
      - Pro: 1 site, all templates, custom domain, deploy
      - Agency: 10 sites, all templates + custom upload, custom domain, deploy
    - Gold border highlight on the recommended plan (Pro)
    - "Choose Plan" button on each card → calls `/api/checkout` → redirects to Dodo checkout URL
    - Accept optional query params from landing page: `?email=` (pre-fill)
    - Loading state while creating checkout session
    - Error state if checkout creation fails
  - Apply full design system: dark background, cream text, gold accents, Playfair Display headings
  - Add a "Back to Home" link and breadcrumb
  - Mobile responsive: cards stack vertically on small screens
  - Add Framer Motion entrance animations (staggered card reveals)

  **Must NOT do**:
  - No Stripe checkout references
  - Do not show the Free/Starter tier here — this is the PAYWALL for paid plans only
  - Do not allow proceeding without selecting a plan

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Full page UI with plan cards, animations, and checkout flow integration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Plan card design requires visual hierarchy and conversion-focused layout

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 16-20)
  - **Blocks**: None (end of flow for this route)
  - **Blocked By**: Tasks 11, 14 (needs checkout API and landing page navigation)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:44-48` — Paywall page spec
  - `/Users/namanshiroha/folio/project.md:196-200` — Pricing tier details

  **External References**:
  - Build prompt "Paywall (/start)" section — trigger conditions and flow
  - Dodo checkout URL pattern: `session.checkout_url` from `/api/checkout` response

  **WHY Each Reference Matters**:
  - project.md defines what triggers the paywall and what happens after checkout
  - Pricing tier details define exact features per plan for the comparison cards

  **Acceptance Criteria**:

  - [ ] `/start` page renders with Pro and Agency plan cards
  - [ ] "Choose Plan" button calls `/api/checkout` and redirects to Dodo URL
  - [ ] Loading state shows while checkout session is being created
  - [ ] Error state handles checkout failures
  - [ ] Mobile responsive (cards stack on small screens)
  - [ ] Design system applied consistently

  **QA Scenarios**:

  ```
  Scenario: Plan selection page renders correctly
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/start`
      2. Assert two plan cards visible with text "Pro" and "Agency"
      3. Assert Pro card shows "$12/mo"
      4. Assert Agency card shows "$49/mo"
      5. Assert both cards have "Choose Plan" buttons
      6. Take screenshot
    Expected Result: Two plan cards with correct pricing and CTAs
    Failure Indicators: Missing cards, wrong prices, no CTAs
    Evidence: .sisyphus/evidence/task-15-paywall.png

  Scenario: Paywall is mobile responsive
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000/start`
      3. Assert cards are stacked vertically (not side by side)
      4. Assert no horizontal overflow
      5. Take screenshot
    Expected Result: Cards stack vertically, no overflow
    Failure Indicators: Horizontal scroll, overlapping cards
    Evidence: .sisyphus/evidence/task-15-paywall-mobile.png
  ```

  **Commit**: YES (groups with Task 16)
  - Message: `feat(flow): paywall page and build wizard LinkedIn input`
  - Files: `src/app/start/**`
  - Pre-commit: `npm run build`

- [ ] 16. Build Wizard — Step 1: LinkedIn Input + Extraction UI

  **What to do**:
  - Create `src/app/build/page.tsx` — multi-step wizard component
  - Use React state to track wizard step (1: Input, 2: Template, 3: Deploy)
  - Create `src/components/build/LinkedInInput.tsx` — Step 1:
    - LinkedIn URL input field with validation (uses `validateLinkedInUrl()` from Task 9)
    - Real-time validation feedback (green check for valid, red error for invalid)
    - "Extract Profile" gold CTA button
    - Loading state during extraction: animated progress with steps ("Fetching profile...", "Extracting data...", "Cleaning up bio...")
    - On success: show extracted profile data card:
      - Avatar image, name, headline, bio (editable textarea), location
      - Experience list (read-only)
      - Skills tags
      - "Coming soon" badges for Twitter/Instagram
    - User can edit the bio before proceeding
    - "Continue to Templates →" button (only enabled after successful extraction)
  - Create `src/app/api/extract/route.ts` — POST handler:
    - Validate with Zod: `{ linkedin_url: string }`
    - Require Clerk auth + active paid plan
    - Call `createExtractor().extract(url)` from Task 9
    - Call `cleanupBio(profileData.bio)` from Task 10
    - Return cleaned `ProfileData`
  - Check for `?subscription_id=` query param on page load (coming from Dodo checkout return) — if present, show "Payment confirmed!" toast before LinkedIn input
  - Write TDD tests:
    - `src/app/api/extract/__tests__/route.test.ts` — test extract endpoint with mocked Proxycurl
    - `src/components/build/__tests__/LinkedInInput.test.tsx` — test input validation UI

  **Must NOT do**:
  - Do not allow extraction without auth + paid plan
  - Do not show Twitter/Instagram input fields — show "Coming soon" label instead
  - Do not auto-proceed after extraction — let user review and edit bio

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex wizard UI with loading states, validation feedback, editable profile card
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Multi-step wizard with animated states requires careful UX design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15, 17-20)
  - **Blocks**: Task 17 (template selection follows extraction)
  - **Blocked By**: Tasks 9, 10 (needs extractor and bio cleanup)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:50-57` — Build page spec
  - `src/lib/extractors/` (Task 9) — extraction interface and Proxycurl implementation
  - `src/lib/ai/bio-cleanup.ts` (Task 10) — bio cleanup function

  **External References**:
  - Build prompt "Build Page (/build) > Step 1: Input" — exact UI requirements
  - Build prompt mentions `?subscription_id=` query param from Dodo return URL

  **WHY Each Reference Matters**:
  - project.md defines the build page flow (extract → select template → deploy)
  - Task 9/10 outputs are the services this page calls
  - Build prompt specifies the exact steps and loading state messages

  **Acceptance Criteria**:

  - [ ] LinkedIn URL input with real-time validation
  - [ ] "Extract Profile" button calls `/api/extract` with loading animation
  - [ ] Extracted profile card shows all fields with editable bio
  - [ ] Twitter/Instagram show "Coming soon" badges
  - [ ] `/api/extract` validates input with Zod and requires auth + paid plan
  - [ ] All tests pass

  **QA Scenarios**:

  ```
  Scenario: LinkedIn extraction flow works end-to-end
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, user authenticated with paid plan, mock Proxycurl responses configured
    Steps:
      1. Navigate to `http://localhost:3000/build`
      2. Enter "https://linkedin.com/in/test-user" in the LinkedIn URL input
      3. Assert green validation checkmark appears
      4. Click "Extract Profile" button
      5. Assert loading state appears with extraction progress messages
      6. Wait for extraction to complete (timeout: 15s)
      7. Assert profile card shows: name, headline, bio, avatar
      8. Assert bio textarea is editable
      9. Assert "Continue to Templates" button is enabled
      10. Take screenshot
    Expected Result: Full extraction flow completes, profile data displayed
    Failure Indicators: Validation fails on valid URL, extraction hangs, missing profile fields
    Evidence: .sisyphus/evidence/task-16-extraction-flow.png

  Scenario: Invalid LinkedIn URL shows error
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/build`
      2. Enter "https://linkedin.com/company/google" in the input
      3. Assert red error message: contains "personal LinkedIn profile"
      4. Assert "Extract Profile" button is disabled
    Expected Result: Validation rejects company URL with clear error
    Failure Indicators: Company URL accepted, no error message
    Evidence: .sisyphus/evidence/task-16-invalid-url.png
  ```

  **Commit**: YES (groups with Task 15)
  - Message: `feat(flow): paywall page and build wizard LinkedIn input`
  - Files: `src/app/build/page.tsx`, `src/components/build/LinkedInInput.tsx`, `src/app/api/extract/**`
  - Pre-commit: `npm run build`

- [ ] 17. Build Wizard — Step 2: Template Selection + Live Preview

  **What to do**:
  - Create `src/components/build/TemplateSelector.tsx` — Step 2 of wizard:
    - Left panel: Grid of template cards (3 columns desktop, 2 mobile)
      - Each card shows: template preview thumbnail (placeholder gray box with template name), name, light/dark tag
      - Click to select — active template gets gold border + checkmark
      - Free templates (first 5): selectable
      - Premium templates: locked with gold lock icon overlay + "Upgrade to Pro" text
    - Right panel: Live preview pane
      - Render the selected template's `Component` with the extracted `ProfileData`
      - Use an iframe for CSS isolation:
        - Create `src/components/build/TemplatePreview.tsx` — renders template inside iframe using React Portal into iframe document
        - Inject template CSS and fonts into iframe head
        - Updates reactively when template selection changes
      - Scale preview to fit panel (CSS `transform: scale()`)
    - "Deploy My Site →" button at bottom (only enabled when a template is selected)
  - Handle state management:
    - Selected template slug stored in wizard state
    - Profile data passed from Step 1
    - Preview updates on template change
  - Write tests:
    - `src/components/build/__tests__/TemplateSelector.test.tsx` — test selection, locked state, preview rendering

  **Must NOT do**:
  - Do not render templates directly in the page (CSS collision risk) — use iframe isolation
  - Do not allow selecting locked premium templates for free users
  - Do not use `srcdoc` for iframe — use React Portal into iframe document for reactive updates

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex UI with template grid, iframe-based live preview, and state management
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Template picker requires polished grid layout, live preview implementation, and clear selection states

  **Parallelization**:
  - **Can Run In Parallel**: YES (but effectively depends on Task 16 completing first for data flow)
  - **Parallel Group**: Wave 3 (with Tasks 15, 16, 18-20)
  - **Blocks**: Task 18 (deploy step follows template selection)
  - **Blocked By**: Tasks 8, 16 (needs templates and extraction data)

  **References**:

  **Pattern References**:
  - `src/lib/templates.ts` (Task 8) — template registry and getTemplate/getTemplateList functions
  - `src/templates/*/Component.tsx` (Task 8) — actual template components to render

  **External References**:
  - Build prompt "Build Page > Step 2: Choose Template" — grid layout, locked cards, live preview spec
  - Metis review — iframe React Portal pattern for CSS isolation

  **WHY Each Reference Matters**:
  - Task 8 template registry provides the data source for the template grid
  - Build prompt defines the exact UI layout (grid + preview pane)
  - Metis iframe Portal pattern prevents CSS conflicts between app and template styles

  **Acceptance Criteria**:

  - [ ] Template grid shows all 5 templates with names and tags
  - [ ] Clicking a template selects it (gold border + checkmark)
  - [ ] Live preview iframe renders selected template with profile data
  - [ ] Preview updates reactively on template change
  - [ ] Premium templates show locked overlay for free users
  - [ ] "Deploy My Site" button enabled only when template selected

  **QA Scenarios**:

  ```
  Scenario: Template selection with live preview
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, user on Step 2 of build wizard with extracted profile data
    Steps:
      1. Assert 5 template cards visible in grid
      2. Click on "Ivory Editorial" card
      3. Assert gold border appears on clicked card
      4. Assert preview iframe renders with profile name visible
      5. Click on "Noir Minimal" card
      6. Assert preview iframe updates to show different template
      7. Assert "Deploy My Site" button is enabled
      8. Take screenshot
    Expected Result: Template selection toggles preview, deploy button activates
    Failure Indicators: Preview doesn't update, wrong template renders, button stays disabled
    Evidence: .sisyphus/evidence/task-17-template-select.png

  Scenario: Premium templates are locked for free users
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, free-tier user on Step 2
    Steps:
      1. Assert first 5 templates are selectable (no lock icon)
      2. If premium templates exist, assert they show lock overlay
      3. Click on a locked template — assert it does NOT select
      4. Assert "Upgrade to Pro" text visible on locked cards
    Expected Result: Free templates selectable, premium locked
    Failure Indicators: Premium templates selectable by free user
    Evidence: .sisyphus/evidence/task-17-template-locked.png
  ```

  **Commit**: YES (groups with Task 18)
  - Message: `feat(build): template selection, live preview, and deploy flow`
  - Files: `src/components/build/TemplateSelector.tsx`, `src/components/build/TemplatePreview.tsx`
  - Pre-commit: `npm run build`

- [ ] 18. Build Wizard — Step 3: Deploy Flow + Success State

  **What to do**:
  - Create `src/components/build/DeployStep.tsx` — Step 3 of wizard:
    - "Deploy My Site" button (large, gold, centered)
    - On click → call `/api/deploy` with `{ templateId, profileData }`
    - Animated deployment progress using Framer Motion:
      - Step 1: "Building your site..." (0-30% progress)
      - Step 2: "Deploying to Vercel..." (30-70% progress)
      - Step 3: "Going live..." (70-100% progress)
      - Use animated terminal visual matching landing page How It Works section
    - Error state: red error message with "Try Again" button
    - Success state:
      - Confetti/celebration animation (subtle, gold particles)
      - "Your site is live!" heading
      - Live URL displayed as clickable link: `https://folio-{slug}.vercel.app`
      - "Open Site" button (opens in new tab)
      - Custom domain connection section:
        - Instructions: "Want yourname.com?"
        - DNS guide: "Add this CNAME record to your domain registrar"
        - CNAME value: `cname.vercel-dns.com`
        - Links to registrars: Namecheap, Google Domains, Cloudflare (with UTM params)
      - "Go to Dashboard" button → navigates to `/dashboard`
  - Save deployed site to Supabase (the `/api/deploy` route handles this, but the UI confirms it)
  - Write tests:
    - `src/components/build/__tests__/DeployStep.test.tsx` — test loading states, success UI, error handling

  **Must NOT do**:
  - Do not show raw Vercel API errors to user — show friendly messages
  - Do not skip the progress animation — it covers real deployment time
  - Do not auto-navigate away from success state — let user copy URL and see domain instructions

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex animated UI with multi-step progress, success celebration, and domain instructions
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Deploy animation and success state require polished visual feedback

  **Parallelization**:
  - **Can Run In Parallel**: YES (but depends on Task 17's data flow)
  - **Parallel Group**: Wave 3 (with Tasks 15-17, 19-20)
  - **Blocks**: None (end of build flow)
  - **Blocked By**: Tasks 13, 17 (needs deploy service and template selection)

  **References**:

  **Pattern References**:
  - `src/lib/deploy/` (Task 13) — deploy service that `/api/deploy` calls
  - `/Users/namanshiroha/folio/project.md:243-248` — Domain strategy (CNAME, registrar links)

  **External References**:
  - Build prompt "Build Page > Step 3: Deploy" — loading states, success state, domain instructions
  - Framer Motion AnimatePresence: `https://www.framer.com/motion/animate-presence/`

  **WHY Each Reference Matters**:
  - Task 13 deploy service defines the API contract (request/response shapes)
  - project.md domain strategy defines exact registrar links and CNAME instructions
  - Framer Motion for smooth step transitions and progress animations

  **Acceptance Criteria**:

  - [ ] Deploy button triggers `/api/deploy` call with correct payload
  - [ ] 3-step progress animation shows during deployment
  - [ ] Success state shows live URL, domain instructions, and registrar links
  - [ ] Error state shows friendly message with retry button
  - [ ] "Go to Dashboard" button navigates to `/dashboard`

  **QA Scenarios**:

  ```
  Scenario: Deploy flow shows progress and success
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, user on Step 3 with selected template and profile data, deploy API mocked to return success
    Steps:
      1. Click "Deploy My Site" button
      2. Assert progress animation starts — text includes "Building your site"
      3. Wait for deployment to complete (timeout: 30s)
      4. Assert success state visible — heading contains "live"
      5. Assert live URL link is present and clickable
      6. Assert CNAME instruction text visible: "cname.vercel-dns.com"
      7. Assert registrar links present (Namecheap, Google Domains, Cloudflare)
      8. Assert "Go to Dashboard" button visible
      9. Take screenshot
    Expected Result: Full deploy flow from button click to success state
    Failure Indicators: Progress stalls, no success state, missing URL
    Evidence: .sisyphus/evidence/task-18-deploy-success.png

  Scenario: Deploy error shows retry option
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, deploy API mocked to return 500
    Steps:
      1. Click "Deploy My Site" button
      2. Wait for error state (timeout: 15s)
      3. Assert error message visible (user-friendly, not raw error)
      4. Assert "Try Again" button visible
      5. Take screenshot
    Expected Result: Friendly error message with retry button
    Failure Indicators: Raw error displayed, no retry option, app crashes
    Evidence: .sisyphus/evidence/task-18-deploy-error.png
  ```

  **Commit**: YES (groups with Task 17)
  - Message: `feat(build): template selection, live preview, and deploy flow`
  - Files: `src/components/build/DeployStep.tsx`
  - Pre-commit: `npm run build`

- [ ] 19. Dashboard — Site Listing + Site Cards

  **What to do**:
  - Create `src/app/dashboard/page.tsx`:
    - Fetch user's sites from Supabase via `/api/sites` (GET)
    - Empty state: "You haven't built any sites yet" with CTA → "Build Your First Site" linking to `/build`
    - Site cards grid (2 columns desktop, 1 mobile):
      - Template preview thumbnail
      - Site URL (clickable, opens in new tab)
      - Template name
      - Created date (formatted: "Mar 6, 2026")
      - Status badge (deployed / deploying / error)
      - Action buttons: Edit, Change Template, Connect Domain, Delete
    - Header with "My Sites" title + "Build New Site" gold button
    - Show user's current plan and site count ("1 of 1 sites used" for Pro, "3 of 10 sites used" for Agency)
  - Create `src/app/api/sites/route.ts`:
    - GET: fetch user's sites from Supabase (auth required)
    - DELETE: delete a site by ID (auth required, verify ownership)
  - Apply design system throughout (dark theme, cream text, gold accents)
  - Mobile responsive

  **Must NOT do**:
  - Do not show other users' sites
  - Do not allow deleting sites without confirmation modal
  - Do not show billing management here (Task 20)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Dashboard page with data fetching, card grid, empty states, and CRUD operations
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Dashboard layout requires clean data presentation and clear action hierarchy

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15-18, 20)
  - **Blocks**: Task 20 (dashboard features extend this page)
  - **Blocked By**: Task 4 (needs Supabase for data fetching)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:60-64` — Dashboard page spec
  - `src/lib/db.ts` (Task 4) — `getSitesByUser()`, `deleteSite()` functions

  **External References**:
  - Build prompt "Dashboard (/dashboard)" — features list

  **WHY Each Reference Matters**:
  - project.md defines dashboard features (list sites, edit, re-deploy, domain, billing)
  - Task 4 DB helpers are the data layer this page calls

  **Acceptance Criteria**:

  - [ ] Dashboard shows user's sites in a card grid
  - [ ] Empty state with CTA when no sites exist
  - [ ] Site cards show URL, template name, date, status, and action buttons
  - [ ] Delete requires confirmation modal
  - [ ] GET `/api/sites` returns only authenticated user's sites
  - [ ] Mobile responsive layout

  **QA Scenarios**:

  ```
  Scenario: Dashboard shows empty state
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, authenticated user with no sites
    Steps:
      1. Navigate to `http://localhost:3000/dashboard`
      2. Assert "haven't built any sites" text visible
      3. Assert "Build Your First Site" CTA button visible
      4. Click CTA — assert navigation to `/build`
      5. Take screenshot
    Expected Result: Clean empty state with actionable CTA
    Failure Indicators: Error instead of empty state, missing CTA
    Evidence: .sisyphus/evidence/task-19-dashboard-empty.png

  Scenario: Dashboard lists user's sites
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, authenticated user with 1+ sites in Supabase
    Steps:
      1. Navigate to `http://localhost:3000/dashboard`
      2. Assert at least 1 site card visible
      3. Assert site card shows: URL text, template name, created date
      4. Assert action buttons visible: Edit, Delete
      5. Take screenshot
    Expected Result: Site cards render with all required information
    Failure Indicators: No cards, missing data, broken layout
    Evidence: .sisyphus/evidence/task-19-dashboard-sites.png
  ```

  **Commit**: YES (groups with Task 20)
  - Message: `feat(dashboard): site management, domain guide, and billing`
  - Files: `src/app/dashboard/**`, `src/app/api/sites/**`
  - Pre-commit: `npm run build`

- [ ] 20. Dashboard — Edit, Re-deploy, Domain Guide, Billing

  **What to do**:
  - Create `src/app/dashboard/edit/[siteId]/page.tsx`:
    - Load existing site data from Supabase
    - Show editable profile fields (same as Step 1 of build wizard but pre-filled)
    - Allow changing template (same picker as Step 2)
    - "Re-deploy" button → calls `/api/deploy` with updated data
    - Show loading/success/error states matching build wizard deploy step
  - Create `src/components/dashboard/DomainGuide.tsx`:
    - Expandable section on site card or edit page
    - Shows current Vercel URL
    - Step-by-step DNS instructions:
      1. "Go to your domain registrar"
      2. "Add a CNAME record"
      3. "Host: @, Value: `cname.vercel-dns.com`"
      4. "Wait 24-48 hours for DNS propagation"
    - Links to Namecheap, Google Domains, Cloudflare (with UTM params)
    - Input field for custom domain → saves to Supabase (no actual Vercel domain API call in V1 — just stores it)
  - Create `src/components/dashboard/BillingSection.tsx`:
    - Shows current plan (Free / Pro / Agency)
    - "Manage Billing" button → calls `/api/customer-portal` → redirects to Dodo customer portal
    - If Free: show "Upgrade to Pro" CTA
  - Create `src/app/api/customer-portal/route.ts`:
    - Use `@dodopayments/nextjs` CustomerPortal export OR manually generate portal URL
    - Requires auth — look up user's `dodo_customer_id`
    - Redirect to Dodo-hosted billing portal

  **Must NOT do**:
  - Do not implement actual custom domain verification via Vercel API in V1 — just save the domain name and show DNS instructions
  - Do not build a custom billing UI — use Dodo's hosted customer portal
  - Do not allow editing other users' sites

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multiple sub-features (edit page, domain guide, billing) with UI polish
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Edit flow and domain guide require clear instructional UI design

  **Parallelization**:
  - **Can Run In Parallel**: YES (but depends on Task 19 for shared dashboard layout)
  - **Parallel Group**: Wave 3 (with Tasks 15-19)
  - **Blocks**: None (final implementation task)
  - **Blocked By**: Tasks 12, 13, 19 (needs webhooks for billing status, deploy service for re-deploy, dashboard layout)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/project.md:60-64` — Dashboard features spec
  - `/Users/namanshiroha/folio/project.md:243-248` — Domain strategy section
  - `src/components/build/` (Tasks 16-18) — build wizard components to reuse in edit flow
  - `src/lib/billing.ts` (Task 6) — `getCustomerPortalUrl()` helper

  **External References**:
  - `@dodopayments/nextjs` CustomerPortal: `https://docs.dodopayments.com/developer-resources/nextjs-adaptor`
  - Build prompt "Dashboard" section — feature list

  **WHY Each Reference Matters**:
  - project.md domain strategy defines registrar links and CNAME instructions
  - Build wizard components from Tasks 16-18 can be reused for the edit flow
  - Dodo CustomerPortal adapter handles billing portal redirect in minimal code

  **Acceptance Criteria**:

  - [ ] Edit page loads existing site data and allows modification
  - [ ] "Re-deploy" button deploys updated site
  - [ ] Domain guide shows DNS instructions with CNAME value
  - [ ] Custom domain input saves to Supabase
  - [ ] "Manage Billing" redirects to Dodo customer portal
  - [ ] Free users see "Upgrade to Pro" CTA instead of billing management
  - [ ] `/api/customer-portal` requires auth and redirects correctly

  **QA Scenarios**:

  ```
  Scenario: Domain guide shows correct DNS instructions
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, authenticated user with a deployed site
    Steps:
      1. Navigate to dashboard
      2. Click "Connect Domain" on a site card
      3. Assert DNS instructions visible with CNAME value "cname.vercel-dns.com"
      4. Assert links to Namecheap, Google Domains, Cloudflare are present
      5. Enter "example.com" in custom domain input
      6. Save — assert success feedback
      7. Take screenshot
    Expected Result: Clear DNS instructions, registrar links, saveable custom domain
    Failure Indicators: Missing CNAME value, broken registrar links, save fails
    Evidence: .sisyphus/evidence/task-20-domain-guide.png

  Scenario: Billing section shows plan and portal link
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, authenticated Pro user
    Steps:
      1. Navigate to dashboard
      2. Assert current plan shows "Pro"
      3. Assert "Manage Billing" button visible
      4. Take screenshot
    Expected Result: Plan displayed, billing portal button present
    Failure Indicators: Wrong plan shown, missing billing button
    Evidence: .sisyphus/evidence/task-20-billing.png
  ```

  **Commit**: YES (groups with Task 19)
  - Message: `feat(dashboard): site management, domain guide, and billing`
  - Files: `src/app/dashboard/edit/**`, `src/components/dashboard/**`, `src/app/api/customer-portal/**`
  - Pre-commit: `npm run build`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npm run lint` + `npm run test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify Zod validation on every API route. Verify TypeScript strict mode.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (full user flow: landing → paywall → build → deploy → dashboard). Test edge cases: empty state, invalid LinkedIn URL, failed payment, already deployed site. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes. Verify no Twitter/Instagram extraction, no Stripe code, no OpenAI code.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| After Task(s) | Message | Pre-commit |
|---|---|---|
| 1 | `chore(init): scaffold Next.js 14 project with core dependencies` | `npm run build` |
| 2, 3 | `feat(design): add design system, types, and global styles` | `npx tsc --noEmit` |
| 4, 5, 6, 7 | `feat(infra): configure Supabase, Clerk, Dodo Payments, and vitest` | `npm run test` |
| 8 | `feat(templates): add template system with 5 placeholder components` | `npm run test` |
| 9, 10 | `feat(extraction): LinkedIn extractor with Proxycurl + Anthropic bio cleanup` | `npm run test` |
| 11, 12 | `feat(payments): Dodo checkout, webhooks, and customer sync` | `npm run test` |
| 13 | `feat(deploy): Vercel deploy service with static HTML generation` | `npm run test` |
| 14 | `feat(landing): build landing page with all sections` | `npm run build` |
| 15, 16 | `feat(flow): paywall page and build wizard LinkedIn input` | `npm run build` |
| 17, 18 | `feat(build): template selection, live preview, and deploy flow` | `npm run build` |
| 19, 20 | `feat(dashboard): site management, domain guide, and billing` | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: ✓ Compiled successfully
npm run test           # Expected: All tests pass
npm run lint           # Expected: No errors
npx tsc --noEmit       # Expected: No type errors
```

### Final Checklist
- [ ] All 4 pages render (`/`, `/start`, `/build`, `/dashboard`)
- [ ] Design system consistent (dark/gold/cream theme on every page)
- [ ] Clerk auth protects `/build` and `/dashboard`
- [ ] Dodo Payments checkout flow works end-to-end
- [ ] LinkedIn extraction returns populated ProfileData
- [ ] Bio cleanup via Anthropic produces clean copy
- [ ] Template preview renders live in iframe
- [ ] Vercel deploy creates a reachable site
- [ ] Dashboard shows and manages user sites
- [ ] Mobile responsive on all pages
- [ ] No Stripe code, no OpenAI code, no `any` types
- [ ] All API routes validate with Zod
