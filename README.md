# S Satishwaran — Portfolio

A personal eportfolio built with React, Vite and Tailwind CSS, deployed to GitHub Pages at
[https://satishwaran-s.github.io](https://satishwaran-s.github.io).

## Stack

- React 19 + React Router (HashRouter)
- Vite 8
- Tailwind CSS v4 (dark/light themes via the `.dark` class)
- Oxlint

## Commands

```sh
npm install       # install dependencies
npm run dev       # start the dev server
npm run lint      # run oxlint
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run deploy    # build + publish dist/ to the gh-pages branch
npm run images    # retry downloading project images from the Google Sites source
```

## Structure

- `src/data/profile.js` — profile, experience, education and skills content
- `src/data/projects.js` — all project content (paragraphs, bullets, images, videos)
- `src/components/` — reusable UI components (Navbar, Footer, Reveal, ProjectCard, Video, ...)
- `src/pages/` — Home, About, Projects, ProjectDetail
- `scripts/download-images.mjs` — image downloader (manifest in `scripts/images.json`)
- `.github/workflows/deploy.yml` — build + deploy to GitHub Pages on push to `main`

## Deployment

Two options:

1. **GitHub Actions (recommended):** push to `main` and the workflow builds and deploys
   automatically. Ensure GitHub Pages source is set to "GitHub Actions".
2. **Manual:** run `npm run deploy` (requires the `gh-pages` branch as the Pages source).
