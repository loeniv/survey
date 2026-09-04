export default function GridSlider({ question, value, onChange }) {
  // value is an object like { SQ001: 0, SQ002: 3 }
  const state = value ?? {};
  const { min, max, step = 1, minLabel, midLabel, maxLabel } = question;
  const mid = (min + max) / 2;

  function setItem(code, v) {
    onChange({ ...state, [code]: v });
  }

  return (
    <fieldset>
      <legend className="font-display text-lg font-medium text-[var(--color-ink)] mb-2">
        {question.prompt}
      </legend>
      {question.help && (
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
          {question.help}
        </p>
      )}

      <div className="flex justify-between font-mono text-xs text-[var(--color-ink-muted)] mb-5">
        <span>
          {min} · {minLabel}
        </span>
        {midLabel && <span className="hidden sm:inline">{midLabel}</span>}
        <span className="text-right">
          {maxLabel} · +{max}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {question.items.map((item) => {
          const current = state[item.code] ?? mid;
          const touched = state[item.code] !== undefined;
          return (
            <div key={item.code}>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <label
                  htmlFor={`${question.id}-${item.code}`}
                  className="text-sm leading-snug text-[var(--color-ink)]"
                >
                  {item.label}
                </label>
                <span
                  className={`font-mono text-sm tabular-nums ${
                    touched
                      ? "text-[var(--color-ink)] font-medium"
                      : "text-[var(--color-ink-muted)]"
                  }`}
                >
                  {current > 0 ? `+${current}` : current}
                </span>
              </div>
              <input
                id={`${question.id}-${item.code}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={current}
                onChange={(e) => setItem(item.code, Number(e.target.value))}
                className="w-full accent-[var(--color-accent)]"
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
