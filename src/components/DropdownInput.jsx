export default function DropdownInput({ question, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={question.id}
        className="block font-display text-lg font-medium text-[var(--color-ink)] mb-4"
      >
        {question.prompt}
      </label>
      <select
        id={question.id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
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
      </select>
    </div>
  );
}
