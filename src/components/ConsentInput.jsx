export default function ConsentInput({ question, value, onChange }) {
  // value is an object like { SQ001: true, SQ002: false }
  const state = value ?? {};

  function toggle(code) {
    onChange((prev) => ({ ...(prev ?? {}), [code]: !(prev ?? {})[code] }));
  }

  return (
    <fieldset>
      <legend className="font-display text-lg font-medium text-[var(--color-ink)] mb-4">
        {question.prompt}
      </legend>
      <div className="flex flex-col gap-3">
        {question.items.map((item) => {
          const checked = Boolean(state[item.code]);
          return (
            <label
              key={item.code}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors
                ${
                  checked
                    ? "bg-[var(--color-accent-soft)] border-[var(--color-accent)]"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] hover:border-[var(--color-accent)]"
                }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(item.code)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--color-accent)]"
              />
              <span className="text-sm leading-relaxed text-[var(--color-ink)]">
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
