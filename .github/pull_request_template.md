Please read [CONTRIBUTING.md](../CONTRIBUTING.md) before submitting, it has the entry schema, image guidelines, and tag rules.

## What changed?
- [ ] Add a resource
- [ ] Update a resource
- [ ] Update taxonomy (tags/categories/subcategories)

## Before you submit

### Prefer issues first
If you're not sure about tags or subcategories, open an issue instead (see the issue templates) and we'll help.

### Editing resources manually
Edit `catalog/resources.json` (the list of resources). To see what tags and subcategories exist, check `catalog/taxonomy.json`.

### Using the included agent skill (optional)
This repo includes a shared AI skill to help choose the correct subcategory and tags:
- `.github/skills/add-resource-with-tags/SKILL.md` (mirrored in `.claude/skills/` and `.cursor/skills/`)

## Tag rules
- **Use existing tags** from `catalog/taxonomy.json` (kebab-case).
- **Need a new tag?** Add it to `catalog/taxonomy.json` and mention it in the PR description. Maintainers will help apply it to existing entries it fits.

## Checklist
- [ ] `npm run validate:results` passes after my changes
- [ ] Added/updated entries include `name`, `description`, `tags`, `subcategory_id`, and at least one of `website`, `repos`, or `packages`
- [ ] My `tags` exist in `catalog/taxonomy.json` (or the PR adds them)
- [ ] My `subcategory_id` matches a subcategory id in `catalog/taxonomy.json`
