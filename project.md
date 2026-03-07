# Folio — Project Spec

## What it is
Folio is a personal website builder that generates a live, hosted website from your social profiles (LinkedIn, Twitter/X, Instagram) in under 10 minutes. The user's competitive moat is in the template designs — not the tech.


---


## Core User Flow


```
Landing page → Browse templates (free)
→ Paywall (enter email + pay)
→ Input social URLs
→ AI extracts profile data
→ Template is populated
→ Auto-deploy to Vercel
→ Option to connect custom domain (or link out to registrar)
→ Site is live
```


---


## Pages & Sections


### 1. Landing Page (`/`)
- **Nav:** Logo, links (Templates, How it Works, Pricing), CTA button
- **Hero:** Bold headline, subheading, primary CTA, social proof (X users launched)
- **Ticker:** Scrolling feature strip
- **Templates Gallery:** Horizontal scroll, drag-to-scroll, template cards with mockup previews + locked cards for paid-only
- **How It Works:** 4-step process + animated terminal visual
- **Pricing:** 3 tiers (Starter free / Pro $12/mo / Agency $49/mo)
- **Domain CTA:** Links to Namecheap, Google Domains, Cloudflare
- **Build CTA / Input Form:** Social URLs + email capture
- **FAQ**
- **Footer**


### 2. Paywall (`/start`)
- Triggered after user submits email + social URLs on landing page
- Show plan selection (Pro / Agency)
- Stripe checkout
- On success → redirect to `/build`


### 3. Build Page (`/build`)
- Shows extracted profile data (name, headline, bio, experience, links)
- User selects template
- Live preview pane (updates as they select)
- "Deploy" button
- Loading state → Vercel deploy animation
- Success state → shows live URL + domain connection instructions


### 4. Dashboard (`/dashboard`)
- List of user's sites
- Edit template, edit copy, re-deploy
- Domain management
- Billing / plan management


---


## Tech Stack


### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Playfair Display + DM Sans (Google Fonts)


### Backend
- **API Routes:** Next.js API routes
- **Auth:** Clerk (or NextAuth with email magic link)
- **Database:** Supabase (Postgres) — stores users, sites, template selections
- **Payments:** Stripe (subscriptions)


### Core Services
| Service | Purpose |
|---|---|
| Proxycurl API | LinkedIn profile scraping (name, headline, experience, skills, photo) |
| Twitter API v2 | Pull bio, pinned tweet, follower count |
| Vercel API | Programmatic deploy of generated Next.js static sites |
| OpenAI API | Rewrite/clean extracted bio copy |
| Cloudflare / Vercel | Hosting + custom domain via CNAME |


### Site Generation
- Each generated site is a **static Next.js site** (or plain HTML/CSS)
- Template is a React component with typed props (name, role, bio, links, etc.)
- Profile data fills the template props
- Site is built and pushed to Vercel via the Vercel API (one deploy per user)
- Custom domain: user adds a CNAME in their DNS registrar pointing to Vercel


---


## Data Models


### User
```ts
{
  id: string
  email: string
  stripe_customer_id: string
  plan: 'free' | 'pro' | 'agency'
  created_at: timestamp
}
```


### Site
```ts
{
  id: string
  user_id: string
  template_id: string
  vercel_project_id: string
  vercel_url: string
  custom_domain: string | null
  profile_data: ProfileData
  created_at: timestamp
  updated_at: timestamp
}
```


### ProfileData
```ts
{
  name: string
  headline: string
  bio: string
  location: string
  avatar_url: string
  linkedin_url: string
  twitter_url: string
  instagram_url: string
  experience: { title: string; company: string; dates: string }[]
  skills: string[]
  custom_links: { label: string; url: string }[]
}
```


---


## Templates System


Templates live in `/templates/[slug]/` as React components.


Each template exports:
- `Component` — the React component
- `meta` — name, tag (light/dark), preview image path
- `defaultProps` — placeholder data for preview


Template interface:
```ts
interface TemplateProps {
  profile: ProfileData
  accentColor?: string
}
```


**V1 Templates (to be designed by owner):**
- `ivory-editorial` — clean, light, editorial
- `noir-minimal` — dark, split-grid
- `forest-link` — dark green, centered link-in-bio style
- `violet-pro` — purple header, stat grid
- `grid-bright` — white, colorful stripe, info grid
- *(8+ more unlocked on paid plans)*


---


## Pricing


| Plan | Price | Sites | Templates | Custom Domain | Deploy |
|---|---|---|---|---|---|
| Starter | Free | 1 | 5 basic | ❌ (folio.so subdomain) | ✅ |
| Pro | $12/mo | 1 | All | ✅ | ✅ |
| Agency | $49/mo | 10 | All + custom upload | ✅ | ✅ |


---


## MVP Scope (V1)


**In scope:**
- [ ] Landing page (done — see `folio-landing.html`)
- [ ] Email capture → Stripe paywall
- [ ] LinkedIn URL → Proxycurl extraction
- [ ] Template selection with live preview
- [ ] Vercel API deploy
- [ ] Custom domain connection guide
- [ ] User dashboard (basic)


**Out of scope for V1:**
- Twitter/Instagram extraction (LinkedIn only)
- Auto-updating when socials change
- Agency white-labeling
- Custom template uploads


---


## Key Risks & Mitigations


| Risk | Mitigation |
|---|---|
| LinkedIn blocks scraping | Use Proxycurl (official API, handles compliance) |
| Vercel API rate limits | One project per user, deploy on change only |
| Template quality is the moat | Owner controls and inputs all designs manually |
| Low conversion on paywall | Free preview before paying — user sees their site before committing |


---


## Domain Strategy
Folio does not sell domains. Instead:
- After deploy, show a persistent banner: "Want yourname.com?"
- Link to Namecheap, Google Domains, Cloudflare with UTM params (potential affiliate revenue)
- Show a simple DNS guide: "Add this CNAME record → your site is live on your domain"


---


## Success Metrics (Month 1)
- 500 signups
- 100 paid conversions (20% free → paid)
- $1,200 MRR
- < 5 min average time from signup to live site
