import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: "Julius Busecke's Blog",
    description: 'Welcome to my blog, where I share thoughts on climate science, software engineering, and open science.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en</language>`,
  });
}