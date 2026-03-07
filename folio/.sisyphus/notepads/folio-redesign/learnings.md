
## Visual QA Results - Landing Page (2026-03-07)

### Environment
- Folio dev server started on PORT=3002 (port 3000 was occupied by mission-control)
- URL tested: http://localhost:3002/folio (basePath: '/folio' in next.config.ts)
- Page title: "Folio — Your Personal Website in Minutes"

### QA Results: ALL PASS ✓

| Section | Result | Details |
|---------|--------|---------|
| **Nav** | ✓ PASS | rawText: "FOLIOTemplatesPricingSign InGet Started" — FOLIO logo + gold Get Started button confirmed |
| **Hero** | ✓ PASS | h1: "Build Your Personal Website in Minutes" |
| **HowItWorks** | ✓ PASS | Steps 01, 02, 03 confirmed in DOM — "Paste your LinkedIn URL", "Pick a template", step 3 |
| **Templates** | ✓ PASS | All 3 cards present: Impact Report, Terminal Hacker, Brutalist Grid |
| **Pricing** | ✓ PASS | Pricing section found with $ price values |
| **Footer** | ✓ PASS | "Folio © 2026 Folio. All rights reserved." |
| **Console Errors** | ✓ PASS | Zero console errors |
| **Template Picker Auth** | ✓ PASS | `/folio/build/template` → redirected to `/folio/sign-in?redirect_url=...` |

### Screenshots
All 7 screenshots saved to /tmp/folio-qa/:
- 01-landing-full.png (275K - full page)
- 02-hero.png, 03-howitworks.png, 04-templates.png, 05-pricing.png, 06-footer.png
- 07-template-picker.png (sign-in page shown)

### Notes
- There's a deprecation warning: "middleware" file convention deprecated, use "proxy" instead (non-blocking)
- The CSS auto-scroll animation for Templates section renders without JS (confirmed by DOM presence of all 3 cards)
- HowItWorks step text includes "Paste your LinkedIn URL" (step 01) and "Pick a template" (step 02)
