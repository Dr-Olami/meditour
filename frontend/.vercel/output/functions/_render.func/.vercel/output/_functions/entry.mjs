import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CQQwPCzG.mjs';
import { manifest } from './manifest_DS4sIDfJ.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/lead.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/bn/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/bn/blog.astro.mjs');
const _page6 = () => import('./pages/bn/doctors/_slug_.astro.mjs');
const _page7 = () => import('./pages/bn/doctors.astro.mjs');
const _page8 = () => import('./pages/bn/hospitals/_slug_.astro.mjs');
const _page9 = () => import('./pages/bn/hospitals.astro.mjs');
const _page10 = () => import('./pages/bn/how-it-works.astro.mjs');
const _page11 = () => import('./pages/bn/treatments/_slug_.astro.mjs');
const _page12 = () => import('./pages/bn/treatments.astro.mjs');
const _page13 = () => import('./pages/bn.astro.mjs');
const _page14 = () => import('./pages/doctors/_slug_.astro.mjs');
const _page15 = () => import('./pages/doctors.astro.mjs');
const _page16 = () => import('./pages/hospitals/_slug_.astro.mjs');
const _page17 = () => import('./pages/hospitals.astro.mjs');
const _page18 = () => import('./pages/how-it-works.astro.mjs');
const _page19 = () => import('./pages/treatments/_slug_.astro.mjs');
const _page20 = () => import('./pages/treatments.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/lead.ts", _page1],
    ["src/pages/blog/[slug].astro", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/bn/blog/[slug].astro", _page4],
    ["src/pages/bn/blog.astro", _page5],
    ["src/pages/bn/doctors/[slug].astro", _page6],
    ["src/pages/bn/doctors.astro", _page7],
    ["src/pages/bn/hospitals/[slug].astro", _page8],
    ["src/pages/bn/hospitals.astro", _page9],
    ["src/pages/bn/how-it-works.astro", _page10],
    ["src/pages/bn/treatments/[slug].astro", _page11],
    ["src/pages/bn/treatments.astro", _page12],
    ["src/pages/bn/index.astro", _page13],
    ["src/pages/doctors/[slug].astro", _page14],
    ["src/pages/doctors.astro", _page15],
    ["src/pages/hospitals/[slug].astro", _page16],
    ["src/pages/hospitals.astro", _page17],
    ["src/pages/how-it-works.astro", _page18],
    ["src/pages/treatments/[slug].astro", _page19],
    ["src/pages/treatments.astro", _page20],
    ["src/pages/index.astro", _page21]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "acc2412e-6333-4966-99c0-551fc7c1f786",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
