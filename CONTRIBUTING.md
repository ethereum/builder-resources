# Contributing

This repo is the data source for the [Builder resources page on ethereum.org](https://ethereum.org/developers/tools/). Every entry in `catalog/resources.json` becomes a card on that page, ranked by an algorithm that combines dependency-graph research with GitHub repo signals.

## What belongs in the catalog

- Tools and resources for people building on Ethereum or its L2s. Anything from contract frameworks to MCP servers to courses, see the categories in `catalog/taxonomy.json`.
- Shipped and usable today. Working install or quickstart, real docs. No concepts, waitlists, or landing pages.
- Maintained. Projects that look abandoned (dead repos, broken links) get removed from the catalog.
- Submitting your own tool is welcome and normal, most entries come from their authors. The description still has to read like neutral catalog text. Marketing language and superlatives get edited down or declined.

There are two ways to contribute.

## Option 1: Open an issue (easiest)

No coding required. A maintainer will add the entry for you.

- [Suggest a resource](https://github.com/ethereum/builder-resources/issues/new?template=add-resource.yml) to propose a new entry
- [Update a resource](https://github.com/ethereum/builder-resources/issues/new?template=update-resource.yml) to request changes to an existing entry

## Option 2: Open a pull request

Edit `catalog/resources.json` directly and add or modify an entry. The file is a flat JSON array of objects. Append new entries at the end and leave the rest of the file untouched, and in update PRs change only the fields that actually changed. Reformatting or reordering the whole file makes the diff unreviewable.

### Entry schema

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `name` | yes | string | Display name of the resource |
| `description` | yes | string | 1-3 sentences of plain text in a single paragraph. No Markdown, no lists, no blank lines. Write for builders skimming the catalog, saying what the tool is, what problem it solves, and when you would reach for it |
| `tags` | yes | array of strings | Kebab-case slugs, each must exist in `catalog/taxonomy.json` under `tags` |
| `subcategory_id` | yes | string | Must match a subcategory `id` in `catalog/taxonomy.json` (for example `contract-frameworks`, `mcp-servers`) |
| `website` | at least one of these three | string (URL) | Project website. Do not put a repository URL here |
| `repos` | at least one of these three | array of URLs | Source code repositories (for example GitHub). A public repo helps, since the page ranking reads GitHub signals |
| `packages` | at least one of these three | array of URLs | Package registry URLs (for example npm). Store npm links here, not in `repos` |
| `twitter` | no | string (URL) | Twitter/X profile |
| `thumbnail_url` | no | string (URL) | Square-ish icon shown on cards |
| `banner_url` | no | string (URL) | Wide header image. Do not use OpenGraph images |
| `llmstext` | no | string (URL) | The tool's agent-readable docs, if it publishes any (an `llms.txt`, `llms-full.txt`, or `SKILL.md`) |

Entries have no `id` field. The `name` is the stable identifier in practice, so keep it unchanged in update PRs unless the project actually renamed.

Leave out optional fields you have no value for. Don't add them as `null` or empty strings.

### Example entry

```json
{
  "name": "Example Tool",
  "description": "A command line tool that scaffolds an Ethereum dapp with a configured contract framework, local chain, and frontend, so you can start building instead of wiring up boilerplate.",
  "tags": ["cli", "developer-experience", "solidity-development"],
  "subcategory_id": "contract-frameworks",
  "website": "https://example.dev",
  "repos": ["https://github.com/example/example-tool"],
  "packages": ["https://www.npmjs.com/package/example-tool"],
  "twitter": "https://x.com/exampletool",
  "thumbnail_url": "https://example.dev/icon.png",
  "banner_url": "https://example.dev/banner.png",
  "llmstext": "https://example.dev/llms.txt"
}
```

### Images

- `thumbnail_url` becomes the card icon, displayed as a 40-96 px square. Use a square logo mark, 256×256 or larger, that stays legible at 40 px. Wordmarks and screenshots turn to mush at that size.
- `banner_url` becomes the header strip of the tool detail view, displayed at roughly 4:1 and cropped to fill the width. Aim for about 1200×300 and keep text or logos away from the edges. Don't reuse an OpenGraph image, its squarer shape gets cropped badly.
- Host both at a stable, publicly fetchable URL. The ethereum.org build copies them to its own storage, so a URL behind auth or a hotlink blocker means no image on the page.
- PNG, JPG, or SVG, under 1 MB.

### Tags

- Use existing tags from `catalog/taxonomy.json`. They are kebab-case. Add every tag that genuinely fits, most entries end up with 2-5, and a single tag is fine for a narrow tool. Don't pad with loosely related tags.
- Prefer specific tags (`static-analysis`, `account-abstraction`) over generic ones.
- Need a tag that doesn't exist yet? Propose it in your issue or PR and add it to `catalog/taxonomy.json`. Maintainers will help apply it to existing entries it fits, so the catalog doesn't accumulate one-off tags.

### Using an AI agent

The repo ships a skill that walks an agent through collecting the inputs, picking tags, and emitting a paste-ready JSON object. It lives at `.github/skills/add-resource-with-tags/SKILL.md` (mirrored in `.claude/skills/` and `.cursor/skills/`). Ask your agent to "use the add-resource-with-tags skill to add a new resource".

### Validate before you push

```bash
npm run validate:results
```

There are no dependencies to install, the script runs on plain Node. Running `npm install` once is optional and sets up a pre-commit hook that validates automatically.

The validator checks that the JSON parses, required fields are present, descriptions are plain text (rules in `scripts/description-signals.mjs`), all tags exist in the taxonomy, `subcategory_id` matches the taxonomy, and `repos`/`packages` URLs are valid http(s). Other URL fields are not machine-checked, so double-check them yourself. CI runs the same script on every PR that touches the catalog.

## Review and curation

- This repo is maintained by a small team, so a review can take 1-2 weeks. If nothing happens after that, a friendly ping on the issue or PR is fine.
- Maintainers may edit your description or tags for consistency with the rest of the catalog.
- A schema-valid entry is not a guarantee of inclusion. This is a curated catalog and maintainers make the final call on fit.
- Broken image links get cleared while the entry stays. Entries get removed when a project is abandoned or its links die. If your project was removed and is active again, open an update issue.
- A merged change shows up on ethereum.org after its next site build, usually within a few days.

## Taxonomy changes

Changing categories or subcategories in `catalog/taxonomy.json` affects the structure of the ethereum.org page. Open an issue to discuss first.
