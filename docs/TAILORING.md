# A consistent workflow for job-specific versions

## Recommended: shared facts, reusable profiles, shareable URLs

The site has one record of your projects and background. Profiles change **presentation and emphasis**: the introduction, which projects appear first, which projects appear at all, and the order of skill groups. They do not silently rewrite dates, qualifications, or contributions.

Use one of these dedicated links in an application:

- Robotics: `https://vlad-alexandru03.github.io/robotics/`
- Automation: `https://vlad-alexandru03.github.io/automation/`
- Software: `https://vlad-alexandru03.github.io/software/`

Each page opens with its domain-specific introduction and project order. Visitors navigate between that page's projects, experience, background, and contact sections. There is no domain selector or link to the other versions. The broader experience stays in the shared background and project descriptions.

## Five-minute tailoring routine

1. Identify the two or three strongest requirements in the job description.
2. Pick the closest existing profile. Reuse it when it already fits.
3. For a significant difference, clone it with `npm run tailor` and give it a neutral ID such as `embedded-control` or `marine-automation`.
4. Edit the new introduction and project order using only supported experience. Put the most relevant evidence first; do not claim skills simply because they appear in a job description.
5. Run `npm run check` and `npm run build`, then review the profile on desktop and mobile.
6. Push and wait for a successful GitHub Pages deployment. Open the live link before putting it in an application.
7. Record the profile ID and deployment commit alongside the application in your own application notes. Keep those notes outside the public repository.

## What to edit

`src/content/profiles.json` has named objects. A profile includes:

```json
{
  "label": "Embedded control",
  "eyebrow": "Robotics & embedded control",
  "headline": ["Automation engineer", "Embedded control"],
  "summary": "A brief introduction grounded in your existing experience.",
  "projectOrder": ["balancing-robot", "bearguard", "water-control"],
  "skillOrder": ["robotics", "controls", "software"]
}
```

This is a schema example; replace its illustrative summary before publishing. Available project IDs are `balancing-robot`, `edge-fog`, `bearguard`, `water-control`, and `home-automation`. Shared project descriptions and skill lists are in `src/content/portfolio.ts`.

After creating an ID such as `embedded-control`, build the site and use `/embedded-control/`. The build produces a complete HTML page for every profile, with the correct content and metadata already present before JavaScript loads. Navigation stays within that page.

Previous `?profile=embedded-control` and `?focus=robotics` links remain supported on the root page. Invalid query IDs display the general portfolio. A dedicated path takes precedence over query parameters, so `/robotics/?focus=software` still displays the robotics page.

Keep older application profile IDs working while applications are active. A URL is not an immutable snapshot: if you change shared content, older profile links also reflect the new facts. If an exact historical version matters, retain the deployment commit or a private screenshot in your application records. Separate deployment snapshots add more complexity and are not necessary for most applications.

## Other solutions and when to choose them

### One profile selected at build time

Publish only one tailored version at the main address. This is simple, but changing it affects every employer who has that URL. It is less suitable when applying to different disciplines simultaneously.

### A content management system

A CMS can provide forms for editing projects and profiles. It adds an account, integration, build hooks, and possibly a subscription. Consider it if editing JSON becomes a real obstacle. The separation of shared content and profiles makes a later CMS migration possible.

### A local visual editor

A local form could edit these same profile files and offer live previews. This keeps the public site simple and avoids exposing an administrative interface. It is a useful next step if you tailor frequently; this version uses the CLI cloning tool and a small JSON file.

### Separate branches or sites for every job

This can preserve exact versions, but creates duplicated deployments, inconsistent fixes, and more links to maintain. Reserve it for applications needing substantially different work samples or access controls.

### Generate tailored wording from job descriptions

An assistant can propose edits to the selected profile while leaving the factual content unchanged. Review each claim before committing it. Do not automatically publish generated wording or upload confidential job material into the public repository.

## Public-link boundary

Profiles are an organizational feature, not access control. Anyone can inspect the public JavaScript, source repository, and profile definitions. Use role-based labels, keep private application tracking elsewhere, and continue supplying a separate CV when an employer requests one.
