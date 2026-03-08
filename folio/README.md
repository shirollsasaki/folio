# Folio

**Personal website builder powered by LinkedIn.** Paste your LinkedIn URL, pick a template, go live in minutes.

Live at → [afterapp.fun/folio](https://afterapp.fun/folio)

---

## What It Does

Folio turns your LinkedIn profile into a personal website in 3 steps:

1. **Paste your LinkedIn URL** — we extract your name, headline, experience, skills, and bio via Proxycurl
2. **Pick a template** — choose from professionally designed portfolio templates
3. **Deploy instantly** — your site goes live on a custom URL in seconds

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 + CSS variables |
| Auth | Clerk |
| Database | Supabase (PostgreSQL) |
| Payments | Dodo Payments |
| Deployment | Vercel (folio-afterapp.vercel.app) |
| DNS Proxy | afterapp.fun → folio via Next.js multi-zone |
| LinkedIn Data | Proxycurl API |
| AI | OpenAI (bio cleanup) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout (fonts, ClerkProvider)
│   ├── globals.css                 # Global CSS variables (theme)
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/ # Clerk sign-in page
│   │   └── sign-up/[[...sign-up]]/ # Clerk sign-up page
│   ├── start/                      # Build step 1 — LinkedIn URL input
│   ├── build/
│   │   ├── page.tsx                # Build step 1 — LinkedIn extraction
│   │   ├── template/               # Build step 2 — Template picker
│   │   └── preview/                # Build step 3 — Preview + deploy
│   ├── dashboard/                  # User dashboard (manage sites)
│   ├── preview/[slug]/             # Public template preview (for iframe renders)
│   └── api/
│       ├── extract/                # POST — LinkedIn URL → ProfileData
│       ├── deploy/                 # POST — Deploy site to Vercel
│       ├── sites/                  # GET — List user's deployed sites
│       ├── checkout/               # POST — Dodo Payments checkout session
│       ├── customer-portal/        # POST — Dodo customer portal
│       └── webhooks/
│           ├── clerk/              # Clerk user lifecycle events
│           └── dodo/               # Dodo payment/subscription events
│
├── components/
│   ├── landing/
│   │   ├── Nav.tsx                 # Minimal top nav (logo + sign in)
│   │   ├── Hero.tsx                # Morphing orb + transcript typography
│   │   ├── Templates.tsx           # Live iframe template card deck
│   │   ├── HowItWorks.tsx          # 3-step cards
│   │   ├── Pricing.tsx             # Single Pro tier ($12/mo)
│   │   ├── FinalCTA.tsx            # Bottom CTA section
│   │   ├── Footer.tsx              # Minimal footer
│   │   ├── Dock.tsx                # Fixed floating bottom nav pill
│   │   └── index.ts                # Barrel exports
│   └── ui/
│       ├── Button.tsx              # Primary/secondary button variants
│       └── index.ts
│
├── templates/
│   ├── impact-report/index.tsx     # Clean light portfolio template
│   ├── terminal-hacker/index.tsx   # Dark terminal/hacker aesthetic
│   └── brutalist-grid/index.tsx    # Bold brutalist grid layout
│
├── lib/
│   ├── templates.ts                # Template registry (slug, name, tag, component)
│   ├── db.ts                       # Supabase client + user/site helpers
│   ├── supabase.ts                 # Supabase admin client
│   ├── ai.ts                       # OpenAI bio cleanup
│   ├── billing.ts                  # Plan/subscription helpers
│   ├── dodo.ts                     # Dodo Payments client
│   ├── vercel.ts                   # Vercel deployment API
│   └── linkedin/
│       ├── index.ts                # LinkedIn extraction entry point
│       ├── proxycurl.ts            # Proxycurl API client
│       └── types.ts                # Proxycurl response types
│
├── types/
│   ├── profile.ts                  # ProfileData (name, headline, bio, experience, skills, socials)
│   ├── template.ts                 # TemplateProps, TemplateMeta, TemplateEntry
│   ├── database.ts                 # Supabase table types
│   ├── api.ts                      # API request/response schemas (Zod)
│   └── index.ts                    # Barrel exports
│
├── test/
│   ├── mocks/
│   │   ├── profile.ts              # createMockProfile() — full ProfileData fixture
│   │   ├── supabase.ts             # Supabase mock
│   │   └── dodo.ts                 # Dodo Payments mock
│   └── setup.ts                    # Vitest global setup
│
└── middleware.ts                   # Clerk auth middleware (protects /build, /dashboard)
```

---

## Templates

Folio ships with **5 professionally designed templates**:

1. **Impact Report** — Clean, professional light theme with stat grid
2. **Terminal Hacker** — Dark terminal/hacker aesthetic with CRT effects
3. **Brutalist Grid** — Bold brutalist grid layout with monospace fonts
4. **Forest Link** — Dark green link-in-bio style for social media
5. **Violet Pro** — Purple gradient header with professional stat cards

Each template lives in `src/templates/{slug}/index.tsx` and exports a default React component accepting `TemplateProps`:

```typescript
import type { TemplateProps } from '@/types/template';

export default function MyTemplate({ profile, accentColor }: TemplateProps) {
  // profile.name, profile.headline, profile.bio
  // profile.experience[], profile.skills[]
  // profile.linkedin_url, twitter_url, github_url, etc.
  // accentColor — optional hex color override
  return <div>...</div>;
}
```

Register in `src/lib/templates.ts`:

```typescript
import MyTemplate from '@/templates/my-template';

export const templates: TemplateEntry[] = [
  {
    meta: { 
      name: 'My Template', 
      slug: 'my-template', 
      tag: 'light', // or 'dark'
      previewImage: '/previews/my-template.png',
      isPremium: true 
    },
    Component: MyTemplate,
    defaultProps: { profile: createMockProfile() },
  },
];
```

Preview any template at `/folio/preview/{slug}` (renders with mock data, used for iframe cards on landing page).

---

## Pricing

Single tier — **Pro at $12/month** via Dodo Payments.
- All templates
- Custom domain
- LinkedIn extraction
- AI bio cleanup
- Priority support

No free tier. All templates are paywalled.

---

## Routing

The app is deployed as a Next.js multi-zone setup:

| URL | Resolves to |
|-----|------------|
| `afterapp.fun/folio` | `folio-afterapp.vercel.app` (this app) |
| `afterapp.fun/folio/sign-in` | Clerk sign-in |
| `afterapp.fun/folio/build` | Build wizard step 1 |
| `afterapp.fun/folio/dashboard` | User dashboard |
| `afterapp.fun/folio/preview/{slug}` | Template preview (public) |

The `assetPrefix` in `next.config.ts` is set to `https://folio-afterapp.vercel.app` to ensure static assets load correctly through the proxy.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the required values:

```bash
cp .env.local.example .env.local
```

### Required Environment Variables

#### Clerk Auth
Authentication and user management via Clerk.

- **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`** — Get from [Clerk Dashboard](https://dashboard.clerk.com) → Your App → API Keys
- **`CLERK_SECRET_KEY`** — Secret key from same API Keys page
- **`CLERK_WEBHOOK_SECRET`** — Create webhook endpoint in Clerk Dashboard → Webhooks → Add Endpoint (point to `/api/webhooks/clerk`)
- **`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`** — Sign-in page route (no /folio prefix needed, handled by basePath)
- **`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`** — Sign-up page route
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/build`** — Redirect after sign-in
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/build`** — Redirect after sign-up

#### Supabase Database
PostgreSQL database for storing user sites and profiles.

- **`NEXT_PUBLIC_SUPABASE_URL`** — Get from [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project URL
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** — Anon/Public key from same API page
- **`SUPABASE_SERVICE_ROLE_KEY`** — Service role key (secret) — **do not expose client-side**

#### Dodo Payments
Payment processing and subscription management.

- **`DODO_PAYMENTS_API_KEY`** — Get from [Dodo Payments Dashboard](https://dodo.dev/dashboard)
- **`DODO_PAYMENTS_WEBHOOK_KEY`** — Webhook signing secret (Dashboard → Webhooks)
- **`DODO_PAYMENTS_RETURN_URL=https://afterapp.fun/folio/build`** — Redirect after successful payment
- **`DODO_PAYMENTS_ENVIRONMENT=test_mode`** — Use `test_mode` for development, `live` for production
- **`DODO_PRODUCT_PRO`** — Product ID for Pro plan (create in Dashboard → Products)
- **`DODO_PRODUCT_AGENCY`** — Product ID for Agency plan (if applicable)

#### LinkedIn Extraction
Proxycurl API for extracting LinkedIn profile data.

- **`PROXYCURL_API_KEY`** — Get from [Proxycurl](https://nubela.co/proxycurl/) → Dashboard → API Keys
  - Used by `/api/extract` endpoint to scrape LinkedIn profiles
  - Rate limits vary by plan

#### AI Bio Enhancement
Anthropic Claude API for cleaning up and enhancing bio text.

- **`ANTHROPIC_API_KEY`** — Get from [Anthropic Console](https://console.anthropic.com/) → API Keys
  - Used to polish and format extracted LinkedIn bio text
  - Optional but recommended for better bio quality

#### Vercel Deployment
Programmatic deployment of user sites.

- **`VERCEL_API_TOKEN`** — Create at [Vercel Dashboard](https://vercel.com/account/tokens) → Settings → Tokens
  - Needs deployment permissions
- **`VERCEL_TEAM_ID`** — Found in Vercel Dashboard → Team Settings → General → Team ID
  - Required if deploying under a team account

#### App Configuration

- **`NEXT_PUBLIC_APP_URL=https://afterapp.fun/folio`** — Public-facing URL for your app
  - Used for absolute URLs in emails, webhooks, etc.

### Development Setup

1. Copy example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in **at minimum** these keys to run locally:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. For full feature testing (LinkedIn import, payments, deployment), configure:
   - Proxycurl API key
   - Dodo Payments keys
   - Vercel API token

4. Run dev server:
   ```bash
   npm run dev
   ```

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000/folio
npm run build    # Production build
npx tsc --noEmit # Type check
npm test         # Vitest
```

---

## Key Conventions

- **No `any` types, no `@ts-ignore`** — strict TypeScript throughout
- **Named exports** for all landing components (`export function Hero()`)
- **`type="button"`** on all non-submit `<button>` elements
- **CSS variables only** for theming — no hardcoded hex in components (except decorative orb elements)
- **Dynamic imports** for Supabase in server components — avoids build-time `supabaseUrl is required` error
- **`await params`** in dynamic routes — Next.js 16 params is a Promise
- **`export const dynamic = 'force-dynamic'`** on all auth-protected server pages

---

## Theme

Light/Aura aesthetic — white background, dark text, peach accents.

```css
--bg: #FFFFFF
--bg2: #FAFAFA
--bg3: #F2F2F7
--cream: #111111       /* primary text */
--cream-dim: #8E8E93   /* secondary text */
--gold: #E8956A        /* peach accent */
--gold-light: #F4A97B  /* hover state */
--border: rgba(0,0,0,0.08)
--border-gold: rgba(232,149,106,0.3)
```
