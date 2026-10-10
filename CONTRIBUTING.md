# Contributing

This repo is the data source for the [Builder resources page on ethereum.org](https://ethereum.org/developers/tools/). Every entry in `catalog/resources.json` becomes a card on that page, ranked by an algorithm that combines dependency-graph research with GitHub repo signals.

## What belongs in the catalog

Every entry is one of the five types below. The types decide whether something belongs in the catalog. Where it shows on the page is decided separately, by the categories in `catalog/taxonomy.json`.

These rules apply to every type:

- Built for Ethereum or its EVM L2s. Tooling for an L2 is in when the L2 runs the EVM, since the same builder and the same Solidity code move there (op-succinct). Tooling for other contract languages on such an L2 is in too (Stylus SDK lets you write Rust contracts on Arbitrum). Tooling for an L2 that only runs its own VM and language is out, and so is tooling for other chains. Multi-chain services that serve Ethereum stay (QuickNode).
- Shipped and usable today. Working install or quickstart, real docs. No concepts, waitlists, or landing pages.
- A project its owner has retired is out, whatever its downloads. Being archived or renamed is not retirement (MetaMask SDK became MetaMask Connect and stays).
- A hosted service has to still work. If it shuts down for good, the entry is removed, unless you can run it on your own server.
- A small user base is fine. A project with no dependent repos, no downloads and no references anywhere is out, even when its repo is active.
- Submitting your own tool is welcome and normal, most entries come from their authors. The description still has to read like neutral catalog text. Marketing language and superlatives get edited down or declined.

### Tools

You install it and run it, on its own or inside your project (a library like viem), or it is a hosted service (like Infura).

- Clients are tools, every node software counts.
- If the tool has a public repo, no commit in the last 12 months means out. This is about idleness, so a new tool passes. A hosted service without a public repo only has to still work.
- If something comes with another tool and you never add it yourself, it gets no entry of its own (web3.py brings eth-abi and eth-account with it, and Hardhat has EDR built in).

### Tool extensions

A plugin you install separately into a tool you already use (hardhat-deploy into Hardhat).

- Counts only if you install it yourself. If it ships with the main tool, it is bundled and gets no entry.
- Editor plugins and CI actions count (VS Code Solidity, foundry-toolchain).
- Everything else follows the Tools rules.

### Building blocks

Contract code that becomes part of what you deploy (OpenZeppelin Contracts), or a general onchain utility you call (Multicall3, CreateX).

- In if you copy, import, inherit from or deploy the code yourself.
- There is no 12-month rule here. A building block stays as long as people use it (ABDKMath64x64 stays although its repo is quiet). Use means dependent repos, downloads on npm, PyPI, crates.io or Soldeer, or imports in other projects.
- Onchain contracts you only call are in when any app can use them (Multicall3, CreateX). Contracts tied to one token, market or protocol are out.
- Products and protocols are out, even when they consist only of contracts. Their SDK can still be listed as a tool.
- A reference implementation is judged by use like anything else (the eth-infinitism ERC-4337 contracts get deployed, so they are in).

### Learning

Something you read or work through instead of installing (Updraft, The Ethernaut, SpeedrunEthereum).

- There has to be something to work through. Directories, archives and checklists are out.
- An old course stays as long as its content still works (Damn Vulnerable DeFi). A course written for Solidity before 0.8, or one that runs on a retired testnet, is out.
- Mostly Ethereum content. A general security course with a thin smart contract part is out.
- A course has to teach building. Courses about values or awareness for non-coders are out.
- The platform has to be open to the public.

### Onboarding and documentation

AI skills and docs that teach you a tool or how to do one task.

- A tool's own docs belong to that tool's entry, not to a second one (the Hardhat docs sit with Hardhat).
- Standalone docs and how-to guides get their own entry.
- Teaches one named tool or task. Broader material goes under Learning.
- Has to be usable outside one company's own product.
- Ethereum-specific. General crypto collections are out.
- If the tool it teaches is out, the skill or guide is out too.

### Not listed

- Specs live in their own repos. A tool entry can link to the spec it implements.
- Bundled parts get no entry. That covers a default part of a tool already in the catalog, even when it can also be installed on its own (`forge init` adds forge-std to a new Foundry project). A full tool that a starter kit sets up keeps its own entry (Scaffold-ETH 2 sets up Hardhat or Foundry).
- Deployed contracts have no type of their own. General utilities go under Building blocks.

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
| `thumbnail_url` | no | string (URL) | Square card icon (see Images below) |
| `banner_url` | no | string (URL) | Wide detail-page header (see Images below) |
| `llmstext` | no | string (URL) | The tool's agent-readable docs, if it publishes any (an `llms.txt`, `llms-full.txt`, or `SKILL.md`) |
| `crops_native` | no | boolean | Marks a tool that carries the CROPS-Native badge. Maintainers set this field, leave it out of your PR (see [Review and curation](#review-and-curation)) |

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
- If the project has no stable hosted asset, commit the file under `images/thumbnails/` or `images/banners/` in this repo and reference it via its `raw.githubusercontent.com/ethereum/builder-resources/main/...` URL. A GitHub org avatar (`https://github.com/<org>.png`) also works as a thumbnail when it is the project's logo.
- PNG, JPG, SVG, or WebP, under 1 MB.

### Tags

- Add every tag that genuinely fits, most entries end up with 2-5, and a single tag is fine for a narrow tool. Don't pad with loosely related tags.
- Prefer specific tags (`static-analysis`, `account-abstraction`) over generic ones.
- Need a tag that doesn't exist yet? Propose it in your issue or PR and add it to `catalog/taxonomy.json`. Maintainers will help apply it to existing entries it fits, so the catalog doesn't accumulate one-off tags.

### Using an AI agent

The repo ships an agent skill (`add-resource-with-tags`, in `.github/`, `.claude/`, and `.cursor/skills/`) that collects the inputs, picks tags, and emits a paste-ready entry. If you run Claude Code, Cursor, or Copilot inside a local copy of this repo, the skill is picked up automatically. You can also invoke it directly, ask your agent to "use the add-resource-with-tags skill".

### Validate before you push

```bash
npm run validate:results
```

There are no dependencies to install, the script runs on plain Node. Running `npm install` once is optional and sets up a pre-commit hook that validates automatically.

The validator checks that the JSON parses, required fields are present, descriptions are plain text (rules in `scripts/description-signals.mjs`), all tags exist in the taxonomy, `subcategory_id` matches the taxonomy, and every URL field (`website`, `twitter`, `llmstext`, `thumbnail_url`, `banner_url`, `repos`, `packages`) is valid http(s). It also rejects duplicate or untrimmed names and any `null`, empty-string, or empty-array placeholder, and warns when an entry reuses one image as both thumbnail and banner. URLs are format-checked only, whether they actually resolve is still on you. CI runs the same script on every PR that touches the catalog.

## Review and curation

- This repo is maintained by a small team, so a review can take 1-2 weeks. If nothing happens after that, a friendly ping on the issue or PR is fine.
- Maintainers may edit your description or tags for consistency with the rest of the catalog.
- A schema-valid entry is not a guarantee of inclusion. This is a curated catalog and maintainers make the final call on fit.
- Maintainers check maintenance on GitHub (last commit, archived status) and judge use from stars, dependent repos, downloads on npm, PyPI and crates.io in the last 30 days, and all-time Soldeer downloads. Docker pulls are not counted. Some projects publish no package that can be counted, like many Go, C++ and Solidity projects and most hosted services, so an empty download number means it could not be measured.
- Broken image links get cleared while the entry stays. Entries get removed when they stop meeting the rules in [What belongs in the catalog](#what-belongs-in-the-catalog), for example a tool with no commit in 12 months, a project retired by its owner, or a hosted service that shut down for good. If your project was removed and is active again, open an update issue.
- A merged change shows up on ethereum.org after its next site build, usually within a few days.
- The CROPS-Native badge (`crops_native`) is awarded by the Ethereum Foundation after a CROPS evaluation of the tool. If you would like your tool evaluated for the badge, open an [Update a resource](https://github.com/ethereum/builder-resources/issues/new?template=update-resource.yml) issue and say so, and we will look at how your tool stands.

## Taxonomy changes

Changing categories or subcategories in `catalog/taxonomy.json` affects the structure of the ethereum.org page. Open an issue to discuss first.
