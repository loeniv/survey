import { OTHER } from "./ChoiceInput";

export default function DropdownInput({ question, value, onChange }) {
  const allowOther = Boolean(question.allowOther);

  // With allowOther the value is an object { choice, other }; otherwise a string.
  const choice = allowOther ? value?.choice ?? "" : value ?? "";
  const otherText = allowOther ? value?.other ?? "" : "";
  const otherLabel = question.otherLabel ?? "Other";

  function selectChoice(next) {
    if (allowOther) onChange({ choice: next, other: next === OTHER ? otherText : "" });
    else onChange(next);
  }

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
      <select
        id={question.id}
        value={choice}
        onChange={(e) => selectChoice(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]
          p-3 text-[var(--color-ink)] focus:border-[var(--color-accent)] outline-none"
      >
        <option value="" disabled>
          Please select…
        </option>
        {question.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {allowOther && <option value={OTHER}>{otherLabel}</option>}
      </select>

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
    </div>
  );
}
