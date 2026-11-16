# MAN3 Partner Portal Architecture

## Audit findings

- The application is Next.js 15 App Router with TypeScript and server-side API routes.
- Existing sign-in uses a custom bcrypt/JWT cookie and stores users, roles, and orders in either a local JSON file or Google Sheets through Apps Script.
- Existing `/portal-mitra` is a public order inquiry form; its API trusts client-supplied product prices and creates unauthenticated orders.
- The current data layer has no relational transactions, database constraints, or row-level access policies. It cannot safely support partner-owned data or concurrent inventory changes.

## Decision

Use Supabase Auth and PostgreSQL for the new B2B portal. Supabase Auth owns credentials and persistent sessions; PostgreSQL owns partner profiles, approval state, products, orders, order snapshots, tracking, inventory movements, partnership events, and admin audit events. User-scoped server clients use the Supabase session and RLS. Security-sensitive changes use PostgreSQL functions so validation, inventory checks, status updates, and audit records are atomic. The Supabase service-role key is restricted to an opt-in local seed script and is never used by application routes.

Keep the existing public MAN3 pages, Apps Script content/CMS integration, and legacy `/dashboard` routes intact. The new `/login`, `/register`, `/mitra/*`, and `/admin/*` B2B experience uses Supabase; it does not silently fall back to JSON/Sheets when Supabase configuration is absent. Existing legacy accounts are not implicitly promoted or migrated into the new system.

## Deployment requirements and boundaries

- Apply `supabase/migrations/202611160001_man3_b2b_portal.sql` to the Supabase project before enabling the portal.
- Configure the public Supabase URL and anon key for server-side session handling. Configure an SMTP provider in Supabase Auth for password recovery emails; recovery requests must report setup errors rather than claim an email was sent.
- Create admin accounts through the trusted Supabase dashboard or the local-only seed script. Public sign-up always creates a `mitra` profile in `pending_review`.
- Demo accounts and all sample records are opt-in local-development data. Production seed execution is rejected.
- The legacy Apps Script storage remains for existing CMS/content features only; it is not the database or authorization layer for the B2B portal.

## Initial implementation boundary

This migration establishes real authentication, RLS-protected partner/admin access, partner registration and approval, order submission and tracking, product/inventory controls, and operational dashboards. No GPS/logistics integration, contract, email delivery, or real MAN3 operational data is assumed. The portal must show empty states where records do not exist.
