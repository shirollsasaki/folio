# Landing Page Polish — Visual Fixes, Code Quality, Accessibility

## TL;DR

> **Quick Summary**: Fix 12 issues found during sanity check of the Folio waitlist landing page — clipped badge, broken mobile form layout, inconsistent alignment, misleading "FREE" tag, fragile API status detection, inline style cleanup, and accessibility gaps.
> 
> **Deliverables**:
> - All visual/alignment issues fixed across desktop and mobile
> - API response contract improved with explicit status field
> - Inline styles migrated to CSS classes
> - Accessibility basics added (labels, focus states)
> - OG image metadata for social sharing
> 
> **Estimated Effort**: Short (2-3 hours)
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 (CSS classes) → Task 5 (inline style migration) → Task 9 (final QA)

---

## Context

### Original Request
User asked for a "sanity check on the website — flows, alignment, and quality check" of the Folio waitlist landing page at afterapp.fun/folio.

### Interview Summary
**Key Findings**:
- Visual QA via Playwright screenshots at 1440px desktop and 390px mobile
- Code audit of WarmGreyLanding.tsx, globals.css, API routes
- 12 issues identified: 1 critical, 4 major, 7 minor
- User chose "Plan all fixes"

**Research Findings**:
- CSS design system exists in globals.css with variables, utility classes, responsive breakpoints already defined
- WarmGreyLanding.tsx is 327 lines with 30+ inline style objects that duplicate existing CSS classes
- Pre-existing TS errors in EditorialLanding.tsx and AppShell.tsx (not related to landing page)
- `ignoreBuildErrors: true` in next.config.ts suppresses all TS errors

### Guardrails (from sanity check)
- This is a POLISH pass, not a rebuild — minimal, targeted changes
- Pre-existing TS errors in EditorialLanding.tsx and AppShell.tsx must not be introduced or worsened
- The waitlist form functionality MUST continue working end-to-end after changes

---

## Work Objectives

### Core Objective
Fix all visual, alignment, code quality, and accessibility issues found during the sanity check while preserving existing waitlist functionality.

### Concrete Deliverables
- Fixed pricing card badge visibility
- Mobile-responsive form layout
- Consistent section header alignment
- Corrected tags (no misleading "FREE")
- Working navigation tabs
- Explicit API status field for duplicate detection
- CSS classes replacing inline styles
- Loading spinner on form submit
- Accessible form inputs and buttons
- OG image metadata

### Definition of Done
- [ ] `curl -s -X POST https://afterapp.fun/folio/api/waitlist -H "Content-Type: application/json" -d '{"email":"finaltest@folio.test"}'` returns `{"success":true,"position":...}` or `{"success":true,"status":"duplicate"}`
- [ ] No new TypeScript errors beyond pre-existing ones in EditorialLanding.tsx and AppShell.tsx
- [ ] Desktop screenshot at 1440px shows no visual regressions
- [ ] Mobile screenshot at 390px shows stacked form layout
- [ ] Pricing "COMING SOON" badge fully visible

### Must Have
- Pricing badge not clipped
- Form stacks vertically on mobile
- "FREE" tag removed or changed
- Waitlist form still works end-to-end
- No new TS errors introduced

### Must NOT Have (Guardrails)
- No rebuild of the landing page — targeted fixes only
- No `any` types or `@ts-ignore`
- No touching files outside landing page scope (no EditorialLanding.tsx, no AppShell.tsx)
- No removing `ignoreBuildErrors` unless pre-existing errors are fixed first (out of scope)
- No changing the waitlist Supabase table schema
- No over-abstracting — don't create a component library, just move inline styles to CSS classes

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (vitest configured)
- **Automated tests**: NO (not worth adding unit tests for CSS/layout fixes)
- **Framework**: N/A

### QA Environment
- **During development**: Run `cd /Users/namanshiroha/folio/folio && npm run dev` to start local dev server at `http://localhost:3000/folio`
- **All Playwright and curl QA scenarios**: Target `http://localhost:3000/folio` (local dev server), NOT the production URL
- **After all waves complete**: Push to GitHub (`git push origin main`), wait for Vercel auto-deploy (~60s), then run Task 9's final QA against `https://afterapp.fun/folio` (production)
- **Deploy verification**: `curl -s https://afterapp.fun/folio/api/waitlist/count` returns `{"count":...}` with HTTP 200

### Supabase Test Data Cleanup
All QA scenarios that insert test emails MUST clean up using this exact command:
```bash
curl -s -X DELETE \
  "https://hqyjkzebhtxxfyqruuvq.supabase.co/rest/v1/waitlist?email=eq.TEST_EMAIL_URL_ENCODED" \
  -H "apikey: $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" \
  -H "Authorization: Bearer $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" \
  -H "Prefer: return=minimal"
```
Replace `TEST_EMAIL_URL_ENCODED` with the URL-encoded test email (e.g., `task3test%40folio.test`).

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate to `http://localhost:3000/folio`, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Target `http://localhost:3000/folio/api/...`, assert status + response fields
- **Final QA (Task 9 only)**: Target production `https://afterapp.fun/folio` after deploy

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — independent fixes, MAX PARALLEL):
├── Task 1: Add new CSS classes to globals.css [quick]
├── Task 2: Fix pricing badge clipping [quick]
├── Task 3: Fix API response — add explicit status field [quick]
├── Task 4: Fix nav tabs and remove "FREE" tag [quick]
└── Task 5: Add OG image metadata to layout.tsx [quick]

Wave 2 (After Wave 1 — depends on CSS classes):
├── Task 6: Migrate inline styles to CSS classes + mobile form fix [unspecified-high]
├── Task 7: Add loading spinner + accessibility (aria, focus) [quick]
└── Task 8: Standardize section header alignment [quick]

Wave 3 (After Wave 2 — verification):
└── Task 9: Full visual QA — Playwright desktop + mobile screenshots [unspecified-high]

Critical Path: Task 1 → Task 6 → Task 9
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 6, 7, 8 |
| 2 | — | 9 |
| 3 | — | 9 |
| 4 | — | 9 |
| 5 | — | 9 |
| 6 | 1 | 9 |
| 7 | 1 | 9 |
| 8 | 1 | 9 |
| 9 | 2, 3, 4, 5, 6, 7, 8 | — |

### Agent Dispatch Summary

- **Wave 1**: **5 tasks** — T1-T5 → `quick`
- **Wave 2**: **3 tasks** — T6 → `unspecified-high`, T7 → `quick`, T8 → `quick`
- **Wave 3**: **1 task** — T9 → `unspecified-high` (+ `playwright` skill)

---

## TODOs

- [ ] 1. Add new CSS classes to globals.css

  **What to do**:
  - Add `.section` class for consistent section padding (responsive: 80px 48px desktop, 48px 20px mobile)
  - Add `.section-content` class for max-width container (1000px, centered)
  - Add `.section-header` class for section header row (flex, align baseline, gap)
  - Add `.section-header-centered` variant (justify-content: center)
  - Add `.card-featured` class for the pricing card (2px border)
  - Add `.card-featured .tag-filled` rule to handle badge overflow (overflow: visible on card-body, or clip-path workaround)
  - Add `.form-waitlist` class for the waitlist form (flex, gap, wrap, center)
  - Add `.form-waitlist` mobile breakpoint to stack vertically (flex-direction: column at <=480px)
  - Add `.hero-counter` class for the waitlist counter text
  - Add `.hero-status` class for success/error/duplicate messages
  - Add `--color-error: #cc0000` CSS variable
  - Add `.btn:focus-visible` rule (outline: 2px solid var(--accent), outline-offset: 2px)
  - Add `.btn-loading` class (opacity: 0.7, cursor: wait)
  - Add `.spinner` class for inline loading spinner (CSS-only, small, 16px)

  **Must NOT do**:
  - Do NOT modify existing CSS classes — only add new ones
  - Do NOT change CSS variable names that are already in use
  - Do NOT add Tailwind-specific utilities — use the existing vanilla CSS design system

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 6, 7, 8
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/app/globals.css` — Full file. All new classes must follow the existing naming convention (`.kebab-case`, use CSS variables from `:root`, responsive via `@media (max-width: ...)`)
  - Lines 98-167: `.app-frame`, `.app-body` patterns for layout classes
  - Lines 312-350: `.btn`, `.btn-primary`, `.btn-large` for button pattern
  - Lines 386-399: `.tag`, `.tag-filled` for tag pattern
  - Lines 401-416: `.card`, `.card-body` for card pattern
  - Lines 643-697: Existing media queries at 1024px and 768px — add 480px for form stacking

  **Acceptance Criteria**:

  ```
  Scenario: New CSS classes exist and don't break existing styles
    Tool: Bash
    Preconditions: globals.css updated
    Steps:
      1. Run `grep -c '.section {' /Users/namanshiroha/folio/folio/src/app/globals.css` — expect >= 1
      2. Run `grep -c '.form-waitlist' /Users/namanshiroha/folio/folio/src/app/globals.css` — expect >= 1
      3. Run `grep -c 'focus-visible' /Users/namanshiroha/folio/folio/src/app/globals.css` — expect >= 1
      4. Run `grep -c '\-\-color-error' /Users/namanshiroha/folio/folio/src/app/globals.css` — expect >= 1
      5. Run `cd /Users/namanshiroha/folio/folio && npx tsc --noEmit 2>&1 | grep -c 'error TS'` — expect same count as before (7 pre-existing errors)
    Expected Result: All new classes present, no new TS errors
    Evidence: .sisyphus/evidence/task-1-css-classes.txt
  ```

  **Commit**: YES (groups with all Wave 1)
  - Message: `style(landing): add CSS classes for section, form, accessibility`
  - Files: `src/app/globals.css`

---

- [ ] 2. Fix pricing badge clipping

  **What to do**:
  - In WarmGreyLanding.tsx pricing section, the `.card` class has `overflow: hidden` (from globals.css line 405)
  - The "Coming Soon" badge is `position: absolute; top: -12px` inside `.card-body` — gets clipped
  - Fix: Add `overflow: visible` to the pricing card's wrapper div (inline override or via `.card-featured` class from Task 1 if available)
  - Alternative: Move the badge OUTSIDE the card div, positioned above it with negative margin

  **Must NOT do**:
  - Do NOT change the global `.card` overflow rule — other cards may need it
  - Do NOT change badge styling — just fix the clipping

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Task 9
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:271-275` — Pricing card with badge. The `<div className="card">` wraps the `<span className="tag tag-filled" style={{ position: 'absolute', top: '-12px' }}>` badge
  - `/Users/namanshiroha/folio/folio/src/app/globals.css:401-406` — `.card` class with `overflow: hidden` on line 405

  **Acceptance Criteria**:

  ```
  Scenario: Coming Soon badge fully visible on pricing card
    Tool: Playwright (playwright skill)
    Preconditions: Local dev server running at http://localhost:3000/folio
    Steps:
      1. Navigate to http://localhost:3000/folio
      2. Scroll to #pricing section
      3. Find element matching `.tag-filled` containing "Coming Soon"
      4. Get bounding box — verify top edge is ABOVE the card border (not clipped)
      5. Screenshot the pricing card
    Expected Result: "COMING SOON" text fully visible, not cut off at top of card
    Failure Indicators: Badge text partially hidden, top portion of letters clipped
    Evidence: .sisyphus/evidence/task-2-badge-visible.png

  Scenario: Badge still clips on global cards (no regression)
    Tool: Bash
    Steps:
      1. Run `grep 'overflow: hidden' /Users/namanshiroha/folio/folio/src/app/globals.css` — should still exist in .card
    Expected Result: Global .card overflow rule unchanged
    Evidence: .sisyphus/evidence/task-2-no-regression.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(landing): make pricing badge visible above card border`
  - Files: `src/components/landing/WarmGreyLanding.tsx`

---

- [ ] 3. Fix API response — add explicit status field for duplicate detection

  **What to do**:
  - In `/api/waitlist/route.ts`, change the duplicate response from `{ success: true, message: 'Already on the list!' }` to `{ success: true, status: 'duplicate', message: 'Already on the list!' }`
  - In `/api/waitlist/route.ts`, change the success response to include `status: 'new'`: `{ success: true, status: 'new', message: "You're on the list!", position }`
  - In `WarmGreyLanding.tsx`, change duplicate detection from `data.message?.includes('Already')` to `data.status === 'duplicate'`
  - Update the type assertion to include `status?: 'new' | 'duplicate'`

  **Must NOT do**:
  - Do NOT change the Supabase query or table schema
  - Do NOT change error handling logic
  - Do NOT remove the `message` field — keep it for display

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Task 9
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/app/api/waitlist/route.ts:22-28` — Current error handling block with `error.code === '23505'` for duplicate detection
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:36-49` — Current response handling with `data.message?.includes('Already')` on line 38

  **Acceptance Criteria**:

  ```
  Scenario: New email returns status 'new' with position
    Tool: Bash (curl)
    Preconditions: Local dev server running at http://localhost:3000/folio
    Steps:
      1. curl -s -X POST http://localhost:3000/folio/api/waitlist -H "Content-Type: application/json" -d '{"email":"task3test@folio.test"}'
      2. Parse JSON response
      3. Assert: response.success === true
      4. Assert: response.status === 'new'
      5. Assert: response.position is number > 1200
      6. Cleanup: curl -s -X DELETE "https://hqyjkzebhtxxfyqruuvq.supabase.co/rest/v1/waitlist?email=eq.task3test%40folio.test" -H "apikey: $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Authorization: Bearer $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Prefer: return=minimal"
    Expected Result: {"success":true,"status":"new","message":"You're on the list!","position":1201}
    Evidence: .sisyphus/evidence/task-3-new-email.txt

  Scenario: Duplicate email returns status 'duplicate'
    Tool: Bash (curl)
    Preconditions: Local dev server running
    Steps:
      1. curl -s -X POST http://localhost:3000/folio/api/waitlist -H "Content-Type: application/json" -d '{"email":"task3dup@folio.test"}'
      2. curl -s -X POST http://localhost:3000/folio/api/waitlist -H "Content-Type: application/json" -d '{"email":"task3dup@folio.test"}'
      3. Assert second response: response.status === 'duplicate'
      4. Cleanup: curl -s -X DELETE "https://hqyjkzebhtxxfyqruuvq.supabase.co/rest/v1/waitlist?email=eq.task3dup%40folio.test" -H "apikey: $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Authorization: Bearer $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Prefer: return=minimal"
    Expected Result: {"success":true,"status":"duplicate","message":"Already on the list!"}
    Evidence: .sisyphus/evidence/task-3-duplicate.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(waitlist): add explicit status field to API response for reliable duplicate detection`
  - Files: `src/app/api/waitlist/route.ts`, `src/components/landing/WarmGreyLanding.tsx`

---

- [ ] 4. Fix nav tabs and remove "FREE" tag

  **What to do**:
  - Change `<Link href="/" className="app-tab active">Home</Link>` to use `<a href="/folio" ...>` or `<Link href="/folio" ...>` so it stays on the folio page
  - Change `<Link href="#how">` to `<a href="#how" onClick={scrollTo('how')}>` — use native anchor scrolling instead of Next.js Link for hash navigation (Link with hash + basePath is unreliable)
  - Same for `#features` and `#pricing` — use `<a>` with scroll behavior
  - Remove the "FREE" tag from the hero tags array. Replace with something accurate like "FAST" or "1 MINUTE SETUP" or just remove it entirely
  - Keep "AUTO-SYNC" and "NO CODE" tags — those are accurate

  **Must NOT do**:
  - Do NOT change the tab visual styling
  - Do NOT add new navigation items
  - Do NOT use JavaScript-only navigation — keep `href` for accessibility

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Task 9
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:57-62` — Current tab navigation with `<Link>` components
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:75-79` — Hero tags including "FREE"
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:8-10` — `scrollToWaitlist` function — follow this pattern for section scrolling

  **Acceptance Criteria**:

  ```
  Scenario: Home tab navigates to /folio
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio
      2. Find the "Home" tab link
      3. Assert href contains "/folio" (not just "/")
    Expected Result: Home tab href is "/folio"
    Evidence: .sisyphus/evidence/task-4-home-tab.txt

  Scenario: "FREE" tag removed from hero
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio
      2. Find all `.tag` elements in hero section
      3. Assert none contain text "FREE"
      4. Assert "AUTO-SYNC" and "NO CODE" still present
    Expected Result: Only accurate tags shown
    Evidence: .sisyphus/evidence/task-4-tags.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(landing): fix nav tab links, remove misleading FREE tag`
  - Files: `src/components/landing/WarmGreyLanding.tsx`

---

- [ ] 5. Add OG image metadata to layout.tsx

  **What to do**:
  - In `src/app/layout.tsx`, add `openGraph.images` to the existing metadata export
  - Add `metadataBase: new URL('https://afterapp.fun/folio')` if not present
  - Add canonical URL
  - For the OG image: use a simple text-based OG image via Vercel OG or a static placeholder. Simplest approach: create a static `/public/og-image.png` (1200x630) with "Folio — Your LinkedIn, deployed." text on the warm grey background. Can use a simple HTML-to-image approach or just reference a placeholder.
  - If creating a static image is complex, just add the metadata pointing to a future image path and note it as TODO

  **Must NOT do**:
  - Do NOT change existing metadata fields
  - Do NOT add dynamic OG image generation (too complex for a polish pass)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Task 9
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/app/layout.tsx:24-47` — Current metadata export with title, description, openGraph, twitter fields

  **Acceptance Criteria**:

  ```
  Scenario: OG metadata present in page source
    Tool: Bash (curl)
    Steps:
      1. curl -s http://localhost:3000/folio | grep 'og:image'
    Expected Result: meta tag with og:image property exists
    Evidence: .sisyphus/evidence/task-5-og-image.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `seo(landing): add OG image metadata and canonical URL`
  - Files: `src/app/layout.tsx`, `public/og-image.png` (if created)

---

- [ ] 6. Migrate inline styles to CSS classes + fix mobile form layout

  **What to do**:
  - This is the BIGGEST task. Replace inline `style={{}}` objects in WarmGreyLanding.tsx with CSS classes from globals.css (both existing and new from Task 1)
  - **Hero section** (lines 65-73): Replace inline styles with `.section` + custom hero class
  - **Form** (line 91): Replace inline styles with `.form-waitlist` class. On mobile (<=480px), form should stack vertically with full-width input and button
  - **Status messages** (lines 112-131): Replace inline styles with `.hero-status` and `.hero-counter` classes
  - **Scroll indicator** (lines 134-152): Replace inline styles with a `.scroll-indicator` class
  - **Section wrappers** (lines 155-158, 229-233, 261-263, 297-301): Replace with `.section` class
  - **Section content** (lines 159, 234, 265): Replace with `.section-content` class
  - **Section headers** (lines 160, 235, 266): Replace with `.section-header` class
  - **Step number circles** (lines 168-178, 188-198, 208-218): Replace with a `.step-circle` class
  - **Feature icons** (line 251): Replace with a `.feature-icon` class
  - **Pricing card body** (line 272): Replace with `.card-featured` class
  - **Footer** (lines 313-319): Replace with a `.footer` class
  - **Final CTA section** (lines 297-301): Replace with `.section` + text-center

  **Must NOT do**:
  - Do NOT change the visual appearance — output must look identical to current
  - Do NOT refactor component structure — keep single component
  - Do NOT create new components — just move styles to CSS

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS migration requires understanding of visual equivalence

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8)
  - **Blocks**: Task 9
  - **Blocked By**: Task 1 (needs new CSS classes)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx` — Full file, lines 55-327. Every `style={{}}` is a migration target
  - `/Users/namanshiroha/folio/folio/src/app/globals.css` — Full file. Existing utility classes to use: `.text-center`, `.text-secondary`, `.text-sm`, `.mb-s`, `.mb-m`, `.mb-l`, `.flex`, `.items-center`, `.justify-center`, etc.
  - `/Users/namanshiroha/folio/folio/src/app/globals.css:643-697` — Existing media queries. New form stacking should go at 480px breakpoint

  **Acceptance Criteria**:

  ```
  Scenario: Desktop visual parity — no visual regressions
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio at 1440px width
      2. Screenshot full page
      3. Visual inspection: hero centered, sections spaced, cards aligned, footer at bottom
    Expected Result: Page layout matches pre-migration design — no broken alignment, missing content, or style regressions
    Evidence: .sisyphus/evidence/task-6-desktop-parity.png

  Scenario: Mobile form stacks vertically
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio at 390px width
      2. Find form#waitlist-form
      3. Assert form has flex-direction: column (computed style)
      4. Assert input width is close to container width (not 154px)
      5. Assert button width is close to container width
      6. Screenshot hero section
    Expected Result: Input and button stack vertically, both full-width on mobile
    Failure Indicators: Input truncated, side-by-side layout on mobile
    Evidence: .sisyphus/evidence/task-6-mobile-form-stacked.png

  Scenario: Inline styles removed
    Tool: Bash
    Steps:
      1. grep -c 'style={{' /Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx
    Expected Result: Count is <= 3 (some dynamic styles may remain, like disabled state)
    Evidence: .sisyphus/evidence/task-6-inline-count.txt
  ```

  **Commit**: YES
  - Message: `refactor(landing): migrate inline styles to CSS classes, fix mobile form layout`
  - Files: `src/components/landing/WarmGreyLanding.tsx`, `src/app/globals.css`

---

- [ ] 7. Add loading spinner + accessibility improvements

  **What to do**:
  - Add a CSS-only spinner next to "Joining..." text in submit button loading state
  - Add `aria-label="Email address"` to the email input
  - Add `aria-label="Join waitlist"` to the submit button
  - Add `role="status"` and `aria-live="polite"` to the status message area (success/error/duplicate)
  - The `.btn:focus-visible` rule should already exist from Task 1 — verify it works
  - Add `<label htmlFor="waitlist-email" className="sr-only">Email address</label>` and `id="waitlist-email"` to input (screen-reader-only label)
  - Add `.sr-only` class to globals.css if not present (position: absolute, width: 1px, height: 1px, overflow: hidden)

  **Must NOT do**:
  - Do NOT add visible labels that change the visual design
  - Do NOT add JavaScript-based animations for spinner — CSS only
  - Do NOT add ARIA to decorative elements like the scroll indicator

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8)
  - **Blocks**: Task 9
  - **Blocked By**: Task 1 (needs spinner CSS class)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:88-110` — Form with input and submit button
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:108` — Button loading state text
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:111-131` — Status messages (success, duplicate, error)

  **Acceptance Criteria**:

  ```
  Scenario: Email input has accessible label
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio
      2. Find input[type="email"]
      3. Assert: has aria-label OR associated label element
    Expected Result: Input is accessible to screen readers
    Evidence: .sisyphus/evidence/task-7-accessibility.txt

  Scenario: Focus visible on button
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio
      2. Tab to the submit button
      3. Assert: button has visible focus indicator (outline)
    Expected Result: Button shows focus ring when tabbed to
    Evidence: .sisyphus/evidence/task-7-focus-visible.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `a11y(landing): add loading spinner, aria labels, focus-visible styles`
  - Files: `src/components/landing/WarmGreyLanding.tsx`, `src/app/globals.css`

---

- [ ] 8. Standardize section header alignment

  **What to do**:
  - Currently "How It Works" and "Features" headers are left-aligned (flex, no justify-content)
  - "Pricing" header is center-aligned (justify-content: center)
  - Decision: Make ALL section headers **left-aligned** to match the dominant pattern (2 out of 3 are already left-aligned)
  - Change the Pricing section header from `justifyContent: 'center'` to match the others
  - If inline styles have been migrated by Task 6, change the `.section-header-centered` class usage to `.section-header`

  **Must NOT do**:
  - Do NOT change the pricing card content alignment (stays centered inside card)
  - Do NOT change the final CTA section (that's a different design pattern — full-width centered)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: Task 9
  - **Blocked By**: Task 1 (uses section-header class)

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:160` — "How It Works" header (left-aligned)
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:235` — "Features" header (left-aligned)
  - `/Users/namanshiroha/folio/folio/src/components/landing/WarmGreyLanding.tsx:266` — "Pricing" header (center-aligned — the inconsistent one)

  **Acceptance Criteria**:

  ```
  Scenario: All section headers have same alignment
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/folio at 1440px
      2. Get computed style of all three section header containers
      3. Assert: all have same justify-content value (either all 'flex-start' or none have 'center')
      4. Screenshot each section header
    Expected Result: Consistent left-alignment across all section headers
    Evidence: .sisyphus/evidence/task-8-headers-aligned.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(landing): standardize section header alignment to left-aligned`
  - Files: `src/components/landing/WarmGreyLanding.tsx`

---

- [ ] 9. Deploy + full visual QA — Playwright desktop + mobile verification

  **What to do**:
  - First: commit all remaining changes, `git push origin main`, wait ~60s for Vercel auto-deploy
  - Verify deploy: `curl -s https://afterapp.fun/folio/api/waitlist/count` returns HTTP 200
  - Then run comprehensive Playwright visual QA against PRODUCTION (`https://afterapp.fun/folio`)
  - Take full-page screenshots at 1440px desktop and 390px mobile
  - Verify every fix:
    1. Pricing badge fully visible (not clipped)
    2. Mobile form stacks vertically with full-width inputs
    3. Section headers consistently left-aligned
    4. No "FREE" tag in hero
    5. Home tab links to /folio
    6. Waitlist form submits successfully (test with unique email)
    7. Success state shows queue position
    8. Duplicate detection works
    9. Loading state shows spinner
    10. No visual regressions anywhere
  - Submit a test email, screenshot success state, then clean up via Supabase REST API
  - Save ALL screenshots to `.sisyphus/evidence/final-qa/`

  **Must NOT do**:
  - Do NOT modify any files — this is verification only
  - Do NOT leave test data in Supabase — clean up all test emails

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]
    - `playwright`: Browser automation for visual verification

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (solo)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 2, 3, 4, 5, 6, 7, 8

  **References**:

  **Pattern References**:
  - `/Users/namanshiroha/folio/.sisyphus/evidence/01_desktop_full_page.png` — Reference desktop screenshot (before fixes, captured by QA agent)
  - `/Users/namanshiroha/folio/.sisyphus/evidence/06_mobile_full_page.png` — Reference mobile screenshot (before fixes, captured by QA agent)
  - These files exist in the `.sisyphus/evidence/` directory at the repo root (`/Users/namanshiroha/folio/`), NOT inside the folio app directory

  **Acceptance Criteria**:

  ```
  Scenario: Desktop full-page visual check
    Tool: Playwright
    Steps:
      1. Navigate to https://afterapp.fun/folio at 1440px
      2. Full-page screenshot
      3. Scroll to each section, verify alignment
      4. Verify pricing badge visible
      5. Verify no "FREE" tag
      6. Verify section headers all left-aligned
    Expected Result: All fixes visible, no regressions
    Evidence: .sisyphus/evidence/final-qa/desktop-full.png

  Scenario: Mobile full-page visual check
    Tool: Playwright
    Steps:
      1. Navigate to https://afterapp.fun/folio at 390px
      2. Full-page screenshot
      3. Verify form stacks vertically
      4. Verify input is full-width
      5. Verify pricing badge visible
    Expected Result: Mobile layout correct, form stacked
    Evidence: .sisyphus/evidence/final-qa/mobile-full.png

  Scenario: Waitlist form end-to-end
    Tool: Playwright + Bash
    Steps:
      1. Navigate to https://afterapp.fun/folio
      2. Enter "finalqa@folio.test" in email input
      3. Click "Join Waitlist →"
      4. Wait for success state
      5. Assert: success message contains queue position number
      6. Screenshot success state
      7. Submit same email again
      8. Assert: duplicate message shown
      9. Cleanup: curl -s -X DELETE "https://hqyjkzebhtxxfyqruuvq.supabase.co/rest/v1/waitlist?email=eq.finalqa%40folio.test" -H "apikey: $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Authorization: Bearer $(grep SUPABASE_SERVICE_ROLE_KEY /Users/namanshiroha/folio/folio/.env.local | cut -d= -f2)" -H "Prefer: return=minimal"
    Expected Result: New → success with position. Duplicate → "already on list". Test email removed from DB.
    Evidence: .sisyphus/evidence/final-qa/form-success.png, .sisyphus/evidence/final-qa/form-duplicate.png
  ```

  **Commit**: NO (verification only)

---

## Final Verification Wave

> Already covered by Task 9 which serves as the comprehensive QA pass.
> Additional oracle/scope-fidelity checks are unnecessary for a polish plan of this size.

---

## Commit Strategy

- **Wave 1**: Single commit grouping Tasks 1-5: `fix(landing): visual fixes, API status field, OG metadata, nav tabs`
- **Wave 2**: Single commit grouping Tasks 6-8: `refactor(landing): migrate inline styles, add a11y, standardize headers`
- **Wave 3**: No commit (verification only)
- **Final push**: `git push origin main` after all waves complete

---

## Success Criteria

### Verification Commands
```bash
# API returns status field
curl -s https://afterapp.fun/folio/api/waitlist/count | jq .count  # Expected: number >= 1200

# No new TS errors (same 7 pre-existing)
cd /Users/namanshiroha/folio/folio && npx tsc --noEmit 2>&1 | grep -c 'error TS'  # Expected: 7

# Inline styles reduced
grep -c 'style={{' src/components/landing/WarmGreyLanding.tsx  # Expected: <= 3
```

### Final Checklist
- [ ] Pricing "COMING SOON" badge fully visible
- [ ] Mobile form stacks vertically at 390px
- [ ] Section headers consistently aligned
- [ ] No "FREE" tag in hero
- [ ] Home tab links to /folio
- [ ] API returns `status: 'new' | 'duplicate'`
- [ ] Loading spinner visible on form submit
- [ ] Email input has aria-label
- [ ] OG image metadata present
- [ ] Waitlist form works end-to-end
- [ ] No visual regressions
