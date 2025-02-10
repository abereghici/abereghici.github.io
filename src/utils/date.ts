import { siteConfig } from "@/site-config";
import type { CollectionEntry } from "astro:content";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

  console.log(date, options)

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
