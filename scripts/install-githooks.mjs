import { chmod, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const ROOT = resolve(process.cwd());
const SOURCE = resolve(ROOT, ".githooks", "pre-commit");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

// Ask git where hooks live. This respects core.hooksPath and works in
// worktrees, where .git is a file rather than a directory.
let hooksDir;
try {
  const { stdout } = await execFileAsync("git", ["rev-parse", "--git-path", "hooks"], {
    cwd: ROOT,
  });
  hooksDir = resolve(ROOT, stdout.trim());
} catch {
  // Not a git checkout, or git unavailable (e.g. packaged install). Nothing to do.
  process.exit(0);
}

if (!(await exists(SOURCE))) {
  console.error(`Missing hook source at ${SOURCE}`);
  process.exit(1);
}

const DEST = resolve(hooksDir, "pre-commit");
const contents = await readFile(SOURCE, "utf-8");

if (await exists(DEST)) {
  const current = await readFile(DEST, "utf-8");
  if (current !== contents) {
    // Never clobber a hook we didn't install.
    console.warn(
      `Existing pre-commit hook at ${DEST} differs from ${SOURCE}; leaving it untouched. ` +
        "Run `node scripts/validate-results.mjs` manually or merge the hooks yourself.",
    );
    process.exit(0);
  }
  await chmod(DEST, 0o755);
  process.exit(0);
}

await mkdir(hooksDir, { recursive: true });
await writeFile(DEST, contents, "utf-8");
await chmod(DEST, 0o755);

console.log("Installed git pre-commit hook.");
