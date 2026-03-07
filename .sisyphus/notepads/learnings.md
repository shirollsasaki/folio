
## Task 11: Checkout API Route
- DbUser requires `subscription_id: string | null` — always include in test mocks
- vi.clearAllMocks() in beforeEach resets module-level vi.mock() default impls — need per-test mockResolvedValueOnce overrides
- Dynamic imports (`await import('@/lib/db')`) inside handler body prevent Next.js build-time module resolution issues with env vars
- CheckoutRequestSchema exported from `@/types` (re-exports from `@/types/api.ts`)
- Evidence saved: `.sisyphus/evidence/task-11-checkout-types.txt`, `task-11-checkout-tests.txt`
- Pre-existing tsc errors exist in `src/app/api/webhooks/dodo/route.ts` (not from this task)
