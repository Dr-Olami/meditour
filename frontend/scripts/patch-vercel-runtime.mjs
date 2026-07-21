import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FUNCTIONS_DIR = fileURLToPath(
  new URL('../.vercel/output/functions', import.meta.url),
);

async function patchRuntimes() {
  let entries;
  try {
    entries = await readdir(FUNCTIONS_DIR, { withFileTypes: true });
  } catch {
    console.log('No .vercel/output/functions directory found, skipping runtime patch.');
    return;
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.endsWith('.func')) continue;

    const configPath = join(FUNCTIONS_DIR, entry.name, '.vc-config.json');
    let raw;
    try {
      raw = await readFile(configPath, 'utf-8');
    } catch {
      continue;
    }

    const config = JSON.parse(raw);
    if (config.runtime === 'nodejs18.x') {
      config.runtime = 'nodejs20.x';
      await writeFile(configPath, JSON.stringify(config, null, 2));
      console.log(`Patched ${entry.name} runtime: nodejs18.x -> nodejs20.x`);
    }
  }
}

patchRuntimes().catch((err) => {
  console.error(err);
  process.exit(1);
});
