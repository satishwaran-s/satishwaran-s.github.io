import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-heading">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={`mailto:${profile.email}`} className="text-sm text-muted transition hover:text-accent">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sm text-muted transition hover:text-accent">
            LinkedIn
          </a>
          <a href={profile.githubRepos} target="_blank" rel="noreferrer" className="text-sm text-muted transition hover:text-accent">
            GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Built with React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
