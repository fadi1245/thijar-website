// Writes static HTML for every route so crawlers and link previews get real
// content and per-page meta tags. Runs after `vite build` and the SSR build
// of src/entry-server.tsx (see the "build" script in package.json).
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");

// [url, output file]; Vercel's cleanUrls serves /about-us from about-us.html
const pages = [
  ["/", "index.html"],
  ["/about-us", "about-us.html"],
  ["/service", "service.html"],
  ["/erp", "erp.html"],
  ["/careers", "careers.html"],
  ["/contact-us", "contact-us.html"],
  ["/__not-found__", "404.html"],
];

// React 19 emits <title>/<meta>/<link> from <HeadContent /> ahead of the app
// markup; move them into <head> where they belong.
const HEAD_TAGS = /^(?:<(?:title|meta|link)\b[^>]*>(?:[^<]*<\/title>)?)+/;

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing the prerender placeholders");
}

const { render } = await import(pathToFileURL(serverEntry).href);

for (const [url, file] of pages) {
  const { html: rendered, statusCode } = await render(url);
  const headTags = rendered.match(HEAD_TAGS)?.[0] ?? "";
  const body = rendered.slice(headTags.length);
  // Marked so main.tsx can drop them before React inserts its own copies
  const head = headTags.replace(/<(title|meta|link)\b/g, "<$1 data-prerender");

  if (!headTags.includes("<title>")) throw new Error(`No <title> rendered for ${url}`);
  const expected = file === "404.html" ? 404 : 200;
  if (statusCode !== expected) throw new Error(`${url} rendered with status ${statusCode}`);

  const robots = file === "404.html" ? '<meta name="robots" content="noindex"/>' : "";
  const out = template
    .replace("<!--app-head-->", head + robots)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  await fs.writeFile(path.join(dist, file), out);
  console.log(`prerendered ${url} -> dist/${file}`);
}
