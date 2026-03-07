
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
