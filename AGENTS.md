<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Architecture

- Frontend only: destinations are served by a **separate REST backend**, not this repo. `NEXT_PUBLIC_API_URL` (default `http://127.0.0.1:8000`) must be running for `/`, `/destinations`, and `/destinations/[id]` to show data; otherwise they render an empty/error state.
- Endpoints in use: `GET /destinations`, `GET /destination/:id`, `POST /add-destination`, `PATCH /destination/:id`, `DELETE /destination/:id`. Detail responses may be `{ destination }` or the bare object (`page.tsx` handles both).
- Server fetches use `NEXT_PUBLIC_API_URL`; client mutations **hardcode `http://localhost:8000`** in `add-package-form.tsx`, `edit-destination-dialog.tsx`, and `delete-destination-dialog.tsx`. Update all three if the API base changes.
- Existing routes: `/`, `/destinations`, `/destinations/[id]`, `/add-destination`, `/signup`, `/login`, `/profile`, `/api/auth/[...all]`. The navbar links to `/bookings` and `/admin`, the login page links to `/forgot-password`, and the detail page links to `/booking/[id]` — none of those routes exist yet.
- Next 16 route params are async: type them as `Promise<{ id: string }>` and `await params` (see `src/app/destinations/[id]/page.tsx`).

## Commands

- Use npm only (`package-lock.json` is the lockfile).
- `npm run dev` / `npm run build` / `npm run start` wrap Next 16 with Turbopack. `next build` type-checks but does **not** run ESLint — run lint separately.
- `npm run lint` = flat-config ESLint over the repo; `npm run typecheck` = `tsc --noEmit`; `npm run format` rewrites only `**/*.{ts,tsx}` with Prettier (no semicolons, double quotes, LF, 80 cols) plus Tailwind class sorting for `cn`/`cva`.
- No tests, test runner, or CI workflow is checked in. lint + typecheck + build are the available checks.
- Baseline `npm run lint` exits 1 on vendored code: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Treat those two as pre-existing. It also reports 3 unused-variable warnings in `src/components/destinations/edit-destination-dialog.tsx` (real code — clean these up when touching that file).
- Build succeeds without the backend, but logs `DYNAMIC_SERVER_USAGE` from the `cache: "no-store"` destination fetches during prerender. That is expected, not a failure.

## Structure and conventions

- App Router under `src/app`. `layout.tsx` wraps every route and already renders `Navbar` + `Footer` + `Toaster` inside `ThemeProvider`; pages render only their own sections, not the shared chrome.
- `@/*` resolves to `src/*` (`tsconfig.json`).
- Images: local assets live in `src/assets/**` and are imported as modules for `next/image`. Remote URLs are allowed — `next.config.ts` sets wildcard `images.remotePatterns`, and destination `imageUrl` values are rendered with `next/image`.
- `src/components/ui/` is the shadcn `base-nova` set (~60 files) built on **Base UI** (`@base-ui/react`), not Radix. Use those primitives; add missing ones with `npx shadcn@latest add <name>`. Avoid editing vendored components unless the change is meant for the whole app.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`. UI files import `cn` from `"cn"`; app components import `@/lib/utils`. Don't add a local clsx/tailwind-merge implementation.
- Theme: client-side `next-themes` with class-based dark mode and a global `d` hotkey (ignored while typing); `suppressHydrationWarning` on `<html>` is intentional.
- Styling: Tailwind v4 via `@tailwindcss/postcss`, no `tailwind.config.*`. Tokens in `src/app/globals.css` include `brand` (`#15a1bf`), `ink` (`#0c0b0b`), and `banner-muted` (`#edfcff`); prefer `text-brand` / `bg-brand` etc. Merriweather is applied as a className on `<html>` in `layout.tsx`.
- Shared data helpers: `src/lib/destinations.ts` normalizes `price` (`string | number`) and formats it; `src/lib/packages.ts` holds the add-package form categories and validation; the `Destination` shape is in `src/types/destination.ts`.

## Auth

- `better-auth` with the MongoDB adapter (`src/lib/auth.ts`), mounted at `src/app/api/auth/[...all]/route.ts`; the browser client is `src/lib/auth-client.ts`, used by the `/signup` and `/login` forms (`src/components/auth/*-form.tsx`) for email/password and Google/GitHub social auth.
- `src/lib/auth.ts` opens a Mongo client at import time, so importing it requires `MONGODB_URI`. Env vars: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`; social login also references `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` and `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`.
- The navbar is session-aware (`authClient.useSession`): signed-in users see Profile + Sign Out, guests see Login / Sign Up. `/profile` is a server page that redirects guests to `/login` and reads the session via `auth.api.getSession`.
- Account linking is configured to trust `google`/`github` and set `requireLocalEmailVerified: false`, so social sign-in can attach to an existing email/password account. This is a deliberate tradeoff until email verification exists; don't remove it without adding a verification flow.
- `.env*` is gitignored and there is no `.env.example`; read variable names from the code, never commit values.
