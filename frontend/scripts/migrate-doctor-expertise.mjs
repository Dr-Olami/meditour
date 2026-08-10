/**
 * One-shot migration script for the editorial redesign (Phase 1).
 *
 * For every doctor markdown file (en + bn) this script:
 *   1. Extracts the "Field of Expertise" bullet list from the body and moves
 *      it into a new `expertise:` frontmatter array, then removes that
 *      section from the markdown body.
 *   2. Lifts a patient-care philosophy sentence out of the "About" section and
 *      writes it to a new `pullQuote:` frontmatter string (quoted YAML).
 *
 * Idempotent: files that already declare `expertise:` / `pullQuote:` in their
 * frontmatter are left untouched for that field.
 *
 * Run once: `node scripts/migrate-doctor-expertise.mjs`
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/content/doctors');
const LOCALES = ['en', 'bn'];

/** Heading text that introduces the expertise section, per locale. */
const EXPERTISE_HEADINGS = {
  en: ['## Field of Expertise'],
  bn: ['## দক্ষতার ক্ষেত্র', '## বিশেষত্বের ক্ষেত্র'],
};

/** Heading text that introduces the about / bio section, per locale. */
const ABOUT_HEADINGS = {
  en: ['## About the Doctor', '## About'],
  bn: ['## ডাক্তার সম্পর্কে', '## চিকিৎসক সম্পর্কে'],
};

/** Care / philosophy keywords used to score candidate pull-quote sentences. */
const KEYWORDS = {
  en: [
    'care', 'patient', 'compassion', 'dedicated', 'commitment', 'passionate',
    'determined', 'legacy', 'devotion', 'philosophy', 'believe', 'mission',
    'holistic', 'accessibility', 'quality', 'excellence', 'vision',
    'pioneering', 'transform', 'advance', 'improve', 'serve', 'humanity',
    'trust', 'innovation', 'precision', 'outcome', 'well-being',
  ],
  bn: [
    'যত্ন', 'রোগী', 'নিষ্ঠা', 'প্রতিশ্রুতি', 'সেবা', 'স্বাস্থ্য', 'উন্নত',
    'অবদান', 'আগ্রহ', 'ভালোবাসা', 'লক্ষ্য', 'দূরদর্শিতা', 'উদ্ভাবন',
    'নির্ভুলতা', 'দক্ষতা', 'অভিজ্ঞতা', 'মানুষ', 'বিশ্বস্ত',
  ],
};

/**
 * Split a markdown file into its frontmatter block (with delimiters) and body.
 *
 * @param {string} content - Full file contents.
 * @returns {{ fmRaw: string, fmInner: string, body: string } | null}
 */
function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  return { fmRaw: match[0], fmInner: match[1], body: match[2] };
}

/**
 * Detect whether a frontmatter block already declares a given top-level key.
 *
 * @param {string} fmInner - Frontmatter text (without delimiters).
 * @param {string} key - Top-level key to look for.
 * @returns {boolean}
 */
function hasField(fmInner, key) {
  return new RegExp(`^${key}:`, 'm').test(fmInner);
}

/**
 * Find a section in the markdown body and return its heading line, start
 * index, and the raw block (heading through to the next `## ` or end).
 *
 * @param {string} body - Markdown body.
 * @param {string[]} headings - Candidate heading lines (with `## ` prefix).
 * @returns {{ heading: string, start: number, block: string, blockStart: number } | null}
 */
function findSection(body, headings) {
  for (const heading of headings) {
    const idx = body.indexOf(heading);
    if (idx === -1) continue;
    // Section runs from the heading line up to the next `## ` heading or EOF.
    const afterHeading = body.slice(idx + heading.length);
    const nextMatch = afterHeading.match(/\r?\n## /);
    const sectionEnd = nextMatch ? nextMatch.index : afterHeading.length;
    const block = afterHeading.slice(0, sectionEnd);
    return { heading, start: idx, block, blockStart: idx + heading.length };
  }
  return null;
}

/**
 * Extract bullet-list items (`- foo`) from a section block.
 *
 * @param {string} block - Section body (without heading).
 * @returns {string[]}
 */
function extractBullets(block) {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

/**
 * Pick the best pull-quote sentence from the About section body.
 *
 * Scores sentences by length × keyword density, skipping the first sentence
 * of the section (which is usually a biographical introduction).
 *
 * @param {string} aboutBlock - About section body (without heading).
 * @param {string[]} keywords - Locale care/philosophy keywords.
 * @returns {string | null}
 */
function pickPullQuote(aboutBlock, keywords) {
  // Collapse paragraph breaks into spaces so sentence splitting is reliable.
  const flat = aboutBlock.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  if (!flat) return null;
  // Split into sentences on `. `, `। ` (Bangla danda), or `—`-terminated clauses.
  const sentences = flat
    .split(/(?<=[.।])\s+(?=[A-Z\u0985-\u09DF])|(?<=—)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 60);
  if (sentences.length === 0) return null;
  let best = null;
  let bestScore = -1;
  sentences.forEach((sentence, i) => {
    const lower = sentence.toLowerCase();
    let hits = 0;
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) hits++;
    }
    // Skip the first sentence (biographical intro) unless it's the only one.
    const firstPenalty = i === 0 && sentences.length > 1 ? 0.4 : 1;
    const score = sentence.length * (1 + hits * 0.6) * firstPenalty;
    if (score > bestScore) {
      bestScore = score;
      best = sentence;
    }
  });
  // Trim a trailing period/danda so the quote reads cleanly inside curly quotes.
  if (best) {
    best = best.replace(/[.।]+$/, '').trim();
  }
  return best || null;
}

/**
 * Format an array of strings as a YAML block list.
 *
 * @param {string[]} items
 * @returns {string}
 */
function yamlList(items) {
  return items.map((item) => `  - ${yamlScalar(item)}`).join('\n');
}

/**
 * Quote-escape a scalar for YAML. Plain strings without special chars are left
 * unquoted; everything else is double-quoted with escaping.
 *
 * @param {string} value
 * @returns {string}
 */
function yamlScalar(value) {
  const needsQuoting = /[:#&*!|>'"%@`{}\[\],\n\r]/.test(value) || /^\s|\s$/.test(value);
  if (!needsQuoting) return value;
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * Insert a new top-level field into the frontmatter block, immediately before
 * the `faqs:` key if present, otherwise appended at the end.
 *
 * @param {string} fmInner - Frontmatter text (without delimiters).
 * @param {string} fieldYaml - Pre-formatted YAML for the field (key + value).
 * @returns {string} Updated frontmatter text.
 */
function insertField(fmInner, fieldYaml) {
  const faqsIdx = fmInner.search(/^faqs:/m);
  if (faqsIdx !== -1) {
    const lineStart = fmInner.lastIndexOf('\n', faqsIdx) + 1;
    return fmInner.slice(0, lineStart) + fieldYaml + '\n' + fmInner.slice(lineStart);
  }
  const trimmed = fmInner.endsWith('\n') ? fmInner : fmInner + '\n';
  return trimmed + fieldYaml + '\n';
}

/**
 * Remove a section (heading line + its block) from the markdown body.
 *
 * @param {string} body - Markdown body.
 * @param {{ start: number, heading: string, block: string }} section
 * @returns {string} Body with the section removed.
 */
function removeSection(body, section) {
  // Remove from the heading start through to the next `## ` heading (or EOF).
  const afterHeading = body.slice(section.start + section.heading.length);
  const nextMatch = afterHeading.match(/\r?\n## /);
  const removeEnd = nextMatch
    ? section.start + section.heading.length + nextMatch.index
    : body.length;
  // Collapse the leftover blank lines around the cut.
  const before = body.slice(0, section.start).replace(/\r?\n{2,}$/, '\n\n');
  const after = body.slice(removeEnd).replace(/^\r?\n{2,}/, '\n');
  return (before + after).replace(/\n{3,}/g, '\n\n');
}

let totalFiles = 0;
let expertiseCount = 0;
let pullQuoteCount = 0;

for (const locale of LOCALES) {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    totalFiles++;
    const filePath = path.join(dir, file);
    const original = fs.readFileSync(filePath, 'utf8');
    const parts = splitFrontmatter(original);
    if (!parts) {
      console.warn(`[skip] no frontmatter: ${locale}/${file}`);
      continue;
    }
    let { fmInner, body } = parts;
    let changed = false;

    // ── 1. Expertise migration ──────────────────────────────────────────
    if (!hasField(fmInner, 'expertise')) {
      const section = findSection(body, EXPERTISE_HEADINGS[locale]);
      if (section) {
        const items = extractBullets(section.block);
        if (items.length > 0) {
          const fieldYaml = `expertise:\n${yamlList(items)}`;
          fmInner = insertField(fmInner, fieldYaml);
          body = removeSection(body, section);
          changed = true;
          expertiseCount++;
        }
      }
    }

    // ── 2. Pull-quote extraction ────────────────────────────────────────
    if (!hasField(fmInner, 'pullQuote')) {
      const about = findSection(body, ABOUT_HEADINGS[locale]);
      if (about) {
        const quote = pickPullQuote(about.block, KEYWORDS[locale]);
        if (quote) {
          const fieldYaml = `pullQuote: ${yamlScalar(quote)}`;
          fmInner = insertField(fmInner, fieldYaml);
          changed = true;
          pullQuoteCount++;
        }
      }
    }

    if (changed) {
      // Reason: fmInner may not end with a newline (the regex that extracts it
      // strips the newline before the closing `---`), so we force exactly one
      // trailing newline before re-attaching the closing delimiter.
      const fmNormalized = fmInner.replace(/\n*$/, '\n');
      const bodyNormalized = body.replace(/^\n+/, '\n');
      const next = `---\n${fmNormalized}---\n${bodyNormalized}`;
      fs.writeFileSync(filePath, next, 'utf8');
    }
  }
}

console.log(
  `Migration complete: ${totalFiles} files scanned, ` +
    `${expertiseCount} expertise lists migrated, ` +
    `${pullQuoteCount} pull quotes extracted.`
);
