/**
 * Audit script: find dead doctor slugs referenced in treatment files.
 *
 * Lists every treatment file that references a deleted doctor in
 * `relatedDoctorSlugs`, and flags files that would be left with zero
 * related doctors after the dead slugs are removed.
 */
import fs from 'node:fs';
import path from 'node:path';

const DEAD = [
  'dr-ananya-sen',
  'dr-arun-kumar',
  'dr-kavita-iyer',
  'dr-priya-nair',
  'dr-rajesh-sharma',
  'dr-ravi-menon',
  'dr-sameer-khan',
  'dr-sunita-rao',
  'dr-vikram-patel',
];

const live = new Set(
  fs.readdirSync('src/content/doctors/en').map((f) => f.replace(/\.md$/, ''))
);

console.log(`LIVE DOCTORS: ${live.size}`);
for (const d of DEAD) {
  console.log(`  ${d} -> ${live.has(d) ? 'LIVE' : 'DEAD'}`);
}

console.log('\n--- TREATMENT FILES WITH relatedDoctorSlugs ---');
for (const loc of ['en', 'bn']) {
  const dir = path.join('src/content/treatments', loc);
  for (const f of fs.readdirSync(dir)) {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = c.match(/^relatedDoctorSlugs:\s*\n((?:  - .*\n)+)/m);
    if (!m) continue;
    const slugs = m[1]
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => l.replace(/^  - /, '').trim());
    const deads = slugs.filter((s) => DEAD.includes(s));
    const lives = slugs.filter((s) => !DEAD.includes(s) && live.has(s));
    const missing = slugs.filter((s) => !live.has(s) && !DEAD.includes(s));
    const parts = [
      `${loc}/${f}`,
      `total=${slugs.length}`,
      `live=${lives.length}`,
      `dead=${deads.length}`,
    ];
    if (missing.length) parts.push(`UNKNOWN=${missing.join(',')}`);
    if (deads.length) parts.push(`DEAD=${deads.join(',')}`);
    if (lives.length === 0) parts.push('<<< EMPTY AFTER FILTER');
    console.log(parts.join(' '));
  }
}
