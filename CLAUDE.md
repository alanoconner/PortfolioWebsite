# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

No test suite is configured.

## Architecture

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS 4

**Single-page portfolio site** — no router. Navigation is state-driven: `activeSection` in `App.tsx` controls which content panel is visible. Clicking one of four 3D boxes (INTRO / EXP / PROJ / CONTACT) sets `activeSection`; clicking outside or pressing a close button clears it.

### Key files

- `src/App.tsx` — root state (`activeSection`, `lang`, `isMobile`), ASCII canvas background via Perlin noise, language switcher buttons
- `src/components/Box3D.tsx` — animated 3D box used as nav items; handles glitch effect via `useRandomGlitch`
- `src/components/ContentSection.tsx` — English content panel
- `src/components/ContentSectionRU.tsx` — Russian content panel
- `src/components/ContentSectionJP.tsx` — Japanese content panel

### i18n

Three separate content components, one per language (EN / RU / JP). Language state lives in `App.tsx` (`lang`), toggled by buttons in the bottom-right corner. No i18n library — content is hardcoded per component.

### Styling

Custom Tailwind theme in `tailwind.config.js` defines a terminal-style palette: `terminal-green`, `terminal-cyan`, `terminal-yellow`, `terminal-red`, plus mono font stack. Use these tokens instead of raw colors.

### Animations

- ASCII canvas: drawn on `<canvas>` in `App.tsx` using requestAnimationFrame; mobile gets lower resolution/frame rate
- Typing effect: `useTypingAnimation(text, speed, delay)` custom hook in ContentSection components
- Box glitch: `useRandomGlitch()` hook in Box3D

