# Agent instructions: add/update projects with tags

Use this repo guidance when working in this repository.

## Repository purpose
This repo is a curated collection of **developer tooling options for building on Ethereum**. Resources live in `catalog/resources.json`, and the categories, subcategories and tag taxonomy is defined in `catalog/taxonomy.json`.

## Skills
There is a skill for adding new resources located in `.cursor/skills/add-resource-with-tags/SKILL.md` that you should always use when adding projects.

## Validity Checking
Commits are expected to keep the data files valid and consistent with the taxonomy.

- **Pre-commit hook (recommended)**: this repo installs a `pre-commit` hook that runs the validator on every commit.
  - The hook runs: `node scripts/validate-results.mjs`
  - If you installed dependencies via `npm install`, the hook is installed automatically via the `prepare` script.
  - If you need to reinstall it manually, run: `npm run prepare`

- **Local validation (required before opening a PR)**: run the validator and fix any errors it reports:

```bash
npm run validate:results
```
