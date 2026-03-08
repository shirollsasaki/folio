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

Each template lives in `src/templates/{slug}/index.tsx` and exports a default React component accepting `TemplateProps`:

```typescript
import type { TemplateProps } from '@/types/template';

export default function MyTemplate({ profile }: TemplateProps) {
  // profile.name, profile.headline, profile.bio
  // profile.experience[], profile.skills[]
  // profile.socials { linkedin, twitter, github, instagram, youtube, website, portfolio }
  return <div>...</div>;
}
```

Register in `src/lib/templates.ts`:

```typescript
import MyTemplate from '@/templates/my-template';

export const templates: TemplateEntry[] = [
  {
    meta: { name: 'My Template', slug: 'my-template', tag: 'light', isPremium: true },
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

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/folio/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/folio/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/folio/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/folio/build

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Dodo Payments
DODO_API_KEY=
DODO_WEBHOOK_KEY=
DODO_PRODUCT_ID=

# Proxycurl (LinkedIn extraction)
PROXYCURL_API_KEY=

# OpenAI (bio cleanup)
OPENAI_API_KEY=

# Vercel (site deployment)
VERCEL_TOKEN=
VERCEL_TEAM_ID=
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
