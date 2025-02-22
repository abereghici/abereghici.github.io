import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
	site: "https://abereghici.github.io",
	title: "Alexandru Bereghici",
	author: "Alexandru Bereghici",
	description: "Web Developer",
	lang: "en-GB",
	ogLocale: "en-GB",
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{ path: "/", title: "Home" },
	{
		path: "/posts/",
		title: "Posts",
	},
	{
		path: "/about",
		title: "About",
	},
];

export const socialLinks: { title: string; href: string; icon: string }[] = [
	{
		title: "LinkedIn",
		icon: "linkedin",
		href: "https://www.linkedin.com/in/alexandrubereghici/",
	},
	{
		title: "Github",
		icon: "github",
		href: "https://github.com/abereghici",
	},
];
