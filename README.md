# Structra Docs

## Overview

Structra Docs is the Docusaurus-based documentation site for `docs.structra.cloud`. It is the product knowledge layer of the platform and is intentionally separated from both the end-user application and the backend API service.

This layer is responsible for:
- Explaining the platform and its concepts
- Publishing onboarding and account guidance
- Presenting Structra’s evaluation framework and rule taxonomy
- Rendering searchable documentation content with product-aligned styling

It does **not** handle live product state, authenticated collaboration, API-side business logic, or billing operations.

---

## High-Level Documentation Flow

1. A visitor opens the documentation site
2. Docusaurus serves static documentation pages from markdown content
3. Sidebar navigation organizes the content hierarchy
4. A custom sidebar search script improves in-site document discovery
5. Readers move from getting started material into deeper evaluation-principles content

---

## Documentation Features & Functional Breakdown

---

## 1. Documentation Landing Experience

The docs site acts as a focused product knowledge surface rather than a marketing site clone.

### Available Capabilities
- Open the documentation home page
- Navigate core documentation sections from the sidebar and navbar
- Move directly into getting-started and evaluation-principles content

### UX Characteristics
- Docs are served from the root route instead of `/docs`
- The presentation is product-branded and dark-first
- Navigation links connect the reader back to the main Structra product

---

## 2. Core Documentation Areas

The current content model is intentionally narrow and structured around product adoption plus evaluation literacy.

### Primary Sections
- Documentation index
- Getting Started
- Account and Identity
- Evaluation Principles

### Evaluation Principles Areas
- Structra Basics
- Production System Principles

### Structra Basics Taxonomy
- Free
- Pro
- Enterprise

### Important Interpretation
- `Free`, `Pro`, and `Enterprise` in this docs area represent evaluation-rule tiers
- They are not the same thing as product subscription plan names

---

## 3. Rule Library Presentation

The docs repository contains a substantial rule library under the evaluation-principles area.

### Content Characteristics
- Rule-specific markdown files are grouped by tier
- Category index files organize the hierarchy
- Individual rule documents explain distinct architectural expectations

### Purpose
- Make the evaluation framework explicit
- Help users understand how Structra scores or critiques system designs
- Keep rule content isolated from application code and backend logic

---

## 4. Search & Navigation Experience

The docs site adds a custom navigation enhancement beyond base Docusaurus behavior.

### Available Capabilities
- Sidebar-driven browsing
- Auto-generated content hierarchy from the docs tree
- Custom sidebar search script for faster discovery inside the docs surface

### Supporting Files
- `sidebars.js` for the content structure
- `static/js/sidebar-search.js` for sidebar search behavior

---

## 5. Theming & Brand Presentation

The docs are styled to feel like a dedicated product property rather than a default Docusaurus install.

### Visual/Config Decisions
- Dark-first color mode
- Explicit light/dark toggle
- No system-preference theme auto-selection
- Custom CSS theme layer
- Product-aligned announcement bar, navbar, and footer

### Purpose
- Preserve a cohesive Structra brand identity
- Keep the docs visually distinct from generic template output

---

## 6. Isolation From Product Runtime

The docs application is intentionally static and separate from the runtime product surfaces.

### What It Owns
- Documentation content
- Static site generation
- Navigation and docs-specific UI components
- Reference material for evaluation concepts

### What It Does Not Own
- User accounts
- Workspace data
- System designs
- Evaluations in execution
- Payment state
- Backend persistence

---

## Project Structure

```text
docs/
├── docs/                          # Markdown docs content
│   ├── index.md
│   ├── getting-started.md
│   ├── account-and-identity.md
│   └── evaluation-principles/
│       ├── index.md
│       ├── production-system-principles.md
│       └── structra-basics/
│           ├── free/
│           ├── pro/
│           └── enterprise/
├── src/
│   ├── css/custom.css             # Global theme and visual customization
│   └── components/
│       ├── HomepageFeatures/
│       └── RuleTable/
├── static/
│   ├── img/logo.png
│   └── js/sidebar-search.js
├── docusaurus.config.js           # Site configuration
├── sidebars.js                    # Sidebar generation config
└── package.json
```

---

## Technology Stack

- **Site Generator:** Docusaurus 3
- **Rendering Layer:** React 19
- **Content Format:** Markdown and MDX
- **Styling:** Custom CSS with Tailwind-assisted utility usage

---

## Current Site Behavior

- Docs are served at `/`
- Blog output is disabled
- Sidebar search is injected through a custom script
- Theme defaults to dark mode
- Theme switching is explicit rather than system-driven

---

## Writing & Maintenance Guidelines

### Content Rules
- Add and update primary docs under `docs/docs/`
- Use Markdown by default
- Use MDX only when custom React components are necessary
- Keep frontmatter consistent for titles and slugs

### Reusable UI
- `RuleTable` is available for richer rule presentation
- Homepage and shared visual elements live under `docs/src/components/`

### Isolation Principle
- Keep conceptual documentation here
- Do not move product runtime logic or backend policy into the docs codebase

---

## Local Development

```bash
cd docs
npm install
npm start
```

Default dev URL: `http://localhost:3000`

---

## Build and Serve

```bash
npm run build
npm run serve
```

---

## Scripts

- `npm start` - start the Docusaurus dev server
- `npm run build` - build the static site
- `npm run serve` - serve the built site locally
- `npm run clear` - clear Docusaurus cache
- `npm run deploy` - deploy the site if deployment is configured
- `npm run write-translations` - generate translation files
- `npm run write-heading-ids` - generate heading ids

---

## Troubleshooting

- If layout or theme updates do not appear immediately, hard refresh the browser.
- If local output becomes stale after config or style changes, run `npm run clear` before restarting the dev server.
