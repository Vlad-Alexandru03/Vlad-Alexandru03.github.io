import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { person, projects } from "../src/content/portfolio";
import { profiles, resolveProfile, validateProfiles } from "../src/profiles";

validateProfiles();
assert.equal(
  new Set(projects.map((project) => project.id)).size,
  projects.length,
  "Project IDs must be unique",
);
for (const id of Object.keys(profiles)) {
  assert.equal(resolveProfile(`?focus=${id}`), id);
  assert.equal(resolveProfile(`?profile=${id}`), id);
  if (id !== "general") {
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
assert.match(person.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const source = await readFile("src/content/portfolio.ts", "utf8");
assert.ok(
  !/\+\d{1,3}[\s()-]*\d{3}|\b(?:0[27]\d{8}|7\d{8})\b|\.pdf\b/.test(source),
  "Private phone and source PDF must not be in public content",
);
console.log(
  `Validated ${projects.length} projects and ${Object.keys(profiles).length} profiles, including invalid-link fallbacks and privacy checks.`,
);
