import type { Config } from 'tailwindcss';
import preset from './src/design-system/tokens/tailwind.preset';

// Category hue colors used in treatment hero glow blobs. These are built
// dynamically via `bg-${hue.primary}/15` in the treatment page template, so
// Tailwind's JIT scanner can't detect them as complete strings. The safelist
// ensures all possible hue classes are generated.
const CATEGORY_HUE_COLORS = [
  'violet', 'indigo', 'rose', 'pink', 'amber', 'orange', 'cyan', 'sky',
  'emerald', 'teal', 'blue', 'lime', 'green', 'fuchsia', 'purple',
];
const safelist: string[] = [];
for (const color of CATEGORY_HUE_COLORS) {
  safelist.push(`bg-${color}-600/15`);
  safelist.push(`bg-${color}-600/10`);
  safelist.push(`bg-${color}-500/15`);
  safelist.push(`bg-${color}-500/10`);
}

const config: Config = {
  presets: [preset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist,
};

export default config;
