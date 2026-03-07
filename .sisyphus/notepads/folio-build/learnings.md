
## Task 5: Clerk Authentication Setup

### Dynamic imports for API routes with module-level side effects
- `supabase.ts` initializes the Supabase client at module level using env vars
- When `NEXT_PUBLIC_SUPABASE_URL` is empty, `createClient('')` throws "supabaseUrl is required"
- Next.js 16 (Turbopack) "Collecting page data" step imports API route modules, triggering module-level code
- Fix: Use dynamic imports (`await import('@/lib/db')`) inside the handler function body so Supabase client is only initialized at request time, not at build time
- Also added `export const dynamic = 'force-dynamic'` as defense-in-depth

### Next.js 16 middleware deprecation warning
- `src/middleware.ts` convention is deprecated in Next.js 16 — should use `proxy` instead
- However, Clerk's `clerkMiddleware` is designed for the standard `middleware` convention
- The deprecation is a warning only — build still passes, functionality works

### Clerk ClerkProvider placement
- `ClerkProvider` wraps the `<html>` element (outside it), not `<body>` children
- This is required for Clerk to work with RSC (React Server Components) properly

### Auth route structure
- Clerk catch-all routes: `[[...sign-in]]` and `[[...sign-up]]` — double square brackets for optional catch-all
- `(auth)` route group keeps auth pages logically grouped without affecting URL structure

## Task 9: LinkedIn Extractor (2026-03-07)

- `@/types` barrel exports all types from `src/types/index.ts` — use `import type { ProfileData } from '@/types'`
- `ExtractRequestSchema` already defined in `src/types/api.ts` with `.url().includes('linkedin.com')` validation
- Vitest tests use `global.fetch = vi.fn()` pattern for mocking fetch
- Pre-existing `ai.test.ts` failures are unrelated to this task (bad `vi.fn()` mock for constructor)
- `response.json()` needs explicit type assertion in strict TS: `await response.json() as ProxycurlProfile`
- `route.ts` uses dynamic `await import('@/lib/linkedin')` to defer module-level env var reads to runtime

## Task 12 – Dodo Payments Webhook Handler

- `@dodopayments/nextjs` exports `Webhooks` as a **route handler factory function**, NOT a class. Cannot use `new Webhooks(key)`.
- For manual signature verification, use `verifyWebhookPayload` from `@dodopayments/core/webhook`.
  - Signature: `verifyWebhookPayload({ webhookKey, headers, body }) => Promise<WebhookPayload>`
  - Returns a discriminated union `WebhookPayload` that can be cast to a custom interface.
- Dodo payload structure for subscription events: `data.customer.customer_id` (nested), `data.subscription_id`, `data.product_id`.
- For `payment.failed`, `data.subscription_id` is nullable — use `?? ''` fallback for `updateUserPlan`.
- `@dodopayments/core` is a transitive dep (not in package.json) but accessible in node_modules; import via `@dodopayments/core/webhook`.

## Task 18 — Build Wizard Step 3 (Preview + Deploy)

- `renderToStaticMarkup` from `react-dom/server` works in browser context (Next.js bundles it for client)
- Injecting into iframe via `contentDocument.open()/write()/close()` is more compatible than `srcdoc`
- Native `<button>` elements require explicit `type="button"` to satisfy lint rules (avoid accidental form submit)
- The `npm run build` fails on data collection for `/start` and `/build/template` due to missing `SUPABASE_URL` env var — this is pre-existing and unrelated to wizard pages
- `npx tsc --noEmit` passed clean for all new files

## Task 17 — Build Wizard Step 2 (Template Picker)

- **Dynamic import pattern for Supabase**: Server pages that call `getUser` MUST use `await import('@/lib/db')` (dynamic import) + `export const dynamic = 'force-dynamic'` to avoid Supabase throwing "supabaseUrl is required" during Next.js build-time static page collection. The `/dashboard` page established this pattern — follow it for all auth-protected pages that touch the DB.
- **`page.tsx` was pre-existing**: The server component for `/build/template` was committed in a prior task (feat(dashboard)). `TemplatePickerClient.tsx` was the only new file needed.
- **Button type prop required**: The linting rules enforce `type="button"` on all `<button>` elements that aren't submit buttons. Always add explicit `type` prop.
- **No inline comments in JSX**: Unnecessary JSX block comments like `{/* Progress indicator */}` are flagged and must be removed.

## Theme Migration: Dark → Light/Aura (2026-03-08)

### Changes Made
- Updated `src/app/globals.css` `:root` CSS variables from dark theme to light/Aura-inspired palette
- All variable names preserved (no renames)
- New color scheme:
  - `--bg: #FFFFFF` (white background)
  - `--bg2: #FAFAFA` (off-white)
  - `--bg3: #F2F2F7` (light gray)
  - `--cream: #111111` (dark text)
  - `--cream-dim: #8E8E93` (medium gray)
  - `--gold: #E8956A` (peach accent)
  - `--gold-light: #F4A97B` (light peach)
  - `--border: rgba(0, 0, 0, 0.08)` (subtle dark border)
  - `--border-gold: rgba(232, 149, 106, 0.3)` (peach border)

### Additional Updates
- Added `scroll-behavior: smooth;` to `html` selector
- Updated scrollbar track from `var(--bg2)` to `var(--bg3)` for better contrast on light background
- Font variables unchanged (--font-playfair, --font-dm-sans, --font-dm-mono)

### Tailwind Integration
- `tailwind.config.ts` already references CSS variables via `var(--bg)`, `var(--gold)`, etc.
- Button.tsx uses Tailwind classes: `bg-gold`, `text-bg`, `text-cream-dim`, `border-gold`, `hover:bg-gold-light`
- No `@theme` block needed — Tailwind v4 uses CSS vars directly from config

### Verification
- ✅ `npx tsc --noEmit` exits 0 (no TypeScript errors)
- ✅ Color values confirmed: `#FFFFFF`, `#111111`, `#E8956A` present in globals.css
- ✅ All 69 lines of CSS intact, no structural changes

## Preview Page Implementation (2026-03-08)

### Pattern: Dynamic Route with Mock Data
- Created `src/app/preview/[slug]/page.tsx` for iframe-embeddable template previews
- Uses `params: Promise<{ slug: string }>` pattern (Next.js 16+) — must await params
- `export const dynamic = 'force-dynamic'` prevents static generation issues
- No auth required — intentionally public for iframe embeds
- Renders raw template component with mock profile data

### Key Decisions
- No layout wrapper — templates are self-contained with own styles
- Simple "not found" div for missing templates — sufficient error handling
- `createMockProfile()` called fresh per request (no overrides needed)
- `getTemplateBySlug()` returns `TemplateEntry | undefined` — safe pattern

### Verification
- `npx tsc --noEmit` ✓ (exit 0)
- `npm run build` ✓ (shows `/preview/[slug]` in route list)
- File created at correct path with correct structure

## Button.tsx CSS Variable Update (2026-03-08)

**Task**: Update Button.tsx to use Tailwind arbitrary values with CSS variables after global theme change to white/peach.

**Changes Made**:
- Lines 14-16: Replaced custom Tailwind color class names with arbitrary value syntax
  - `bg-gold` → `bg-[var(--gold)]`
  - `text-bg` → `text-[var(--bg)]`
  - `hover:bg-gold-light` → `hover:bg-[var(--gold-light)]`
  - `border-gold` → `border-[var(--gold)]`
  - `text-gold` → `text-[var(--gold)]`
  - `text-cream-dim` → `text-[var(--cream-dim)]`
  - `hover:text-cream` → `hover:text-[var(--cream)]`

**Reason**: Tailwind v4 (via `@import "tailwindcss"`) does NOT automatically create utility classes from custom CSS properties unless they follow the `--color-*` convention or a `@theme` block is present. Using arbitrary value syntax `[var(--...)]` ensures Tailwind applies the CSS variable values correctly.

**Verification**:
- ✅ `npx tsc --noEmit` exits 0 (no type errors)
- ✅ Button API unchanged (props, variants, sizes, loading spinner, disabled state all preserved)
- ✅ All color references now use CSS variables from globals.css
- ✅ Theme colors: `--bg: #FFFFFF`, `--gold: #E8956A`, `--gold-light: #F4A97B`, `--cream: #111111`, `--cream-dim: #8E8E93`

**No visual regression expected**: The arbitrary value syntax resolves to the same CSS variable values at runtime.

## Nav Simplification + Dock Navigation (2026-03-08)

### Changes Made
- `Nav.tsx` stripped to logo + Sign In only — removed `.nav-links` div with Templates/Pricing/Get Started
- Nav background changed to `rgba(255,255,255,0.9)` with `backdropFilter: blur(20px)` for glassmorphism effect
- Created `Dock.tsx` — fixed bottom pill with `zIndex: 200`, `bottom: 2rem`, centered via `left: 50% / translateX(-50%)`
- `WebkitBackdropFilter` explicitly set alongside `backdropFilter` for Safari support
- `index.ts` — appended `export { Dock } from './Dock'`
- `page.tsx` — added `paddingBottom: '6rem'` to `<main>` to prevent content hiding behind fixed dock

### Key Patterns
- Fixed pill nav: `position: fixed`, `left: 50%`, `transform: translateX(-50%)`, `borderRadius: 100px`, `whiteSpace: nowrap`
- Mobile responsive: `.dock-links { display: none }` at ≤640px via inline `<style>` tag
- `#templates` anchor link added — Templates.tsx section needs `id="templates"` on its wrapper (not modified here per task constraints)
- Dock z-index (200) > Nav z-index (100) — intentional, dock floats above

### Verification
- ✅ `npx tsc --noEmit` exits 0
- ✅ All 4 files updated as specified

## Aura Hero Section Rewrite (2026-03-08)

### Pattern: `<style>` tag with CSS classes in JSX for animations + responsive CSS
- Keyframes and class selectors (`:nth-child`, `@media`, pseudo-selectors) must live in a `<style>{`` `}</style>` tag inside the component — cannot be expressed with React inline `style` props
- Pattern matches `Templates.tsx` (lines 329-341): `<style>{\`...\`}</style>` with template literal
- All animation names prefixed with `hero-` to namespace and avoid conflicts with other components

### Layout architecture
- `<section>` as outer shell (full viewport, white bg, flex center)
- Inner `.hero-grid` uses `grid-template-columns: 1fr 1fr` with `gap: 4rem; max-width: 1400px`
- Mobile breakpoint (≤1024px) collapses grid to single column via `@media` inside the `<style>` tag
- Orb veins use shared `.hero-orb-vein` class + inline `style` overrides for per-element values (width, height, animationDuration, borderColor)

### CSS-only organic blob animation
- `hero-morph` alternates between two biaxial `border-radius` values with `animation: ... alternate infinite` — no JS
- `hero-breathe` wraps container in subtle scale pulse (1 → 1.05 → 1) over 8s
- `hero-spin-slow` rotates vein rings; duration passed per-element via inline `animationDuration`
- `clip-path: ellipse(60% 80% at 50% 50%)` crops vein rings relative to the element

### Transcript-style typography
- `.hero-transcript` uses `mask-image: linear-gradient(to bottom, black 60%, transparent 100%)` to fade bottom of text block into transparency — the trailing-off voice memo effect
- First span `.hero-highlight` gets `color: var(--cream)` (#111111); remaining text inherits `color: var(--cream-dim)` (#8E8E93)

### Status pill equalizer (CSS-only)
- Three `.hero-bar` divs share `hero-eq` keyframe with staggered `animation-delay` (0s, 0.1s, 0.2s)
- Initial bar heights set via `:nth-child()` selectors in `<style>` — pseudo-selectors require CSS class context
- Whole pill uses `opacity: 0` + `hero-fade-in 1s 1s forwards` — appears 1s after load

### Verification
- ✅ `npx tsc --noEmit` exits 0, no errors
- ✅ Named export `export function Hero()`, no `any`, no `@ts-ignore`

## Templates.tsx iframe rewrite (2026-03-08)
- Replaced auto-scroll CSS animation rows with static horizontal-scroll `overflowX: 'auto'` deck
- Used `<style>` tag inside component for `.templates-deck` scrollbar hiding and `.template-card:hover` lift — pattern confirmed working
- Imported `templates` from `@/lib/templates` — array has 3 entries with `meta.slug`, `meta.name`, `meta.tag` (lowercase: 'light' | 'dark')
- iframe scaled via `transform: scale(0.25)` + `transformOrigin: 'top left'` on a 1200×800 iframe inside a 300×200 overflow-hidden container
- `id="templates"` on outer `<section>` required for Dock anchor link smooth scroll
- Tag comparison uses lowercase string (`entry.meta.tag === 'dark'`), not capitalized

## Pricing.tsx Single-Card Rewrite (2026-03-08)

### Changes Made
- Removed `plans` array (no Free/Pro/Agency tiers)
- Removed `Link` and `Button` imports — no longer needed
- Single centered Pro card: `maxWidth: 480px`, `margin: '0 auto'`
- Card style: `borderRadius: 24px`, `boxShadow: 0 10px 30px rgba(0,0,0,0.05)`, `border: 1px solid var(--border-gold)`, `padding: 48px`
- Price: Playfair font, `3.5rem`, `color: var(--gold)`
- CTA: `<a href="/folio/sign-up">` pill button (peach bg, white text, 100px border-radius)
- Hover state via `onMouseEnter`/`onMouseLeave` inline handlers — no external CSS needed
- Trust signal: "Cancel anytime · No contracts" in `var(--cream-dim)`
- Subheading updated: "Everything you need to build your personal brand online." (removed free-tier reference)

### Key Patterns
- Use `<a>` not `<button>` for navigation CTAs — no `type` prop required
- `onMouseEnter`/`onMouseLeave` cast to `HTMLAnchorElement` for TS satisfaction
- No Tailwind classes used — all inline styles with CSS vars (consistent with Aura theme)

### Verification
- ✅ `npx tsc --noEmit` exits 0

## Aura Landing Component Restyling (2026-03-08)

### HowItWorks.tsx
- Section bg: `var(--bg3)` (#F2F2F7) for light gray section background
- Card bg: `var(--bg)` (white), `borderRadius: 24px`, `boxShadow: 0 10px 30px rgba(0,0,0,0.05)`, `border: 1px solid var(--border)`
- Step number: `color: var(--gold)`, `fontSize: 1.2rem`, `fontWeight: 700` — larger and bolder than before
- Step title: `fontFamily: var(--font-playfair)` + `color: var(--cream)` for dark readable heading
- Section h2 needs explicit `color: var(--cream)` — not inherited in light theme

### FinalCTA.tsx
- Removed `import Link from 'next/link'` and `import { Button } from '@/components/ui'`
- Replaced `<Link><Button>...</Button></Link>` with a single `<a>` pill button
- Pill button: `backgroundColor: var(--gold)`, `color: #FFFFFF`, `borderRadius: 100px`, `padding: 16px 40px`
- Section padding: `120px 48px`, `backgroundColor: var(--bg)` (white — distinct from HowItWorks)

### Footer.tsx
- Added `backgroundColor: 'var(--bg)'` to footer element
- Updated padding: `40px 48px` (was `32px 48px`)
- Links: added `textDecoration: 'none'` — `<Link>` in Next.js accepts style prop including textDecoration
- Kept `Link` import — still using Next.js router links for Sign in / Sign up nav

### Verification
- ✅ `npx tsc --noEmit` exits 0 — all 3 files type-clean
- ✅ All named exports preserved: `HowItWorks`, `FinalCTA`, `Footer`
- ✅ No `any`, no `@ts-ignore`, no `type="button"` on `<a>` elements
