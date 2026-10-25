export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  )
}
