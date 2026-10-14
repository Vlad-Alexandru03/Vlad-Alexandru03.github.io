import { mkdir, readFile, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import { profiles } from "../src/profiles";
import { person } from "../src/content/portfolio";

const template = await readFile("dist/index.html", "utf8");
const assetBase = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const urls: string[] = [];

for (const [id, profile] of Object.entries(profiles)) {
  const route = id === "general" ? "" : `${id}/`;
  const title = `Vlad Petrariu | ${id === "general" ? "Automation, Robotics & Software" : profile.label}`;
  const description = `${person.name}. ${profile.summary}`;
  const markup = renderToStaticMarkup(
    <App initialProfile={id} assetBase={assetBase} />,
  );
  let html = template.replace("<!--portfolio-html-->", markup);
  if (html === template)
    throw new Error("Missing prerender marker in production HTML.");
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escapeHtml(description)}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escapeHtml(title)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escapeHtml(description)}$2`,
    );
  if (site) {
    const canonical = new URL(route, site).href;
    const social = new URL(
      id === "general" ? "social-preview.png" : "vlad-petrariu.png",
      site,
    ).href;
    html = html.replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escapeHtml(social)}$2`,
    );
    html = html.replace(
      "</head>",
      `<link rel="canonical" href="${escapeHtml(canonical)}" /><meta property="og:url" content="${escapeHtml(canonical)}" /></head>`,
    );
    urls.push(canonical);
  }
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}index.html`, html);
}

await writeFile("dist/.nojekyll", "");
const home = site?.href || assetBase;
await writeFile(
  "dist/404.html",
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Vlad Petrariu</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#faf9f6;color:#292d29}main{max-width:520px;padding:40px}p{line-height:1.7;color:#626c7b}a{color:#4c604b;text-underline-offset:5px}h1{font-size:42px;letter-spacing:-1.5px;font-weight:500}</style></head><body><main><p>VLAD PETRARIU / 404</p><h1>Page not found.</h1><p>The link may have changed. You can find my projects, experience, and contact details on the portfolio.</p><a href="${escapeHtml(home)}">Return to the portfolio →</a></main></body></html>`,
);
if (site) {
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", site).href}\n`,
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escapeHtml(url)}</loc></url>`).join("")}</urlset>`,
  );
}
console.log(
  `Prerendered ${Object.keys(profiles).length} dedicated portfolio pages with page-specific metadata.`,
);
