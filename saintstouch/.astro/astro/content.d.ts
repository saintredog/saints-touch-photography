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
		
	};

	type DataEntryMap = {
		"bulk": {
"aiko-night-day": {
	id: "aiko-night-day";
  collection: "bulk";
  data: any
};
"len": {
	id: "len";
  collection: "bulk";
  data: any
};
"session1": {
	id: "session1";
  collection: "bulk";
  data: any
};
};
"couples": {
"c-1": {
	id: "c-1";
  collection: "couples";
  data: any
};
"c-2": {
	id: "c-2";
  collection: "couples";
  data: any
};
"c-3": {
	id: "c-3";
  collection: "couples";
  data: any
};
"c-4": {
	id: "c-4";
  collection: "couples";
  data: any
};
};
"events": {
"e-1": {
	id: "e-1";
  collection: "events";
  data: any
};
"e-10": {
	id: "e-10";
  collection: "events";
  data: any
};
"e-11": {
	id: "e-11";
  collection: "events";
  data: any
};
"e-12": {
	id: "e-12";
  collection: "events";
  data: any
};
"e-13": {
	id: "e-13";
  collection: "events";
  data: any
};
"e-14": {
	id: "e-14";
  collection: "events";
  data: any
};
"e-15": {
	id: "e-15";
  collection: "events";
  data: any
};
"e-16": {
	id: "e-16";
  collection: "events";
  data: any
};
"e-17": {
	id: "e-17";
  collection: "events";
  data: any
};
"e-18": {
	id: "e-18";
  collection: "events";
  data: any
};
"e-19": {
	id: "e-19";
  collection: "events";
  data: any
};
"e-2": {
	id: "e-2";
  collection: "events";
  data: any
};
"e-20": {
	id: "e-20";
  collection: "events";
  data: any
};
"e-21": {
	id: "e-21";
  collection: "events";
  data: any
};
"e-22": {
	id: "e-22";
  collection: "events";
  data: any
};
"e-23": {
	id: "e-23";
  collection: "events";
  data: any
};
"e-24": {
	id: "e-24";
  collection: "events";
  data: any
};
"e-25": {
	id: "e-25";
  collection: "events";
  data: any
};
"e-26": {
	id: "e-26";
  collection: "events";
  data: any
};
"e-3": {
	id: "e-3";
  collection: "events";
  data: any
};
"e-4": {
	id: "e-4";
  collection: "events";
  data: any
};
"e-5": {
	id: "e-5";
  collection: "events";
  data: any
};
"e-6": {
	id: "e-6";
  collection: "events";
  data: any
};
"e-7": {
	id: "e-7";
  collection: "events";
  data: any
};
"e-8": {
	id: "e-8";
  collection: "events";
  data: any
};
"e-9": {
	id: "e-9";
  collection: "events";
  data: any
};
};
"fashion": {
"f-1": {
	id: "f-1";
  collection: "fashion";
  data: any
};
"f-2": {
	id: "f-2";
  collection: "fashion";
  data: any
};
"f-3": {
	id: "f-3";
  collection: "fashion";
  data: any
};
"f-4": {
	id: "f-4";
  collection: "fashion";
  data: any
};
"f-5": {
	id: "f-5";
  collection: "fashion";
  data: any
};
"f-6": {
	id: "f-6";
  collection: "fashion";
  data: any
};
};
"hospitality": {
"h-1": {
	id: "h-1";
  collection: "hospitality";
  data: any
};
"h-10": {
	id: "h-10";
  collection: "hospitality";
  data: any
};
"h-11": {
	id: "h-11";
  collection: "hospitality";
  data: any
};
"h-12": {
	id: "h-12";
  collection: "hospitality";
  data: any
};
"h-13": {
	id: "h-13";
  collection: "hospitality";
  data: any
};
"h-14": {
	id: "h-14";
  collection: "hospitality";
  data: any
};
"h-15": {
	id: "h-15";
  collection: "hospitality";
  data: any
};
"h-16": {
	id: "h-16";
  collection: "hospitality";
  data: any
};
"h-17": {
	id: "h-17";
  collection: "hospitality";
  data: any
};
"h-18": {
	id: "h-18";
  collection: "hospitality";
  data: any
};
"h-2": {
	id: "h-2";
  collection: "hospitality";
  data: any
};
"h-3": {
	id: "h-3";
  collection: "hospitality";
  data: any
};
"h-4": {
	id: "h-4";
  collection: "hospitality";
  data: any
};
"h-5": {
	id: "h-5";
  collection: "hospitality";
  data: any
};
"h-6": {
	id: "h-6";
  collection: "hospitality";
  data: any
};
"h-7": {
	id: "h-7";
  collection: "hospitality";
  data: any
};
"h-8": {
	id: "h-8";
  collection: "hospitality";
  data: any
};
"h-9": {
	id: "h-9";
  collection: "hospitality";
  data: any
};
};
"portraits": {
"p-1": {
	id: "p-1";
  collection: "portraits";
  data: any
};
"p-10": {
	id: "p-10";
  collection: "portraits";
  data: any
};
"p-101": {
	id: "p-101";
  collection: "portraits";
  data: any
};
"p-11": {
	id: "p-11";
  collection: "portraits";
  data: any
};
"p-12": {
	id: "p-12";
  collection: "portraits";
  data: any
};
"p-13": {
	id: "p-13";
  collection: "portraits";
  data: any
};
"p-14": {
	id: "p-14";
  collection: "portraits";
  data: any
};
"p-15": {
	id: "p-15";
  collection: "portraits";
  data: any
};
"p-16": {
	id: "p-16";
  collection: "portraits";
  data: any
};
"p-17": {
	id: "p-17";
  collection: "portraits";
  data: any
};
"p-18": {
	id: "p-18";
  collection: "portraits";
  data: any
};
"p-2": {
	id: "p-2";
  collection: "portraits";
  data: any
};
"p-20": {
	id: "p-20";
  collection: "portraits";
  data: any
};
"p-21": {
	id: "p-21";
  collection: "portraits";
  data: any
};
"p-22": {
	id: "p-22";
  collection: "portraits";
  data: any
};
"p-3": {
	id: "p-3";
  collection: "portraits";
  data: any
};
"p-4": {
	id: "p-4";
  collection: "portraits";
  data: any
};
"p-5": {
	id: "p-5";
  collection: "portraits";
  data: any
};
"p-6": {
	id: "p-6";
  collection: "portraits";
  data: any
};
"p-7": {
	id: "p-7";
  collection: "portraits";
  data: any
};
"p-8": {
	id: "p-8";
  collection: "portraits";
  data: any
};
"p-9": {
	id: "p-9";
  collection: "portraits";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
