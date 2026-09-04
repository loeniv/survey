export default function ProgressTimeline({ current, total }) {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-xs text-[var(--color-ink-muted)]">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs text-[var(--color-ink-muted)]">
          {Math.round(((current + 1) / total) * 100)}%
        </span>
      </div>
      <div className="flex gap-[3px] h-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors duration-300
              ${
                i < current
                  ? "bg-[var(--color-accent)]"
                  : i === current
                  ? "bg-[var(--color-signal)]"
                  : "bg-[var(--color-line)]"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
