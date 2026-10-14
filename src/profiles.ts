import profileData from "./content/profiles.json";
import {
  projects,
  skills,
  type ProjectId,
  type SkillId,
} from "./content/portfolio";

export interface Profile {
  label: string;
  eyebrow: string;
  headline: string[];
  summary: string;
  projectOrder: ProjectId[];
  skillOrder: SkillId[];
}
export const profiles = profileData as Record<string, Profile>;
export const primaryProfiles = [
  "general",
  "automation",
  "robotics",
  "software",
];

export function resolveProfile(search: string): string {
  const params = new URLSearchParams(search);
  const id = params.get("profile") ?? params.get("focus") ?? "general";
  return Object.hasOwn(profiles, id) ? id : "general";
}

export function validateProfiles() {
  const projectIds = new Set(projects.map((project) => project.id));
  const skillIds = new Set(Object.keys(skills));
  for (const [id, profile] of Object.entries(profiles)) {
    if (!/^[a-z][a-z0-9-]*$/.test(id))
      throw new Error(`Invalid profile ID: ${id}`);
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
