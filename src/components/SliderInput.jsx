export default function SliderInput({ question, value, onChange }) {
  const current = value ?? question.min + (question.max - question.min) / 2;

  return (
    <div>
      <label
        htmlFor={question.id}
        className="block font-display text-lg font-medium text-[var(--color-ink)] mb-4"
      >
        {question.prompt}
      </label>
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
        <span className="text-[var(--color-ink)] font-medium">{current}</span>
        <span>{question.maxLabel}</span>
      </div>
    </div>
  );
}
