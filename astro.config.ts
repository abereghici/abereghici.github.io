import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";

import { siteConfig } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.site,

	vite: {
		plugins: [],
	},

	integrations: [
		mdx(),
		icon(),
		sitemap(),
		robotsTxt(),
		webmanifest({
			name: siteConfig.title,
			description: siteConfig.description,
			lang: siteConfig.lang,
			icon: "public/icon.svg", // the source for generating favicon & icons
			icons: [
				{
					src: "icons/apple-touch-icon.png",
					sizes: "180x180",
					type: "image/png",
				},
				{
					src: "icons/icon-192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "icons/icon-512.png",
					sizes: "512x512",
					type: "image/png",
				},
			],
			start_url: "/",
			background_color: "#232136",
			theme_color: "#e0def4",
			display: "standalone",
			config: {
				insertFaviconLinks: false,
				insertThemeColorMeta: false,
				insertManifestLink: false,
			},
		}),
	],
});
