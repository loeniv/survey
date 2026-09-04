export const OTHER = "__other__";

export default function ChoiceInput({ question, value, onChange }) {
  const allowOther = Boolean(question.allowOther);

  // With allowOther the value is an object { choice, other }; otherwise a string.
  const choice = allowOther ? value?.choice ?? "" : value ?? "";
  const otherText = allowOther ? value?.other ?? "" : "";
  const otherLabel = question.otherLabel ?? "Other";

  function pick(option) {
    if (allowOther)
      onChange({ choice: option, other: option === OTHER ? otherText : "" });
    else onChange(option);
  }

  const rows = allowOther
    ? [...question.options, OTHER]
    : question.options;

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
      <div className="flex flex-col gap-2">
        {rows.map((option) => {
          const active = choice === option;
          const text = option === OTHER ? otherLabel : option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => pick(option)}
              aria-pressed={active}
              className={`text-left rounded-lg border px-4 py-3 transition-colors
                ${
                  active
                    ? "bg-[var(--color-accent-soft)] border-[var(--color-accent)] text-[var(--color-ink)]"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
                }`}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full border flex-shrink-0
                  ${active ? "bg-[var(--color-accent)] border-[var(--color-accent)]" : "border-[var(--color-line)]"}`}
                />
                {text}
              </span>
            </button>
          );
        })}
      </div>

      {allowOther && choice === OTHER && (
        <input
          type="text"
          autoFocus
          value={otherText}
          onChange={(e) => onChange({ choice: OTHER, other: e.target.value })}
          placeholder={question.otherPlaceholder ?? "Please specify"}
          className="mt-3 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]
            px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
        />
      )}
    </fieldset>
  );
}
