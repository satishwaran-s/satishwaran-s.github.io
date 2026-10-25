import { useMemo, useState } from "react";
import { projects, placeholderProjects } from "../data/projects";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";

const FILTERS = ["All", "Project", "Idea"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const visibleProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => (p.type || "Project") === filter),
    [filter]
  );

  return (
    <>
      <section className="container-page pb-20 pt-32 sm:pb-24">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Portfolio
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Library
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            A collection of projects, experiments and ideas I've worked on and
            explored.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <SectionTitle className="mb-0" kicker="Collection" title="All work" />
              <label className="flex items-center gap-3">
                <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted sm:inline">
                  Filter
                </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm font-medium text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {FILTERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {visibleProjects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle
              kicker="Upcoming"
              title="In the pipeline"
            />
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {placeholderProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-border bg-surface-2 p-6">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {p.tag}
                  </p>
                  <h3 className="text-xl font-bold text-heading">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {p.teaser}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    In progress
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}