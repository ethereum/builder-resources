import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  ${message}`);
}

function isNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

function isOptionalString(x) {
  return x === undefined || x === null || typeof x === "string";
}

function isValidHttpUrl(x) {
  if (!isNonEmptyString(x)) return false;
  try {
    const u = new URL(x);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function loadJson(path) {
  const raw = await readFile(path, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON at ${path}: ${String(e)}`);
    return null;
  }
}

const ROOT = resolve(process.cwd());
const RESULTS_PATH = resolve(ROOT, "catalog", "resources.json");
const TAXONOMY_PATH = resolve(ROOT, "catalog", "taxonomy.json");

const taxonomy = await loadJson(TAXONOMY_PATH);
const results = await loadJson(RESULTS_PATH);

if (!taxonomy || !results) {
  process.exit(process.exitCode || 1);
}

const tagsList = taxonomy?.tags;
if (!Array.isArray(tagsList) || tagsList.some((t) => !isNonEmptyString(t))) {
  fail(`taxonomy.tags must be an array of non-empty strings in ${TAXONOMY_PATH}`);
}
const allowedTags = new Set((tagsList || []).map((t) => t.trim()));

const categoryDefs = taxonomy?.categories?.definitions;
if (!Array.isArray(categoryDefs)) {
  fail(`taxonomy.categories.definitions must be an array in ${TAXONOMY_PATH}`);
}

const seenCategoryIds = new Set();
const seenCategoryNames = new Set();
const seenSubcategoryIds = new Set();
const subcategoryToParent = new Map();
const validCategoryNameOrId = new Set();

for (let i = 0; i < (categoryDefs || []).length; i++) {
  const cat = categoryDefs[i];
  const where = `taxonomy.categories.definitions[${i}]`;

  if (!cat || typeof cat !== "object") {
    fail(`${where} must be an object`);
    continue;
  }

  if (!isNonEmptyString(cat.id)) {
    fail(`${where}.id must be a non-empty string`);
    continue;
  }
  if (seenCategoryIds.has(cat.id)) {
    fail(`${where}.id is duplicated: "${cat.id}"`);
  }
  seenCategoryIds.add(cat.id);

  if (!isNonEmptyString(cat.name)) {
    fail(`${where}.name must be a non-empty string`);
    continue;
  }
  if (seenCategoryNames.has(cat.name)) {
    fail(`${where}.name is duplicated: "${cat.name}"`);
  }
  seenCategoryNames.add(cat.name);

  validCategoryNameOrId.add(cat.id);
  validCategoryNameOrId.add(cat.name);

  if (!Array.isArray(cat.subcategories) || cat.subcategories.length < 1) {
    fail(`${where}.subcategories must be a non-empty array`);
    continue;
  }

  for (let j = 0; j < cat.subcategories.length; j++) {
    const sub = cat.subcategories[j];
    const subWhere = `${where}.subcategories[${j}]`;
    if (!sub || typeof sub !== "object") {
      fail(`${subWhere} must be an object`);
      continue;
    }
    if (!isNonEmptyString(sub.id)) {
      fail(`${subWhere}.id must be a non-empty string`);
      continue;
    }
    if (!isNonEmptyString(sub.name)) {
      fail(`${subWhere}.name must be a non-empty string`);
    }
    if (seenSubcategoryIds.has(sub.id)) {
      fail(`${subWhere}.id is duplicated across taxonomy: "${sub.id}"`);
      continue;
    }
    seenSubcategoryIds.add(sub.id);
    subcategoryToParent.set(sub.id, { id: cat.id, name: cat.name });
  }
}

if (!Array.isArray(results)) {
  fail(`results.json must be an array at ${RESULTS_PATH}`);
  process.exit(process.exitCode || 1);
}

for (let i = 0; i < results.length; i++) {
  const entry = results[i];
  const where = `results[${i}]`;

  if (!entry || typeof entry !== "object") {
    fail(`${where} must be an object`);
    continue;
  }

  // name
  if (!isNonEmptyString(entry.name)) {
    fail(`${where}.name must be a non-empty string`);
  }

  // description
  if (!isNonEmptyString(entry.description)) {
    fail(`${where}.description must be a non-empty string`);
  }

  // llmstext
  if (!isOptionalString(entry.llmstext)) {
    fail(`${where}.llmstext must be a string if present`);
  }

  // repos
  if (entry.repos !== undefined && entry.repos !== null) {
    if (!Array.isArray(entry.repos)) {
      fail(`${where}.repos must be an array if present`);
    } else {
      for (let r = 0; r < entry.repos.length; r++) {
        const repoUrl = entry.repos[r];
        if (!isValidHttpUrl(repoUrl)) {
          fail(`${where}.repos[${r}] must be a valid http(s) URL`);
        }
      }
    }
  }

  // packages
  if (entry.packages !== undefined && entry.packages !== null) {
    if (!Array.isArray(entry.packages)) {
      fail(`${where}.packages must be an array if present`);
    } else {
      for (let p = 0; p < entry.packages.length; p++) {
        const packageUrl = entry.packages[p];
        if (!isValidHttpUrl(packageUrl)) {
          fail(`${where}.packages[${p}] must be a valid http(s) URL`);
        }
      }
    }
  }

  // At least one discoverability/source link is required.
  const hasWebsite = isNonEmptyString(entry.website);
  const hasRepos = Array.isArray(entry.repos) && entry.repos.length > 0;
  const hasPackages = Array.isArray(entry.packages) && entry.packages.length > 0;
  if (!hasWebsite && !hasRepos && !hasPackages) {
    fail(`${where} must include at least one of website, repos, or packages`);
  }

  // tags
  if (!Array.isArray(entry.tags) || entry.tags.length < 1) {
    fail(`${where}.tags must be a non-empty array`);
  } else {
    for (let t = 0; t < entry.tags.length; t++) {
      const tag = entry.tags[t];
      if (!isNonEmptyString(tag)) {
        fail(`${where}.tags[${t}] must be a non-empty string`);
        continue;
      }
      if (!allowedTags.has(tag)) {
        fail(`${where}.tags contains unknown tag "${tag}" (not in taxonomy.json)`);
      }
    }
  }

  // subcategory_id
  if (!isNonEmptyString(entry.subcategory_id)) {
    fail(`${where}.subcategory_id must be a non-empty string`);
  } else if (!subcategoryToParent.has(entry.subcategory_id)) {
    fail(
      `${where}.subcategory_id "${entry.subcategory_id}" does not match any taxonomy subcategory id`
    );
  }

  // optional legacy category consistency check
  if (entry.category !== undefined && entry.category !== null) {
    if (!isNonEmptyString(entry.category)) {
      fail(`${where}.category must be a non-empty string if present`);
    } else if (!validCategoryNameOrId.has(entry.category)) {
      fail(`${where}.category "${entry.category}" does not match any taxonomy category id/name`);
    } else if (isNonEmptyString(entry.subcategory_id)) {
      const inferredParent = subcategoryToParent.get(entry.subcategory_id);
      if (
        inferredParent &&
        entry.category !== inferredParent.id &&
        entry.category !== inferredParent.name
      ) {
        fail(
          `${where}.category "${entry.category}" conflicts with inferred parent "${inferredParent.id}" ("${inferredParent.name}") for subcategory_id "${entry.subcategory_id}"`
        );
      }
    }
  }
}

if (process.exitCode && process.exitCode !== 0) {
  // eslint-disable-next-line no-console
  console.error("\nValidation failed.");
  process.exit(process.exitCode);
} else {
  // eslint-disable-next-line no-console
  console.log("✅ Validation passed.");
}

