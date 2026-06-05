/**
 * Shared rules for catalog resource `description` plain-text policy.
 * Used by `validate-results.mjs` (enforce) and `find-description-markdown.mjs` (report).
 */

/** @typedef {{ id: string, label: string, test: (s: string) => boolean }} DescriptionAuditSignal */

/**
 * True when the trimmed text has two or more paragraphs separated by a blank line
 * (empty line or a line containing only whitespace).
 * @param {string} s
 */
export function hasMultipleParagraphs(s) {
  const trimmed = s.trim();
  if (!trimmed) return false;
  const blocks = trimmed.split(/\r?\n\s*\r?\n/).filter((p) => p.trim().length > 0);
  return blocks.length > 1;
}

/** @type {DescriptionAuditSignal[]} */
export const DESCRIPTION_AUDIT_SIGNALS = [
  {
    id: "fenced-code-block",
    label: "fenced code block (triple backtick)",
    test: (s) => /```/.test(s),
  },
  {
    id: "bold-asterisks",
    label: "bold / strong (**) ",
    test: (s) => /\*\*/.test(s),
  },
  {
    id: "bold-underscores",
    label: "bold / strong (__) ",
    test: (s) => /(^|[^A-Za-z0-9])__[^_\n][\s\S]*?__(?![A-Za-z0-9])/.test(s),
  },
  {
    id: "strikethrough",
    label: "strikethrough (~~)",
    test: (s) => /~~/.test(s),
  },
  {
    id: "markdown-link",
    label: "Markdown link [text](url)",
    test: (s) => /\[[^\]\n]{0,2000}\]\([^)\n]{1,2000}\)/.test(s),
  },
  {
    id: "markdown-image",
    label: "Markdown image ![alt](url)",
    test: (s) => /!\[[^\]\n]*\]\([^)\n]+\)/.test(s),
  },
  {
    id: "atx-heading",
    label: "ATX heading (# … at line start)",
    test: (s) => /(?:^|\n)[ \t]*#{1,6}[ \t]+\S/.test(s),
  },
  {
    id: "blockquote",
    label: "blockquote (> at line start)",
    test: (s) => /(?:^|\n)[ \t]*>\s/.test(s),
  },
  {
    id: "horizontal-rule",
    label: "horizontal rule (--- or *** on its own line)",
    test: (s) => /(?:^|\n)[ \t]*(?:-{3,}|\*{3,}|_{3,})[ \t]*(?:\n|$)/m.test(s),
  },
  {
    id: "inline-code",
    label: "inline code (`…`)",
    test: (s) => /`[^`\n]+`/.test(s),
  },
  {
    id: "dash-list-line",
    label: 'newline + "- " list-style line (Markdown unordered list syntax)',
    test: (s) => /(?:\r?\n)[ \t]*-[ \t]+\S/.test(s),
  },
  {
    id: "multi-paragraph",
    label: "multiple paragraphs (blank line between blocks of text)",
    test: (s) => hasMultipleParagraphs(s),
  },
];

/**
 * @param {string} description
 * @returns {{ id: string, label: string }[]}
 */
export function collectDescriptionAuditHits(description) {
  if (typeof description !== "string") return [];
  const hits = [];
  for (const sig of DESCRIPTION_AUDIT_SIGNALS) {
    if (sig.test(description)) hits.push({ id: sig.id, label: sig.label });
  }
  return hits;
}
