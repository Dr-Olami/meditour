/**
 * One-shot cleanup script: remove dead doctor slugs from treatment files and
 * remap stem-cell-treatment to the BMT/haematology doctors in the roster.
 *
 * Dead slugs (doctors deleted from the content collection):
 *   dr-ananya-sen, dr-arun-kumar, dr-kavita-iyer, dr-priya-nair,
 *   dr-rajesh-sharma, dr-ravi-menon, dr-sameer-khan, dr-sunita-rao,
 *   dr-vikram-patel
 *
 * Remap: stem-cell-treatment → dr-chandrakala-s, dr-mahesh-rajashekaraiah,
 * dr-sunil-udgire (all Haematology & BMT specialists — BMT IS stem cell
 * treatment).
 *
 * Ophthalmology and infertility-treatment have no matching specialist in the
 * current roster; their dead slug is removed and the `relatedDoctorSlugs`
 * field is dropped entirely (the section is conditionally rendered, so it
 * simply won't appear).
 *
 * Run once: `node scripts/fix-doctor-refs.mjs`
 */
import fs from 'node:fs';
import path from 'node:path';

const DEAD = new Set([
  'dr-ananya-sen',
  'dr-arun-kumar',
  'dr-kavita-iyer',
  'dr-priya-nair',
  'dr-rajesh-sharma',
  'dr-ravi-menon',
  'dr-sameer-khan',
  'dr-sunita-rao',
  'dr-vikram-patel',
]);

/** Treatment slug → replacement doctor slugs (live doctors only). */
const REMAP = {
  'stem-cell-treatment': [
    'dr-chandrakala-s',
    'dr-mahesh-rajashekaraiah',
    'dr-sunil-udgire',
  ],
};

let removedCount = 0;
let remappedCount = 0;
let droppedFieldCount = 0;

for (const loc of ['en', 'bn']) {
  const dir = path.join('src/content/treatments', loc);
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const treatmentSlug = file.replace(/\.md$/, '');
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Match the relatedDoctorSlugs block (key + indented list items).
    const fieldMatch = content.match(
      /^(relatedDoctorSlugs:\s*\n)((?:  - .*\n)+)/m
    );
    if (!fieldMatch) continue;

    const [, keyLine, listBlock] = fieldMatch;
    const slugs = listBlock
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => l.replace(/^  - /, '').trim());

    // If this treatment has a remap, replace the entire slug list.
    if (REMAP[treatmentSlug]) {
      const newList = REMAP[treatmentSlug]
        .map((s) => `  - ${s}`)
        .join('\n');
      const newBlock = `${keyLine}${newList}\n`;
      const next = content.replace(fieldMatch[0], newBlock);
      fs.writeFileSync(filePath, next, 'utf8');
      remappedCount++;
      console.log(
        `[remap] ${loc}/${file}: ${slugs.join(', ')} → ${REMAP[treatmentSlug].join(', ')}`
      );
      continue;
    }

    // Otherwise, filter out dead slugs.
    const live = slugs.filter((s) => !DEAD.has(s));
    const dead = slugs.filter((s) => DEAD.has(s));
    if (dead.length === 0) continue;

    if (live.length === 0) {
      // No live doctors left — drop the field entirely (plus its trailing newline).
      // Reason: an empty `relatedDoctorSlugs:` with no items is valid YAML
      // (null) but keeping it is misleading; removing it makes the intent
      // explicit and the section is conditionally rendered anyway.
      const next = content.replace(fieldMatch[0], '');
      fs.writeFileSync(filePath, next, 'utf8');
      droppedFieldCount++;
      console.log(
        `[drop]  ${loc}/${file}: removed ${dead.join(', ')} (no live doctors left, field dropped)`
      );
    } else {
      const newList = live.map((s) => `  - ${s}`).join('\n');
      const newBlock = `${keyLine}${newList}\n`;
      const next = content.replace(fieldMatch[0], newBlock);
      fs.writeFileSync(filePath, next, 'utf8');
      removedCount += dead.length;
      console.log(
        `[clean] ${loc}/${file}: removed ${dead.join(', ')} (${live.length} live remain)`
      );
    }
  }
}

console.log(
  `\nDone: ${removedCount} dead slugs removed, ${remappedCount} files remapped, ${droppedFieldCount} fields dropped.`
);
