// Render a label where **text** becomes bold.
function withEmphasis(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--color-ink)]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function GridSlider({ question, value, onChange }) {
  // value is an object like { SQ001: 0, SQ002: 3 }
  const state = value ?? {};
  const { min, max, step = 1, minLabel, midLabel, maxLabel } = question;
  const mid = (min + max) / 2;

  const remaining = question.items.filter(
    (it) => state[it.code] === undefined
  ).length;

  function setItem(code, v) {
    onChange((prev) => ({ ...(prev ?? {}), [code]: v }));
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
        <span>{minLabel} ({min})</span>
        {midLabel && <span className="hidden sm:inline">{midLabel} (0)</span>}
        <span className="text-right">{maxLabel} (+{max})</span>
      </div>

      <div className="flex flex-col gap-6">
        {question.items.map((item) => {
          const touched = state[item.code] !== undefined;
          const current = touched ? state[item.code] : mid;
          return (
            <div key={item.code}>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <label
                  htmlFor={`${question.id}-${item.code}`}
                  className="text-sm leading-snug text-[var(--color-ink)]"
                >
                  {withEmphasis(item.label)}
                </label>
                <span
                  className={`font-mono text-sm tabular-nums flex-shrink-0 ${
                    touched
                      ? "text-[var(--color-ink)] font-medium"
                      : "text-[var(--color-signal)]"
                  }`}
                >
                  {touched ? (current > 0 ? `+${current}` : current) : "—"}
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
                // Touching the slider at all counts as an answer, even if the
                // value stays at the middle (0). This lets people deliberately
                // choose 0 by clicking without dragging.
                onPointerDown={() => { if (!touched) setItem(item.code, current); }}
                onMouseDown={() => { if (!touched) setItem(item.code, current); }}
                onTouchStart={() => { if (!touched) setItem(item.code, current); }}
                onKeyDown={() => { if (!touched) setItem(item.code, current); }}
                onClick={() => { if (!touched) setItem(item.code, current); }}
                className={`w-full ${
                  touched
                    ? "accent-[var(--color-accent)]"
                    : "accent-[var(--color-ink-muted)] opacity-50"
                }`}
              />
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <p className="mt-5 text-xs font-mono text-[var(--color-signal)]">
          {remaining === question.items.length
            ? "Please set every slider to continue."
            : `${remaining} slider${remaining > 1 ? "s" : ""} still to set.`}
        </p>
      )}
    </fieldset>
  );
}
