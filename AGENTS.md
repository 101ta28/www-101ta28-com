# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Astro static site deployed with Cloudflare Workers Assets. Application code lives in `src/`. Route pages are in `src/pages/`, shared Astro components are in `src/components/`, shared layouts are in `src/layouts/`, page data is in `src/data/`, and global styling is centralized in `src/styles/global.css`. Static assets that should be served as-is belong in `public/`; bundled assets belong in `src/assets/`.

## Build, Test, and Development Commands
- `bun install`: install dependencies. `bun.lock` is committed, so prefer Bun for consistency.
- `bun run dev`: start the local Astro dev server.
- `bun run build`: create a production static build with Astro into `dist/`.
- `bun run preview`: preview the Astro build locally.
- `bun run deploy`: deploy the site with Wrangler.
- `bun run lint`: run `astro check`.

## Coding Style & Naming Conventions
Use 2-space indentation for `js`, `ts`, and `astro` files as defined in `.editorconfig`. Page-level routes use lowercase filenames in `src/pages/` such as `index.astro` and `contact.astro`, while reusable components use PascalCase names such as `Header.astro` and `WorkCard.astro`. Keep imports grouped by framework, then local modules. Run `bun run lint` before opening a PR.

## Testing Guidelines
There is currently no automated test suite configured in `package.json`. For now, treat linting and manual verification as required checks. At minimum, run `bun run lint`, `bun run build`, and confirm the main routes load in local dev. If you add tests, place them near the feature or under a future `tests/` directory and use `*.spec.*` naming.

## Commit & Pull Request Guidelines
Recent history uses short imperative commits such as `fix routing` and `update: add work note`. Keep commit subjects brief, specific, and in the imperative mood. Pull requests should include a short summary, impacted routes or components, linked issues when applicable, and screenshots for visible UI changes. Separate unrelated fixes into different commits.

## Deployment & Configuration Tips
Runtime and deployment settings are in `wrangler.toml` and `astro.config.mjs`. Avoid committing secrets; use Wrangler or Cloudflare-managed environment configuration instead of hardcoding values.
