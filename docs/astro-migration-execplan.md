# Astro 移行 ExecPlan

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This repository does not contain `PLANS.md`; this file follows the ExecPlan rules from `/home/tatsuya/.codex/PLANS.md` as read on 2026-07-04. If this plan is revised, keep it self-contained so a future contributor can complete the migration from this file alone.

## Purpose / Big Picture

This site is a personal profile and portfolio site. After this migration, visitors should receive mostly static HTML for `/`, `/work`, and `/contact` instead of a Vue single-page application. The practical user-visible result is faster first load, less JavaScript, clearer canonical metadata for search engines, and a simpler codebase for editing profile text and work entries.

The migration should preserve the current routes, Japanese copy, images, external links, GPG information, `robots.txt`, `sitemap.xml`, and Cloudflare Workers static asset deployment. A human should be able to run `bun run build`, preview the built site, and verify that each route renders without needing client-side routing.

## Progress

- [x] (2026-07-04T20:12:34Z) Reviewed Astro's official Bun recipe and Bun's Astro guide. The warning is about rough edges when using Bun with Astro and integrations; it does not block this static-site migration.
- [x] (2026-07-04T20:12:34Z) Inspected the current repository shape: Vue 3, Vite, Vuetify, Cloudflare Workers assets, routes in `src/pages/`, shared components in `src/components/`, assets in `public/img/`, and deployment config in `wrangler.toml`.
- [x] (2026-07-04T20:12:34Z) Documented an implementation plan for migrating to Astro while keeping Bun as the package manager.
- [x] (2026-07-04T20:25:00Z) Resolved the interrupted PageSpeed experiment by replacing the affected Vue/Vuetify files during the Astro migration instead of carrying partial Vuetify optimization changes forward.
- [x] (2026-07-04T20:25:00Z) Replaced the Vue/Vuetify app with Astro pages, shared layouts/components, data modules, and plain CSS.
- [x] (2026-07-04T20:25:00Z) Validated local Astro check, static build, preview route responses, generated metadata, sitemap output, work/contact content, and absence of Vue/Vuetify runtime assets.
- [ ] Validate deployed Cloudflare behavior after `bun run deploy`.

## Surprises & Discoveries

- Observation: Astro's Bun recipe includes a warning, but the warning is not a blocker for this project.
  Evidence: The official Astro page says Bun can expose rough edges with Astro and that some integrations may not work as expected. This project can avoid the risky path by using Bun primarily for installing packages and running scripts, while producing static HTML with Astro.
- Observation: Bun's own Astro guide says `bun create astro` is supported and notes that Bun runs the dev server with Node.js by default unless the `--bun` flag is passed.
  Evidence: This means the migration does not need to run Astro itself on the Bun runtime. Use `bun run dev`, `bun run build`, and `bun run preview`; do not require `bunx --bun astro dev`.
- Observation: `.codex/DESIGN.md` was not present when checked during planning.
  Evidence: `sed -n '1,240p' .codex/DESIGN.md` failed with `No such file or directory`. During implementation, preserve the existing visual intent and define any new design tokens locally in Astro CSS rather than inventing an unrelated palette.
- Observation: The working tree had uncommitted changes from an interrupted Vuetify/font optimization attempt.
  Evidence: At plan creation, `git diff --stat` showed changes across Vuetify, icon, font, package, and component files. Treat those as pre-migration cleanup work, not as part of the Astro migration baseline unless intentionally adopted.

## Decision Log

- Decision: Migrate to Astro with static output and no UI framework by default.
  Rationale: The site is mostly profile text, work listings, contact links, and static images. Astro can render those as HTML with little or no client JavaScript, which directly addresses PageSpeed and SEO concerns better than continuing to optimize a Vuetify SPA.
  Date/Author: 2026-07-04 / Codex
- Decision: Keep Bun as the package manager, but do not depend on Bun as the production runtime.
  Rationale: The official warning is mainly about runtime and integration compatibility. This project can use Bun for dependency management and scripts while Astro builds static files into `dist/`, which Cloudflare Workers Assets can serve without a Node or Bun server.
  Date/Author: 2026-07-04 / Codex
- Decision: Preserve the current route surface exactly: `/`, `/work`, and `/contact`.
  Rationale: Search Console and sitemap work already target these URLs. Changing route names would risk new redirects and duplicate URL states.
  Date/Author: 2026-07-04 / Codex
- Decision: Rebuild current Vuetify components as Astro components and plain CSS instead of bringing Vue islands forward.
  Rationale: Interactivity is small and can be handled with minimal client scripts. Avoiding Vue islands keeps the shipped JavaScript smaller and simplifies the final dependency graph.
  Date/Author: 2026-07-04 / Codex

## Outcomes & Retrospective

The migration is implemented locally. `bun run lint` and `bun run build` pass. `astro preview` served `/`, `/work`, and `/contact` with HTTP 200. The build generates static HTML for the main routes, route-specific canonical/description/robots metadata, sitemap files, and no Vue Router, Vuetify CSS, Material Design Icon font, or Roboto assets. Deployment has not been run from this session.

## Context and Orientation

The current project is a Vue 3 single-page application. A single-page application means the server returns one HTML shell and JavaScript decides which page to show in the browser. The app is built by Vite, styled mostly through Vuetify, and routed by `unplugin-vue-router`.

The important current files are:

- `package.json`: defines Bun scripts. Current scripts are `dev`, `build`, `preview`, `deploy`, and `lint`.
- `vite.config.mjs`: configures Vite, Vue, Vuetify, component auto-imports, font generation, and auto-generated Vue routes.
- `src/main.js`: mounts the Vue app.
- `src/App.vue`: renders the app shell with `AppBar` and `router-view`.
- `src/router/index.js`: creates the Vue router and currently updates SEO metadata after route changes.
- `src/pages/index.vue`, `src/pages/work.vue`, `src/pages/contact.vue`, and `src/pages/[...path].vue`: current route pages.
- `src/components/IndexComp.vue`, `src/components/WorkComp.vue`, `src/components/ContactComp.vue`, `src/components/AppBar.vue`, and `src/components/NotFoundComp.vue`: current UI.
- `public/img/`: static image assets used by the site. Notable files are `ta28-icon.webp`, `shinkou_hp.webp`, `gakuyusha_hp.webp`, `borrow.webp`, `42_intra.webp`, `sakito_hp.webp`, `cirkit_hp.webp`, and `ar_paper.webp`.
- `public/robots.txt` and `public/sitemap.xml`: current search-engine files. Keep them unless Astro sitemap generation replaces `sitemap.xml` with equivalent content.
- `wrangler.toml`: Cloudflare Workers config. It serves `./dist` using Workers Assets.

Astro is a static site framework. In this plan, static means Astro generates real HTML files during `bun run build`, and Cloudflare serves those files directly. There is no need for a production JavaScript server. An Astro component is a `.astro` file that can contain frontmatter JavaScript between leading fences and HTML-like markup. Do not use nested fenced code blocks in this plan; when an implementation example is needed, it is indented.

## Bun Compatibility Assessment

The Astro Bun recipe warning is acceptable for this migration. It should influence how the migration is implemented, not whether the migration happens.

Use Bun for:

- Installing and locking dependencies with `bun install`, `bun add`, and `bun remove`.
- Running project scripts with `bun run dev`, `bun run build`, `bun run preview`, and `bun run deploy`.
- Keeping `bun.lock` committed as the package lockfile.

Avoid relying on Bun for:

- Running Astro explicitly with the Bun runtime flag, such as `bunx --bun astro dev`, unless a separate proof shows all chosen integrations work.
- Server-side rendering at request time.
- Any integration whose documentation says it only supports Node unless it is tested in this repo.

This migration should use Astro's default static output. If a future requirement needs request-time rendering, re-evaluate Bun, Astro adapters, and Cloudflare runtime behavior in a separate plan.

## Target Architecture

The target repository should still build into `dist/` because `wrangler.toml` already points Cloudflare Workers Assets at `./dist`. The final app should use:

- `astro` as the site framework.
- `@astrojs/sitemap` if automatic sitemap generation is preferred; otherwise keep `public/sitemap.xml` manually.
- Plain CSS in Astro components or a global CSS file.
- Minimal browser JavaScript only for theme toggling, work filtering if retained, image dialog behavior if retained, and clipboard copying on the contact page.

The target file layout should be:

- `astro.config.mjs`: Astro config with `site: 'https://www.101ta28.com'` and static output.
- `src/layouts/BaseLayout.astro`: shared HTML shell, metadata, header, footer, theme script, and canonical handling.
- `src/components/Header.astro`: navigation replacing `AppBar.vue`.
- `src/components/Icon.astro`: optional inline SVG helper if icons are kept without an icon font.
- `src/components/WorkCard.astro`: repeated work card markup.
- `src/data/works.js`: data moved from `src/pages/work.vue`.
- `src/data/contact.js`: social link data moved from `ContactComp.vue`.
- `src/pages/index.astro`: home page.
- `src/pages/work.astro`: work page.
- `src/pages/contact.astro`: contact page.
- `src/pages/404.astro`: not-found page.
- `src/styles/global.css`: shared colors, typography, layout, buttons, cards, forms, and responsive rules.
- `public/img/`: keep current images unless moving them to `src/assets/` for Astro image optimization.

Do not carry forward Vuetify, Vue Router, Vite Vue plugins, Material Design Icon font, or generated typed router files unless a specific retained Vue island requires them. The default target is no Vue runtime.

## Plan of Work

Start by cleaning the baseline. Because the current working tree may contain changes from an interrupted performance experiment, inspect `git status -sb`. If the migration starts immediately after this plan was written, either commit those changes separately as a completed optimization or revert them before the Astro work. Do not mix partial Vuetify optimization changes with the Astro migration.

Then replace the framework dependencies. Update `package.json` so scripts are:

    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "wrangler deploy",
    "lint": "astro check"

Add `astro` and, if using generated sitemaps, `@astrojs/sitemap`. If using TypeScript checking or Astro's check command, add `typescript` and `astro`'s recommended check dependencies if prompted. Remove `vue`, `vue-router`, `vuetify`, `vite-plugin-vuetify`, `@vitejs/plugin-vue`, `unplugin-vue-router`, `unplugin-vue-components`, font plugins, and icon font packages after the Astro files compile without them.

Create `astro.config.mjs` with `site: 'https://www.101ta28.com'`. Use static output, which is Astro's default, so the Cloudflare Worker can continue serving the generated `dist` directory. If `@astrojs/sitemap` is used, configure it there and delete `public/sitemap.xml` only after verifying the generated sitemap contains `/`, `/work`, and `/contact`.

Create `src/layouts/BaseLayout.astro`. It must accept `title`, `description`, `canonicalPath`, and optional `robots`. It should render `<html lang="ja">`, charset, viewport, favicon, `link rel="me"`, canonical URL using the `https://www.101ta28.com` host, description, robots, Open Graph tags, and Twitter card tags. It should include a skip link, header navigation, the page slot, and a compact footer. The body text line-height must be at least `1.5` for Japanese readability.

Move the visual system into `src/styles/global.css`. Use system fonts instead of webfont downloads. Define a small palette using CSS variables based on the current visual intent: a primary blue, neutral text, neutral background, surface, border, secondary accent, success/green, warning/orange, and danger/red. Keep layout widths stable with `max-width` containers and responsive grids. Avoid rebuilding Vuetify's component API; write semantic HTML with classes such as `.button`, `.card`, `.chip`, `.section`, and `.grid`.

Rebuild the home page in `src/pages/index.astro`. Preserve the current visible content: profile image, name `今井 竜也`, subtitle `Web Developer & Software Engineer`, short introduction, quick links to `/work`, resume on GitHub, blog, profile text, interest chips, skill cards, and contact call-to-action. The page must be useful without client JavaScript.

Rebuild the work page in `src/pages/work.astro`. Move the `works` array from `src/pages/work.vue` into `src/data/works.js`. Render all works sorted by descending year and descending id. Keep the current fields: year, title, text, image, tech array, category, category color, and external link. For the first Astro version, prefer a static page with visible category and technology chips rather than a JavaScript-heavy filter. If filtering is retained, implement it as progressive enhancement: all work cards remain visible in HTML, and a small script hides cards only after the page loads.

Rebuild the contact page in `src/pages/contact.astro`. Move social link data into `src/data/contact.js`. Render GitHub, X, Instagram, Blog, LinkedIn, and BlueSky. Preserve the GPG fingerprint and public key from `ContactComp.vue`. The public key can be in a `<details>` element so it works without JavaScript. Clipboard copying can be enhanced with a small inline script using `navigator.clipboard.writeText`; if the script fails, the text remains selectable.

Replace `AppBar.vue` with `Header.astro`. Use normal `<a>` links for internal navigation so crawlers and no-JS users can navigate. The theme toggle can be implemented with a tiny script that stores `theme=dark` or `theme=light` in `localStorage` and toggles a `data-theme` attribute. The site must remain readable if localStorage or JavaScript is unavailable.

Handle images deliberately. Keep `public/img/ta28-icon.webp` for the profile image initially. For work images, either keep `public/img/...` paths or move them to `src/assets/` and use Astro's image tooling. If optimizing images, make `ar_paper.webp` a priority because it is much larger than the other images. Every image needs explicit width and height or CSS aspect-ratio to prevent layout shift.

Keep search-engine files correct. Either keep `public/robots.txt` and `public/sitemap.xml` exactly aligned to the canonical `https://www.101ta28.com` host, or use `@astrojs/sitemap` and verify generated output. Ensure `https://101ta28.com/` still redirects to `https://www.101ta28.com/` in Cloudflare outside the repository; code alone cannot force that apex-to-www redirect if Cloudflare DNS or redirect rules serve both hosts.

Finally remove old Vue-specific files only after Astro pages render. Delete `src/main.js`, `src/App.vue`, `src/router/index.js`, `src/plugins/`, `src/components/*.vue`, `typed-router.d.ts`, and `components.d.ts` when they are no longer imported. Remove `vite.config.mjs` only after confirming Astro does not need it. Update `README.md` and `AGENTS.md` commands if they still describe the old Vue/Vite stack.

## Concrete Steps

From the repository root `/home/tatsuya/develop/www-101ta28-com`, begin with a clean baseline check:

    git status -sb

If there are uncommitted Vuetify/font optimization changes from the interrupted PageSpeed attempt, decide explicitly before continuing. To keep them, finish and validate them in a separate commit. To discard them, revert only those files after confirming they are not user-authored. The migration should start from a known baseline.

Install Astro dependencies:

    bun add astro @astrojs/sitemap
    bun add -d typescript

Update `package.json` scripts and dependencies as described in Plan of Work. Run:

    bun install

Create the Astro config:

    touch astro.config.mjs

The config should set `site` to `https://www.101ta28.com`. If using `@astrojs/sitemap`, include the integration. The generated `dist/` directory should remain the build output.

Create the target directories:

    mkdir -p src/layouts src/components src/data src/styles

Add `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/styles/global.css`, `src/data/works.js`, `src/data/contact.js`, `src/pages/index.astro`, `src/pages/work.astro`, `src/pages/contact.astro`, and `src/pages/404.astro`.

Run the development server:

    bun run dev

Open `http://localhost:4321/`, `http://localhost:4321/work`, and `http://localhost:4321/contact`. Each page should render directly on refresh. If a route only works after navigating from another page, the migration has accidentally kept SPA behavior and must be corrected.

Build and preview:

    bun run build
    bun run preview

Check generated output:

    find dist -maxdepth 2 -type f | sort
    rg -n "canonical|description|robots|og:" dist

Expected evidence should include HTML files for the routes, a canonical link using `https://www.101ta28.com/`, and route-specific descriptions. If `@astrojs/sitemap` is used, `dist/sitemap-index.xml` or `dist/sitemap-0.xml` may exist depending on Astro's sitemap output; verify it contains `/`, `/work`, and `/contact`.

After the Astro site passes validation, remove obsolete Vue files and dependencies. Run `bun run build` again after removals. Do not leave unused Vue/Vuetify packages in `package.json`.

## Validation and Acceptance

The migration is accepted when all of the following are true:

The local build succeeds:

    bun run build

The local preview serves each route directly:

    curl -I http://localhost:4321/
    curl -I http://localhost:4321/work
    curl -I http://localhost:4321/contact

Each response should be `200`. If using `astro preview`, the port may differ; use the port printed by Astro.

The generated HTML has canonical metadata before any client JavaScript runs:

    rg -n "rel=\"canonical\"|name=\"description\"|name=\"robots\"" dist

The work page contains all nine current work entries, including `AI沢みのり 開発プロジェクト`, and preserves the external link `https://www.aizawaminori.com/developer`.

The contact page contains all six current social destinations and the GPG fingerprint `DDEC7C9789DA48D8798F53A4ACF92881F31DA3B4`.

The built asset payload is materially smaller than the current Vue/Vuetify build. As a rough acceptance threshold, the final build should not include Vuetify CSS, Material Design Icon font files, Vue Router chunks, or a large single app JavaScript bundle for simple page rendering. Use:

    du -h dist/assets/* | sort -h
    rg -n "vuetify|vue-router|materialdesignicons|Roboto" dist

The second command should produce no matches unless text content intentionally mentions those terms.

Manual browser acceptance:

- On a mobile-width viewport, the header navigation is usable and text does not overlap.
- On `/`, the profile image, name, introduction, skills, and contact call-to-action are visible.
- On `/work`, cards have stable image areas and readable Japanese text.
- On `/contact`, social links open their destinations, the GPG public key is accessible, and copy buttons work when JavaScript is enabled.
- With JavaScript disabled, core page content and links remain usable.

Deployment acceptance:

    bun run deploy

After deploy, verify:

    curl -I https://www.101ta28.com/
    curl -I https://www.101ta28.com/work
    curl -I https://www.101ta28.com/contact
    curl -I https://www.101ta28.com/robots.txt
    curl -I https://www.101ta28.com/sitemap.xml

Each should return `200` except any intentionally configured redirects. Also verify outside the repository that `https://101ta28.com/` redirects to `https://www.101ta28.com/` with `301`; if it returns `200`, fix Cloudflare redirect rules before asking Search Console to validate canonical issues.

## Idempotence and Recovery

The migration should be done in small commits. A safe sequence is: first add Astro alongside the existing app, then make Astro pages render, then switch scripts and remove Vue, then update docs, then deploy. If an intermediate step fails, keep the old Vue files until the Astro replacement builds.

If dependency changes fail under Bun, run `bun install` again after checking `package.json`. If an Astro integration behaves unexpectedly under Bun, do not switch the whole project to npm immediately. First confirm whether the issue only appears when using the Bun runtime flag. The intended path uses Bun as package manager, not as the runtime for production.

If route generation fails, simplify. Remove optional sitemap generation temporarily, keep manual `public/sitemap.xml`, and focus on getting `/`, `/work`, and `/contact` to static HTML.

If styling regresses, compare against the current Vue pages in a browser before deleting old files. The goal is not pixel-perfect Vuetify reproduction; the goal is a clean profile site with the same content, accessible layout, and much less client payload.

If Search Console still reports duplicate canonical issues after deploy, inspect the exact URL Google reports. Code changes in this repository can set canonical tags, but apex-to-www redirects must be configured in Cloudflare. Both `https://101ta28.com/` and `https://www.101ta28.com/` returning `200` is a duplicate-content signal even when canonical tags exist.

## Artifacts and Notes

Official source review:

- Astro's Bun recipe states that Bun can be used with Astro but warns that rough edges may appear and integrations may not always work as expected.
- Bun's Astro guide supports creating an Astro app with `bun create astro` and states that the Bun runtime is only used for Astro dev when explicitly passing the `--bun` flag.

Current route/content inventory:

- `/` comes from `src/pages/index.vue` and `src/components/IndexComp.vue`.
- `/work` comes from `src/pages/work.vue` and `src/components/WorkComp.vue`.
- `/contact` comes from `src/pages/contact.vue` and `src/components/ContactComp.vue`.
- Unknown routes currently use `src/pages/[...path].vue` and `src/components/NotFoundComp.vue`; replace this with `src/pages/404.astro`.

Current work entries:

- 2025: AI沢みのり 開発プロジェクト.
- 2023: 不動産HPの改良, 会社HPの改良, 社内システムの開発・運用.
- 2022: 大手コンテンツのHP改良, 42東京入学.
- 2020: 学生向けアンケートサイトの保守管理, ホームページ改修.
- 2019: 室内情報可視化の研究.

Current contact destinations:

- GitHub: `https://github.com/101ta28`.
- X: `https://twitter.com/101ta28`.
- Instagram: `https://www.instagram.com/101ta28/`.
- Blog: `https://blog.101ta28.com`.
- LinkedIn: `https://linkedin.com/in/101ta28`.
- BlueSky: `https://bsky.app/profile/101ta28.com`.

## Interfaces and Dependencies

At the end of the migration, the public interface is the website itself:

- `GET /` returns the home page.
- `GET /work` returns the work page.
- `GET /contact` returns the contact page.
- `GET /robots.txt` returns crawl instructions pointing to the sitemap.
- `GET /sitemap.xml` or the generated Astro sitemap URL returns canonical site URLs.

The implementation dependencies should be:

- `astro` for static site generation.
- `@astrojs/sitemap` only if generated sitemap output is used.
- `wrangler` for deploy, as already used by this repository.
- `bun` as the package manager and script runner.

Avoid these dependencies in the final implementation unless a separate decision log entry justifies them:

- `vue`, `vue-router`, `vuetify`, `vite-plugin-vuetify`, and Vue auto-routing packages.
- Material Design Icon webfont packages.
- Webfont generation packages for Roboto.

The data modules should export plain arrays so pages can import them without framework runtime code:

    // src/data/works.js
    export const works = [
      { id: 9, year: '2025', title: 'AI沢みのり 開発プロジェクト', ... }
    ];

    // src/data/contact.js
    export const socialLinks = [
      { title: 'GitHub', href: 'https://github.com/101ta28', description: 'コードとプロジェクト' }
    ];

The base layout should accept props with stable names:

    const {
      title = '101ta28 Site',
      description = '101ta28のポートフォリオサイトです。',
      canonicalPath = '/',
      robots = 'index,follow'
    } = Astro.props;

When the migration is complete, update this ExecPlan's Progress and Outcomes sections with the final commit hash, validation outputs, and any deviations from the plan.
