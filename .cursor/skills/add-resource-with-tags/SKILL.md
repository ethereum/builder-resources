---
name: add-resource-with-tags
description: Guides contributors through adding or updating a tool/resource in catalog/resources.json and choosing tags from catalog/taxonomy.json. Use when the user wants to add a new resource, suggest tags, or update an existing resource entry.
---

# Add a resource (with tags)

`CONTRIBUTING.md` at the repo root is the authoritative contributor spec. This skill summarizes it for the add/update workflow.

## Inputs to collect (ask for anything missing)
- Resource name
- Single paragraph description
- Website URL (optional - do not add a repository url as a website url)
- Twitter/X URL (optional)
- Square thumbnail icon URL (optional)
- Wide banner URL (optional - never use opengraph images as banner images)
- Repository URL(s), e.g. GitHub (optional)
- Package URL(s), e.g. npm (optional)
- llmstext URL (optional)
- Suggested subcategory (must match a `subcategory_id` in `catalog/taxonomy.json`)

At least one of `website`, `repos`, or `packages` is required

## Description style
- Write for **builders skimming the catalog**: what the tool is, what problem it solves, and when you would reach for it. Use plain language; `website` and `repos` carry roadmaps, company story, and deep docs.
- **Single paragraph** of plain text only: no Markdown, no blank-line paragraph breaks, no newline-started `- ` list lines (enforced by `npm run validate:results`; rules in `scripts/description-signals.mjs`).

## Image guidelines
- `thumbnail_url` renders as a 40-96 px square card icon. Use a square logo mark, 256×256 or larger, that stays legible at 40 px (not a wordmark or screenshot).
- `banner_url` renders as a roughly 4:1 header strip, cropped to fill the width. Aim for about 1200×300 with no text or logos near the edges. Never use OpenGraph images, their squarer shape gets cropped badly.
- Both must be stable, publicly fetchable URLs (PNG, JPG, or SVG, under 1 MB).

## Tagging workflow (use `catalog/taxonomy.json`)
1. Read `catalog/taxonomy.json` and load the top-level `tags` list.
2. Propose every tag from that list that genuinely fits, based on the resource description, repos, and packages. Most entries end up with 2-5 tags; a single tag is fine for a narrow tool. Don't pad with loosely related tags.
   - Prefer more specific tags (e.g. `static-analysis`, `account-abstraction`) over generic ones.
   - Keep tags kebab-case.
3. If the user wants a **new tag**:
   - Add it to `catalog/taxonomy.json` under `tags` and mention it in the issue or PR description.
   - Maintainers will help apply it to existing resources it fits, so the catalog doesn't accumulate one-off tags.
## Editing `catalog/resources.json`
- Keep the file valid JSON (array of objects).
- For a **new entry**, append an object at the end with (at minimum):
  - `name`, `description`, `tags`, `subcategory_id`
  - at least one of: `website`, `repos`, `packages`
  - optional: `twitter`, `thumbnail_url`, `banner_url`, `llmstext`
- Leave out optional fields with no value; don't add them as `null` or empty strings.
- For an **update**, locate the existing object by stable fields (usually `name`, and if needed `website`/`repos`/`packages`) and change only necessary fields.
- Store npm links in `packages`, not in `repos`.
## Quick validation checklist
- Tags are all present in `catalog/taxonomy.json` `tags`.
- `subcategory_id` matches a taxonomy subcategory id.
- `repos` is optional; if present, it is an array of valid http(s) URLs.
- `packages` is optional; if present, it is an array of valid http(s) URLs.
- Entry includes at least one of `website`, `repos`, or `packages`.
- JSON remains valid.
- When working in a clone, finish by running `npm run validate:results` and fix anything it reports.
## Output format
When responding, provide:
- the proposed `tags` list
- the `subcategory_id` (and inferred parent category name for readability)
- the exact JSON object to insert/update (ready to paste)
