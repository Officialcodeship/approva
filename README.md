# Approva

Content approval portal for social media agencies.

Agencies upload social media posts to a workspace, send clients a branded review link, and clients approve or request changes in one click. Every action is timestamped and stored in an append-only audit log. No client account required.

**Live:** https://approva-app.vercel.app

---

## Build context

Approva was built as a focused MVP to demonstrate end-to-end product thinking and shipping velocity: from schema design, to auth, to billing, to a polished client-facing UI. Built in weeks using Claude Code, Next.js, Supabase, Stripe, and Resend. This is a representative slice of capability, not a commercial product.

---

## Tech stack

- Next.js 16 (App Router, Server Actions)
- TypeScript
- Tailwind CSS v4
- Supabase (Postgres, Auth, Storage)
- Stripe (subscriptions and billing portal)
- Resend (transactional email)
- Vercel (hosting)

---

## Architecture highlights

- **Append-only audit log.** Every approval action is a new insert into `approval_actions`. Rows are never updated or deleted, which makes the audit trail tamper-evident by design.
- **Token-based client review.** Clients receive a URL with a short-lived token. The review page uses the Supabase service-role client directly. No login, no cookies, no session on the client side.
- **Two Supabase clients.** A standard anon client (respects RLS) for agency-authenticated routes. An admin client (service role, bypasses RLS) for server actions and the unauthenticated review page.
- **Row-level security on every table.** Agencies can only read and write their own data. RLS policies are defined in `supabase/schema.sql` alongside the schema.
- **Plan limits enforced at the server action layer.** Usage checks happen server-side before any insert. Stripe webhooks update the `plan` column on the agency row, which the action layer reads.

---

## Getting started

```bash
git clone https://github.com/officialcodeship/approva.git
cd approva
npm install
cp .env.example .env.local
# Fill in your Supabase, Stripe, and Resend keys
npm run dev
```

Run `supabase/schema.sql` in the Supabase SQL editor to set up the database schema and RLS policies before starting.

Open [http://localhost:3000](http://localhost:3000).

---

## Testing

```bash
npm test         # watch mode
npm run test:run # single run (used in CI)
```

29 tests across 5 files, covering pure utilities, UI primitives, and core business logic:

| File                                | What it tests                                          |
| ----------------------------------- | ------------------------------------------------------ |
| `tests/tokens.test.ts`              | `generateApprovalToken`: type, length, uniqueness      |
| `tests/stripe-plans.test.ts`        | `getPlanFromPriceId` and `PLAN_LIMITS` values          |
| `tests/ui/Badge.test.tsx`           | Correct label and color class for every status variant |
| `tests/ui/Button.test.tsx`          | Children, onClick, disabled state, variant classes     |
| `tests/review-action-logic.test.ts` | `determineWorkspaceStatus` across all approval states  |

Integration tests (Supabase queries, Stripe webhooks) and E2E tests are intentionally out of scope for this build. The goal is coverage of the decision logic most likely to regress silently.

---

## Project structure

```
src/
  app/
    (auth)/           signup, login
    (dashboard)/      agency-side app (workspaces, clients, billing, settings)
    review/[token]/   client-facing approval page (no auth)
    api/stripe/       Stripe webhooks and checkout session creation
  components/ui/      shared primitives (Button, Dialog, Badge, etc.)
  lib/
    supabase/         typed client, admin client, query helpers
    stripe/           Stripe client and plan config
    email/            Resend templates
supabase/
  schema.sql          full database schema with RLS policies
  migrations/         storage bucket setup
```

---

## What is intentionally not here

- Multi-user agency teams (single owner per agency in this build)
- Comment threads (clients leave one change request per post per round)
- Password reset flow
- White-labeling of the client review page
- Rate limiting beyond Supabase and Vercel platform defaults

These are scope decisions, not oversights.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Contact

hello@approva.app
