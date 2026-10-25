import { profile } from '../data/profile'
import Reveal from '../components/Reveal'

export default function Resume() {
  const handleDownload = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'resume.pdf',
      })
    }
  }

  return (
    <>
      <section className="container-page pb-20 pt-32 sm:pb-24">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">CV</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Resume
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            My latest curriculum vitae, covering my education, experience, and the projects
            featured across this portfolio.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface-2 p-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-sm font-semibold text-heading">{profile.name}</p>
                <p className="mt-1 text-sm text-muted">{profile.role}</p>
              </div>
              <a
                href="/resume.pdf"
                download="S_Satishwaran_Resume.pdf"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-lift transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download resume (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <Reveal>
          <iframe
            src="/resume.pdf"
            title="Resume preview"
            className="h-[80vh] w-full rounded-2xl border border-border bg-surface shadow-card"
          />
        </Reveal>
      </section>
    </>
  )
}
