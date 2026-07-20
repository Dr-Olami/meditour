import type { Config } from 'tailwindcss';
import preset from './src/design-system/tokens/tailwind.preset';

const config: Config = {
  presets: [preset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
};

export default config;
