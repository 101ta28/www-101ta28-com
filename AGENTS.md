# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Vue 3 single-page site built with Vite, Vuetify, and Cloudflare Workers. Application code lives in `src/`. Route pages are in `src/pages/`, shared UI is in `src/components/`, router setup is in `src/router/`, and plugin bootstrapping is in `src/plugins/`. Global styling is centralized in `src/styles/settings.scss`. Static assets that should be served as-is belong in `public/`; bundled assets belong in `src/assets/`.

## Build, Test, and Development Commands
- `bun install`: install dependencies. `bun.lock` is committed, so prefer Bun for consistency.
- `bun run dev`: start the local Worker-backed dev server through Wrangler.
- `bun run build`: create a production build with Vite into `dist/`.
- `bun run preview`: preview the Vite build locally.
- `bun run deploy`: deploy the site with Wrangler.
- `bun run lint`: run ESLint with `--fix` across the repository.

## Coding Style & Naming Conventions
Use 2-space indentation for `js`, `ts`, and `vue` files as defined in `.editorconfig`. Follow the existing Vue SFC style: page-level views use lowercase filenames in `src/pages/` such as `index.vue` and `contact.vue`, while reusable components use PascalCase names such as `AppBar.vue` and `WorkComp.vue`. Keep imports grouped by framework, plugins, then local modules. Run `bun run lint` before opening a PR.

## Testing Guidelines
There is currently no automated test suite configured in `package.json`. For now, treat linting and manual verification as required checks. At minimum, run `bun run lint`, `bun run build`, and confirm the main routes load in local dev. If you add tests, place them near the feature or under a future `tests/` directory and use `*.spec.*` naming.

## Commit & Pull Request Guidelines
Recent history uses short imperative commits such as `fix routing` and `update: add work note`. Keep commit subjects brief, specific, and in the imperative mood. Pull requests should include a short summary, impacted routes or components, linked issues when applicable, and screenshots for visible UI changes. Separate unrelated fixes into different commits.

## Deployment & Configuration Tips
Runtime and deployment settings are in `wrangler.toml` and `vite.config.mjs`. Avoid committing secrets; use Wrangler or Cloudflare-managed environment configuration instead of hardcoding values.
