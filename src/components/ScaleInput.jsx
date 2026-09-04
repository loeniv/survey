export default function ScaleInput({ question, value, onChange }) {
  const options = [];
  for (let i = question.min; i <= question.max; i++) options.push(i);

  return (
    <fieldset>
      <legend className="font-display text-lg font-medium text-[var(--color-ink)] mb-4">
        {question.prompt}
      </legend>
      <div className="flex items-center justify-between gap-2">
        {options.map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-pressed={active}
              className={`flex-1 aspect-square rounded-lg border font-mono text-sm transition-colors
                ${
                  active
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
                }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 font-mono text-xs text-[var(--color-ink-muted)]">
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
    </fieldset>
  );
}
