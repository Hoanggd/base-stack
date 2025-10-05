# Base Stack Monorepo

A modern TypeScript monorepo powered by Turborepo and pnpm. It includes a Next.js web app, a documentation site, a reusable UI package, shared ESLint/TS configs, and a small CLI for scaffolding.

## Features

- **Monorepo tooling**: Turborepo, pnpm workspaces
- **Apps**: Next.js web app (`apps/web`), Next.js docs site (`apps/docs`)
- **Packages**:
    - `@workspace/ui`: Reusable React UI components
    - `@workspace/eslint-config`: Shared ESLint configs
    - `@workspace/typescript-config`: Shared TS configs
    - `base-stack` (CLI): Project scaffolding utilities
- **DX**: TypeScript, ESLint, Prettier, fast incremental builds

## Prerequisites

- Node.js >= 20
- pnpm `10.4.1` (workspace is pinned)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run all apps in dev (Turbo orchestrates):

```bash
pnpm dev
```

Build everything:

```bash
pnpm build
```

Lint (workspace-aware):

```bash
pnpm lint
```

Format markdown and TS/TSX:

```bash
pnpm format
```

### Run a single app

- Web app (Next.js, port 3000 by default):

```bash
pnpm --filter web dev
```

- Docs site (Next.js, port 9009):

```bash
pnpm --filter docs dev
```

### Type checking

The web app exposes an explicit type-check script:

```bash
pnpm --filter web run typecheck
```

## Project Structure

```
apps/
  docs/            # Next.js docs site (Contentlayer, MDX, UI demos)
  web/             # Next.js application

packages/
  ui/              # @workspace/ui component library (React)
  eslint-config/   # @workspace/eslint-config shared lint rules
  typescript-config/ # @workspace/typescript-config base tsconfigs
  create-base-stack/ # CLI (bin: base-stack)

turbo.json         # Turborepo pipeline config
pnpm-workspace.yaml# pnpm workspace config
```

## Apps

### `apps/web`

- Next.js (App Router), React, `@workspace/ui`
- Scripts:
    - `dev`: `next dev --turbopack`
    - `build`: `next build`
    - `start`: `next start`
    - `lint`, `lint:fix`, `typecheck`

### `apps/docs`

- Next.js docs site with `contentlayer2`, MDX, and examples using `@workspace/ui`
- Scripts:
    - `dev`: `next dev -p 9009`
    - `build`: `next build`
    - `start`: `next start`
    - `lint`

## Packages

### `@workspace/ui`

- Reusable UI components and utilities
- Exports:
    - `./globals.css`
    - `./postcss.config`
    - `./lib/*`, `./components/*`, `./hooks/*`, `./core/*`
- Consumed by both apps via workspace protocol

### `@workspace/eslint-config`

- Shared ESLint configurations:
    - `./base`
    - `./next-js`
    - `./react-internal`

### `@workspace/typescript-config`

- Central TS configs consumed by workspaces
