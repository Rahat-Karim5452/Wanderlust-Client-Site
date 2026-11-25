<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Use npm (`package-lock.json` is the only lockfile).
- `npm run dev` / `npm run build` / `npm run start` wrap Next 16 (Turbopack). `next build` runs TypeScript but **not** ESLint here — run lint separately.
- `npm run lint` = flat-config ESLint; `npm run typecheck` = `tsc --noEmit`; `npm run format` rewrites only `**/*.{ts,tsx}` with Prettier + Tailwind class sorting.
- No test script, test framework, or CI workflow is checked in; lint + typecheck + build are the available checks.
- Baseline: `npm run lint` currently fails on checked-in shadcn code (`react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`); don't assume your edit caused it.

## Structure and conventions

- Source lives under `src/`; `@/*` resolves to `src/*` (`tsconfig.json`). App Router only: `src/app/layout.tsx` is the root wrapper, `src/app/page.tsx` is currently the only route.
- `ThemeProvider` is client-side and wraps the app with class-based dark mode (`.dark`) plus a global `d` toggle hotkey; `suppressHydrationWarning` in the layout is intentional for `next-themes`.
- Tailwind v4 comes through `@tailwindcss/postcss`; there is no `tailwind.config.*`. Tokens live in `src/app/globals.css` as oklch CSS variables.
- shadcn/ui uses `base-nova`, RSC + TSX, CSS variables, and lucide icons; `components.json` defines the aliases. `src/components/ui/` already contains ~60 preinstalled components; add missing ones with `npx shadcn@latest add <name>`.
- `src/lib/utils.ts` only re-exports `cn` from the `cn` package; don't add a local clsx/tailwind-merge implementation.
- Shiki highlighting is custom: register new languages/aliases in `src/lib/highlighter.tsx`; `src/hooks/use-highlighted-code.ts` streams via GrammarState. Unlisted languages render as plain text.
