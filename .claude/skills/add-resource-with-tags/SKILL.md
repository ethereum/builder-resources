---
name: add-resource-with-tags
description: Guides contributors through adding or updating a tool/resource in catalog/resources.json and choosing tags from catalog/taxonomy.json. Use when the user wants to add a new resource, suggest tags, or update an existing resource entry.
---

# Add a resource (with tags)

## Inputs to collect (ask for anything missing)
- Resource name
- 1-3 sentence description
- Website URL (optional)
- Twitter/X URL (optional)
- Square thumbnail icon URL (optional)
- Wide banner URL (optional)
- Repository URL(s), e.g. GitHub (optional)
- Package URL(s), e.g. npm (optional)
- llmstext URL (optional)
- Suggested subcategory (must match a `subcategory_id` in `catalog/taxonomy.json`)

At least one of `website`, `repos`, or `packages` is required

## Tagging workflow (use `catalog/taxonomy.json`)
1. Read `catalog/taxonomy.json` and load the top-level `tags` list.
2. Propose **3-8 tags** from that list based on the resource description, repos, and packages.
   - Prefer more specific tags (e.g. `static-analysis`, `account-abstraction`) over generic ones.
   - Keep tags kebab-case.
   - Target having at least 2-3 tags.
3. If the user wants a **new tag**:
   - Add it to `catalog/taxonomy.json` under `tags`.
   - Apply it to **all existing resources** in `catalog/resources.json` where it clearly fits (avoid one-off tags).
## Editing `catalog/resources.json`
- Keep the file valid JSON (array of objects).
- For a **new entry**, add an object with (at minimum):
  - `name`, `description`, `tags`, `subcategory_id`
  - at least one of: `website`, `repos`, `packages`
  - optional: `twitter`, `thumbnail_url`, `banner_url`, `llmstext`
- For an **update**, locate the existing object by stable fields (usually `name`, and if needed `website`/`repos`/`packages`) and change only necessary fields.
- Store npm links in `packages`, not in `repos`.
## Quick validation checklist
- Tags are all present in `catalog/taxonomy.json` `tags`.
- `subcategory_id` matches a taxonomy subcategory id.
- `repos` is optional; if present, it is an array of valid http(s) URLs.
- `packages` is optional; if present, it is an array of valid http(s) URLs.
- Entry includes at least one of `website`, `repos`, or `packages`.
- JSON remains valid.
## Output format
When responding, provide:
- the proposed `tags` list
- the `subcategory_id` (and inferred parent category name for readability)
- the exact JSON object to insert/update (ready to paste)
