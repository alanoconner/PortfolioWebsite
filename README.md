# Portfolio Terminal

Immersive single-page portfolio that combines a rotating 3D interface, terminal-inspired overlays, and animated ASCII background noise. Visitors can explore experience, projects, and contact details in English, Russian, or Japanese.

## Highlights

- Interactive 3D boxes with glitch animation and binary stream reveal on selection
- Procedural ASCII noise rendered on a `<canvas>` using Perlin noise
- Multi-language content (EN / RU / JP) driven by a single content source
- Terminal-style content windows with typing animation for text reveals
- Responsive layout and adaptive animations tuned for mobile and desktop

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS

## Getting Started

```bash
# install dependencies
npm install

# start development server (http://localhost:5173)
npm run dev

# run production build
npm run build

# preview the built app locally
npm run preview
```

## Project Structure

- `src/App.tsx` – app shell, ASCII background animation, state management
- `src/components/Box3D.tsx` – interactive cube component with glitch effects
- `src/components/ContentSection.tsx` – terminal overlay for portfolio content
- `src/content/portfolioContent.ts` – language-specific copy
- `src/hooks/useTypingAnimation.ts` – reusable typing animation hook
- `src/utils/perlinNoise.ts` – Perlin noise helper for the background effect

## Customization

- Update portfolio copy in `src/content/portfolioContent.ts`
- Replace icons or labels in `App.tsx` (`BOXES` array)
- Adjust typing speed via the `useTypingAnimation` hook
- Tweak glitch effect timing in `Box3D.tsx` (`useRandomGlitch`)
- Tailwind styles can be extended in `tailwind.config.js`

## Deployment

The project builds to static assets (`npm run build`). Deploy the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

Built by Azamat Akhmadullin — feel free to fork and adapt for your own portfolio.
