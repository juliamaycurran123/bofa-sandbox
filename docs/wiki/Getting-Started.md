# Getting Started

## Prerequisites

- **Node.js 18** — the CI pipeline and local tooling are pinned to Node 18. Use `nvm use 18` before running any npm/ng commands. Node 20+ introduces subtle breakage with the Angular CLI.
- npm (ships with Node)

## Install & Run

```bash
nvm use 18
npm install --legacy-peer-deps
npm start                       # dev server at http://localhost:4200
```

## Build

```bash
npm run build          # development build
npm run build:prod     # production build (output in dist/clearvault/)
```

## Test

```bash
npm test               # Karma + Jasmine (watch mode)
npm run test:ci        # single-run, headless Chrome, with coverage
```

## Lint

```bash
npm run lint           # Angular ESLint (requires .eslintrc to be configured)
```

> **Note:** At the time of writing, no `.eslintrc` config file exists. `ng lint` will fail until one is added.

## Useful Scripts (package.json)

| Script | Description |
|--------|-------------|
| `npm start` | `ng serve` — dev server with live reload |
| `npm run build` | `ng build` — development build |
| `npm run build:prod` | `ng build --configuration=production` |
| `npm test` | `ng test` — Karma in watch mode |
| `npm run test:ci` | headless Chrome, single-run, code coverage |
| `npm run lint` | `ng lint` — ESLint |
