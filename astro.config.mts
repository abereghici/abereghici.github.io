// @ts-check
import fs from "node:fs";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import webmanifest from "astro-webmanifest";
import tailwindcss from "@tailwindcss/vite";

import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "./src/consts";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt(),
    react(),
    webmanifest({
      name: `${SITE_AUTHOR} • ${SITE_TITLE}`,
      description: SITE_DESCRIPTION,
      lang: "en",
      icon: "public/favicon.svg", // the source for generating favicon & icons
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
  vite: {
    plugins: [tailwindcss(), rawFonts([".ttf", ".woff"])],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine-moon",
      },
    },
  },
});

function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
