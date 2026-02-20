# Developer Tooling

This repo is a curated collection of **developer tooling options for building on Ethereum**. It stores resource entries in `catalog/resources.json` and a shared tag/category taxonomy in `catalog/taxonomy.json`.

## Contributing

Please **open an issue first**:
- Use **“Suggest a resource”** to propose a new entry
- Use **“Update a resource”** to request changes to an existing entry

If you want to submit a PR, you can:
- **Edit `catalog/resources.json` directly**, and consult `catalog/taxonomy.json` for valid tags + categories.

## Tagging help: use the included skill with your agent of choice

This repo includes an agent skill to help you pick good tags and format the JSON entry:

- Skill: `.github/skills/add-resource-with-tags/SKILL.md`

While using an agent, ask something like:
- “Use the `add-resource-with-tags` skill to add a new resource to `catalog/resources.json`.”

## Validity Checking

Commits are expected to keep the data files valid and consistent with the taxonomy.

- **Pre-commit hook**: this repo installs a `pre-commit` hook that runs the validator on every commit.
  - The hook runs: `node scripts/validate-results.mjs`
  - If you installed dependencies via `npm install`, the hook is installed automatically via the `prepare` script.
  - If you need to reinstall it manually, run: `npm run prepare`

- **Local validation (required before opening a PR)**: run the validator and fix any errors it reports:

```bash
npm run validate:results
```

- **What the validator enforces**
  - **JSON is valid**: `catalog/resources.json` must parse and be an array; `catalog/taxonomy.json` must parse.
  - **Unique IDs**: every `results[i].id` must be a non-empty string and **unique** across the file.
  - **Repos required**: every entry must have `repos` with at least one valid `http(s)` URL.
  - **Tags must exist**: every `tags[]` value must be present in `catalog/taxonomy.json` `tags`.
  - **Categories must match**: if `category` is set, it must match a category name in `catalog/taxonomy.json`.
