import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_DQYYPR0v.mjs';
import 'kleur/colors';
import { g as getTranslations, m as medicalBusiness, $ as $$Layout } from '../chunks/i18n_LjFxOl38.mjs';
import { $ as $$HomePage } from '../chunks/HomePage_CqumZWPO.mjs';
import { a as getTreatments, b as getDoctors, c as getHospitals, f as getTestimonials, e as entrySlug, r as resolveHospital } from '../chunks/content_CbosjZCm.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://khanmeditour.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const t = getTranslations("en");
  const siteUrl = (Astro2.site ? Astro2.site.toString() : Astro2.url.origin).replace(/\/$/, "");
  const whatsappNumber = "8801611892986";
  const contactEmail = "khan@meditour.com";
  const [treatmentEntries, doctorEntries, hospitalEntries, testimonialEntries] = await Promise.all([
    getTreatments("en"),
    getDoctors("en"),
    getHospitals("en"),
    getTestimonials("en")
  ]);
  const treatments = treatmentEntries.map((entry) => ({
    name: entry.data.name,
    description: entry.data.description,
    fromPrice: entry.data.fromPrice,
    category: entry.data.category,
    tags: entry.data.category ? [entry.data.category] : void 0,
    href: `/treatments/${entrySlug(entry)}`
  }));
  const featuredDoctors = doctorEntries.slice(0, 4).map((entry) => {
    const hospital = resolveHospital(entry.data.hospitalId, hospitalEntries);
    return {
      name: entry.data.name,
      specialty: entry.data.specialty,
      qualification: entry.data.qualification,
      experienceYears: entry.data.experienceYears,
      avatar: entry.data.avatar,
      href: `/doctors/${entrySlug(entry)}`,
      hospitalName: hospital?.name,
      hospitalHref: hospital?.href
    };
  });
  const featuredHospitals = hospitalEntries.slice(0, 3).map((entry) => ({
    slug: entrySlug(entry),
    name: entry.data.name,
    city: entry.data.city,
    country: entry.data.country,
    image: entry.data.image,
    accreditations: entry.data.accreditations
  }));
  const testimonials = testimonialEntries.map((entry) => entry.data);
  const categories = Array.from(new Set(treatmentEntries.map((entry) => entry.data.category).filter(Boolean)));
  const jsonLd = medicalBusiness({
    name: t.site.name,
    url: siteUrl,
    whatsapp: whatsappNumber,
    email: contactEmail,
    specialties: categories.length ? categories : void 0
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.site.name} — ${t.site.tagline}`, "description": t.site.description, "locale": "en", "jsonLd": jsonLd }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HomePage", $$HomePage, { "locale": "en", "treatments": treatments, "featuredDoctors": featuredDoctors, "featuredHospitals": featuredHospitals, "testimonials": testimonials })} ` })}`;
}, "C:/Users/abdul/Downloads/khan/frontend/src/pages/index.astro", void 0);
const $$file = "C:/Users/abdul/Downloads/khan/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
