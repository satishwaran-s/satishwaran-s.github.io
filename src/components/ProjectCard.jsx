import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'
import Tag from './Tag'
import TypeBadge from './TypeBadge'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="overflow-hidden">
        <SmartImage
          src={project.cover}
          alt={`${project.title} cover`}
          aspect="aspect-[16/10]"
          fit="contain"
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.module}
          </p>
          <TypeBadge type={project.type} />
        </div>
        <h3 className="line-clamp-2 text-xl font-bold text-heading transition group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {project.summary}
        </p>
        <div className="mt-5 flex min-h-[60px] flex-wrap content-start gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-accent">
          View project
          <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
