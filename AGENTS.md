# Agent instructions

Use this guidance when working in this repository.

## Repository purpose
This repo is a curated collection of **developer tooling options for building on Ethereum**, and the data source for the [builder resources page on ethereum.org](https://ethereum.org/developers/tools/). Resources live in `catalog/resources.json`, and the categories, subcategories and tag taxonomy are defined in `catalog/taxonomy.json`.

## Contributor rules
`CONTRIBUTING.md` is the authoritative spec for what belongs in the catalog, the entry schema, image guidelines, and tag rules. Follow it when adding or changing entries.

## Skills
Always use the `add-resource-with-tags` skill when adding or updating resources. It lives at `.github/skills/add-resource-with-tags/SKILL.md`, mirrored in `.claude/skills/` and `.cursor/skills/`.

## Validity checking
Run the validator and fix any errors it reports before committing or opening a PR (plain Node, no dependencies needed):

```bash
npm run validate:results
```
