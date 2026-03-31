# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

maison gregotte — a bilingual (FR/EN) artistic website showcasing mood boards, paintings, and vintage objects for sale. Built with Astro 6, Tailwind CSS v4, and TypeScript.

**Branding rule**: The name "maison gregotte" is always lowercase, everywhere (UI, meta tags, content).

## Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

## Architecture

### Bilingual Routing (FR default, EN at /en/)

- **Astro i18n** configured in `astro.config.mjs` with `prefixDefaultLocale: false`
- French pages live at `src/pages/*.astro` (served at `/`)
- English pages mirror the structure under `src/pages/en/*.astro` (served at `/en/`)
- Translation strings in `src/i18n/translations.ts` — use `t(lang, key)` for UI text
- Helper `getLangFromUrl(url)` extracts locale from the current URL
- Helper `getLocalizedPath(path, lang)` builds locale-aware hrefs
- Content entries use a `lang` field to filter by language at query time (not duplicate folders)

### Content Collections

Defined in `src/content.config.ts` using the **Content Layer API** with `glob()` loader from `astro/loaders`. Two collections:

- **`moodboards`** — mood board posts with cover image, tags, date. Stored in `src/content/moodboards/`
- **`products`** — items for sale (paintings + vintage objects) with price, currency, category (`painting` | `vintage`), sold status, dimensions. Stored in `src/content/products/`

Both use Astro's `image()` schema helper for type-safe, optimized image references pointing to `src/assets/images/`.

**Important**: Astro 6 requires `glob()` loader — do NOT use the legacy `type: 'content'` pattern.

### Tailwind CSS v4 (CSS-first config)

No `tailwind.config.js`. All design tokens live in `src/styles/global.css` via `@theme {}`:
- Brand colors: `cream`, `linen`, `sand`, `earth`, `charcoal`, `ink`, `terracotta`, `sage`
- Font: **Source Code Pro** (monospaced) — single family for all text, weight-based hierarchy (400 body, 600 headings)
- All three font vars (`--font-mono`, `--font-sans`, `--font-serif`) point to Source Code Pro
- Custom spacing: `--spacing-section`, `--spacing-card`

Use these as Tailwind utilities: `text-ink`, `bg-cream`, `font-mono`, `gap-card`, `py-section`, etc.

### Component Conventions

- `src/layouts/BaseLayout.astro` — wraps every page (head, fonts, header, footer). Accepts `title` and `description` props.
- `src/components/` — reusable Astro components. Each receives a `lang: Lang` prop for i18n.
- `ProductCard` and `MoodboardCard` — display content collection entries in grids.

### Adding Content

**New product:**
```markdown
<!-- src/content/products/my-item.md -->
---
title: "Mon objet"
lang: fr
description: "Description courte."
price: 150
category: vintage   # or "painting"
sold: false
date: 2024-11-01
cover: ../../assets/images/my-item.jpg
dimensions: "H 20 cm"
tags: ["céramique"]
---

Description longue en markdown.
```

**New moodboard:** Same pattern in `src/content/moodboards/`, schema has no price/category/sold fields.

Always create both FR and EN versions of content entries.

### Image Handling

- Place images in `src/assets/images/` for Astro's build-time optimization
- Reference from content frontmatter as relative paths: `../../assets/images/filename.jpg`
- Use `<Image>` component from `astro:assets` in Astro components for automatic optimization
- Place static assets (favicon, etc.) in `public/`
