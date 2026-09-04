export default function TextInput({ question, value, onChange }) {
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
      <textarea
        id={question.id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Your answer…"
        className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]
          p-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]
          focus:border-[var(--color-accent)] outline-none resize-none"
      />
    </div>
  );
}
