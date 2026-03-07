# Folio Redesign — Landing, Templates, Paywall, Social Links

## TL;DR

> **Quick Summary**: Redesign the Folio app with a thumbnail.market-style landing page, replace all 5 templates with 3 new ones inspired by user-provided HTML, put all templates behind a single-tier paywall, and add social link fields to the profile form.
> 
> **Deliverables**:
> - Redesigned landing page with auto-scrolling template showcase
> - 3 new React template components (Impact/Terminal/Grid styles)
> - Profile form with social links (LinkedIn, Twitter/X, GitHub, Instagram, YouTube)
> - All-templates-locked paywall with Dodo checkout integration
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 (types) → Task 5-7 (templates) → Task 10 (landing showcase) → Task 13 (final QA)

---

## Context

### Original Request
User wants four changes to Folio (personal website builder SaaS at afterapp.fun/folio):
1. Add social link fields to the profile form (LinkedIn, Twitter/X, GitHub, Instagram, YouTube)
2. Replace all 5 existing templates with 3 new ones inspired by provided HTML
3. Put ALL templates behind a paywall — nothing is free, single pricing tier
4. Redesign landing page to match thumbnail.market aesthetic (bold hero, auto-scrolling template carousel, features, testimonials, pricing)

### Interview Summary
**Key Discussions**:
- Social links: All optional, LinkedIn + Twitter/X + GitHub + Instagram + YouTube + keep custom links
- Paywall: "Template preview + lock" — show thumbnails but every one is locked until user pays via Dodo
- Pricing: Single tier using existing product ID `pdt_0NZwpK8C6q5489M5CBvHT`
- Template names: Placeholder for now, user will name later
- Templates are "inspirations" — adapt elements for personal websites/link-in-bio using LinkedIn data
- thumbnail.market reference: Bold hero, auto-scrolling showcase rows, feature cards, testimonials, pricing grid

**Research Findings**:
- thumbnail.market uses 2-row auto-scrolling template carousel (CSS animation, opposite directions)
- Current Folio landing has 7 components in `src/components/landing/`
- Current templates: 5 under `src/templates/{slug}/index.tsx`, each takes `TemplateProps { profile: ProfileData }`
- Build flow: BuildStep1 → sessionStorage → TemplatePickerClient → sessionStorage → PreviewClient
- ProfileData already has `twitter_url?` and `instagram_url?` but they're not exposed in the form
- Template system uses `TemplateEntry` pattern — extensible, just add to array in `lib/templates.ts`

### Gap Analysis
**Identified gaps** (addressed in plan):
- ProfileData type needs `github_url?`, `youtube_url?`, `website_url?` added
- Old 5 templates need removal + 3 new templates created
- Mock profile (`test/mocks/profile.ts`) needs updating for new social fields
- Template preview images needed for landing page showcase + template picker
- TemplatePickerClient currently checks `userPlan` prop — needs to work with "all locked" mode
- Supabase `sites` table may store profile JSON — new fields need to be compatible
- Landing page component count may increase (Showcase is new, existing sections need redesign)

---

## Work Objectives

### Core Objective
Transform Folio from a freemium template picker into a premium-first product with a polished marketing landing page, modern social-profile form, and 3 distinctive template styles.

### Concrete Deliverables
- `src/types/profile.ts` — Updated with social link fields
- `src/templates/impact-report/index.tsx` — New template (blue corporate style)
- `src/templates/terminal-hacker/index.tsx` — New template (CRT/retro style)
- `src/templates/brutalist-grid/index.tsx` — New template (dot grid/green windows style)
- `src/lib/templates.ts` — New registry with 3 templates, all `isPremium: true`
- `src/app/build/BuildStep1.tsx` — Profile form with social links section
- `src/app/build/template/TemplatePickerClient.tsx` — All-locked paywall UX
- `src/components/landing/*.tsx` — Redesigned landing page components
- `src/app/page.tsx` — Updated landing page composition

### Definition of Done
- [ ] Landing page loads at afterapp.fun/folio with thumbnail.market-style design
- [ ] Auto-scrolling template showcase visible on landing page
- [ ] Profile form collects social links (all optional)
- [ ] ALL templates show as locked in picker, clicking triggers Dodo checkout
- [ ] After payment, templates unlock and user can select + preview
- [ ] 3 new templates render correctly with profile data
- [ ] Old templates removed, no dead imports

### Must Have
- Auto-scrolling template showcase on landing (2 rows, opposite directions)
- Social link fields in profile form (LinkedIn, Twitter/X, GitHub, Instagram, YouTube)
- All templates behind paywall with Dodo checkout
- 3 new template components that adapt profile data into personal websites
- Responsive design (mobile + desktop) on all new components
- Design system consistency: `--bg`, `--cream`, `--gold`, Playfair Display, DM Sans, DM Mono

### Must NOT Have (Guardrails)
- No free templates — ALL `isPremium: true`
- No `any` types, no `@ts-ignore`
- No changing Clerk auth, middleware, or deployment infra
- No modifying Supabase schema (profile JSON is flexible enough)
- No hardcoded colors — use CSS variables from design system
- No placeholder/lorem ipsum in production templates — use realistic mock data
- No external image dependencies — templates must work with or without avatar_url
- Do NOT change the API routes (deploy, checkout, webhooks) — only UI changes
- Do NOT break the sessionStorage data flow between build steps

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **Build verification**: Use `npm run build` — must exit 0
- **Type checking**: Use `npx tsc --noEmit` — must exit 0

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — types, cleanup, mock data):
├── Task 1: Extend ProfileData type + update mock profile [quick]
├── Task 2: Remove old 5 templates + clean registry [quick]
├── Task 3: Add social link fields to BuildStep1 form [quick]
└── Task 4: Update TemplatePickerClient for all-locked paywall [quick]

Wave 2 (Templates — 3 parallel, MAX creative work):
├── Task 5: Template 1 — Impact Report style [visual-engineering]
├── Task 6: Template 2 — Terminal Hacker style [visual-engineering]
└── Task 7: Template 3 — Brutalist Grid style [visual-engineering]

Wave 3 (Landing page — depends on templates for showcase):
├── Task 8: Landing Hero + Nav redesign (thumbnail.market style) [visual-engineering]
├── Task 9: Landing Features + HowItWorks redesign [visual-engineering]
├── Task 10: Landing Template Showcase (auto-scrolling carousel) [visual-engineering]
├── Task 11: Landing Pricing + Testimonials + FinalCTA + Footer [visual-engineering]
└── Task 12: Wire new templates into registry + generate preview screenshots [quick]

Wave FINAL (Verification):
├── Task F1: Full build + typecheck verification [quick]
├── Task F2: Playwright visual QA — all pages [unspecified-high]
├── Task F3: Commit, push, deploy, verify live [quick]
└── Task F4: Plan compliance audit [deep]
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 3, 5, 6, 7, 12 |
| 2 | — | 5, 6, 7, 12 |
| 3 | 1 | F2 |
| 4 | — | F2 |
| 5 | 1, 2 | 10, 12 |
| 6 | 1, 2 | 10, 12 |
| 7 | 1, 2 | 10, 12 |
| 8 | — | F2 |
| 9 | — | F2 |
| 10 | 5, 6, 7 | F2 |
| 11 | — | F2 |
| 12 | 5, 6, 7 | F1, F2 |
| F1 | 12 | F3 |
| F2 | all impl tasks | F3 |
| F3 | F1, F2 | F4 |
| F4 | F3 | — |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks — T1-T4 → `quick`
- **Wave 2**: 3 tasks — T5-T7 → `visual-engineering`
- **Wave 3**: 5 tasks — T8-T11 → `visual-engineering`, T12 → `quick`
- **Wave FINAL**: 4 tasks — F1 → `quick`, F2 → `unspecified-high`, F3 → `quick`, F4 → `deep`

---

## TODOs

- [ ] 1. Extend ProfileData type + update mock profile

  **What to do**:
  - Add `github_url?: string`, `youtube_url?: string`, `website_url?: string` to `ProfileData` interface in `src/types/profile.ts`
  - Update `createMockProfile()` in `src/test/mocks/profile.ts` to include sample values for ALL social fields (twitter_url, instagram_url, github_url, youtube_url, website_url). Currently twitter_url and instagram_url are set to `undefined` — give them realistic sample URLs too.
  - **CRITICAL**: Update `DeployRequestSchema` in `src/types/api.ts` — add the 3 new social fields to the `profile_data` Zod schema. Add these alongside the existing `twitter_url` and `instagram_url` optional fields at lines 16-17:
    ```typescript
    github_url: z.string().optional(),
    youtube_url: z.string().optional(),
    website_url: z.string().optional(),
    ```
    If this schema is NOT updated, the deploy API route's Zod `.safeParse()` will **silently strip** the new social fields from profile data, losing user data during deployment.
  - Verify all existing imports of ProfileData still compile

  **Must NOT do**:
  - Do NOT change Experience, CustomLink, TemplateMeta, or any other types
  - Do NOT modify API route handler files (`src/app/api/*/route.ts`) — ONLY update the Zod schema in `src/types/api.ts`
  - Do NOT change database schemas

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 3, 5, 6, 7, 12
  - **Blocked By**: None

  **References**:
  - `src/types/profile.ts` — Current ProfileData interface (lines 12-24). Already has `twitter_url?` and `instagram_url?`. Add `github_url?`, `youtube_url?`, `website_url?` in same pattern.
  - `src/test/mocks/profile.ts` — Mock profile factory. Currently sets `twitter_url: undefined` and `instagram_url: undefined` (lines 11-12). Update ALL social fields with realistic sample URLs.
  - `src/types/api.ts` — **CRITICAL FIX TARGET**: `DeployRequestSchema` (lines 7-29) contains a `profile_data` Zod object. Lines 16-17 have `twitter_url: z.string().optional()` and `instagram_url: z.string().optional()`. Add `github_url`, `youtube_url`, `website_url` as `z.string().optional()` right after them.
  - `src/types/template.ts` — TemplateProps references ProfileData AND has `accentColor?: string` (line 5). Don't touch this file, just ensure compatibility.

  **Acceptance Criteria**:
  ```
  Scenario: ProfileData type has all social fields
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit`
      2. Assert exit code 0
    Expected Result: No type errors
    Evidence: .sisyphus/evidence/task-1-typecheck.txt

  Scenario: Mock profile includes social URLs
    Tool: Bash
    Steps:
      1. Run `grep -c 'github_url\|youtube_url\|website_url' src/test/mocks/profile.ts`
      2. Assert count >= 3
    Expected Result: All 3 new fields present in mock
    Evidence: .sisyphus/evidence/task-1-mock-fields.txt

  Scenario: DeployRequestSchema includes new social fields
    Tool: Bash
    Steps:
      1. Run `grep -c 'github_url\|youtube_url\|website_url' src/types/api.ts`
      2. Assert count >= 3
    Expected Result: All 3 new social fields in Zod deploy schema
    Evidence: .sisyphus/evidence/task-1-deploy-schema.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `refactor(types): extend ProfileData with social link fields, update deploy schema`
  - Files: `src/types/profile.ts`, `src/test/mocks/profile.ts`, `src/types/api.ts`

- [ ] 2. Remove old 5 templates + clean registry

  **What to do**:
  - Delete these 5 template directories entirely:
    - `src/templates/ivory-editorial/`
    - `src/templates/noir-minimal/`
    - `src/templates/forest-link/`
    - `src/templates/violet-pro/`
    - `src/templates/grid-bright/`
  - Update `src/lib/templates.ts`: remove all 5 imports and entries. Leave an empty `templates: TemplateEntry[] = []` array for now (Tasks 5-7 will populate it)
  - Remove the `getFreeTemplates()` function (no free templates anymore). Keep `getTemplateBySlug()` and `getPremiumTemplates()`.
  - Check for any other imports of old template components and remove them

  **Must NOT do**:
  - Do NOT delete `src/templates/` directory itself — new templates go here
  - Do NOT modify the TemplateEntry or TemplateMeta types
  - Do NOT touch the build flow files yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 5, 6, 7, 12
  - **Blocked By**: None

  **References**:
  - `src/lib/templates.ts` — Current registry with 5 entries (lines 1-80). Remove all imports and entries.
  - `src/templates/*/index.tsx` — 5 template component files to delete
  - `src/components/landing/Templates.tsx` — May reference template data for landing page — check and fix if needed

  **Acceptance Criteria**:
  ```
  Scenario: Old templates fully removed
    Tool: Bash
    Steps:
      1. Run `ls src/templates/` from /Users/namanshiroha/folio/folio
      2. Assert no ivory-editorial, noir-minimal, forest-link, violet-pro, grid-bright directories
      3. Run `grep -r 'ivory-editorial\|noir-minimal\|forest-link\|violet-pro\|grid-bright' src/ --include='*.ts' --include='*.tsx'`
      4. Assert 0 matches
    Expected Result: No traces of old templates in codebase
    Evidence: .sisyphus/evidence/task-2-cleanup.txt

  Scenario: Build still passes with empty registry
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit`
      2. Assert exit code 0 (may have warnings but no errors)
    Expected Result: TypeScript compiles
    Evidence: .sisyphus/evidence/task-2-typecheck.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `refactor(templates): remove old 5 templates, prepare for new ones`
  - Files: `src/lib/templates.ts`, `src/templates/` (deletions)

- [ ] 3. Add social link fields to BuildStep1 form

  **What to do**:
  - In `src/app/build/BuildStep1.tsx`, add a new "Social Links" section (after the existing "Links" section at line 418, or merge into it) with these fields:
    - LinkedIn URL (already exists at line 421-433 — keep it)
    - Twitter / X URL (NEW state: `twitterUrl`)
    - GitHub URL (NEW state: `githubUrl`)
    - Instagram URL (NEW state: `instagramUrl`)
    - YouTube URL (NEW state: `youtubeUrl`)
    - Personal Website URL (NEW state: `websiteUrl`)
  - Add 5 new `useState('')` declarations after `linkedinUrl` at line 73
  - All social link fields are OPTIONAL (no validation required)
  - **CRITICAL**: The current `handleSubmit` (lines 107-140) builds the ProfileData object WITHOUT ANY social fields — not even the existing `twitter_url` and `instagram_url` that are already on the type. You MUST update the `handleSubmit` function's ProfileData construction (lines 122-136) to include ALL social fields:
    ```typescript
    const profile: ProfileData = {
      name: name.trim(),
      headline: headline.trim(),
      bio: bio.trim(),
      location: location.trim(),
      avatar_url: avatarUrl.trim(),
      linkedin_url: linkedinUrl.trim(),
      twitter_url: twitterUrl.trim() || undefined,
      instagram_url: instagramUrl.trim() || undefined,
      github_url: githubUrl.trim() || undefined,
      youtube_url: youtubeUrl.trim() || undefined,
      website_url: websiteUrl.trim() || undefined,
      experience: experiences...
      // (rest unchanged)
    };
    ```
    Use `|| undefined` so empty strings become `undefined` (matching the optional `?` on the type).
  - Keep all existing fields (Name, Headline, Bio, Location, Photo URL, Experience, Skills, Custom Links)
  - Style the social links section consistently with the existing design system (use same `inputStyle`, `labelStyle`, `sectionHeading` patterns from lines 20-55)

  **Must NOT do**:
  - Do NOT remove any existing fields
  - Do NOT change the sessionStorage key or data flow
  - Do NOT modify the form validation (only Name, Headline, Bio are required)
  - Do NOT add icons or logos for social platforms (keep it simple, text labels only)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: F2
  - **Blocked By**: Task 1 (needs updated ProfileData type)

  **References**:
  - `src/app/build/BuildStep1.tsx` — Current form (500 lines). Key locations:
    - Lines 20-55: Style constants (`inputStyle`, `labelStyle`, `sectionDivider`, `sectionHeading`) — use these exact styles for new inputs
    - Lines 68-74: State declarations — add new `useState('')` for each social field after `linkedinUrl` (line 73)
    - Lines 107-140: `handleSubmit` — **MUST be updated** to include all social fields in the ProfileData object (currently missing ALL social fields, even existing twitter/instagram)
    - Lines 418-433: "Links" section with LinkedIn URL input — use identical pattern for new social inputs
    - Lines 435-487: Custom Links section — keep as-is, social links go BEFORE this
  - `src/types/profile.ts` — ProfileData interface with the new social fields from Task 1
  - `src/types/api.ts` — DeployRequestSchema already updated in Task 1 to accept new fields

  **Acceptance Criteria**:
  ```
  Scenario: Social links section renders in form
    Tool: Playwright
    Steps:
      1. Navigate to https://afterapp.fun/folio/build (or localhost:3000/folio/build)
      2. Wait for page load
      3. Assert input#twitter-url exists
      4. Assert input#github-url exists
      5. Assert input#instagram-url exists
      6. Assert input#youtube-url exists
      7. Assert input#website-url exists
      8. Screenshot
    Expected Result: All 5 new social link inputs visible
    Evidence: .sisyphus/evidence/task-3-social-fields.png

  Scenario: Form submits with social links in sessionStorage
    Tool: Playwright
    Steps:
      1. Fill Name, Headline, Bio (required fields)
      2. Fill twitter-url with "https://x.com/testuser"
      3. Fill github-url with "https://github.com/testuser"
      4. Click submit
      5. Read sessionStorage 'folio_profile', parse JSON
      6. Assert twitter_url === "https://x.com/testuser"
      7. Assert github_url === "https://github.com/testuser"
    Expected Result: Social links saved to sessionStorage
    Evidence: .sisyphus/evidence/task-3-session-data.txt
  ```

  **Commit**: YES
  - Message: `feat(form): add social link fields to profile form`
  - Files: `src/app/build/BuildStep1.tsx`

- [ ] 4. Update TemplatePickerClient for all-locked paywall

  **What to do**:
  - In `src/app/build/template/TemplatePickerClient.tsx`, change the logic so ALL templates appear locked for unpaid users:
    - Remove the `isPremium` conditional at line 26-28 (`handleSelect`) — ALL templates are now locked when `userPlan === 'free'`, regardless of individual `isPremium` flag
    - At line 66, change `const locked = meta.isPremium && userPlan === 'free'` → `const locked = userPlan === 'free'`
    - Change the subtitle copy at line 61 from `"Free plan includes 3 templates. Upgrade for all 5."` → `"Unlock all templates to continue building your site."`
    - Replace the bottom "Upgrade to Pro →" link (lines 125-130) with a prominent CTA button that calls the checkout API
    - **Checkout implementation**: The CTA button should POST to `/api/checkout` with body:
      ```typescript
      { productId: "pdt_0NZwpK8C6q5489M5CBvHT", planType: "pro" }
      ```
      Then redirect to the returned `checkoutUrl`. See `src/app/api/checkout/route.ts` for the expected request shape (`CheckoutRequestSchema` requires `productId: string` and `planType: 'pro' | 'agency'`).
    - Add a loading state while checkout redirect is in progress
  - For paid users (`userPlan !== 'free'`), all templates are unlocked and selectable (existing behavior at lines 26-28, 66-67 just needs the condition flipped)
  - `src/app/build/template/page.tsx` (23 lines) — server component reads `user.plan` from DB (line 17) and passes as `userPlan` prop. This is already correct, no changes needed unless the `plan` field values change.

  **Must NOT do**:
  - Do NOT modify `src/lib/billing.ts` or `src/app/api/checkout/route.ts`
  - Do NOT change the Dodo product ID (`pdt_0NZwpK8C6q5489M5CBvHT`)
  - Do NOT remove the template selection UX for paid users
  - Do NOT break the sessionStorage flow (`folio_template` key at line 33)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: F2
  - **Blocked By**: None

  **References**:
  - `src/app/build/template/TemplatePickerClient.tsx` — Current picker (135 lines):
    - Line 5: Imports `PlanType` from `@/types` (defined in `src/types/database.ts` as `'free' | 'pro' | 'agency'`)
    - Line 9: `userPlan: PlanType` prop
    - Line 26-28: `handleSelect` — currently blocks premium-only templates. Change to block ALL when free.
    - Line 61: Copy about free plan — replace text
    - Line 66: `const locked = meta.isPremium && userPlan === 'free'` — change to `const locked = userPlan === 'free'`
    - Lines 125-130: "Upgrade to Pro →" link — replace with checkout CTA button
  - `src/app/build/template/page.tsx` — Server component (23 lines). Reads `user.plan` at line 17, passes to client. No changes needed.
  - `src/app/api/checkout/route.ts` — Checkout route (54 lines). Expects POST body: `{ productId: string, planType: 'pro' | 'agency' }` validated by `CheckoutRequestSchema`. Returns `{ checkoutUrl: string }`. The TemplatePickerClient should `fetch('/folio/api/checkout', { method: 'POST', body: JSON.stringify({ productId: 'pdt_0NZwpK8C6q5489M5CBvHT', planType: 'pro' }) })` and redirect to the returned `checkoutUrl`.
  - `src/lib/billing.ts` — `createCheckoutSession()` (read-only reference, do NOT modify)

  **Acceptance Criteria**:
  ```
  Scenario: All templates locked for free user
    Tool: Playwright
    Steps:
      1. Sign in as a free user (no subscription)
      2. Fill profile form, submit to reach template picker
      3. Assert ALL template cards show lock/upgrade indicator
      4. Assert no template is clickable/selectable
      5. Assert "Unlock" CTA button is visible
      6. Screenshot
    Expected Result: Every template appears locked
    Evidence: .sisyphus/evidence/task-4-all-locked.png

  Scenario: Clicking unlock triggers checkout
    Tool: Playwright
    Steps:
      1. On template picker as free user
      2. Click "Unlock Templates" button
      3. Assert navigation to Dodo checkout URL (or modal appears)
    Expected Result: Checkout flow initiated
    Evidence: .sisyphus/evidence/task-4-checkout-trigger.png
  ```

  **Commit**: YES
  - Message: `feat(paywall): lock all templates behind Dodo checkout`
  - Files: `src/app/build/template/TemplatePickerClient.tsx`, `src/app/build/template/page.tsx`

- [ ] 5. Template 1 — Impact Report style

  **What to do**:
  - Create `src/templates/impact-report/index.tsx` — a React component that accepts `TemplateProps { profile: ProfileData; accentColor?: string }`
  - Design inspiration: User's Template 1 HTML — blue card with rounded corners, metrics grid (2x2), clean corporate feel, SVG icons, light border separators
  - Adapt for personal portfolio/link-in-bio:
    - Header: Name + avatar (from `profile.avatar_url`)
    - Hero section: Headline + bio text
    - Metrics grid: Map experience items, skills count, custom links count, years of experience into visual metric cards
    - Social links displayed as icon-text pairs in footer strip
    - Color scheme: Primary blue (#0055FF), white text, subtle borders
  - Must be fully self-contained — all styles inline or CSS modules (no globals)
  - Must handle missing data gracefully (no avatar? show initials, no experience? hide section)
  - Must be responsive (single column on mobile)
  - Export as default function component

  **Must NOT do**:
  - Do NOT use external CSS frameworks (no Tailwind, no Bootstrap)
  - Do NOT import from other templates
  - Do NOT use `dangerouslySetInnerHTML`
  - Do NOT hardcode user data — all content comes from `profile` prop

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Template requires strong visual design for the corporate card layout, metrics grid, and typography hierarchy

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: Tasks 10, 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - User's Template 1 HTML (Impact Report) — provided in conversation. Key elements: rounded container, header with logo, 40%/60% grid split, metrics cards with SVG icons, hover states, footer strip.
  - `src/types/template.ts:TemplateProps` — interface the component must implement
  - `src/types/profile.ts:ProfileData` — data shape available to the template
  - Existing template pattern: `src/templates/ivory-editorial/index.tsx` (deleted in Task 2, but follow same export pattern: `export default function TemplateName({ profile, accentColor }: TemplateProps)`). Import TemplateProps from `@/types/template`.
  - Social link fields available on `profile`: `linkedin_url` (always), `twitter_url?`, `instagram_url?`, `github_url?`, `youtube_url?`, `website_url?`, plus `custom_links: { label, url }[]`. Display whichever social links are present, skip missing ones.

  **Acceptance Criteria**:
  ```
  Scenario: Template renders with full profile
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit`
      2. Assert exit 0
      3. Import test: `node -e "require('./src/templates/impact-report')"` (or tsc check)
    Expected Result: Component compiles without errors
    Evidence: .sisyphus/evidence/task-5-typecheck.txt

  Scenario: Template renders visually correct
    Tool: Playwright
    Steps:
      1. Create a test page that renders the template with mock profile data
      2. Screenshot at 1280px width
      3. Assert: blue container visible, name text present, metrics grid visible
      4. Screenshot at 375px width (mobile)
      5. Assert: single column layout, no horizontal overflow
    Expected Result: Template looks like the inspiration, responsive
    Evidence: .sisyphus/evidence/task-5-desktop.png, .sisyphus/evidence/task-5-mobile.png
  ```

  **Commit**: YES (groups with Tasks 6, 7)
  - Message: `feat(templates): add Impact Report template`
  - Files: `src/templates/impact-report/index.tsx`

- [ ] 6. Template 2 — Terminal Hacker style

  **What to do**:
  - Create `src/templates/terminal-hacker/index.tsx` — a React component accepting `TemplateProps { profile: ProfileData; accentColor?: string }`
  - Design inspiration: User's Template 2 HTML — BSOD blue background, CRT overlay effect (CSS scanlines), draggable windows with title bars, matrix rain animation, VT323 monospace font, retro terminal aesthetic
  - Adapt for personal portfolio/link-in-bio:
    - Desktop with taskbar at bottom (TERM, PROJ, LOGS, INFO buttons)
    - Terminal window: ASCII art of name, `cat welcome_message.txt` → headline + bio
    - Projects window: Skills and custom links displayed as file directory listing
    - Experience window: Work history as system logs with dates
    - About window: Bio + location + social links as terminal output
    - CRT overlay: CSS scanlines + subtle flicker animation (CSS only, no canvas — canvas is too heavy for generated sites)
  - Use VT323 font from Google Fonts (or fallback to Courier New)
  - Windows should have visual structure but NOT be actually draggable (generated sites are static HTML)
  - Must be responsive — windows stack vertically on mobile

  **Must NOT do**:
  - Do NOT implement actual drag functionality (templates generate static sites)
  - Do NOT use canvas for matrix rain (too heavy) — use CSS animation or skip it
  - Do NOT use `dangerouslySetInnerHTML`
  - Do NOT hardcode user data

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Complex visual design with CRT effects, window chrome, and retro aesthetics

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7)
  - **Blocks**: Tasks 10, 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - User's Template 2 HTML (BSOD Terminal) — provided in conversation. Key elements: CRT scanline overlay, draggable windows with title bars, ASCII art, taskbar, VT323 font, matrix rain canvas.
  - `src/types/template.ts:TemplateProps` — interface to implement
  - `src/types/profile.ts:ProfileData` — available data

  **Acceptance Criteria**:
  ```
  Scenario: Template compiles and renders
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit`
      2. Assert exit 0
    Expected Result: No type errors
    Evidence: .sisyphus/evidence/task-6-typecheck.txt

  Scenario: Template has retro terminal aesthetic
    Tool: Playwright
    Steps:
      1. Render template with mock profile
      2. Screenshot at 1280px — assert blue background, terminal windows, scanline effect
      3. Screenshot at 375px — assert windows stack vertically
    Expected Result: Retro CRT look, responsive
    Evidence: .sisyphus/evidence/task-6-desktop.png, .sisyphus/evidence/task-6-mobile.png
  ```

  **Commit**: YES (groups with Tasks 5, 7)
  - Message: `feat(templates): add Terminal Hacker template`
  - Files: `src/templates/terminal-hacker/index.tsx`

- [ ] 7. Template 3 — Brutalist Grid style

  **What to do**:
  - Create `src/templates/brutalist-grid/index.tsx` — a React component accepting `TemplateProps { profile: ProfileData; accentColor?: string }`
  - Design inspiration: User's Template 3 HTML — white background with dot grid pattern, green accent (#00a651) windows, Courier New monospace font, crosshair cursor, draggable-looking windows with close buttons
  - Adapt for personal portfolio/link-in-bio:
    - Dot-grid background (CSS radial-gradient pattern)
    - Navigation bar at top: Name, Projects, Experience, About, Contact — as text links with dot separators
    - Main content window (green card): Headline + bio as terminal prompt output
    - Additional content windows: Projects/skills, Experience, Contact/social links
    - Footer: copyright + tagline
  - Crosshair cursor via CSS
  - Windows should be visually positioned but static (no actual drag)
  - Must be responsive — windows reflow on mobile

  **Must NOT do**:
  - Do NOT implement actual drag functionality
  - Do NOT use `dangerouslySetInnerHTML`
  - Do NOT hardcode user data

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Brutalist design with dot-grid patterns, card layouts, monospace typography

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Tasks 10, 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - User's Template 3 HTML (Brutalist Grid) — provided in conversation. Key elements: dot-grid background, green windows (#00a651), Courier New font, crosshair cursor, nav with dot separators, draggable windows.
  - `src/types/template.ts:TemplateProps` — interface to implement
  - `src/types/profile.ts:ProfileData` — available data

  **Acceptance Criteria**:
  ```
  Scenario: Template compiles
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit`
      2. Assert exit 0
    Expected Result: No type errors
    Evidence: .sisyphus/evidence/task-7-typecheck.txt

  Scenario: Template has brutalist aesthetic
    Tool: Playwright
    Steps:
      1. Render template with mock profile
      2. Screenshot at 1280px — assert dot grid background, green windows, monospace text
      3. Screenshot at 375px — assert responsive layout
    Expected Result: Brutalist dot-grid look, responsive
    Evidence: .sisyphus/evidence/task-7-desktop.png, .sisyphus/evidence/task-7-mobile.png
  ```

  **Commit**: YES (groups with Tasks 5, 6)
  - Message: `feat(templates): add Brutalist Grid template`
  - Files: `src/templates/brutalist-grid/index.tsx`

- [ ] 8. Landing Hero + Nav redesign (thumbnail.market style)

  **What to do**:
  - Rewrite `src/components/landing/Nav.tsx` — Simpler nav: logo left, 2-3 anchor links (Templates, Pricing, Get Started button) right. Sticky on scroll. Match Folio design system.
  - Rewrite `src/components/landing/Hero.tsx` — Bold, impactful hero section inspired by thumbnail.market:
    - Large headline: "Your Personal Website in Minutes" (or similar, using Playfair Display)
    - Subheadline: "Turn your profile into a stunning portfolio. Pick a template, customize, deploy."
    - Primary CTA button: "Get Started →" linking to /folio/start or /folio/sign-up
    - Visual element: Could be a mockup/illustration of a generated site, or abstract decorative elements
    - Use design system: `--bg` background, `--cream` text, `--gold` accents

  **Must NOT do**:
  - Do NOT add external images or CDN dependencies
  - Do NOT use emojis (user hasn't asked for them)
  - Do NOT change the route structure

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10, 11)
  - **Blocks**: F2
  - **Blocked By**: None (landing components are independent of template files)

  **References**:
  - `src/components/landing/Nav.tsx` — Current nav component
  - `src/components/landing/Hero.tsx` — Current hero component
  - thumbnail.market hero: Bold multi-line headline, inline emojis/illustrations, single CTA button, dark background
  - Design system: `--bg: #0e0d0c`, `--cream: #f0ead8`, `--gold: #c9a84c`, Playfair Display headings, DM Sans body

  **Acceptance Criteria**:
  ```
  Scenario: Hero section renders with bold headline
    Tool: Playwright
    Steps:
      1. Navigate to /folio
      2. Assert h1 text contains "Website" or "Portfolio"
      3. Assert CTA button visible with link to /folio/start or /folio/sign-up
      4. Screenshot full hero section
    Expected Result: Bold headline, CTA visible, dark theme
    Evidence: .sisyphus/evidence/task-8-hero.png
  ```

  **Commit**: YES (groups with Tasks 9, 10, 11)
  - Message: `feat(landing): redesign Hero and Nav sections`
  - Files: `src/components/landing/Nav.tsx`, `src/components/landing/Hero.tsx`

- [ ] 9. Landing Features + HowItWorks redesign

  **What to do**:
  - Rewrite `src/components/landing/HowItWorks.tsx` — "How It Works" section with 3 steps:
    1. "Fill Your Profile" — social links + bio
    2. "Pick a Template" — choose your style
    3. "Go Live" — deployed in seconds
    - Each step: number badge, heading, short description
    - Visual style: cards or numbered list, clean and scannable
  - Could optionally merge with a features section highlighting key benefits:
    - "No design skills needed"
    - "AI-powered content"
    - "Deploy in minutes"
    - "Custom domain support" (if applicable)

  **Must NOT do**:
  - Do NOT add features that don't exist in the product
  - Do NOT use placeholder images

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 10, 11)
  - **Blocks**: F2
  - **Blocked By**: None

  **References**:
  - `src/components/landing/HowItWorks.tsx` — Current implementation
  - thumbnail.market features: "No Design Skills Required" section with 3 benefit cards

  **Acceptance Criteria**:
  ```
  Scenario: How It Works section renders
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll to HowItWorks section
      2. Assert 3 step items visible
      3. Screenshot section
    Expected Result: Clean 3-step process visible
    Evidence: .sisyphus/evidence/task-9-howitworks.png
  ```

  **Commit**: YES (groups with Tasks 8, 10, 11)
  - Message: `feat(landing): redesign HowItWorks and Features sections`
  - Files: `src/components/landing/HowItWorks.tsx`

- [ ] 10. Landing Template Showcase (auto-scrolling carousel)

  **What to do**:
  - Rewrite `src/components/landing/Templates.tsx` — THE KEY SECTION. Auto-scrolling template showcase inspired by thumbnail.market:
    - 2 rows of template preview cards
    - Row 1 scrolls left-to-right, Row 2 scrolls right-to-left (CSS animation, infinite loop)
    - Each card: Screenshot/preview of a generated site using the template (rendered with mock profile data)
    - Cards have rounded corners, subtle shadow, dark card background
    - Section heading: "Start With Templates" or "Sample Websites"
    - For now, use the 3 new templates rendered at small scale (CSS transform: scale) inside cards as live previews, OR use static screenshots
  - Implementation approach for auto-scroll: CSS `@keyframes` with `translateX()`, duplicate cards for seamless loop, `animation: scroll-left 30s linear infinite`
  - The showcase should show sample WEBSITES (the output), not template thumbnails

  **Must NOT do**:
  - Do NOT use JavaScript for scrolling (CSS animation only for performance)
  - Do NOT import heavy libraries (no Swiper, no Embla)
  - Do NOT use external images — either render templates at small scale or use placeholder cards with template names

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Complex CSS animation for auto-scrolling carousel

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (starts after Templates 5-7 complete)
  - **Blocks**: F2
  - **Blocked By**: Tasks 5, 6, 7 (needs templates to exist for showcase)

  **References**:
  - `src/components/landing/Templates.tsx` — Current template showcase
  - thumbnail.market template rows: 2 rows scrolling in opposite directions, cards with rounded corners, seamless CSS animation loop
  - `src/lib/templates.ts` — Template registry (will have 3 entries after Task 12)
  - `src/test/mocks/profile.ts` — Mock profile data for rendering template previews

  **Acceptance Criteria**:
  ```
  Scenario: Auto-scrolling showcase renders
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll to Templates section
      2. Assert at least 2 rows of cards visible
      3. Wait 3 seconds, take 2 screenshots 1 second apart
      4. Assert cards have moved (pixel comparison or transform check)
    Expected Result: Cards auto-scroll in opposite directions
    Evidence: .sisyphus/evidence/task-10-showcase-1.png, .sisyphus/evidence/task-10-showcase-2.png
  ```

  **Commit**: YES (groups with Tasks 8, 9, 11)
  - Message: `feat(landing): add auto-scrolling template showcase`
  - Files: `src/components/landing/Templates.tsx`

- [ ] 11. Landing Pricing + Testimonials + FinalCTA + Footer redesign

  **What to do**:
  - Rewrite `src/components/landing/Pricing.tsx` — Single tier pricing card (since there's only 1 plan):
    - Clean pricing card with plan name, price, feature list, CTA button
    - "Get Started" CTA → links to /folio/sign-up
    - Feature list: All templates, Custom domain, AI-generated content, etc.
    - Optionally add trust signals ("No credit card required to try", "Cancel anytime")
  - Rewrite `src/components/landing/FinalCTA.tsx` — Bottom call-to-action:
    - Bold heading: "Ready to build your website?"
    - CTA button: "Get Started →"
  - Rewrite `src/components/landing/Footer.tsx` — Simple footer:
    - Copyright, product links, social links
  - Optionally add a testimonials section (can use placeholder quotes for now)

  **Must NOT do**:
  - Do NOT show multiple pricing tiers (single tier only)
  - Do NOT add fake testimonials with real names — use generic placeholders or skip testimonials for now

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 9, 10)
  - **Blocks**: F2
  - **Blocked By**: None

  **References**:
  - `src/components/landing/Pricing.tsx` — Current pricing section
  - `src/components/landing/FinalCTA.tsx` — Current CTA
  - `src/components/landing/Footer.tsx` — Current footer
  - thumbnail.market pricing: 3-tier grid with feature lists, trust signals below

  **Acceptance Criteria**:
  ```
  Scenario: Pricing section shows single plan
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll to Pricing section
      2. Assert exactly 1 pricing card visible (not 2 or 3)
      3. Assert CTA button links to /folio/sign-up
    Expected Result: Single pricing card with CTA
    Evidence: .sisyphus/evidence/task-11-pricing.png
  ```

  **Commit**: YES (groups with Tasks 8, 9, 10)
  - Message: `feat(landing): redesign Pricing, CTA, and Footer`
  - Files: `src/components/landing/Pricing.tsx`, `src/components/landing/FinalCTA.tsx`, `src/components/landing/Footer.tsx`

- [ ] 12. Wire new templates into registry + update landing page composition

  **What to do**:
  - Update `src/lib/templates.ts`:
    - Import the 3 new template components
    - Add 3 entries to the `templates` array, ALL with `isPremium: true`
    - Use placeholder names (user will name later): "Template Alpha", "Template Beta", "Template Gamma" or similar
    - Set appropriate `tag` ('light' or 'dark') for each
  - Update `src/app/page.tsx` if the landing page composition needs changes (e.g., new component order, removing/adding sections)
  - Update `src/components/landing/index.ts` barrel export if any component names changed
  - Verify the full build passes

  **Must NOT do**:
  - Do NOT set any template to `isPremium: false` — ALL must be premium
  - Do NOT change TemplateEntry or TemplateMeta types

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on templates existing)
  - **Parallel Group**: Wave 3 (after Tasks 5, 6, 7 complete)
  - **Blocks**: F1, F2
  - **Blocked By**: Tasks 5, 6, 7

  **References**:
  - `src/lib/templates.ts` — Template registry (currently empty array from Task 2)
  - `src/templates/impact-report/index.tsx` — Task 5 output
  - `src/templates/terminal-hacker/index.tsx` — Task 6 output
  - `src/templates/brutalist-grid/index.tsx` — Task 7 output
  - `src/app/page.tsx` — Landing page composition
  - `src/components/landing/index.ts` — Barrel export

  **Acceptance Criteria**:
  ```
  Scenario: Build passes with all templates registered
    Tool: Bash
    Steps:
      1. Run `cd /Users/namanshiroha/folio/folio && npm run build`
      2. Assert exit 0
    Expected Result: Full build succeeds
    Evidence: .sisyphus/evidence/task-12-build.txt

  Scenario: Template registry has 3 entries
    Tool: Bash
    Steps:
      1. Run `grep -c 'isPremium: true' src/lib/templates.ts`
      2. Assert count === 3
    Expected Result: 3 premium templates registered
    Evidence: .sisyphus/evidence/task-12-registry.txt
  ```

  **Commit**: YES
  - Message: `feat(templates): register 3 new templates in registry, all premium`
  - Files: `src/lib/templates.ts`, `src/app/page.tsx`, `src/components/landing/index.ts`

---

## Final Verification Wave

- [ ] F1. **Build + Typecheck Verification** — `quick`
  Run `npm run build` and `npx tsc --noEmit` from `/Users/namanshiroha/folio/folio`. Both must exit 0. Check for any unused imports, dead references to old templates. Verify no `as any` or `@ts-ignore`.
  Output: `Build [PASS/FAIL] | TypeCheck [PASS/FAIL] | VERDICT`

- [ ] F2. **Playwright Visual QA — All Pages** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Screenshot and verify:
  - `afterapp.fun/folio` — landing page renders, hero visible, template showcase scrolling, pricing visible
  - `afterapp.fun/folio/sign-in` — Clerk form renders
  - `afterapp.fun/folio/build` — profile form with social link fields visible
  - `afterapp.fun/folio/build/template` — all templates show as locked, clicking shows checkout prompt
  - Test mobile viewport (375px width) for responsive design
  Output: `Pages [N/N pass] | Mobile [N/N] | VERDICT`

- [ ] F3. **Commit, Push, Deploy, Verify Live** — `quick` (+ `git-master` skill)
  Git add all changes, commit with descriptive message, push to main. Wait for Vercel auto-deploy. Verify live URL serves new content. Git identity: `git config user.email "190336497+shirollsasaki@users.noreply.github.com"`
  Output: `Commit [hash] | Deploy [URL] | Live [PASS/FAIL] | VERDICT`

- [ ] F4. **Plan Compliance Audit** — `deep`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(types): extend ProfileData with social links, remove old templates` — types/profile.ts, lib/templates.ts, test/mocks/profile.ts
- **Wave 2**: `feat(templates): add 3 new template components` — templates/impact-report, templates/terminal-hacker, templates/brutalist-grid
- **Wave 3**: `feat(landing): redesign landing page with thumbnail.market-style showcase` — components/landing/*.tsx, app/page.tsx
- **Final**: `feat(paywall): lock all templates behind Dodo checkout` — app/build/template/TemplatePickerClient.tsx, app/build/BuildStep1.tsx

---

## Success Criteria

### Verification Commands
```bash
cd /Users/namanshiroha/folio/folio
npm run build        # Expected: exit 0, no errors
npx tsc --noEmit     # Expected: exit 0, no type errors
```

### Final Checklist
- [ ] Landing page matches thumbnail.market aesthetic (bold hero, auto-scroll showcase)
- [ ] 3 new templates render with profile data
- [ ] All templates locked behind paywall
- [ ] Profile form has social link fields
- [ ] Old 5 templates fully removed
- [ ] No `any` types, no `@ts-ignore`
- [ ] Responsive on mobile (375px)
- [ ] Design system colors/fonts used consistently
