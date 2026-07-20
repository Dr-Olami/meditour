declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"bn/cost-of-cardiac-care-in-india.md": {
	id: "bn/cost-of-cardiac-care-in-india.md";
  slug: "bn/cost-of-cardiac-care-in-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"bn/how-to-choose-a-medical-tourism-facilitator.md": {
	id: "bn/how-to-choose-a-medical-tourism-facilitator.md";
  slug: "bn/how-to-choose-a-medical-tourism-facilitator";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"bn/ivf-treatment-guide-for-bangladeshi-couples.md": {
	id: "bn/ivf-treatment-guide-for-bangladeshi-couples.md";
  slug: "bn/ivf-treatment-guide-for-bangladeshi-couples";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"bn/patient-story-hip-replacement-mohammed.md": {
	id: "bn/patient-story-hip-replacement-mohammed.md";
  slug: "bn/patient-story-hip-replacement-mohammed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"en/cost-of-cardiac-care-in-india.md": {
	id: "en/cost-of-cardiac-care-in-india.md";
  slug: "en/cost-of-cardiac-care-in-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"en/how-to-choose-a-medical-tourism-facilitator.md": {
	id: "en/how-to-choose-a-medical-tourism-facilitator.md";
  slug: "en/how-to-choose-a-medical-tourism-facilitator";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"en/ivf-treatment-guide-for-bangladeshi-couples.md": {
	id: "en/ivf-treatment-guide-for-bangladeshi-couples.md";
  slug: "en/ivf-treatment-guide-for-bangladeshi-couples";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"en/patient-story-hip-replacement-mohammed.md": {
	id: "en/patient-story-hip-replacement-mohammed.md";
  slug: "en/patient-story-hip-replacement-mohammed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"doctors": {
"bn/dr-ananya-sen.md": {
	id: "bn/dr-ananya-sen.md";
  slug: "bn/dr-ananya-sen";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-arun-kumar.md": {
	id: "bn/dr-arun-kumar.md";
  slug: "bn/dr-arun-kumar";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-kavita-iyer.md": {
	id: "bn/dr-kavita-iyer.md";
  slug: "bn/dr-kavita-iyer";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-priya-nair.md": {
	id: "bn/dr-priya-nair.md";
  slug: "bn/dr-priya-nair";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-rajesh-sharma.md": {
	id: "bn/dr-rajesh-sharma.md";
  slug: "bn/dr-rajesh-sharma";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-ravi-menon.md": {
	id: "bn/dr-ravi-menon.md";
  slug: "bn/dr-ravi-menon";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-sameer-khan.md": {
	id: "bn/dr-sameer-khan.md";
  slug: "bn/dr-sameer-khan";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-sunita-rao.md": {
	id: "bn/dr-sunita-rao.md";
  slug: "bn/dr-sunita-rao";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"bn/dr-vikram-patel.md": {
	id: "bn/dr-vikram-patel.md";
  slug: "bn/dr-vikram-patel";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-ananya-sen.md": {
	id: "en/dr-ananya-sen.md";
  slug: "en/dr-ananya-sen";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-arun-kumar.md": {
	id: "en/dr-arun-kumar.md";
  slug: "en/dr-arun-kumar";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-kavita-iyer.md": {
	id: "en/dr-kavita-iyer.md";
  slug: "en/dr-kavita-iyer";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-priya-nair.md": {
	id: "en/dr-priya-nair.md";
  slug: "en/dr-priya-nair";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-rajesh-sharma.md": {
	id: "en/dr-rajesh-sharma.md";
  slug: "en/dr-rajesh-sharma";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-ravi-menon.md": {
	id: "en/dr-ravi-menon.md";
  slug: "en/dr-ravi-menon";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-sameer-khan.md": {
	id: "en/dr-sameer-khan.md";
  slug: "en/dr-sameer-khan";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-sunita-rao.md": {
	id: "en/dr-sunita-rao.md";
  slug: "en/dr-sunita-rao";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
"en/dr-vikram-patel.md": {
	id: "en/dr-vikram-patel.md";
  slug: "en/dr-vikram-patel";
  body: string;
  collection: "doctors";
  data: InferEntrySchema<"doctors">
} & { render(): Render[".md"] };
};
"hospitals": {
"bn/apollo-hospital-delhi.md": {
	id: "bn/apollo-hospital-delhi.md";
  slug: "bn/apollo-hospital-delhi";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"bn/fortis-escorts-heart-institute.md": {
	id: "bn/fortis-escorts-heart-institute.md";
  slug: "bn/fortis-escorts-heart-institute";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"bn/manipal-hospital-bangalore.md": {
	id: "bn/manipal-hospital-bangalore.md";
  slug: "bn/manipal-hospital-bangalore";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"bn/max-super-speciality-saket.md": {
	id: "bn/max-super-speciality-saket.md";
  slug: "bn/max-super-speciality-saket";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"bn/medanta-medicity-gurgaon.md": {
	id: "bn/medanta-medicity-gurgaon.md";
  slug: "bn/medanta-medicity-gurgaon";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"en/apollo-hospital-delhi.md": {
	id: "en/apollo-hospital-delhi.md";
  slug: "en/apollo-hospital-delhi";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"en/fortis-escorts-heart-institute.md": {
	id: "en/fortis-escorts-heart-institute.md";
  slug: "en/fortis-escorts-heart-institute";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"en/manipal-hospital-bangalore.md": {
	id: "en/manipal-hospital-bangalore.md";
  slug: "en/manipal-hospital-bangalore";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"en/max-super-speciality-saket.md": {
	id: "en/max-super-speciality-saket.md";
  slug: "en/max-super-speciality-saket";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
"en/medanta-medicity-gurgaon.md": {
	id: "en/medanta-medicity-gurgaon.md";
  slug: "en/medanta-medicity-gurgaon";
  body: string;
  collection: "hospitals";
  data: InferEntrySchema<"hospitals">
} & { render(): Render[".md"] };
};
"treatments": {
"bn/bariatric-weight-loss.md": {
	id: "bn/bariatric-weight-loss.md";
  slug: "bn/bariatric-weight-loss";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/cancer-treatment.md": {
	id: "bn/cancer-treatment.md";
  slug: "bn/cancer-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/cardiology.md": {
	id: "bn/cardiology.md";
  slug: "bn/cardiology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/cosmetic-surgery.md": {
	id: "bn/cosmetic-surgery.md";
  slug: "bn/cosmetic-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/ear-nose-throat.md": {
	id: "bn/ear-nose-throat.md";
  slug: "bn/ear-nose-throat";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/infertility-treatment.md": {
	id: "bn/infertility-treatment.md";
  slug: "bn/infertility-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/neuro-and-spine-surgery.md": {
	id: "bn/neuro-and-spine-surgery.md";
  slug: "bn/neuro-and-spine-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/ophthalmology.md": {
	id: "bn/ophthalmology.md";
  slug: "bn/ophthalmology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/organ-treatment.md": {
	id: "bn/organ-treatment.md";
  slug: "bn/organ-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/orthopedics-surgery.md": {
	id: "bn/orthopedics-surgery.md";
  slug: "bn/orthopedics-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/stem-cell-treatment.md": {
	id: "bn/stem-cell-treatment.md";
  slug: "bn/stem-cell-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"bn/urology.md": {
	id: "bn/urology.md";
  slug: "bn/urology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/bariatric-weight-loss.md": {
	id: "en/bariatric-weight-loss.md";
  slug: "en/bariatric-weight-loss";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/cancer-treatment.md": {
	id: "en/cancer-treatment.md";
  slug: "en/cancer-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/cardiology.md": {
	id: "en/cardiology.md";
  slug: "en/cardiology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/cosmetic-surgery.md": {
	id: "en/cosmetic-surgery.md";
  slug: "en/cosmetic-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/ear-nose-throat.md": {
	id: "en/ear-nose-throat.md";
  slug: "en/ear-nose-throat";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/infertility-treatment.md": {
	id: "en/infertility-treatment.md";
  slug: "en/infertility-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/neuro-and-spine-surgery.md": {
	id: "en/neuro-and-spine-surgery.md";
  slug: "en/neuro-and-spine-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/ophthalmology.md": {
	id: "en/ophthalmology.md";
  slug: "en/ophthalmology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/organ-treatment.md": {
	id: "en/organ-treatment.md";
  slug: "en/organ-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/orthopedics-surgery.md": {
	id: "en/orthopedics-surgery.md";
  slug: "en/orthopedics-surgery";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/stem-cell-treatment.md": {
	id: "en/stem-cell-treatment.md";
  slug: "en/stem-cell-treatment";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"en/urology.md": {
	id: "en/urology.md";
  slug: "en/urology";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"testimonials": {
"bn/adeeba-irshad": {
	id: "bn/adeeba-irshad";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"bn/ashwinipriya-chandra": {
	id: "bn/ashwinipriya-chandra";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"bn/mohammed-al-rashid": {
	id: "bn/mohammed-al-rashid";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"bn/rahela-begum": {
	id: "bn/rahela-begum";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"bn/shruthi-arjun": {
	id: "bn/shruthi-arjun";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"en/adeeba-irshad": {
	id: "en/adeeba-irshad";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"en/ashwinipriya-chandra": {
	id: "en/ashwinipriya-chandra";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"en/mohammed-al-rashid": {
	id: "en/mohammed-al-rashid";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"en/rahela-begum": {
	id: "en/rahela-begum";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"en/shruthi-arjun": {
	id: "en/shruthi-arjun";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
