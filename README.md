# Structra Docs

Documentation site for Structra, built with Docusaurus 3.

## Stack

- Docusaurus `3.9.2`
- React `19`
- Tailwind (utility support in custom styling)
- Markdown/MDX docs

## Current Site Behavior

- Docs are served at the root path (`/`), not `/docs`.
- Blog is disabled.
- Sidebar search is injected by a custom script: `static/js/sidebar-search.js`.
- Theme is dark-first with an explicit light/dark toggle only (no system mode).

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm start
```

Build static site:

```bash
npm run build
```

Serve built output:

```bash
npm run serve
```

Clear Docusaurus cache:

```bash
npm run clear
```

## Project Structure

```text
docs/
├── docs/                          # Markdown docs content
│   ├── index.md
│   ├── getting-started.md
│   ├── account-and-identity.md
│   └── evaluation-principles/
├── src/
│   ├── css/custom.css             # Global theme + UI styling
│   └── components/
│       ├── HomepageFeatures/
│       └── RuleTable/
├── static/js/sidebar-search.js    # Sidebar search behavior
├── docusaurus.config.js           # Site config, navbar/footer/theme
└── sidebars.js                    # Sidebar structure
```

## Key Config Notes

- `docusaurus.config.js`
  - `docs.routeBasePath = '/'`
  - `theme.customCss = './src/css/custom.css'`
  - `scripts` includes `/js/sidebar-search.js`
  - `colorMode.defaultMode = 'dark'`
  - `respectPrefersColorScheme = false`

## Content Model

Main documentation areas:

- Getting Started
- Account and Identity
- Evaluation Principles
  - Structra Basics (Basic / Pro / Enterprise rule taxonomy)
  - Production System Design Principles

Important: `Basic / Pro / Enterprise` in these docs refer to evaluation rule tiers, not subscription plan names.

## Writing and Editing Docs

- Add/update docs under `docs/docs/`.
- Keep frontmatter (`title`, `slug`, etc.) consistent.
- Use Markdown; use MDX only when components are needed.
- If using custom table wrappers, `RuleTable` is available at:
  - `src/components/RuleTable/index.jsx`

## Deployment

Deploy command (if configured for your environment):

```bash
npm run deploy
```

## Troubleshooting

- If theme toggle or announcement/footer styles appear stale, hard refresh the browser.
- If local output seems inconsistent after major style/config changes, run:

```bash
npm run clear && npm start
```
