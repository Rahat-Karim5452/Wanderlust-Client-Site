<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Use npm only (`package-lock.json` is the lockfile).
- `npm run dev` / `npm run build` / `npm run start` wrap Next 16 with Turbopack. `next build` type-checks but does **not** run ESLint — run lint separately.
- `npm run lint` = flat-config ESLint over the repo; `npm run typecheck` = `tsc --noEmit`; `npm run format` rewrites only `**/*.{ts,tsx}` with Prettier (no semicolons, double quotes, LF) plus Tailwind class sorting for `cn`/`cva`.
- No tests, test runner, or CI workflow is checked in. lint + typecheck + build are the available checks.
- Baseline `npm run lint` exits 1 on vendored shadcn code: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Treat those two as pre-existing and fix anything else it reports.

## Structure and conventions

- App Router under `src/app`: `/` (`page.tsx`) and `/add-destination` (stub). `layout.tsx` wraps every route and already renders `Navbar` + `Footer` inside `ThemeProvider`; pages should render only their own sections, not the shared chrome.
- `@/*` resolves to `src/*` (`tsconfig.json`).
- Images live in `src/assets/**` and are imported as modules (`import banner from "@/assets/Banner.png"`) for `next/image`; `public/` is empty. `next.config.ts` has no `images.remotePatterns`, so remote image URLs need config first.
- `src/components/ui/` is the shadcn `base-nova` set (~60 files) built on **Base UI** (`@base-ui/react`), not Radix. Use those primitives; add missing ones with `npx shadcn@latest add <name>`. Avoid editing vendored components unless the change is meant for the whole app.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`. UI files import `cn` from `"cn"`; app components import `@/lib/utils`. Don't add a local clsx/tailwind-merge implementation.
- Theme: client-side `next-themes` with class-based dark mode and a global `d` hotkey (ignored while typing); `suppressHydrationWarning` on `<html>` is intentional.
- Styling: Tailwind v4 via `@tailwindcss/postcss`, no `tailwind.config.*`. Tokens in `src/app/globals.css` include `brand` (`#15a1bf`), `ink` (`#0c0b0b`), and `banner-muted` (`#edfcff`); prefer `text-brand` / `bg-brand` etc. Merriweather is applied as a className on `<html>` in `layout.tsx`.
- Shiki highlighting is opt-in: languages/aliases must be registered in `src/lib/highlighter.tsx`; `src/hooks/use-highlighted-code.ts` streams via `GrammarState`. Unregistered languages render as plain text. `src/components/ui/code-block.tsx` is presentational and does not highlight on its own.
