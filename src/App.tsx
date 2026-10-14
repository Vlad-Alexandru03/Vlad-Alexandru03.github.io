import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { Github, Linkedin } from "./components/BrandIcons";
import {
  education,
  experience,
  person,
  projects,
  research,
  skills,
  type Project,
} from "./content/portfolio";
import { primaryProfiles, profiles, resolveProfile } from "./profiles";

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | undefined;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  useEffect(() => {
    if (!project) return;
    opener.current = document.activeElement;
    const el = dialog.current;
    el?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      el?.close();
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      {project && (
        <div className="dialog-inner">
          <button
            className="icon-button dialog-close"
            aria-label="Close project"
            onClick={onClose}
          >
            <X size={22} />
          </button>
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-title">{project.title}</h2>
          <p className="dialog-summary">{project.summary}</p>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3>Context</h3>
          <p>{project.context}</p>
          <h3>The work</h3>
          <ul>
            {project.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Notes</h3>
          <p>{project.learning}</p>
          {project.source && (
            <a
              className="button button-dark"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              Explore the repository <Github size={17} />
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}

export default function App({
  initialProfile = "general",
  assetBase = "/",
}: {
  initialProfile?: string;
  assetBase?: string;
}) {
  const [profileId, setProfileId] = useState(initialProfile);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "fallback">(
    "idle",
  );
  const [shareUrl, setShareUrl] = useState("");
  const profile = profiles[profileId] ?? profiles.general;
  const orderedProjects = profile.projectOrder.map((id) =>
    projects.find((project) => project.id === id)!,
  );
  const activeProject = projects.find(
    (project) => project.id === selectedProject,
  );

  useEffect(() => {
    const sync = () => {
      setProfileId(resolveProfile(window.location.search));
      const projectId = new URLSearchParams(window.location.search).get(
        "project",
      );
      setSelectedProject(
        projects.some((project) => project.id === projectId) ? projectId : null,
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    document.title = `Vlad Petrariu | ${profileId === "general" ? "Automation, Robotics & Software" : profile.label}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${person.name}. ${profile.summary}`);
  }, [profile, profileId]);

  useEffect(() => {
    if (copyState !== "copied") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), 2500);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  function changeProfile(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.delete("profile");
    url.searchParams.delete("project");
    if (id === "general") url.searchParams.delete("focus");
    else url.searchParams.set("focus", id);
    window.history.pushState({}, "", url);
    setProfileId(id);
    setCopyState("idle");
  }

  function showProject(id: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("project", id);
    window.history.pushState({}, "", url);
    setSelectedProject(id);
  }

  function closeProject() {
    if (!selectedProject) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState({}, "", url);
    setSelectedProject(null);
  }

  async function copyLink() {
    const url = new URL(window.location.href);
    url.hash = "";
    url.searchParams.delete("project");
    setShareUrl(url.href);
    try {
      await navigator.clipboard.writeText(url.href);
      setCopyState("copied");
    } catch {
      setCopyState("fallback");
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#" aria-label="Vlad Petrariu, home">
            <span>Vlad Petrariu</span>
          </a>
          <nav
            aria-label="Main navigation"
            className={menuOpen ? "nav-open" : ""}
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Work
            </a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              Experience
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          <button
            className="menu-toggle icon-button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">{profile.eyebrow}</p>
            <h1 id="hero-title">
              Vlad-Alexandru
              <br />
              Petrariu
            </h1>
            <p className="hero-role">{profile.headline.join(" · ")}</p>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-actions">
              <a href="#work">
                View projects <ArrowRight size={15} />
              </a>
              <a href={`mailto:${person.email}`}>
                Email me <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <figure className="hero-portrait">
            <img
              src={`${assetBase}vlad-petrariu.png`}
              alt="Vlad-Alexandru Petrariu"
              width="400"
              height="400"
              fetchPriority="high"
            />
            <figcaption>{person.location}</figcaption>
          </figure>
        </section>

        <div className="container focus-container">
          <div className="focus-bar">
            <span className="focus-label">Focus</span>
            <nav className="focus-links" aria-label="Engineering discipline">
              {primaryProfiles.map((id) => (
                <a
                  key={id}
                  href={id === "general" ? "?" : `?focus=${id}`}
                  aria-current={profileId === id ? "page" : undefined}
                  className={profileId === id ? "active" : ""}
                  onClick={(event) => changeProfile(event, id)}
                >
                  {profiles[id].label}
                </a>
              ))}
            </nav>
            <button
              className="share-button"
              onClick={copyLink}
              aria-label="Copy link to this portfolio view"
            >
              {copyState === "copied" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}
              <span>
                {copyState === "copied" ? "Link copied" : "Copy link"}
              </span>
            </button>
          </div>
          <div aria-live="polite" className="sr-only">
            Showing {profile.label.toLowerCase()} portfolio view.
          </div>
          {copyState === "fallback" && (
            <label className="share-fallback">
              Copy this link:
              <input
                readOnly
                value={shareUrl}
                onFocus={(event) => event.target.select()}
                autoFocus
              />
            </label>
          )}
          {!primaryProfiles.includes(profileId) && (
            <p className="custom-profile-label">
              Selected focus: {profile.label}
            </p>
          )}
        </div>

        <section
          id="work"
          className="section container"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="work-title">Projects</h2>
            </div>
            <p className="section-aside">Academic and personal work</p>
          </div>
          <div className="project-list">
            {orderedProjects.map((project) => (
              <article className="project-entry" key={project.id}>
                <div className="project-entry-heading">
                  <h3>
                    <button onClick={() => showProject(project.id)}>
                      {project.title}
                    </button>
                  </h3>
                  <span>{project.kind}</span>
                </div>
                <p className="row-summary">{project.summary}</p>
                <p className="project-tools">{project.tags.join(" · ")}</p>
                <div className="project-links">
                  <button
                    onClick={() => showProject(project.id)}
                    aria-label={`Read project: ${project.title}`}
                  >
                    Project notes <ArrowUpRight size={14} />
                  </button>
                  {project.source && (
                    <a href={project.source} target="_blank" rel="noreferrer">
                      Code on GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a
            className="text-link github-more"
            href={person.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> Find me on GitHub <ArrowUpRight size={15} />
          </a>
        </section>

        <section
          id="experience"
          className="experience-section"
          aria-labelledby="experience-title"
        >
          <div className="container section">
            <div className="section-heading">
              <div>
                <h2 id="experience-title">Experience</h2>
              </div>
            </div>
            <div className="experience-layout">
              <div className="experience-date">
                <span className="experience-year">{experience.date}</span>
              </div>
              <article className="experience-detail">
                <div className="experience-role">
                  <div>
                    <h3>{experience.title}</h3>
                    <p>{experience.company}</p>
                  </div>
                  <span>{experience.location}</span>
                </div>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  <span>TIA Portal</span>
                  <span>Universal Robots</span>
                  <span>Commissioning</span>
                  <span>Troubleshooting</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="about-layout">
            <div>
              <h2 id="about-title">Background</h2>
              <p className="about-intro">
                I studied Automation and Computer Science in Cluj-Napoca and am
                now pursuing a master’s in Robotics and Autonomous Systems at
                the University of Turku.
              </p>
              <p className="about-text">
                My projects connect signals, software, and hardware: tuning
                feedback loops, reducing environmental sensor data, and
                configuring self-hosted services.
              </p>
              <div className="language-note">
                <span>Languages</span>
                <p>
                  Romanian · Native
                  <br />
                  English · IELTS Academic 7.5
                  <br />
                  Finnish · Beginner, currently studying
                </p>
              </div>
            </div>
            <div className="education">
              <h3 className="subsection-title">Education</h3>
              {education.map((item) => (
                <article key={item.degree}>
                  <span className="education-date">{item.date}</span>
                  <h3>{item.degree}</h3>
                  <p className="institution">{item.institution}</p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="skills-grid">
            {profile.skillOrder.map((id) => (
              <div className="skill-group" key={id}>
                <h3>{skills[id].name}</h3>
                <div className="tag-list">
                  {skills[id].items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="research-section">
            <div>
              <h3>Research</h3>
              <p className="research-status">Manuscripts in preparation</p>
            </div>
            <div className="research-list">
              {research.map((item) => (
                <article key={item.title}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-inner">
            <div>
              <h2 id="contact-title">Contact</h2>
              <p>
                You can reach me by email about roles in automation, robotics,
                or software.
              </p>
            </div>
            <div className="contact-links">
              <a className="email-link" href={`mailto:${person.email}`}>
                <span>{person.email}</span>
                <ArrowUpRight size={20} />
              </a>
              <div className="social-links">
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
                <a href={person.github} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="footer-name" href="#">
          Vlad-Alexandru Petrariu
        </a>
        <span>Based in Turku, Finland</span>
        <a className="back-top" href="#">
          Back to top <ArrowRight size={15} />
        </a>
      </footer>
      <ProjectDialog project={activeProject} onClose={closeProject} />
    </>
  );
}
