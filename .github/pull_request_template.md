## What changed?
- [ ] Add a project
- [ ] Update a project
- [ ] Update taxonomy (tags/categories/subcategories)

## Before you submit

### Prefer issues first
If you’re not sure about tags/categories/subcategories, please open an issue first (see the issue templates) and we’ll help.

### Editing resources manually
You can submit changes by directly editing:
- `catalog/resources.json` (the list of resources)

To see what tags and categories exist, check:
- `catalog/taxonomy.json`

### Using the included agent skill (optional)
This repo includes a shared AI skill to help choose the correct subcategory and tags:
- `.cursor/skills/add-project-with-tags/SKILL.md`

## Tag rules
- **Use existing tags**: tags in `catalog/resources.json` should come from `catalog/taxonomy.json` and be kebab-case.
- **Suggesting a new tag is allowed** if you also:\n  - add the tag to `catalog/taxonomy.json`, and\n  - update **all projects** in `catalog/resources.json` that the tag applies to (so we don’t create one-off tags).

## Checklist
- [ ] `catalog/resources.json` is valid JSON after my changes
- [ ] Added/updated entries include: `name`, `description`, `tags`, `subcategory_id`, and at least one of `website`, `repos`, or `packages`
- [ ] My `tags` are in `catalog/taxonomy.json` (or I added them and applied them everywhere relevant)
- [ ] My `subcategory_id` matches one of `catalog/taxonomy.json` subcategories
