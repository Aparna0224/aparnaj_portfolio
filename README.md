# Aparna J — Portfolio

Personal portfolio site built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript**.

## 🧰 Tech Stack

- ▲ Next.js 16 (App Router, static prerendering)
- ⚛️ React 19
- 🎨 Tailwind CSS v3
- ✨ anime.js v4 (animations)
- 🟦 TypeScript
- 🧪 Vitest + Testing Library

## 📁 Folder Structure

```
├── public/              # static assets (images)
├── src/
│   ├── app/
│   │   ├── layout.tsx   # root layout + SEO metadata
│   │   ├── page.tsx     # home page (projects & skills data)
│   │   ├── globals.css
│   │   └── App.css
│   ├── components/      # Navbar, Hero, About, Projects, Contact, Footer
│   │   └── space/       # starfield, nebula, shooting stars, planets
│   └── lib/motion.ts    # anime.js scope + scroll-reveal helpers
├── next.config.ts
├── tailwind.config.js
├── postcss.config.cjs
├── eslint.config.mjs
└── vitest.config.ts
```

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

## 📜 Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint (Next.js config)  |
| `npm test`      | Run tests with Vitest        |
