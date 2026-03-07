
## Task 10: Anthropic Bio Cleanup Service

### Mock Pattern for Class-based SDK Constructors (vitest)
- `vi.fn().mockImplementation(() => ({...}))` with an arrow function FAILS as a constructor
- vitest warning: "The vi.fn() mock did not use 'function' or 'class' in its implementation"
- **Fix**: Use a class in the mock factory:
  ```typescript
  vi.mock('@anthropic-ai/sdk', () => ({
    default: class MockAnthropic {
      messages = { create: vi.fn().mockResolvedValue({...}) };
    },
  }));
  ```
- `vi.clearAllMocks()` clears call history only, NOT mock implementations (safe with mockResolvedValue)

### Module-level Instantiation + Dynamic Imports
- Tests use `await import('@/lib/ai')` — module is cached after first import
- The Anthropic client is created once; same instance used across all tests in the file
- This is fine as long as the mock's `create` method keeps its implementation after `clearAllMocks()`

## Task 8: Template Components & Registry

### Key patterns
- Templates use inline styles only (no Tailwind) — rendered via `renderToStaticMarkup()` for static HTML export
- `TemplateEntry.Component` is typed as `React.ComponentType<TemplateProps>` — Next.js provides global React types via `next-env.d.ts`, so no explicit React import needed in `template.ts`
- ESLint rule `react/no-array-index-key` is active — use content-based keys: `key={skill}`, `key={link.url}`, `key={`${exp.company}-${exp.title}`}`
- Template registry imports `createMockProfile` from `@/test/mocks/profile` for defaultProps — this is intentional for build wizard previews
- All 5 templates render all ProfileData fields: name, headline, bio, location, avatar_url, experience, skills, custom_links
- `isPremium: true` for violet-pro and grid-bright; `isPremium: false` for ivory-editorial, noir-minimal, forest-link

### Build verification
- `npx tsc --noEmit`: PASSED (0 errors)
- `npm run build`: PASSED (✓ Compiled successfully)

## Task 13: Vercel Deploy Service + Deploy API Route

### Key Pattern: react-dom/server in Next.js API routes
- Next.js 16 Turbopack rejects STATIC imports of `react-dom/server` in API routes
- Fix: use `await import('react-dom/server')` dynamic import inside the function
- This makes `renderTemplate` async — callers must `await` it

### TemplateProps vs ProfileData
- `TemplateEntry.Component` is typed as `React.ComponentType<TemplateProps>`
- `TemplateProps = { profile: ProfileData; accentColor?: string }`
- `renderTemplate` must accept `React.ComponentType<TemplateProps>` to avoid contravariance error

### Vercel API Flow (3 steps)
1. POST /v10/projects — create project (skip if existingProjectId provided)
2. POST /v2/files — upload file with x-vercel-digest (SHA-1 hex), 409 = already uploaded (ok)
3. POST /v13/deployments — create deployment with files array + project id

### teamId query param
- Add to ALL Vercel API calls IF `VERCEL_TEAM_ID` is non-empty string
- Use `url.searchParams.set('teamId', ...)` on a `URL` object

### deploy/route.ts pattern
- Uses dynamic imports for `@/lib/templates`, `@/lib/db`, `@/lib/vercel` (lazy loading in handler)
- createSite first → get ID → derive projectName → deployToVercel → updateSite
- Project name: `folio-${site.id.slice(0, 8)}`

## Task 14: Landing Page (2026-03-07)

### Pattern: Landing page component split
- Split landing page into `src/components/landing/` with one file per section
- Export all via `src/components/landing/index.ts` barrel
- Import in `src/app/page.tsx` as server component (no 'use client')

### Button component note
- `Button` extends `React.ButtonHTMLAttributes<HTMLButtonElement>` so `style` prop works
- Used wrapper div pattern for full-width pricing CTAs anyway (cleaner, avoids tight coupling)

### Build notes
- `npx tsc --noEmit` → clean
- `npm run build` → clean, `/` route generated as Static (○)
- Warning: "middleware" file convention deprecated → pre-existing, not caused by this task

## Task 16: Build Wizard Step 1 (2026-03-07)

### Pattern: Server component auth check without DB
- Keep server page components auth-only (no getUser/Supabase calls) where possible
- Avoids build failures when Supabase env vars are empty
- Supabase errors at build time come from pre-existing stubs for tasks 17/18

### Label accessibility
- Always use `htmlFor="id"` on label + `id="id"` on input to satisfy LSP accessibility rules

### sessionStorage for wizard state
- Use sessionStorage (not localStorage) so data clears on tab close
- Key: `folio_profile`, value: `JSON.stringify(ProfileData)`

### TSC notes
- `npx tsc --noEmit` clean for new files
- Pre-existing errors in future-task stubs (TemplatePickerClient, DashboardClient) don't block

## Task 19-20: Dashboard

- Button component already extends `React.ButtonHTMLAttributes<HTMLButtonElement>` via `...props`, so `style` prop works out of the box — no changes needed
- Server components that import from `@/lib/db` (which initializes Supabase at module level) must use `await import('@/lib/db')` inside the function body + `export const dynamic = 'force-dynamic'` — otherwise Next.js "collect page configuration" phase fails with "supabaseUrl is required"
- Same pattern applied to pre-existing `/build/template/page.tsx` that had the same issue
- API routes already use dynamic imports in their route handlers — consistent pattern

## Task 15 - /start Paywall Page

- `Button` extends `React.ButtonHTMLAttributes<HTMLButtonElement>` so `style` prop is natively accepted — no modification needed
- `PlanType` exported from `@/types` (re-exported via `@/types/database.ts`)
- Supabase `.env.local` has empty values in dev — `createClient` throws "supabaseUrl is required" with empty strings
- Fix: add `|| 'http://localhost:54321'` / `|| 'placeholder'` fallbacks in `supabase.ts` so build doesn't fail
- Pattern for server components calling DB: use `export const dynamic = 'force-dynamic'` + `await import('@/lib/db')` inside function body to prevent module-level Supabase init during build's "collect configuration" phase
- Pre-existing `/dashboard` page had same pattern, confirming this is the project standard
