# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000 (auto-opens browser)
npm run build     # Production build → /dist
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture

This is a **portfolio SPA** built with React 19 + TypeScript + Vite that mimics a **desktop OS interface** — projects open as draggable, resizable windows on a canvas background.

### Routing

- `/` → Home (desktop with window manager)
- `/photos` → Photos page
- `*` → NotFound

App-level wrapping: `GlobalPasswordGate` (site-wide password) → theme provider → loading screen → Router.

### Window System

The core UI metaphor is a desktop OS with draggable windows:

- **`/src/data/icons.tsx`** — defines all project icons/folders with IDs, window content components, and metadata. This is where new projects are added.
- **`WindowManager`** — renders all open windows, manages z-order via an array
- **`Window`** — individual draggable window; uses pointer events for custom drag (not react-draggable), supports fullscreen toggle and close animations
- Icon IDs follow the pattern: `nuskin--*`, `stores-*`, `legacy--*`, `welcome`

Password-protected project IDs are listed in `PASSWORD_PROTECTED_IDS` in `icons.tsx`. There's also a global site password — both stored in `localStorage` (portfolio-purpose only, not secure).

### Styling

- SCSS with component-scoped files in `/src/styles/`
- Theme switching via `[data-theme]` CSS attribute (light/dark stored in localStorage as `preferred-theme`)
- SCSS variables in `/src/styles/abstracts/_variables.scss` are auto-imported into every file via Vite config
- Path alias `@` → `src/`

### i18n

Supports English (`en`) and Japanese (`ja`):
- Translation JSON files in `/public/locales/{lang}/translation.json`
- Auto-detects browser language; stored in localStorage as `preferred-lang`
- Use `t('key')` from `react-i18next` in components

### External Services

- **Firebase** (`firebase.ts`) — analytics only
- **Supabase** (`/src/lib/supabase.ts`) — tracks likes with IP-based rate limiting (max 3/IP); uses `likes` table and `ipwho.is` for geolocation
- Environment variables use `VITE_` prefix

### Key Hooks

- `useTheme` — theme context access
- `useLike` — Supabase likes integration
- `useMagneticHover` — magnetic cursor effect on hover
- `useIsMobile` — breakpoint detection (768px)
