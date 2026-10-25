import { Link, useParams } from 'react-router-dom'
import { projects, getProject } from '../data/projects'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import Tag from '../components/Tag'
import Video from '../components/Video'
import RichText from '../components/RichText'

function Paragraphs({ paragraphs }) {
  if (!paragraphs?.length) return null
  return paragraphs.map((text, i) => (
    <p key={i} className="leading-relaxed text-ink">
      <RichText text={text} />
    </p>
  ))
}

function Bullets({ bullets }) {
  if (!bullets?.length) return null
  return (
    <ul className="space-y-2.5">
      {bullets.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-ink">
          <span className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function Media({ media }) {
  if (!media?.length) return null
  return (
    <div className="space-y-8">
      {media.map((img, i) => (
        <SmartImage key={i} src={img.src} caption={img.caption} />
      ))}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const index = projects.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? projects[index - 1] : null
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null

  if (!project) {
    return (
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="text-3xl font-bold text-heading">Project not found</h1>
        <p className="mt-3 text-muted">The project you are looking for does not exist.</p>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg"
        >
          Back to projects
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="container-page pb-16 pt-32 sm:pb-20">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All projects
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-8 mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {project.module} · {project.period}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-heading sm:text-5xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink">{project.summary}</p>
        </Reveal>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Overview</span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
          <div className="grid max-w-3xl gap-6">
            {project.overview?.paragraphs?.map((text, i) => (
              <Reveal key={i} delay={i * 40}>
                <p className="leading-relaxed text-ink">
                  <RichText text={text} />
                </p>
              </Reveal>
            ))}
            {project.overview?.bullets?.length > 0 && (
              <Reveal>
                <Bullets bullets={project.overview.bullets} />
              </Reveal>
            )}
            {project.overview?.paragraphsAfter?.map((text, i) => (
              <Reveal key={`pa-${i}`}>
                <p className="leading-relaxed text-ink">
                  <RichText text={text} />
                </p>
              </Reveal>
            ))}
            {project.overview?.bullets2?.length > 0 && (
              <Reveal>
                <Bullets bullets={project.overview.bullets2} />
              </Reveal>
            )}
            {project.overview?.paragraphsAfter2?.map((text, i) => (
              <Reveal key={`pa2-${i}`}>
                <p className="leading-relaxed text-ink">
                  <RichText text={text} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.sections.map((section, si) => (
        <section key={si} className={si % 2 === 0 ? '' : 'border-y border-border bg-surface'}>
          <div className="container-page py-16 sm:py-20">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="font-mono text-xs text-accent">{String(si + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl font-bold text-heading sm:text-3xl">{section.heading}</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>

            {(section.paragraphs?.length ||
              section.bullets?.length ||
              section.paragraphsAfter?.length ||
              section.images?.length ||
              section.video ||
              section.video2) && (
              <div className="grid max-w-4xl gap-8">
                <div className="space-y-5">
                  <Paragraphs paragraphs={section.paragraphs} />
                  <Bullets bullets={section.bullets} />
                  <Paragraphs paragraphs={section.paragraphsAfter} />
                </div>
                <Media media={section.images} />
                {section.video && <Video video={section.video} />}
                {section.video2 && <Video video={section.video2} />}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-surface">
        <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex max-w-xs flex-col gap-1 rounded-xl border border-border bg-bg p-4 transition hover:border-accent/40"
            >
              <span className="font-mono text-xs text-muted">Previous</span>
              <span className="flex items-center gap-2 font-medium text-heading transition group-hover:text-accent">
                <svg className="h-4 w-4 transition group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex max-w-xs flex-col items-end gap-1 rounded-xl border border-border bg-bg p-4 text-right transition hover:border-accent/40"
            >
              <span className="font-mono text-xs text-muted">Next</span>
              <span className="flex items-center gap-2 font-medium text-heading transition group-hover:text-accent">
                {next.title}
                <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  )
}
