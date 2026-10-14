import { readFile, writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
};
const id = option("id");
const from = option("from") ?? "general";
const label = option("label");
if (!id || !/^[a-z][a-z0-9-]*$/.test(id) || !label || label.startsWith("--")) {
  console.error(
    'Usage: npm run tailor -- --id marine-automation --from automation --label "Marine automation"',
  );
  process.exit(1);
}
const path = new URL("../src/content/profiles.json", import.meta.url);
const profiles = JSON.parse(await readFile(path, "utf8"));
if (!Object.hasOwn(profiles, from))
  throw new Error(`Unknown source profile: ${from}`);
if (Object.hasOwn(profiles, id))
  throw new Error(
    `Profile ${id} already exists. Edit it in src/content/profiles.json.`,
  );
profiles[id] = { ...structuredClone(profiles[from]), label };
await writeFile(path, JSON.stringify(profiles, null, 2) + "\n");
console.log(
  `Created ${id} from ${from}. Edit its introduction and project order in src/content/profiles.json.`,
);
console.log(
  `After rebuilding and deploying, share your site URL followed by /${id}/`,
);
