const typeStyles = {
  Project: "border-rose-500/30 bg-rose-500/10 text-rose-500",
  Idea: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  Learning: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  Improvement: "border-amber-500/30 bg-amber-500/10 text-amber-500",
};

export default function TypeBadge({ type = "Project" }) {
  const label = type || "Project";
  const style = typeStyles[label] || typeStyles.Project;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${style}`}
    >
      {label}
    </span>
  );
}