import { useMemo, useState } from "react";
import { surveyConfig, steps } from "./data/survey";
import { supabase } from "./lib/supabaseClient";
import VideoStage from "./components/VideoStage";
import Question from "./components/Question";
import ProgressTimeline from "./components/ProgressTimeline";
import InterestSection from "./components/InterestSection";

const PHASES = {
  INTRO: "intro",
  SURVEY: "survey",
  SUBMITTING: "submitting",
  INTEREST: "interest",
  DONE: "done",
  ERROR: "error",
};

function Shell({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}

// Whether a question has been answered well enough to move on. Questions that
// were optional in LimeSurvey (grids, free text) never block the "Next" button.
function isAnswered(question, value) {
  switch (question.type) {
    case "consent":
      return Boolean(value) && question.items.every((it) => value[it.code]);
    case "dropdown":
    case "single-choice":
    case "multiple-choice":
    case "scale":
      return value !== undefined && value !== null && value !== "";
    default:
      return true;
  }
}

// Answers are stored under a key that is unique per step, because the same
// question object (e.g. the scenario grid "Q020") is reused across every video.
function answerKey(step, question) {
  return `${step.id}::${question.id}`;
}

// Turn the in-memory answers into flat rows for the `responses` table.
function buildRows(answers, participantId) {
  const rows = [];
  for (const step of steps) {
    const videoId = step.videoUrl ? step.id : null;

    // Record the (randomised) position this scenario was shown at.
    if (videoId && step.position != null) {
      rows.push({
        participant_id: participantId,
        video_id: videoId,
        question_id: "presentation_order",
        answer: String(step.position),
      });
    }

    for (const q of step.questions) {
      const value = answers[answerKey(step, q)];

      if (q.type === "consent") {
        for (const it of q.items) {
          if (value?.[it.code]) {
            rows.push({
              participant_id: participantId,
              video_id: videoId,
              question_id: `${q.id}::${it.code}`,
              answer: "yes",
            });
          }
        }
        continue;
      }

      if (q.type === "grid") {
        for (const it of q.items) {
          const v = value?.[it.code];
          if (v !== undefined && v !== null) {
            rows.push({
              participant_id: participantId,
              video_id: videoId,
              question_id: `${q.id}::${it.code}`,
              answer: String(v),
            });
          }
        }
        continue;
      }

      if (value !== undefined && value !== null && value !== "") {
        rows.push({
          participant_id: participantId,
          video_id: videoId,
          question_id: q.id,
          answer: String(value),
        });
      }
    }
  }
  return rows;
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const participantId = useMemo(() => crypto.randomUUID(), []);

  const currentStep = steps[stepIndex];
  const questionsInStep = currentStep?.questions ?? [];
  const stepAnswered = questionsInStep.every((q) =>
    isAnswered(q, answers[answerKey(currentStep, q)])
  );
  const scenarioCount = steps.filter((s) => s.videoUrl).length;
  const withCount = (text) => (text ?? "").replaceAll("{count}", scenarioCount);

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleNext() {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await submit();
    }
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function submit() {
    setPhase(PHASES.SUBMITTING);
    const rows = buildRows(answers, participantId);
    const { error } = await supabase.from("responses").insert(rows);
    if (error) {
      console.error(error);
      setPhase(PHASES.ERROR);
    } else {
      setPhase(PHASES.INTEREST);
    }
  }

  if (phase === PHASES.INTRO) {
    return (
      <Shell>
        <p className="font-mono text-xs tracking-wider text-[var(--color-ink-muted)] uppercase mb-3">
          {scenarioCount} scenarios
        </p>
        <h1 className="font-display text-3xl font-semibold mb-4">{surveyConfig.title}</h1>
        <p className="text-[var(--color-ink-muted)] mb-6 leading-relaxed whitespace-pre-line">
          {withCount(surveyConfig.intro)}
        </p>
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 mb-8">
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{surveyConfig.consent}</p>
        </div>
        <button
          onClick={() => setPhase(PHASES.SURVEY)}
          className="w-full rounded-lg bg-[var(--color-accent)] text-white font-medium py-3 hover:opacity-90 transition-opacity"
        >
          Start survey
        </button>
      </Shell>
    );
  }

  if (phase === PHASES.SUBMITTING) {
    return (
      <Shell>
        <p className="font-mono text-sm text-[var(--color-ink-muted)]">Saving your answers…</p>
      </Shell>
    );
  }

  if (phase === PHASES.ERROR) {
    return (
      <Shell>
        <h1 className="font-display text-2xl font-semibold mb-3">Something went wrong</h1>
        <p className="text-[var(--color-ink-muted)] mb-6">
          Your answers could not be saved. Please check your internet connection and try again.
        </p>
        <button
          onClick={submit}
          className="w-full rounded-lg bg-[var(--color-accent)] text-white font-medium py-3"
        >
          Try again
        </button>
      </Shell>
    );
  }

  if (phase === PHASES.INTEREST) {
    return (
      <Shell>
        <h1 className="font-display text-2xl font-semibold mb-3">Thank you for taking part</h1>
        <p className="text-[var(--color-ink-muted)] mb-6">
          Your answers have been submitted successfully and anonymously.
        </p>
        <InterestSection config={surveyConfig} />
        <button
          onClick={() => setPhase(PHASES.DONE)}
          className="w-full mt-6 rounded-lg bg-[var(--color-ink)] text-white font-medium py-3 hover:opacity-90 transition-opacity"
        >
          Finish
        </button>
      </Shell>
    );
  }

  if (phase === PHASES.DONE) {
    return (
      <Shell>
        <h1 className="font-display text-2xl font-semibold mb-3">Thank you!</h1>
        <p className="text-[var(--color-ink-muted)] whitespace-pre-line">{surveyConfig.endText}</p>
      </Shell>
    );
  }

  // phase === PHASES.SURVEY
  return (
    <Shell>
      <div className="mb-6">
        <ProgressTimeline current={stepIndex} total={steps.length} />
      </div>

      {currentStep.videoUrl && (
        <VideoStage
          src={currentStep.videoUrl}
          label={currentStep.videoLabel}
          maxPlays={surveyConfig.maxVideoPlays}
        />
      )}

      {currentStep.title && (
        <h2 className="font-display text-2xl font-semibold mb-4">{currentStep.title}</h2>
      )}

      {currentStep.intro && (
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 mb-8">
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed whitespace-pre-line">
            {withCount(currentStep.intro)}
          </p>
        </div>
      )}

      <div className={`flex flex-col gap-8 ${currentStep.videoUrl ? "mt-8" : ""}`}>
        {questionsInStep.map((q) => {
          const key = answerKey(currentStep, q);
          return (
            <Question
              key={key}
              question={q}
              value={answers[key]}
              onChange={(v) => setAnswer(key, v)}
            />
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="font-mono text-sm text-[var(--color-ink-muted)] disabled:opacity-30 hover:text-[var(--color-ink)]"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!stepAnswered}
          className="rounded-lg bg-[var(--color-accent)] text-white font-medium px-6 py-2.5 disabled:opacity-30 hover:opacity-90 transition-opacity"
        >
          {stepIndex < steps.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </Shell>
  );
}
