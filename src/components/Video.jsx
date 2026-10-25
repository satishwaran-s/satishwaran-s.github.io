import { useState } from 'react'

function driveId(url = '') {
  const m = url.match(/\/d\/([^/]+)/)
  return m ? m[1] : null
}

export default function Video({ video }) {
  const [playing, setPlaying] = useState(false)
  const id = driveId(video?.drive)
  const [posterFailed, setPosterFailed] = useState(false)

  if (!video) return null

  const thumbnail = id
    ? `https://drive.google.com/thumbnail?id=${id}&sz=w1280`
    : null

  if (video.file && !id) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        <div className="p-4">
          <h3 className="font-mono text-sm font-semibold text-heading">{video.title}</h3>
        </div>
        <video
          controls
          preload="metadata"
          className="aspect-video w-full bg-black object-contain"
          src={video.file}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="p-4">
        <h3 className="font-mono text-sm font-semibold text-heading">{video.title}</h3>
      </div>

      <div className="relative aspect-video w-full">
        {playing && id ? (
          <iframe
            src={`${video.drive}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex w-full items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Play video: ${video.title}`}
          >
            {thumbnail && !posterFailed && (
              <img
                src={thumbnail}
                alt=""
                onError={() => setPosterFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-bg shadow-lift transition group-hover:scale-110 group-hover:bg-accent">
              <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              Play demo
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
