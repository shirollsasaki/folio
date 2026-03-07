## Task 5: Impact Report Template

- Created `src/templates/impact-report/index.tsx` — exports `ImpactReport` default
- Inline styles only, no external CSS frameworks
- Responsive via flexbox wrapping (`flex: '1 1 500px'` / `flex: '1 1 260px'`)
- Avatar fallback: initials circle with accent color when `avatar_url` is empty
- `socialLinks` built from all optional + custom_links, filtered for truthy values
- Stable keys: experience uses `${company}-${title}`, skills use the skill string, social uses label
- `npx tsc --noEmit` → exit 0
- Committed: `7d539db feat(templates): add Impact Report template`
