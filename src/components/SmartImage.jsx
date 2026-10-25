import { useState } from 'react'

export default function SmartImage({ src, alt = '', className = '', caption, aspect = '', fit = 'cover' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <figure className={className}>
        <div className={`flex ${aspect || 'aspect-video'} w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-2 px-6 text-center`}>
          <svg className="h-8 w-8 text-muted/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="font-mono text-xs text-muted">Image unavailable</p>
        </div>
        {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt || caption || ''}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full rounded-xl border border-border shadow-card ${aspect} ${
          fit === 'contain' ? 'bg-surface-2 object-contain' : 'object-cover'
        }`}
      />
      {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  )
}
