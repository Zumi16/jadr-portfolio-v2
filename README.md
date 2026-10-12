# Jadr Panes Portfolio — Design 2

Independent React and Vite portfolio matching the original page design, content, and styling, with fixed left-side navigation instead of the top navbar. The first version remains in the separate `jadr-portfolio` folder. `src/styles.css` matches V1; `src/layout-v2.css` contains only sidebar styling and the space reserved for it.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

The development server defaults to `http://localhost:5174/`, so both designs can run at once (the first design uses port 5173).

On Vercel, select `jadr-portfolio-v2` as the root directory when your repository contains both portfolio folders. Use the Vite preset, `npm run build`, and `dist` as the output directory. If this folder is its own repository, use the repository root.
