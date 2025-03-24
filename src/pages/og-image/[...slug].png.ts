import type { APIContext, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { formatDate } from "@/lib/utils";
import Geist from "@/assets/Geist-Regular.ttf";
import GeistBold from "@/assets/Geist-Bold.ttf";
import { SITE_AUTHOR } from "@/consts";

const ogOptions: SatoriOptions = {
  fonts: [
    {
      data: Buffer.from(Geist),
      name: "Geist",
      style: "normal",
      weight: 400,
    },
    {
      data: Buffer.from(GeistBold),
      name: "Geist",
      style: "normal",
      weight: 700,
    },
  ],
  height: 630,
  width: 1200,
};

const markup = (title: string, pubDate: string) =>
  html`<div tw="flex flex-col w-full h-full bg-[#faf4ed] text-[#575279]">
    <div tw="flex flex-col flex-1 w-full p-10 justify-center">
      <p tw="text-2xl mb-6">${pubDate}</p>
      <h1 tw="text-6xl font-bold leading-snug">${title}</h1>
    </div>
    <div
      tw="flex items-center justify-between w-full p-10 border-t border-[#907aa9] text-xl"
    >
      <div tw="flex items-center">
        <p tw="ml-3 font-semibold">${SITE_AUTHOR}</p>
      </div>
    </div>
  </div>` as unknown as React.ReactNode;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
  const { date, title } = context.props as Props;
  const postDate = formatDate(date);

  const svg = await satori(markup(title, postDate), ogOptions);
  const png = new Resvg(svg).render().asPng();
  return new Response(png, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      date: post.data.date,
      title: post.data.title,
    },
  }));
}
