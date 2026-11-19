# MAN3 Portal Architecture

## Browser-only portal preview

The `/login`, `/mitra/*`, and `/admin/*` portal is a browser-only demo. It does not use Supabase, portal API routes, server authentication, or a remote database. The login form accepts the sample accounts documented in [`SETUP.md`](./SETUP.md), then stores the demo session in the current browser's `localStorage`.

Dashboard figures and partner/order details are sample data compiled into the frontend. Other portal sections are informational placeholders. Registration, password recovery, order submission, and operational changes are intentionally unavailable.

This mode is for visual review only. A `localStorage` session is not secure authentication, can be edited by the browser user, and is not shared across browsers or devices. Do not enter real credentials or operational information.

## Other application services

The legacy CMS and public content features remain separate. Their Apps Script/JSON integrations and `/dashboard` authentication are not part of this browser-only portal change.
