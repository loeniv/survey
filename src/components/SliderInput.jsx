export default function SliderInput({ question, value, onChange }) {
  const mid = question.min + (question.max - question.min) / 2;
  const touched = value !== undefined && value !== null;
  const current = touched ? value : mid;
  const shown = current > 0 ? `+${current}` : `${current}`;

  return (
    <div>
      <label
        htmlFor={question.id}
        className="block font-display text-lg font-medium text-[var(--color-ink)] mb-2"
      >
        {question.prompt}
      </label>
      {question.help && (
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
          {question.help}
        </p>
      )}
      <input
        id={question.id}
        type="range"
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-accent)]"
      />
      <div className="flex justify-between mt-2 font-mono text-xs text-[var(--color-ink-muted)]">
        <span>{question.minLabel}</span>
        <span className="text-[var(--color-ink)] font-medium">
          {touched ? shown : "—"}
        </span>
        <span>{question.maxLabel}</span>
      </div>
    </div>
  );
}
