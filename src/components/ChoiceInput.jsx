export default function ChoiceInput({ question, value, onChange }) {
  return (
    <fieldset>
      <legend className="font-display text-lg font-medium text-[var(--color-ink)] mb-4">
        {question.prompt}
      </legend>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
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
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
