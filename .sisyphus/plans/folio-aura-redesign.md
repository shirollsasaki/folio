# Folio Aura Redesign — Light Theme + Organic Landing Page

## TL;DR

> **Quick Summary**: Transform Folio from a dark-themed app to an Aura-inspired light/white/peach aesthetic across ALL pages. Rebuild the landing page with an organic morphing orb hero, transcript-style typography, live template card deck, and a floating bottom dock. Fix Pricing to single tier (no free option).
> 
> **Deliverables**:
> - New global color system (white bg, dark text, peach/rose accents)
> - Rebuilt landing page with 5 Aura elements (orb, transcript type, card deck, dock, minimal white)
> - Live mini-render template showcase cards
> - Single-tier Pricing (no free option)
> - Button component updated for new theme
> - All build flow pages auto-inherit new theme via CSS vars
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 (CSS vars) → Task 3 (Hero orb) → Task 5 (Templates live render) → Task 8 (build verification)

---

## Context

### Original Request
User wants to:
1. Replace the dark theme (#0e0d0c, cream, gold) with an Aura-style light/white/peach aesthetic everywhere
2. Rebuild the landing page with organic orb, transcript typography, card deck, floating dock
3. Fix template showcase to show live mini-renders instead of empty rectangles
4. Remove the free pricing tier — single paid tier only
5. Copy changes coming later — this is design/layout only

### Interview Summary
**Key Discussions**:
- Design scope: Full landing page redesign + global theme change (everything goes light)
- Template cards: Live mini-renders of actual templates (iframe or CSS scale)
- Aura elements: ALL five — orb, transcript type, card deck, floating dock, minimal white
- Navigation: Minimal top bar (logo + sign-in) + floating bottom dock for sections/CTA
- Pricing: Single tier only, no free option
- Copy: Keep current copy, user will change later

**Research Findings**:
- `globals.css` defines :root vars used by 78+ inline style references across all app pages
- `Button.tsx` uses Tailwind utility classes (`bg-gold`, `text-bg`, `text-cream-dim`) — needs Tailwind config or class name updates alongside CSS var changes
- `Pricing.tsx` still has 3 tiers (Free/Pro/Agency) — must be reduced to single tier
- Templates use hardcoded hex colors — unaffected by theme change
- All landing components use inline styles with `var(--...)` — must be rewritten for Aura layout
- Build flow pages reference CSS vars via inline styles — will auto-inherit new values

---

## Work Objectives

### Core Objective
Transform Folio's visual identity from dark/gold to Aura-style light/white/peach across the entire app, with a structurally redesigned landing page featuring organic animations and live template previews.

### Concrete Deliverables
- `src/app/globals.css` — New color system
- `src/components/ui/Button.tsx` — Updated for new theme
- `src/components/landing/Nav.tsx` — Minimal top bar
- `src/components/landing/Hero.tsx` — Orb + transcript typography
- `src/components/landing/HowItWorks.tsx` — Light theme redesign
- `src/components/landing/Templates.tsx` — Live mini-render card deck
- `src/components/landing/Pricing.tsx` — Single tier, no free option
- `src/components/landing/FinalCTA.tsx` — Light theme redesign
- `src/components/landing/Footer.tsx` — Light theme redesign
- `src/components/landing/Dock.tsx` — NEW floating bottom dock
- `src/components/landing/index.ts` — Updated barrel export
- `src/app/page.tsx` — Updated composition with Dock

### Definition of Done
- [ ] `afterapp.fun/folio` loads with white background, peach accents, organic orb
- [ ] Floating dock visible at bottom of landing page
- [ ] Template showcase shows live mini-renders of 3 templates
- [ ] Pricing shows single tier only (no free option)
- [ ] Build flow pages (`/build`, `/build/template`) render correctly with light theme
- [ ] `npm run build` exits 0
- [ ] No `any` types, no `@ts-ignore`

### Must Have
- White/light background with peach/rose accents across all pages
- Morphing organic orb in hero section (CSS animation, no canvas)
- Transcript-style typography in hero (highlighted + faded text)
- Live mini-render template cards (not mock rectangles)
- Floating bottom dock with blur backdrop (section links + CTA)
- Single-tier pricing (no free option)
- Responsive design (mobile + desktop)

### Must NOT Have (Guardrails)
- No `any` types, no `@ts-ignore`
- No external image dependencies or CDN resources
- No canvas elements (too heavy for generated sites / landing performance)
- No JavaScript-driven scroll animations (CSS only for orb/morph)
- No changes to template files (they use hardcoded colors, leave them alone)
- No changes to API routes, auth, middleware, or database
- No changes to the sessionStorage data flow between build steps
- No copy changes (user will handle later) — keep existing text, only change design
- Do NOT rename CSS variable names (keep `--bg`, `--cream`, `--gold` etc.) — only change their VALUES
- Do NOT break Tailwind utility classes — update `tailwind.config` if needed for new color values

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

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
Wave 1 (Foundation — theme + shared components):
├── Task 1: Update global CSS vars + Tailwind config [quick]
├── Task 2: Update Button component for new theme [quick]
└── Task 3: Create preview route for live template renders [quick]

Wave 2 (Landing page — all 7 components + dock, MAX PARALLEL):
├── Task 4: Hero — organic orb + transcript typography [unspecified-high]
├── Task 5: Templates — live mini-render card deck [unspecified-high]
├── Task 6: Pricing — single tier, no free option [unspecified-high]
├── Task 7: HowItWorks + FinalCTA + Footer — light theme [unspecified-high]
└── Task 8: Nav (top bar) + Dock (floating bottom) + page.tsx wiring [unspecified-high]

Wave FINAL (Verification):
├── Task F1: Full build + typecheck [quick]
├── Task F2: Playwright visual QA — landing + build flow [unspecified-high]
└── Task F3: Commit, push, verify live [quick]
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 2, 4, 5, 6, 7, 8 |
| 2 | 1 | 6, 7 |
| 3 | — | 5 |
| 4 | 1 | F1, F2 |
| 5 | 1, 3 | F1, F2 |
| 6 | 1, 2 | F1, F2 |
| 7 | 1, 2 | F1, F2 |
| 8 | 1 | F1, F2 |
| F1 | all impl | F3 |
| F2 | all impl | F3 |
| F3 | F1, F2 | — |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1-T2 → `quick`, T3 → `quick`
- **Wave 2**: 5 tasks — T4-T8 → `unspecified-high`
- **Wave FINAL**: 3 tasks — F1 → `quick`, F2 → `unspecified-high`, F3 → `quick`

---

## TODOs

- [ ] 1. Update global CSS vars + Tailwind config for Aura light theme

  **What to do**:
  - Update `:root` variables in `src/app/globals.css` — change VALUES only, keep same var NAMES:
    ```css
    :root {
      --bg: #FFFFFF;
      --bg2: #FAFAFA;
      --bg3: #F2F2F7;
      --cream: #111111;          /* was #f0ead8 — now primary text (dark on light) */
      --cream-dim: #8E8E93;     /* was #c4b99a — now secondary text */
      --gold: #E8956A;          /* was #c9a84c — now peach/warm accent */
      --gold-light: #F4A97B;    /* was #e8c96a — lighter accent for hover */
      --border: rgba(0, 0, 0, 0.08);          /* was rgba(240,234,216,0.1) */
      --border-gold: rgba(232, 149, 106, 0.3); /* was rgba(201,168,76,0.3) */
    }
    ```
  - Update `html` and `body` selectors: bg → white, color → dark text
  - Update `h1-h6` color to `var(--cream)` (now #111111 — correct)
  - Update `a` color to `var(--gold)` (now peach — correct)
  - Update `::selection` background to peach accent
  - Update scrollbar styles for light theme
  - Check if `tailwind.config.ts` or `tailwind.config.js` exists — if custom colors are defined there (e.g., `gold`, `bg`, `cream`), update those too. If no tailwind config, Tailwind v4 uses CSS vars directly — verify `Button.tsx` classes like `bg-gold`, `text-bg`, `text-cream-dim` resolve correctly.
  - If Tailwind doesn't resolve custom var-based class names, add a `@theme` block in globals.css for Tailwind v4 compatibility:
    ```css
    @theme {
      --color-bg: var(--bg);
      --color-bg2: var(--bg2);
      --color-cream: var(--cream);
      --color-cream-dim: var(--cream-dim);
      --color-gold: var(--gold);
      --color-gold-light: var(--gold-light);
    }
    ```

  **Must NOT do**:
  - Do NOT rename any CSS variable names (keep `--bg`, `--cream`, `--gold`)
  - Do NOT modify any component files (only globals.css and optionally tailwind config)
  - Do NOT change font family variables
  - Do NOT touch template files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 4, 5, 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `src/app/globals.css` (68 lines) — Current dark theme vars at lines 3-13, html/body at 21-33, headings at 35-38, links at 44-51, scrollbar at 58-67
  - `src/app/layout.tsx` (55 lines) — Font loading (Playfair, DM Sans, DM Mono). DO NOT CHANGE.
  - `src/components/ui/Button.tsx` (58 lines) — Uses Tailwind classes `bg-gold`, `text-bg`, `text-cream-dim`, `border-gold`. These class names depend on Tailwind resolving custom colors from CSS vars. Line 14: `bg-gold text-bg`, Line 16: `text-cream-dim`.
  - Aura design reference — palette: `#FFFFFF` bg, `#111111` text, `#8E8E93` secondary, `#FFDAB9` peach accent, `#FFE4E1` rose accent. We adapt to a warm peach (`#E8956A`) for `--gold` to keep it distinct.

  **Acceptance Criteria**:
  ```
  Scenario: CSS vars produce light theme
    Tool: Bash
    Steps:
      1. grep '#FFFFFF\|#111111\|#E8956A' src/app/globals.css
      2. Assert all 3 found
    Expected: New light palette values in :root
    Evidence: .sisyphus/evidence/task-1-vars.txt

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
      2. Assert exit 0
    Expected: No type errors
    Evidence: .sisyphus/evidence/task-1-tsc.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `refactor(theme): switch global CSS vars to Aura light/peach palette`
  - Files: `src/app/globals.css`

- [ ] 2. Update Button component for new theme

  **What to do**:
  - In `src/components/ui/Button.tsx`, verify Tailwind classes resolve correctly with new CSS var values
  - The current classes are `bg-gold text-bg`, `border-gold text-gold`, `text-cream-dim`
  - If Tailwind v4 (used in this project — see `@import "tailwindcss"` in globals.css) does NOT auto-resolve these as utility classes from CSS vars, replace with inline styles or explicit Tailwind arbitrary values:
    - `bg-gold` → `bg-[var(--gold)]`
    - `text-bg` → `text-[var(--bg)]`
    - `text-cream-dim` → `text-[var(--cream-dim)]`
    - `border-gold` → `border-[var(--gold)]`
    - `hover:bg-gold-light` → `hover:bg-[var(--gold-light)]`
    - `hover:bg-gold` → `hover:bg-[var(--gold)]`
    - `hover:text-bg` → `hover:text-[var(--bg)]`
    - `hover:text-cream` → `hover:text-[var(--cream)]`
  - Make sure button looks correct on white background (primary = peach bg with white text, secondary = peach border with peach text)

  **Must NOT do**:
  - Do NOT change the Button API (props, variants, sizes)
  - Do NOT remove any variant

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 6, 7
  - **Blocked By**: Task 1

  **References**:
  - `src/components/ui/Button.tsx` (58 lines) — Lines 13-17: variant classes, Lines 19-23: size classes
  - `src/app/globals.css` — After Task 1, vars will have new light values
  - Tailwind v4 docs — `@import "tailwindcss"` means v4. Check if custom color utilities resolve from CSS vars or need `@theme` directive.

  **Acceptance Criteria**:
  ```
  Scenario: Button compiles with no errors
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
      2. Assert exit 0
    Expected: No type errors
    Evidence: .sisyphus/evidence/task-2-tsc.txt

  Scenario: Button classes use CSS vars correctly
    Tool: Bash
    Steps:
      1. grep 'var(--gold)\|var(--bg)\|var(--cream' src/components/ui/Button.tsx
      2. Assert at least 3 matches
    Expected: Button references theme vars
    Evidence: .sisyphus/evidence/task-2-classes.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `refactor(ui): update Button component for Aura light theme`
  - Files: `src/components/ui/Button.tsx`

- [ ] 3. Create template preview route for live mini-renders

  **What to do**:
  - Create `src/app/preview/[slug]/page.tsx` — a minimal page that renders a template full-screen with mock data
  - This route will be used by the landing page Templates section to show live mini-renders via iframe
  - Implementation:
    ```tsx
    import { getTemplateBySlug } from '@/lib/templates';
    import { createMockProfile } from '@/test/mocks/profile';

    export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
      const entry = getTemplateBySlug(slug);
      if (!entry) return <div>Template not found</div>;
      const { Component } = entry;
      const profile = createMockProfile();
      return <Component profile={profile} />;
    }
    ```
  - This is a minimal page — no nav, no layout chrome, just the raw template
  - Add `export const dynamic = 'force-dynamic'` to avoid static generation issues
  - The page should NOT inherit the main app layout styles (or template should override them with its own full-page styles). Since templates use hardcoded colors and are self-contained, this should work.

  **Must NOT do**:
  - Do NOT add authentication to this route (it's for public preview)
  - Do NOT modify any template files
  - Do NOT add complex logic — this is a thin rendering wrapper

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 5
  - **Blocked By**: None

  **References**:
  - `src/lib/templates.ts` (52 lines) — `getTemplateBySlug(slug)` returns `TemplateEntry | undefined`. Line 45.
  - `src/test/mocks/profile.ts` (28 lines) — `createMockProfile()` returns full ProfileData with social links.
  - `src/templates/impact-report/index.tsx` — Default export React component accepting `TemplateProps`
  - `src/templates/terminal-hacker/index.tsx` — Same pattern
  - `src/templates/brutalist-grid/index.tsx` — Same pattern
  - `src/app/layout.tsx` — Root layout wraps all pages. Templates should still render correctly since they use hardcoded colors.
  - Inherited wisdom: Use `await import('@/lib/db')` pattern for server pages touching Supabase — but this page doesn't touch DB, so standard import is fine.
  - Next.js 16: `params` is a Promise — MUST use `const { slug } = await params;`

  **Acceptance Criteria**:
  ```
  Scenario: Preview route renders Impact Report template
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
      2. Assert exit 0
    Expected: No type errors
    Evidence: .sisyphus/evidence/task-3-tsc.txt

  Scenario: Preview route exists and builds
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npm run build 2>&1 | grep 'preview'
      2. Assert route listed in build output
    Expected: /preview/[slug] appears in route list
    Evidence: .sisyphus/evidence/task-3-build.txt
  ```

  **Commit**: YES
  - Message: `feat(preview): add template preview route for live mini-renders`
  - Files: `src/app/preview/[slug]/page.tsx`

- [ ] 4. Hero — organic orb + transcript typography

  **What to do**:
  - Rewrite `src/components/landing/Hero.tsx` with the Aura design:
  - **Layout**: 2-column grid (left: content column, right: orb visual) on desktop, stacked on mobile
  - **Orb** (right column):
    - Morphing organic blob using CSS `border-radius` animation (`@keyframes morph`)
    - Radial gradient: peach → rose → light (#FFF5F0 → #FFE4E1 → #FFEBCD)
    - Breathing animation: subtle scale pulse (`@keyframes breathe`, 8s cycle)
    - Vein rings: 1-2 rotating ring elements with border + `clip-path: ellipse()`
    - Glow: radial gradient behind orb
    - Wrap animations in `<style>` tag inside component (same pattern as current Templates.tsx)
  - **Content** (left column):
    - Small header meta: "FOLIO · PERSONAL WEBSITE" (uppercase, letter-spaced, secondary text color)
    - Transcript typography: Large text (2.25rem) where the first sentence is `color: var(--cream)` (dark/highlighted) and remaining text fades to `color: var(--cream-dim)` (gray). Apply CSS `mask-image: linear-gradient(to bottom, black 60%, transparent 100%)` for the fade effect.
    - Keep current copy text: "Build Your Personal Website in Minutes. Turn your profile into a stunning personal site. Pick a template, customize, and go live in minutes."
    - CTA button: "Get Started →" → `/folio/sign-up` (use peach accent bg)
  - **Status pill** below orb: "Building portfolios" + animated equalizer bars (3 thin bars animating height, pure CSS)
  - Use `var(--font-playfair)` for heading, `var(--font-dm-sans)` for body
  - Named export: `export function Hero()`
  - All CSS vars — no hardcoded colors

  **Must NOT do**:
  - Do NOT use canvas for animations (CSS only)
  - Do NOT use JavaScript for animation (CSS keyframes only)
  - Do NOT add external images or CDN resources
  - Do NOT change the copy text

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7, 8)
  - **Blocks**: F1, F2
  - **Blocked By**: Task 1

  **References**:
  - `src/components/landing/Hero.tsx` (89 lines) — Current hero. Will be fully rewritten.
  - Aura HTML reference (provided by user) — Key elements:
    - `.orb-container` (500×500 centered), `.orb-base` (400×400, morphing border-radius, radial gradient)
    - `.orb-vein` (rotating ring with clip-path), `.orb-glow` (radial gradient behind)
    - `.status-pill` (text + equalizer bars below orb)
    - `.transcript-container` (2.25rem, fade-text mask, `.highlight-text` for emphasized parts)
    - `.header-meta` (small uppercase label)
    - `.interface-container` (2-column grid with 4rem gap)
  - CSS Keyframes from Aura:
    - `@keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }` (8s)
    - `@keyframes morph { 0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; } 100% { border-radius: 50% 50% 40% 60% / 50% 50% 50% 50%; } }` (12s alternate)
    - `@keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` (20-25s)
    - `@keyframes eq { 0%,100% { height: 6px; } 50% { height: 14px; } }` (1.2s for equalizer bars)
    - `@keyframes fade-in { from { opacity:0; translateY(10px); } to { opacity:1; translateY(0); } }` (1s delay 1s)
  - Orb gradient colors to use with CSS vars: Use `var(--gold)` at ~20% opacity for the peach tones, and literal peach/rose hex is OK for the orb itself since it's a decorative element (not a semantic color).
    Actually: keep the orb using the exact Aura colors (#FFF5F0, #FFE4E1, #FFEBCD) as hardcoded — the orb is a self-contained decorative graphic. But the TEXT and LAYOUT must use CSS vars.
  - `src/components/landing/Templates.tsx` — Reference for how `<style>` tags are used inside components (lines 329-341)
  - Mobile breakpoint: stack columns at `max-width: 1024px`, reduce orb to 300×300

  **Acceptance Criteria**:
  ```
  Scenario: Hero renders with orb and transcript
    Tool: Playwright
    Steps:
      1. Navigate to afterapp.fun/folio (or localhost:3000/folio)
      2. Assert h1 or large text containing "Build Your Personal Website" exists
      3. Assert a div with border-radius animation exists (orb)
      4. Assert "Get Started" link/button visible
      5. Screenshot at 1280px width
      6. Screenshot at 375px width (mobile)
    Expected: 2-column layout with orb on desktop, stacked on mobile
    Evidence: .sisyphus/evidence/task-4-hero-desktop.png, .sisyphus/evidence/task-4-hero-mobile.png

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
    Expected: exit 0
    Evidence: .sisyphus/evidence/task-4-tsc.txt
  ```

  **Commit**: YES (groups with other Wave 2 tasks)
  - Message: `feat(landing): redesign Hero with Aura orb and transcript typography`
  - Files: `src/components/landing/Hero.tsx`

- [ ] 5. Templates — live mini-render card deck

  **What to do**:
  - Rewrite `src/components/landing/Templates.tsx` to show live mini-renders of the 3 templates as scrollable cards
  - **Layout**: Horizontal scrollable card deck (like Aura's `.insight-deck`)
  - **Cards**: Each card contains an `<iframe>` pointing to `/folio/preview/{slug}` at small scale
    - Card dimensions: ~300px wide × 400px tall
    - iframe inside: `width: 1200px`, `height: 800px`, `transform: scale(0.25)`, `transform-origin: top left`, `pointer-events: none`
    - Wrapper div: `width: 300px`, `height: 200px` (overflow hidden, showing scaled iframe)
    - Below iframe: template name label + tag badge
    - Card style: rounded corners (24px), subtle shadow, white bg (var(--bg)), hover translateY(-8px)
  - **Section heading**: "Start With a Template" (keep current text)
  - **Scrolling**: Horizontal overflow scroll with hidden scrollbar (CSS `scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
  - Alternative if iframes cause issues: Use the same CSS transform:scale approach but render the template React component directly inside a container. Import templates from `@/lib/templates`:
    ```tsx
    import { templates } from '@/lib/templates';
    // For each template:
    <div style={{ width: 300, height: 200, overflow: 'hidden', borderRadius: 24 }}>
      <div style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: 1200, height: 800 }}>
        <entry.Component profile={entry.defaultProps.profile} />
      </div>
    </div>
    ```
    NOTE: This requires the component to be client-side (`'use client'`) since templates may use state/effects. If iframes work better for SSR, prefer iframes.
  - Named export: `export function Templates()`
  - CSS vars for card styling, no hardcoded colors (except inside iframes — those are self-contained)

  **Must NOT do**:
  - Do NOT use auto-scrolling CSS animation anymore (replaced by static horizontal scroll deck)
  - Do NOT use external images
  - Do NOT modify template files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7, 8)
  - **Blocks**: F1, F2
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `src/components/landing/Templates.tsx` (417 lines) — Current auto-scrolling version. Will be fully rewritten.
  - `src/lib/templates.ts` (52 lines) — `templates` array with 3 entries. Each has `Component`, `meta` ({ name, slug, tag }), `defaultProps`.
  - `src/app/preview/[slug]/page.tsx` — Created in Task 3. Renders template full-screen at `/folio/preview/{slug}`.
  - Aura `.insight-deck` pattern — horizontal flex container, `overflow-x: auto`, hidden scrollbar, cards with 24px border-radius, hover lift, image + label
  - `src/components/landing/index.ts` — Barrel exports `Templates`. Named export required.
  - If using iframe approach: `<iframe src="/folio/preview/impact-report" style={{ border: 'none', width: 1200, height: 800, transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }} />`
  - If using direct render: must add `'use client'` directive since templates are React components

  **Acceptance Criteria**:
  ```
  Scenario: Template cards show live renders
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll to Templates section
      2. Assert section heading "Start With a Template" exists
      3. Assert 3 cards visible with template content (not empty rectangles)
      4. Assert "Impact Report" label visible
      5. Assert "Terminal Hacker" label visible
      6. Assert "Brutalist Grid" label visible
      7. Screenshot section
    Expected: Cards show actual template content, not placeholders
    Evidence: .sisyphus/evidence/task-5-templates.png

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
    Expected: exit 0
    Evidence: .sisyphus/evidence/task-5-tsc.txt
  ```

  **Commit**: YES (groups with other Wave 2 tasks)
  - Message: `feat(landing): add live template preview card deck`
  - Files: `src/components/landing/Templates.tsx`

- [ ] 6. Pricing — single tier, no free option

  **What to do**:
  - Rewrite `src/components/landing/Pricing.tsx` — Remove the 3-tier grid. Show a SINGLE pricing card:
    - Plan name: "Pro" (or just "Folio")
    - Price: "$12" / "per month" (keep existing Pro pricing)
    - Feature list: All templates, Custom domain, LinkedIn extraction, AI bio cleanup, Priority support
    - CTA: "Get Started" → `/folio/sign-up`
    - Trust signals below: "No credit card required to start" or "Cancel anytime"
  - Remove the `plans` array with Free/Pro/Agency
  - Clean, centered single card with subtle shadow on white background
  - Style: rounded corners (24px like Aura cards), peach accent for CTA, light theme
  - Remove the `import { Button } from '@/components/ui'` if using a plain `<a>` tag instead, OR keep Button if it works with new theme (depends on Task 2)
  - Named export: `export function Pricing()`

  **Must NOT do**:
  - Do NOT show multiple tiers
  - Do NOT show a "Free" option
  - Do NOT change the plan price (keep $12/mo for Pro)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 7, 8)
  - **Blocks**: F1, F2
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `src/components/landing/Pricing.tsx` (77 lines) — Current 3-tier grid. Lines 4-32: `plans` array with Free/Pro/Agency. Lines 34-76: Render. Fully rewrite.
  - `src/components/ui/Button.tsx` — Updated in Task 2 for new theme. Can use if convenient.
  - Aura design language — clean card with 24px radius, subtle shadow (`0 10px 30px rgba(0,0,0,0.05)`), minimal padding
  - Previous user decision: "all templates are under the paywall, nothing is free" + "also there is no free option right now, can remove it"

  **Acceptance Criteria**:
  ```
  Scenario: Single pricing tier shown
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll to Pricing section
      2. Assert exactly 1 pricing card visible
      3. Assert text "$12" visible
      4. Assert no "Free" or "$0" text visible
      5. Assert CTA links to /folio/sign-up
      6. Screenshot
    Expected: Single pricing card, no free tier
    Evidence: .sisyphus/evidence/task-6-pricing.png

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
    Expected: exit 0
    Evidence: .sisyphus/evidence/task-6-tsc.txt
  ```

  **Commit**: YES (groups with other Wave 2 tasks)
  - Message: `feat(landing): redesign Pricing as single tier, remove free option`
  - Files: `src/components/landing/Pricing.tsx`

- [ ] 7. HowItWorks + FinalCTA + Footer — light theme redesign

  **What to do**:
  - **HowItWorks** (`src/components/landing/HowItWorks.tsx`):
    - Keep the 3-step structure but restyle for light theme
    - Cards: white bg (var(--bg)), subtle border or shadow, rounded corners (16-24px)
    - Step numbers in peach accent color
    - Background: var(--bg3) for section (light gray) or var(--bg) (white)
    - Clean, minimal, Aura-inspired card style
  - **FinalCTA** (`src/components/landing/FinalCTA.tsx`):
    - Keep existing copy: "Your personal website is 3 minutes away"
    - Restyle for light theme — accent text in peach, CTA button with peach bg
    - Could add a subtle gradient or orb reference as background decoration
    - Replace `Button` import with plain `<a>` styled button if cleaner, or keep Button
  - **Footer** (`src/components/landing/Footer.tsx`):
    - Minimal: Folio logo left, copyright center, sign-in/sign-up links right
    - Light border-top (var(--border) — now rgba(0,0,0,0.08))
    - Clean light theme styling

  **Must NOT do**:
  - Do NOT change copy text
  - Do NOT add features that don't exist in the product

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 8)
  - **Blocks**: F1, F2
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `src/components/landing/HowItWorks.tsx` (39 lines) — 3-step cards with dark bg. Restyle for light.
  - `src/components/landing/FinalCTA.tsx` (20 lines) — CTA section with Button import.
  - `src/components/landing/Footer.tsx` (15 lines) — Minimal footer.
  - `src/components/ui/Button.tsx` — Available but optional. Use `<a>` or `<Link>` if simpler.
  - Aura card pattern: `border-radius: 24px`, `box-shadow: 0 10px 30px rgba(0,0,0,0.05)`, white bg

  **Acceptance Criteria**:
  ```
  Scenario: Light theme sections render correctly
    Tool: Playwright
    Steps:
      1. Navigate to /folio, scroll through all sections
      2. Assert HowItWorks shows 3 step cards
      3. Assert FinalCTA section visible with "3 minutes away" text
      4. Assert Footer visible with copyright
      5. Assert NO dark backgrounds (#0e0d0c or similar) visible
      6. Screenshot full page
    Expected: All sections styled for light theme
    Evidence: .sisyphus/evidence/task-7-sections.png

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
    Expected: exit 0
    Evidence: .sisyphus/evidence/task-7-tsc.txt
  ```

  **Commit**: YES (groups with other Wave 2 tasks)
  - Message: `feat(landing): restyle HowItWorks, FinalCTA, Footer for light theme`
  - Files: `src/components/landing/HowItWorks.tsx`, `src/components/landing/FinalCTA.tsx`, `src/components/landing/Footer.tsx`

- [ ] 8. Nav (minimal top bar) + Dock (floating bottom) + page.tsx wiring

  **What to do**:
  - **Nav** (`src/components/landing/Nav.tsx`):
    - Minimal top bar: Folio logo (left), "Sign In" text link (right)
    - NO section links in top nav (those go in the dock)
    - NO "Get Started" button in top nav (that goes in the dock)
    - Sticky top, white/transparent bg with blur backdrop, thin bottom border
    - Clean, minimal — the dock handles navigation
  - **Dock** (NEW `src/components/landing/Dock.tsx`):
    - Floating pill at bottom center of viewport (`position: fixed; bottom: 2rem`)
    - White/translucent bg with `backdrop-filter: blur(20px)`
    - Rounded pill shape (`border-radius: 100px`)
    - Subtle shadow + thin border
    - Contains: section anchor links (Templates, Pricing, How It Works) + primary CTA button (Get Started)
    - Links scroll to section IDs (`#templates`, `#pricing`, `#how-it-works`)
    - CTA button is peach/accent colored, links to `/folio/sign-up`
    - Named export: `export function Dock()`
  - **Barrel export** (`src/components/landing/index.ts`):
    - Add `export { Dock } from './Dock';`
  - **page.tsx** (`src/app/page.tsx`):
    - Import `Dock` from `@/components/landing`
    - Add `<Dock />` after `<Footer />`
    - Update `<main>` style: `backgroundColor: 'var(--bg)'` (now white), `color: 'var(--cream)'` (now #111111)
    - Add `id` attributes to sections if not already present (for dock anchor links):
      - HowItWorks: `id="how-it-works"` (already has `id="how-it-works"`)
      - Templates: needs `id="templates"` wrapper
      - Pricing: `id="pricing"` (already has it)

  **Must NOT do**:
  - Do NOT add icons/SVGs to the dock (text links only — keep it clean)
  - Do NOT use JavaScript for scroll behavior (CSS `scroll-behavior: smooth` on html)
  - Do NOT modify build flow pages

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 7)
  - **Blocks**: F1, F2
  - **Blocked By**: Task 1

  **References**:
  - `src/components/landing/Nav.tsx` (99 lines) — Current sticky dark nav. Simplify to logo + sign-in only.
  - `src/components/landing/index.ts` (8 lines) — Add Dock export.
  - `src/app/page.tsx` (16 lines) — Add Dock import and render.
  - Aura `.control-dock` pattern:
    - `position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%)`
    - `background: rgba(255,255,255,0.9); backdrop-filter: blur(20px)`
    - `padding: 1rem 3rem; border-radius: 100px`
    - `box-shadow: 0 10px 40px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05)`
    - Change to `position: fixed` (not absolute) for persistent visibility while scrolling
  - For `scroll-behavior: smooth`, add to globals.css: `html { scroll-behavior: smooth; }` — or this agent can add it inline in the Hero/page component.

  **Acceptance Criteria**:
  ```
  Scenario: Minimal nav + floating dock visible
    Tool: Playwright
    Steps:
      1. Navigate to /folio
      2. Assert top nav has "FOLIO" text and "Sign In" link
      3. Assert top nav does NOT have "Templates" or "Pricing" links
      4. Assert floating dock visible at bottom of viewport
      5. Assert dock contains "Templates", "Pricing", "Get Started" links
      6. Screenshot
    Expected: Minimal top bar + floating bottom dock
    Evidence: .sisyphus/evidence/task-8-nav-dock.png

  Scenario: Dock links scroll to sections
    Tool: Playwright
    Steps:
      1. Click "Templates" link in dock
      2. Assert page scrolls to Templates section
      3. Click "Pricing" link in dock
      4. Assert page scrolls to Pricing section
    Expected: Smooth scroll to anchored sections
    Evidence: .sisyphus/evidence/task-8-scroll.png

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd /Users/namanshiroha/folio/folio && npx tsc --noEmit
    Expected: exit 0
    Evidence: .sisyphus/evidence/task-8-tsc.txt
  ```

  **Commit**: YES (groups with other Wave 2 tasks)
  - Message: `feat(landing): add floating dock navigation and simplify top nav`
  - Files: `src/components/landing/Nav.tsx`, `src/components/landing/Dock.tsx`, `src/components/landing/index.ts`, `src/app/page.tsx`

---

## Final Verification Wave

- [ ] F1. **Build + Typecheck Verification** — `quick`
  Run `npm run build` and `npx tsc --noEmit` from `/Users/namanshiroha/folio/folio`. Both must exit 0. Check for unused imports, dead references. Verify no `as any` or `@ts-ignore`.
  Output: `Build [PASS/FAIL] | TypeCheck [PASS/FAIL] | VERDICT`

- [ ] F2. **Playwright Visual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Screenshot and verify:
  - `afterapp.fun/folio` — white background, orb visible, dock at bottom, template cards with live renders
  - `/folio/build` — form renders with light theme (white bg, dark text)
  - `/folio/build/template` — template picker renders with light theme
  - Test mobile viewport (375px width)
  Output: `Pages [N/N pass] | Mobile [N/N] | VERDICT`

- [ ] F3. **Commit, Push, Verify Live** — `quick` (+ `git-master` skill)
  Git add all changes, commit, push to main. Wait for Vercel auto-deploy. Verify live URL.
  Git identity: `git config user.email "190336497+shirollsasaki@users.noreply.github.com"`
  Output: `Commit [hash] | Deploy [URL] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(theme): switch to light/peach Aura color system` — globals.css, Button.tsx, tailwind config
- **Wave 2**: `feat(landing): rebuild landing page with Aura design` — all landing components
- **Final**: `feat(landing): add live template previews and floating dock` — Templates.tsx, Dock.tsx, page.tsx

---

## Success Criteria

### Verification Commands
```bash
cd /Users/namanshiroha/folio/folio
npm run build        # Expected: exit 0
npx tsc --noEmit     # Expected: exit 0
```

### Final Checklist
- [ ] White/peach theme visible on all pages
- [ ] Organic orb renders in hero with morph animation
- [ ] Transcript typography in hero (highlighted + faded)
- [ ] Live template mini-renders in card deck
- [ ] Floating dock visible at bottom
- [ ] Pricing shows single tier (no free)
- [ ] Build flow pages functional with new theme
- [ ] No `any` types, no `@ts-ignore`
- [ ] Responsive on mobile (375px)
