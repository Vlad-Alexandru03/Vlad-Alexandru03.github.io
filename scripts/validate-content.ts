import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import { person, projects } from "../src/content/portfolio";
import {
  profiles,
  profilePath,
  profileLocation,
  resolveProfile,
  validateProfiles,
} from "../src/profiles";

validateProfiles();
assert.equal(
  new Set(projects.map((project) => project.id)).size,
  projects.length,
  "Project IDs must be unique",
);
for (const id of Object.keys(profiles)) {
  const profile = profiles[id];
  const html = renderToStaticMarkup(createElement(App, { initialProfile: id }));
  assert.ok(
    html.includes('<h2 id="work-title">Portfolio</h2>'),
    "Every page must use the neutral Portfolio heading",
  );
  assert.equal(
    (html.match(/class="project-entry project-featured"/g) ?? []).length,
    profile.featuredProjects.length,
  );
  assert.equal(
    html.indexOf('id="experience"') < html.indexOf('id="work"'),
    profile.experienceFirst,
    "Page order must reflect the profile emphasis",
  );
  for (const otherId of Object.keys(profiles)) {
    if (otherId !== "general")
      assert.ok(
        !html.includes(`href="${profilePath(otherId)}"`),
        "Visitor navigation must not expose other profiles",
      );
  }
  assert.equal(resolveProfile(`?focus=${id}`), id);
  assert.equal(resolveProfile(`?profile=${id}`), id);
  if (id !== "general") {
    const path = profilePath(id);
    assert.ok(!path.includes(id), "Public paths should not name the domain");
    assert.equal(resolveProfile("", path), id);
    assert.equal(resolveProfile("?focus=general", path), id);
    assert.equal(resolveProfile("", `${path}index.html`), id);
    assert.equal(
      resolveProfile("", profilePath(id, "/portfolio/"), "/portfolio/"),
      id,
    );
    for (const source of [
      `/${id}/`,
      `/?focus=${id}`,
      `/?profile=${id}`,
      path,
    ]) {
      assert.equal(
        profileLocation(new URL(`https://example.com${source}`)),
        path,
      );
    }
    assert.equal(
      profileLocation(
        new URL(
          `https://example.com/portfolio/${id}/?focus=general&project=edge-fog#work`,
        ),
        "/portfolio/",
      ),
      `${profilePath(id, "/portfolio/")}?project=edge-fog#work`,
    );
    assert.equal(resolveProfile("", `/${id}/`), id);
    assert.equal(resolveProfile("", `/${id}/index.html`), id);
    assert.equal(resolveProfile("?focus=general", `/${id}/`), id);
    assert.equal(resolveProfile("", `/portfolio/${id}/`, "/portfolio/"), id);
  }
}
assert.equal(resolveProfile("?profile=missing"), "general");
assert.equal(resolveProfile("?profile=__proto__"), "general");
assert.equal(resolveProfile("?focus=constructor"), "general");
assert.equal(resolveProfile("?focus=robotics&profile=software"), "software");
assert.equal(resolveProfile("?focus=software", "/robotics/"), "robotics");
assert.equal(resolveProfile("", "/unknown/"), "general");
assert.equal(
  profileLocation(new URL("https://example.com/?focus=missing#contact")),
  "/#contact",
);
assert.match(person.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const source = await readFile("src/content/portfolio.ts", "utf8");
assert.ok(
  !/\+\d{1,3}[\s()-]*\d{3}|\b(?:0[27]\d{8}|7\d{8})\b|\.pdf\b/.test(source),
  "Private phone and source PDF must not be in public content",
);
console.log(
  `Validated ${projects.length} projects and ${Object.keys(profiles).length} profiles, including invalid-link fallbacks and privacy checks.`,
);
