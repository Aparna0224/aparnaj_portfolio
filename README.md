# Aparna J — Portfolio

Personal portfolio of **Aparna J**, AI Engineer & Backend Developer based in Chennai, India.

A single-page site with a warm "saffron field" look: a field of saffron particles that rolls like wind over a crop field, quiet corner UI, a numbered section index and scroll-driven animations built with anime.js.

## ✨ Features

- **Particle field background:** canvas animation that reacts to the cursor and dims as you scroll
- **Animated sections:** masked word-by-word headings, scroll reveals, counting stats, a self-drawing experience timeline and SVG icons that draw themselves
- **Interactions:** magnetic buttons, 3D-tilting cards, a cursor ring and a live Chennai clock
- **Sections:** Intro, About, Experience, Work, Recognition (achievements & certifications), Contact
- **Responsive** from small phones to wide desktops; hover-only effects switch off on touch screens
- **Accessible motion:** everything respects `prefers-reduced-motion`, and content stays visible if JavaScript fails

## 🧰 Tech Stack

- ▲ Next.js 16 (App Router, home page prerendered as static HTML)
- ⚛️ React 19
- 🟦 TypeScript
- 🎨 Tailwind CSS v3
- ✨ anime.js v4
- 🔤 Manrope, Instrument Serif and JetBrains Mono (via `next/font`)
- 🧪 Vitest + Testing Library

## 📁 Folder Structure

```
├── public/images/            # portrait and favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, SEO metadata, grain overlay
│   │   ├── page.tsx          # assembles the page
│   │   └── globals.css       # theme classes and animation start states
│   ├── components/
│   │   ├── TopBar.tsx        # wordmark, status, Chennai time, CTA
│   │   ├── SideIndex.tsx     # fixed numbered section index (desktop)
│   │   ├── Hero.tsx, About.tsx, Experience.tsx, Projects.tsx,
│   │   │   Achievements.tsx, Contact.tsx, Footer.tsx
│   │   ├── SectionHeading.tsx, SectionDivider.tsx, icons.tsx
│   │   └── field/            # ParticleField, CursorRing, Grain
│   └── lib/
│       ├── site.ts           # ALL site content: profile, experience, projects, skills…
│       └── motion.ts         # anime.js helpers (scope hook, reveals, magnetic, tilt, SVG draw)
├── tailwind.config.js        # ink / cream / saffron colour tokens and font families
├── next.config.ts
├── eslint.config.mjs
└── vitest.config.ts
```

## ✏️ Editing content

All text lives in **`src/lib/site.ts`**: name, role, email, links, stats, education, skills, experience, projects, achievements and certifications. Edit that file and the page updates; no component changes needed.

To change the portrait, replace `public/images/aparnaj.jpg`.

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

## 📜 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | Start the dev server        |
| `npm run build` | Production build            |
| `npm run start` | Serve the production build  |
| `npm run lint`  | Run ESLint (Next.js config) |
| `npm test`      | Run tests with Vitest       |

