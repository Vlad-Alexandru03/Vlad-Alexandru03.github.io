import profileData from "./content/profiles.json";
import {
  projects,
  skills,
  type ProjectId,
  type SkillId,
} from "./content/portfolio";

export interface Profile {
  slug?: string;
  label: string;
  eyebrow: string;
  headline: string[];
  summary: string;
  projectOrder: ProjectId[];
  skillOrder: SkillId[];
}
export const profiles = profileData as Record<string, Profile>;

export function profilePath(id: string, basePath = "/"): string {
  const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return id === "general" ? base : `${base}${profiles[id].slug}/`;
}

export function profileLocation(url: URL, basePath = "/"): string {
  const id = resolveProfile(url.search, url.pathname, basePath);
  const params = new URLSearchParams(url.search);
  params.delete("focus");
  params.delete("profile");
  const query = params.toString();
  return `${profilePath(id, basePath)}${query ? `?${query}` : ""}${url.hash}`;
}

export function resolveProfile(
  search: string,
  pathname = "/",
  basePath = "/",
): string {
  const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const route = (
    pathname.startsWith(base)
      ? pathname.slice(base.length)
      : pathname.replace(/^\/+/, "")
  )
    .replace(/(?:^|\/)index\.html$/, "")
    .replace(/^\/+|\/+$/g, "");
  // A dedicated page keeps its identity even if an old query link is appended.
  const match = Object.entries(profiles).find(
    ([, profile]) => profile.slug === route && route !== "",
  );
  if (match) return match[0];
  if (route && Object.hasOwn(profiles, route)) return route;
  const params = new URLSearchParams(search);
  const id = params.get("profile") ?? params.get("focus") ?? "general";
  return Object.hasOwn(profiles, id) ? id : "general";
}

export function validateProfiles() {
  const projectIds = new Set(projects.map((project) => project.id));
  const skillIds = new Set(Object.keys(skills));
  const slugs = new Set<string>();
  for (const [id, profile] of Object.entries(profiles)) {
    if (!/^[a-z][a-z0-9-]*$/.test(id))
      throw new Error(`Invalid profile ID: ${id}`);
    if (id !== "general") {
      if (
        !profile.slug ||
        !/^[a-f0-9]{10}$/.test(profile.slug) ||
        slugs.has(profile.slug) ||
        Object.hasOwn(profiles, profile.slug)
      )
        throw new Error(`Missing, invalid, or duplicate public path: ${id}`);
      slugs.add(profile.slug);
    } else if (profile.slug) {
      throw new Error("The general portfolio must remain at the site root.");
    }
    if (
      !profile.label ||
      !profile.eyebrow ||
      profile.headline.length !== 2 ||
      profile.headline.some((line) => !line.trim()) ||
      !profile.summary.trim()
    )
      throw new Error(`Incomplete introduction: ${id}`);
    if (
      !profile.projectOrder.length ||
      new Set(profile.projectOrder).size !== profile.projectOrder.length
    )
      throw new Error(`Empty or duplicate projects: ${id}`);
    for (const project of profile.projectOrder)
      if (!projectIds.has(project))
        throw new Error(`Unknown project ${project} in ${id}`);
    if (
      !profile.skillOrder.length ||
      new Set(profile.skillOrder).size !== profile.skillOrder.length
    )
      throw new Error(`Empty or duplicate skills: ${id}`);
    for (const skill of profile.skillOrder)
      if (!skillIds.has(skill))
        throw new Error(`Unknown skill ${skill} in ${id}`);
  }
}
