# Personal site for job applications: research and implementation plan

> **Implementation update — 15 October 2026:** The owner selected React, English, a minimal technical style, and free hosting. The implemented project uses React + TypeScript + Vite with GitHub Pages deployment and modular application profiles. See [README.md](README.md) and [the tailoring guide](docs/TAILORING.md) for the current setup. The original CV stays private. The research below is retained as the original comparison of alternatives.

Research checked: **14 October 2026**. Prices below are in USD unless stated otherwise; taxes, exchange rates, premium domains, and later plan changes can affect the final cost.

## 1. Recommendation and the answer about free hosting

**Yes, you can host a professional personal site for free.** A portfolio containing your introduction, experience, projects, CV, and contact links can be delivered as static files. It does not need a continuously running application server or database.

My recommended starting point, if maintaining a small code project is acceptable, is **Astro + ordinary CSS + Markdown content + GitHub**, deployed to **GitHub Pages**. Astro is designed for content-focused sites and can add interactive components selectively. GitHub Pages hosts static sites from a repository and is available for public repositories on GitHub Free. This is a practical recommendation for this project, not a claim that Astro is the most popular framework. [Astro design principles](https://docs.astro.build/en/concepts/why-astro/), [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

Choose differently when the priority changes:

- **Fastest route without maintaining code:** Carrd for a concise one-page site; Framer for more visual layout control. See the free-plan and domain restrictions in section 5.
- **Demonstrating React skills for developer applications:** Next.js + React + TypeScript, using static output initially, or Vercel when server features are genuinely needed.
- **Keeping source private or wanting Cloudflare deployment features:** Astro on Cloudflare Workers Static Assets is a strong alternative. Cloudflare currently recommends Workers for new projects over Pages. [Cloudflare's current guidance](https://developers.cloudflare.com/pages/)

Start on a free provider address. Buy a custom domain later if you want a more memorable application link. Hosting and domain registration are separate costs.

This document is a research and planning deliverable. The target profession, existing skills, content, and preferred editing workflow are still unknown; recommendations are conditional on those choices.

## 2. What is commonly used, and what popularity actually tells us

There is no reliable portfolio-specific market-share ranking established by the sources reviewed. Two broader measurements help explain the mainstream options:

- In the **2026 Stack Overflow Developer Survey**, among 10,281 respondents to the web technologies question, React was reported by **41.5%**, Next.js by **20.6%**, Vue by **17.2%**, Angular by **16.0%**, Svelte by **7.8%**, and Astro by **6.2%**. Node.js was reported by 46.4%, but it is a runtime, not a competing page-design framework. These are overlapping developer usage figures, not shares of personal sites or proof of hiring demand. [Survey data and question](https://survey.stackoverflow.co/2026/technology/data/web-framework)
- **W3Techs** reports WordPress as the leading detected CMS, used by approximately **40% of websites** in its current measurement. Wix, Squarespace, and Webflow also appear in its website technology measurements. This measures deployed websites with a different methodology from the developer survey; the percentages should not be combined. [CMS usage and methodology links](https://w3techs.com/technologies/overview/content_management)

For this project, popularity is useful for finding documentation, templates, and maintainers. The more important choice is whether the site helps an employer understand your work and whether you can keep it current.

## 3. The main ways to build the site

### A. Plain HTML, CSS, and a little JavaScript

**What it means:** Write the page structure, styling, and small interactions directly. HTML supplies the content structure; CSS controls presentation; JavaScript adds behavior. [MDN introduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)

**Good fit:** A one-page CV or a handful of pages, especially if learning the fundamentals is part of the goal.

**Advantages:** Few dependencies, direct control, small downloads, and straightforward migration between static hosts.

**Tradeoff:** Repeating navigation and project layouts across many hand-written pages creates maintenance work.

**Assessment:** Entirely sufficient for the smallest first version. A framework is optional.

### B. Static site generator: Astro, Eleventy, Hugo, or Jekyll

**What it means:** Keep reusable page layouts and content in source files; a build produces the HTML visitors receive. Updating content usually means rebuilding and deploying.

**Astro** is my preferred option for a custom portfolio with several case studies. It emphasizes content and lightweight HTML, with interactive components added where useful. **Eleventy** is another comparatively simple generator with flexible templates. **Hugo** is an established option for content sites and theme-based publishing. GitHub Pages also supports a Jekyll build workflow. [Astro](https://docs.astro.build/en/concepts/why-astro/), [Eleventy](https://www.11ty.dev/), [Hugo](https://gohugo.io/), [GitHub Pages build overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

**Good fit:** A homepage, experience page, several projects, and perhaps occasional articles.

**Advantages:** Reusable layouts; content can remain readable in Markdown; static output provides flexibility over hosting.

**Tradeoff:** You need a build toolchain and occasional dependency maintenance. A visual content editor requires an additional integration if you later want one.

### C. React and Next.js

**What it means:** React builds component-based interfaces. Next.js adds an application framework around React. React's documentation recommends using a suitable framework when creating a new application. [React guidance](https://react.dev/learn/creating-a-react-app)

**Good fit:** You already know React, want the repository to demonstrate those skills, or expect substantial app-like features.

**Advantages:** A large ecosystem and room to grow into a richer application.

**Tradeoff:** More concepts and dependencies than a small portfolio needs. A browser-only React app also needs deliberate handling of routing and initial content delivery.

For free static hosting, Next.js supports `output: 'export'`, producing an `out` directory. That mode excludes features requiring a runtime server, including Server Actions, request-dependent handlers, and the default image optimization service. Choose the hosting mode alongside the features. [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports)

**Assessment:** Choose it for a reason connected to your skills or requirements; broad adoption alone does not make it necessary.

### D. Visual website builders

**What it means:** Design and edit in a browser, with hosting managed by the platform.

**Shortlist:** Carrd for a concise one-page profile; Framer for a more visually designed portfolio. Wix, Squarespace, and Webflow are additional established platforms worth considering if you already use them. The latter three appear in W3Techs' deployed-site measurements, but this report does not audit their individual paid plans. [CMS measurements](https://w3techs.com/technologies/overview/content_management)

**Advantages:** Less setup and a visual editing workflow.

**Tradeoff:** Custom domains, branding removal, and advanced features may require subscriptions. Check export and migration options before investing heavily in a platform-specific design.

**Assessment:** Often the right choice when the portfolio supports a nontechnical career and maintaining code offers little benefit.

### E. WordPress

**What it means:** Use a content management system with an editor, themes, and an extensive ecosystem. Distinguish **WordPress.com**, a hosted service, from installing WordPress software on separate hosting.

WordPress.com includes hosting on its free plan, but that plan uses a WordPress.com subdomain and displays platform ads. Paid plans provide additional capabilities. [WordPress.com pricing and plan FAQ](https://wordpress.com/pricing/)

**Good fit:** Frequent publishing, an existing WordPress workflow, or a stronger need for a CMS than for a compact portfolio repository.

**Tradeoff:** A self-managed installation adds server, update, and plugin responsibilities. A static export of a site is different from running the WordPress application itself.

**Assessment:** Widely used, but I would not introduce it solely for a small CV and project site.

## 4. Recommended technology choices for a coded version

- **Astro, static output:** Reusable pages and layouts for the portfolio.
- **CSS:** Start with ordinary CSS and a few shared variables for typography, spacing, and colors. Tailwind is optional if you prefer utility classes; it is a styling approach, not a hosting service. [Tailwind documentation](https://tailwindcss.com/docs/styling-with-utility-classes)
- **Markdown:** Keep project case studies and optional articles easy to edit and review.
- **TypeScript:** Useful for shared content structures and interactive components; keep the amount of application code small.
- **Git and GitHub:** Version history and a source repository for deployment.
- **Node.js and npm:** Local installation and build tools for the Astro project. Visitors do not need Node.js when the deployed site consists of static files.
- **PDF CV:** A selectable-text document with a stable URL and clear filename, plus an HTML summary on the site.
- **Contact:** A visible email address and email link initially. A contact form needs a submission service or backend; HTML alone does not deliver messages.
- **Analytics:** Optional. Launching without analytics reduces setup and third-party dependencies.

No database, login system, admin dashboard, or custom API is proposed for the first version. Add those only for a concrete visitor or editing requirement.

## 5. Hosting options and the important free-plan limits

These are practical hosting candidates, not a ranked claim about hosting market share. Free plans have limits and terms; they are not a guarantee of perpetual availability.

### GitHub Pages — preferred baseline for a public static portfolio

- **Free hosting:** Yes, from a public repository on GitHub Free.
- **Included address:** `https://USERNAME.github.io`, or a project path below it.
- **Custom domain:** Supported; you pay for domain registration separately.
- **HTTPS:** Supported, including correctly configured custom domains.
- **Limits:** Maximum published site size of 1 GB and a soft bandwidth limit of 100 GB/month. The ordinary build limit is 10/hour, with an exception for custom GitHub Actions workflows.
- **Boundary:** Static hosting; no general application server. GitHub restricts using Pages primarily for commercial transactions or SaaS.

**Why choose it:** One account can hold the source and publish the portfolio. The public-repository requirement is the main consideration for the free route. [Availability and URLs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [limits and usage policy](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

### Cloudflare Workers Static Assets — strong alternative for new projects

- **Free hosting:** Yes, a static portfolio can use the Free plan.
- **Included address:** A `workers.dev` subdomain.
- **Static delivery:** Requests served directly as static assets are free and unlimited, with no additional asset storage charge. Dynamic execution has separate quotas; routing every request through Worker code changes the calculation.
- **Build allowance:** Workers Builds currently includes 3,000 minutes/month on Free, with one concurrent build.
- **Custom domain:** Supported, requiring an active Cloudflare zone; Cloudflare manages the necessary records and certificates.

**Why choose it:** Useful if you want Cloudflare's deployment platform or a Git-connected workflow with private source. Configure the portfolio as static assets rather than adding server rendering unnecessarily. [Static asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [build limits](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/), [deployment addresses](https://developers.cloudflare.com/workers/static-assets/get-started/), [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

### Cloudflare Pages — still documented, but distinguish it from Workers

Pages provides static hosting with a `pages.dev` address and Git-based builds. Its Free plan currently allows 500 builds/month, 20,000 files, and a maximum individual asset size of 25 MiB. Static requests and bandwidth are advertised as unlimited; Functions use separate Workers quotas. [Pages product](https://www.cloudflare.com/products/pages/), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

**Assessment:** A viable documented option, particularly for an existing Pages project. For a new project, follow Cloudflare's current recommendation to start with Workers. Do not confuse Pages' build-count allowance with Workers Builds' minute allowance. [Current platform guidance](https://developers.cloudflare.com/pages/)

### Vercel Hobby — useful when choosing Next.js

- **Free hosting:** Yes, for noncommercial personal use within Hobby terms.
- **Allowance examples:** 100 GB of Fast Data Transfer and 1 million CDN requests in the plan's included usage.
- **Limit behavior:** In most cases, exceeding an allowance means waiting for the usage window to reset.
- **Eligibility:** Vercel restricts Hobby to personal, noncommercial use. Its examples of commercial use include advertising products or services and being paid to create or host the site.

**Assessment:** A reasonable candidate for a personal CV portfolio if it fits those terms. Treat freelance service promotion as a separate eligibility question rather than assuming every portfolio qualifies. [Hobby plan](https://vercel.com/docs/plans/hobby), [fair-use definitions](https://vercel.com/docs/limits/fair-use-guidelines)

### Netlify Free — convenient, but check the current credit model

- **Free hosting:** Yes, with custom-domain support and SSL.
- **Current allowance:** 300 credits/month on the current Free plan.
- **Usage rates:** Production deployments cost 15 credits each, bandwidth 20 credits/GB, and requests 2 credits per 10,000; other services can consume credits too.
- **Limit behavior:** Exhausting the balance pauses all web projects in the affected account/team context, showing a site-unavailable page.

For example, **10 production deployments consume 150 credits**, leaving 150 for traffic and other usage. This is a calculated illustration, not a guaranteed visitor capacity. Older tutorials describing legacy bandwidth plans may not apply to a new account. [Current pricing](https://www.netlify.com/pricing/), [credit rules and pausing](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)

**Assessment:** Usable, but my preference for a small static application portfolio is GitHub Pages or Cloudflare, where the deployment budget is easier to reason about.

### Builder hosting: Carrd, Framer, and WordPress.com

- **Carrd:** A free entry route exists; Pro Standard is currently **$19/year** and includes custom-domain URLs and branding removal. Domain registration is separate. A strong low-cost candidate for a one-page profile. [Carrd plans](https://carrd.com/pro)
- **Framer:** Free publishing uses a Framer address with **1 GB bandwidth**. Connecting your own domain requires a paid plan. The Basic price displayed with yearly billing is **$10/month**, equivalent to $120/year before tax. [Framer pricing](https://www.framer.com/pricing)
- **WordPress.com:** Free hosting is available on its subdomain with platform ads. A custom-domain, ad-free setup requires a paid plan; compare the billing term and renewal conditions. [WordPress.com pricing](https://wordpress.com/pricing/)

### A VPS, home computer, or general cloud server

My assessment: these introduce operational work without a clear benefit for this first version. A home-hosted site depends on your equipment and connection remaining available. A rented server needs ongoing configuration and maintenance. Use managed static hosting unless running infrastructure is itself part of the project you want to demonstrate.

## 6. Costs: what can stay completely free?

### Scenario A: zero-cost launch

Use a free template or original layout, static files, a free host address, a PDF CV, and contact links. **Expected platform spend: $0**, provided usage and eligibility remain within the chosen plan. Building and maintaining the content still takes time.

### Scenario B: free hosting plus your own domain

Keep hosting free and purchase a name such as `firstnamelastname.com`. As one current reference, Porkbun lists standard `.com` registration and renewal at **$11.08/year**. Check the actual name and checkout price; premium names and other extensions can cost much more. [Registrar price list](https://porkbun.com/products/domains)

For planning, reserve **roughly $15–25/year** for an ordinary domain and a little price/tax headroom. This is a budget estimate, not a registrar quote. It does not include a mailbox.

### Scenario C: a paid visual builder

Carrd Pro Standard plus a separately registered domain is one low-cost route. Framer Basic is a larger recurring commitment at the displayed annual-billing rate. A builder subscription pays for editing and platform features as well as hosting; compare the full yearly spend.

Before paying, check domain renewal price, billing period, tax, template licensing, and whether any form or email service is extra. A custom-domain mailbox is a separate product from website hosting. You can keep using an existing professional email address.

## 7. Content and structure for job applications

The proposed goal is to let an employer quickly understand **your target role, evidence of relevant work, and how to contact you**. These are editorial recommendations, not research claims about recruiter behavior.

### First release

1. **Introduction:** Name, target role, a concise description of the work you do, and location or working preferences if relevant. Provide obvious links to selected work and the CV.
2. **Selected work:** Two to four strong projects or case studies. Prioritize relevance and explain your personal contribution.
3. **Experience and skills:** A concise, factual summary connected to evidence. Avoid arbitrary percentage-based skill bars.
4. **About:** A short account of your background and interests that helps explain your direction.
5. **CV:** A readable HTML summary and downloadable PDF with consistent dates and wording.
6. **Contact:** Email and relevant professional profiles; GitHub only when useful for your profession.

This can begin as one homepage plus separate case-study pages. Split experience and about into their own pages only if the content warrants it. A blog can wait until there is something useful to publish.

### Case-study template

- Context and intended audience.
- The problem or objective.
- Your role, collaborators, and constraints.
- The decisions you made and why.
- Evidence: screenshots, samples, diagrams, repository links, or a demo.
- Outcomes you can substantiate, plus lessons or next steps.

For developer roles, show implementation choices and code where useful. For design roles, show decisions and iterations. For operations, analysis, marketing, or other roles, focus on relevant deliverables and outcomes. Describe team work accurately, redact confidential material, and avoid inventing metrics.

The website should complement the CV. Continue supplying the requested CV and application fields when applying.

## 8. Phased implementation plan

Time ranges are planning estimates for a small site with available content, not delivery promises. A first-time build or unfinished case studies will take longer.

### Phase 1: define the brief and gather evidence — 2–4 hours

- Choose the primary role and audience.
- Decide who will update the site and whether they prefer text files or a visual editor.
- Gather CV, professional links, two to four work samples, and usable images.
- Choose the main language; add another only when it serves the applications.
- Decide whether $0 is a firm constraint or a domain purchase is acceptable.

**Deliverable:** A one-page brief and a content inventory with missing items marked.

### Phase 2: draft content before polishing the design — 4–8 hours

- Write the opening introduction and short experience summary.
- Draft at least two case studies using the template above.
- Prepare the public CV and review consistency with professional profiles.
- Check that work samples can be shared and results are supportable.

**Deliverable:** Approved text, CV, and selected assets. A generic template cannot compensate for missing evidence.

### Phase 3: choose the route and sketch the layout — 2–4 hours

- Select plain HTML, Astro, Next.js, or a builder using the criteria in section 3.
- Pick one restrained visual direction, readable typography, and a consistent spacing system.
- Sketch the mobile homepage and a case-study page before adding decorative features.
- If using a template, check its license, accessibility, recent maintenance, and the effort required to replace its assumptions.

**Deliverable:** A simple page outline and a small set of design decisions.

### Phase 4: build the first complete version — 6–12 hours

- Implement the homepage, shared layout, and case-study pages.
- Add mobile navigation, contact links, CV download, favicon, and social preview image.
- Keep key content available as rendered HTML and use JavaScript only where useful.
- Add unique page titles, descriptions, descriptive URLs, and a 404 page.
- Record local setup and deployment instructions in the project README.

**Deliverable:** A locally reviewable site containing real content.

### Phase 5: validate and publish — 2–4 hours, plus DNS/certificate waiting if applicable

- Run the production build and review that output, not only the development server.
- Test every link, CV download, and navigation path on desktop and a phone.
- Check keyboard operation, visible focus, readable contrast, image descriptions, and zoom behavior.
- Use Lighthouse or PageSpeed Insights as diagnostics. Google's good-experience thresholds include LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1, assessed at the 75th percentile. A new low-traffic site may lack field data; a lab score alone does not establish that it meets field thresholds. [Core Web Vitals definitions](https://web.dev/articles/defining-core-web-vitals-thresholds)
- Deploy, verify the public address without an owner login, and add that URL to application materials.

**Deliverable:** A public portfolio with verified navigation and an accessible CV.

### Phase 6: maintenance — monthly and before important applications

Review contact links, CV, project descriptions, deployment health, and plan usage. Apply relevant dependency updates and rebuild after changes. If using a domain, maintain renewal and account recovery details. Keep a copy of the source and assets outside the hosting dashboard.

## 9. Concrete deployment approach

### Path A: Astro to GitHub Pages

1. Create or use a GitHub account and choose a professional username.
2. Use a public repository named `USERNAME.github.io` for a root-address personal site. The free Pages route requires public source; review all committed files accordingly.
3. Build the Astro site in static mode. Set its `site` URL to the final public address.
4. Use Astro's maintained GitHub Pages deployment workflow and select **GitHub Actions** as the repository's Pages source.
5. Deploy the generated site and verify it at `https://USERNAME.github.io`.
6. If using a normal project repository instead, configure Astro's `base` for the repository path and account for that path in links and assets.

Follow the official deployment guide when implementing instead of copying an old workflow with obsolete action versions. [Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

### Path B: Astro to Cloudflare Workers Static Assets

1. Keep the Astro project in a Git repository and create a Cloudflare account.
2. Build the site to static output, normally `dist`.
3. Configure Workers Static Assets to serve that output directory. A purely static deployment does not need a custom request-handling script.
4. Deploy using Wrangler or connect the repository through Workers Builds. Keep the build command and deploy command explicit in the project documentation.
5. Use normal static-file and 404 routing; avoid an unnecessary catch-all application route or Worker-first execution.
6. Verify the supplied `workers.dev` address and review build usage.

The official static-assets documentation explains directory configuration and how requests can be served without invoking Worker code; the getting-started guide covers deployment. [Static Assets configuration](https://developers.cloudflare.com/workers/static-assets/), [deployment guide](https://developers.cloudflare.com/workers/static-assets/get-started/)

### Adding a domain later

Register a memorable name, add it to the selected host, and follow that host's current DNS instructions. For Workers Custom Domains, first make the domain an active Cloudflare zone. For GitHub Pages, configure the Pages custom domain and corresponding DNS records. Allow time for DNS and certificate issuance, then verify HTTPS and your chosen canonical address. [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [GitHub Pages HTTPS and DNS checks](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

Update canonical URLs, sitemap entries, and application links after a domain change. An owned domain also makes a later hosting move easier because you can keep the same public address.

## 10. Launch checklist and decisions to settle before building

### Ready-to-publish checklist

- [ ] The opening section makes the target role clear.
- [ ] At least two relevant work examples explain my contribution.
- [ ] Experience, dates, and CV text are consistent.
- [ ] The PDF contains selectable text and opens/downloads correctly.
- [ ] All links work, including direct visits to individual case studies.
- [ ] The site works on a phone, with a keyboard, and at enlarged text sizes.
- [ ] Page titles, descriptions, favicon, preview image, and 404 behavior are set.
- [ ] The public deployment opens without an owner login.
- [ ] HTTPS works and the intended URL is ready for application materials.
- [ ] Public files and repository history contain no private documents or credentials.
- [ ] Hosting eligibility, current allowances, and any recurring charges are understood.
- [ ] Source, assets, and deployment instructions are saved.

### Decisions to settle

1. What roles and countries or languages should the site support?
2. Is code maintenance desirable, or should editing be entirely visual?
3. Which projects and experience can be published?
4. Is a public source repository acceptable?
5. Should the first launch stay at $0, or include a separately registered domain?

**Proposed default:** A concise Astro portfolio with two or three substantive case studies, ordinary CSS, Markdown content, a PDF CV, and email contact, published on GitHub Pages. Start with the free address; consider a domain after the content and layout are ready. Choose Carrd if visual editing and minimal maintenance are the stronger priorities, or Cloudflare Workers Static Assets if its source/deployment workflow fits better.
