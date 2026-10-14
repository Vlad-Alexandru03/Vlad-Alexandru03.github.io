import { readFile, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";

// The default portfolio is readable and indexable before JavaScript loads.
const template = await readFile("dist/index.html", "utf8");
let html = template.replace(
  "<!--portfolio-html-->",
  renderToStaticMarkup(<App assetBase={process.env.BASE_PATH || "/"} />),
);
if (html === template)
  throw new Error("Missing prerender marker in the production HTML.");
if (process.env.SITE_URL) {
  const site = new URL(process.env.SITE_URL);
  const social = new URL("social-preview.png", site).href;
  html = html.replace(
    /(<meta property="og:image" content=")[^"]*("\s*\/>)/,
    `$1${social}$2`,
  );
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${site.href}" /><meta property="og:url" content="${site.href}" /></head>`,
  );
}
await writeFile("dist/index.html", html);
await writeFile("dist/.nojekyll", "");
const home = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).href
  : process.env.BASE_PATH || "/";
await writeFile(
  "dist/404.html",
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Vlad Petrariu</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#faf9f6;color:#292d29}main{max-width:520px;padding:40px}p{line-height:1.7;color:#626c7b}a{color:#4c604b;text-underline-offset:5px}h1{font-size:42px;letter-spacing:-1.5px;font-weight:500}</style></head><body><main><p>VLAD PETRARIU / 404</p><h1>Page not found.</h1><p>The link may have changed. You can find my projects, experience, and contact details on the portfolio.</p><a href="${home}">Return to the portfolio →</a></main></body></html>`,
);
if (process.env.SITE_URL) {
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", home).href}\n`,
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${home}</loc></url></urlset>`,
  );
}
console.log("Prerendered the homepage and generated static hosting metadata.");
