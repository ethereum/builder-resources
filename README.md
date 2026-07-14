# Builder Resources

This repo is the data source for the [Builder resources page on ethereum.org](https://ethereum.org/developers/tools/). Resource entries live in `catalog/resources.json`, and the shared category/tag taxonomy in `catalog/taxonomy.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, including the entry schema, image guidelines, and tag rules. The short version:

- **Open an issue** using **"Suggest a resource"** or **"Update a resource"**, and a maintainer makes the change for you, or
- **Open a PR** editing `catalog/resources.json` directly, consulting `catalog/taxonomy.json` for valid tags and subcategories.

The repo also ships an agent skill, `add-resource-with-tags`, that collects the inputs, picks tags, and emits a paste-ready entry. Agents working in a clone discover it automatically.

## Validation

Before pushing catalog changes, run the validator and fix anything it reports:

```bash
npm run validate:results
```

It runs on plain Node with no dependencies to install. Running `npm install` once is optional and sets up a pre-commit hook that validates automatically. CI runs the same script on every PR that touches the catalog. What it checks is documented in CONTRIBUTING.md.
