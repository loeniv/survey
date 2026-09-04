import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InterestSection({ config }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error

  const mailtoHref = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
    config.contactSubject
  )}&body=${encodeURIComponent(config.contactBody)}`;

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("saving");
    // Deliberately NO participant_id or any link to the survey answers, so
    // this stays fully anonymous and not attributable.
    let error;
    try {
      ({ error } = await supabase.from("interest").insert([{ email }]));
    } catch (err) {
      error = err;
    }
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("saved");
    }
  }

  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <h2 className="font-display text-lg font-semibold mb-2">
        {config.interestHeading}
      </h2>
      <p className="text-sm text-[var(--color-ink-muted)] mb-5 leading-relaxed">
        {config.interestText}
      </p>

      <a
        href={mailtoHref}
        className="block text-center rounded-lg border border-[var(--color-accent)] text-[var(--color-accent)] font-medium py-2.5 hover:bg-[var(--color-accent-soft)] transition-colors"
      >
        Express interest by email
      </a>
      <p className="text-xs text-[var(--color-ink-muted)] mt-2 text-center">
        Or email us directly at{" "}
        <a
          className="text-[var(--color-accent)] underline break-all"
          href={`mailto:${config.contactEmail}`}
        >
          {config.contactEmail}
        </a>
      </p>

      <div className="flex items-center gap-3 my-4">
        <div className="h-px flex-1 bg-[var(--color-line)]" />
        <span className="font-mono text-xs text-[var(--color-ink-muted)]">or</span>
        <div className="h-px flex-1 bg-[var(--color-line)]" />
      </div>

      {status === "saved" ? (
        <p className="text-sm text-[var(--color-ink)] font-medium">
          Thank you, your email address has been saved.
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
          />
          <button
            type="submit"
            disabled={status === "saving"}
            className="rounded-lg bg-[var(--color-ink)] text-white text-sm font-medium px-4 py-2 disabled:opacity-40"
          >
            {status === "saving" ? "..." : "Leave my email"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-sm text-[var(--color-signal)] mt-2">
          That did not work. Please try again or use the email option above.
        </p>
      )}
    </div>
  );
}
