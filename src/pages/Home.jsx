import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects, placeholderProjects } from "../data/projects";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";

// const skillHighlights = [
//   "ROS / ROS2",
//   "Computer Vision",
//   "Python · C++",
//   "Systems Engineering",
//   "SLAM & Navigation",
//   "Agile Project Mgmt",
// ];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-heading) 1px, transparent 1px), linear-gradient(90deg, var(--color-heading) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />

        <div className="container-page flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
          <Reveal>
            <p className="mb-4 font-mono text-sm text-accent">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent align-middle" />
              {profile.heroGreeting}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-heading sm:text-6xl">
              {Array.isArray(profile.heroLine)
                ? profile.heroLine.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))
                : profile.heroLine}
            </h1>
          </Reveal>
          {/* 
          <Reveal delay={160}>
            <div className="mt-6 flex flex-wrap gap-2">
              {skillHighlights.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal> */}

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-lift transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View my projects
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-heading transition hover:border-accent/40 hover:text-accent"
              >
                Connect on LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-16 hidden max-w-2xl items-center gap-2 font-mono text-xs text-muted sm:flex">
              <span className="text-accent">$</span>
              <span>robotics-engineer --build --break --repeat</span>
              <span className="h-4 w-2 animate-pulse bg-accent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle
              kicker="Projects"
              title="Selected work"
              sub="A collection of robotics, systems engineering and software projects from my degree and industry experience."
            />
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.slice(0, 2).map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
            {placeholderProjects.slice(0, 2).map((p) => (
              <div
                key={p.slug}
                className="flex flex-col justify-center rounded-2xl border border-dashed border-border bg-surface-2 p-6 opacity-70"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {p.status}
                </p>
                <h3 className="text-xl font-bold text-heading">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.teaser}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted">
                  Details coming soon
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </span>
              </div>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-lift transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View all projects
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-card sm:p-12">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Get in touch
              </p>
              <h2 className="text-3xl font-bold text-heading sm:text-4xl">
                Let's Talk Robotics and Beyond
              </h2>
              <p className="mt-4 max-w-2xl text-muted">
                Robotics is what I work on, but I'm interested in a lot of
                things beyond engineering too. I enjoy learning about products,
                helping others, giving back, and picking up new skills along the
                way. Whether you want to share an idea, explore a collaboration,
                talk through a problem or simply have a good conversation, my
                inbox is always open.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6L22 7" />
                  </svg>
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-heading transition hover:border-accent/40 hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-heading transition hover:border-accent/40 hover:text-accent"
                >
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
