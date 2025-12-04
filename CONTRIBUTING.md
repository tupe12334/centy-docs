# Contributing to Centy Docs

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm build
```

This command generates static content into the `build` directory.

## Deployment to Cloudflare Pages

### Option 1: Connect GitHub Repository (Recommended)

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click "Create a project" > "Connect to Git"
3. Select the `centy-io/centy-docs` repository
4. Configure build settings:
   - **Framework preset**: None (or Docusaurus if available)
   - **Build command**: `pnpm build`
   - **Build output directory**: `build`
   - **Node.js version**: `20` (set via environment variable `NODE_VERSION=20`)
5. Click "Save and Deploy"

### Option 2: Direct Deploy with Wrangler

```bash
# Login to Cloudflare (first time only)
pnpm wrangler login

# Deploy to Cloudflare Pages
pnpm pages:deploy
```

### Local Preview with Wrangler

```bash
pnpm pages:dev
```

This builds the site and serves it locally using Cloudflare's Wrangler, simulating the production environment.
