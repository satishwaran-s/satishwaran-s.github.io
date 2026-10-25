export default function SectionTitle({ kicker, title, sub, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      {kicker && (
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {kicker}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-muted">{sub}</p>}
    </div>
  )
}
