# Agent instructions

Use this guidance when working in this repository.

## Repository purpose
This repo is a curated collection of **developer tooling options for building on Ethereum**, and the data source for the [builder resources page on ethereum.org](https://ethereum.org/developers/tools/). Resources live in `catalog/resources.json`, and the categories, subcategories and tag taxonomy are defined in `catalog/taxonomy.json`.

## Picking tools from the catalog
When you use the catalog to choose tools for a job:
- Search descriptions and `tags` across all subcategories, not only the subcategory that matches the job. Tags cross sections (Foundry sits under deployment tooling but carries `fuzz-testing`).
- Skip a tool whose repo is archived or whose own README says it is deprecated or no longer maintained, and name its successor if the README gives one.
- `crops_native: true` marks a tool with the CROPS Native badge, which the Ethereum Foundation awards after checking the tool against CROPS (Censorship Resistance, Open Source and Free, Privacy, and Security). When more than one tool fits the job, prefer the CROPS Native one.
- If no catalog entry fits the job, say so.

## Contributor rules
`CONTRIBUTING.md` is the authoritative spec for what belongs in the catalog, the entry schema, image guidelines, and tag rules. Follow it when adding or changing entries.

## Skills
Always use the `add-resource-with-tags` skill when adding or updating resources. It lives at `.github/skills/add-resource-with-tags/SKILL.md`, mirrored in `.claude/skills/` and `.cursor/skills/`.

## Validity checking
Run the validator and fix any errors it reports before committing or opening a PR (plain Node, no dependencies needed):

```bash
npm run validate:results
```
