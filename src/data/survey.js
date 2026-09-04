// ============================================================================
// SURVEY CONTENT — this is the only file you must edit to change questions,
// videos and contact details.
//
// Built from the LimeSurvey export "Ethical Perception Index" (survey 868688).
// Question/sub-question codes (Q001, SQ001, …) are kept identical to LimeSurvey
// so the collected data maps back to your codebook. Every response row also
// stores the `video_id` of the scenario it belongs to.
//
// Question types available in this app:
//   "consent"        - list of checkboxes, ALL must be ticked to continue
//   "dropdown"       - single choice from a drop-down list
//   "single-choice"  - single choice shown as a list of buttons
//   "grid"           - one shared slider scale answered for several statements
//   "scale"          - a row of numbered buttons (e.g. 1..5)
//   "slider"         - a single slider
//   "text"           - free-text answer
//
// Any "dropdown" / "single-choice" question can set `allowOther: true`. That
// adds an "Other" choice; picking it reveals a text box and the typed text is
// stored as the answer.
// Every question may have a `help` string — a short, friendly explanation
// shown under the question title.
// ============================================================================

export const surveyConfig = {
  title: "Ethical Perception Index",

  // Shown on the welcome screen and again above the consent checkboxes.
  // "{count}" is replaced automatically with the number of scenario videos.
  intro:
    "Thanks so much for taking part — it really helps. You'll watch {count} " +
    "short video clips of a humanoid robot (Unitree G1) moving around and " +
    "interacting in a shared space. After each clip there are a few quick " +
    "questions about how it made you feel. There are no right or wrong " +
    "answers: just picture yourself as someone in the scene and go with your " +
    "first impression.\n\n" +
    "It takes about 15–20 minutes. Your answers are anonymous and used only " +
    "for academic research (a master's thesis). You can stop at any time, no " +
    "reason needed.",

  // Short line shown inside the bordered box on the welcome screen.
  consent:
    "By continuing you confirm the statements below. Your answers are stored " +
    "anonymously and cannot be linked back to you.",

  // Shown on the very last screen.
  endText:
    "Hope you have a great day!\n\nThank you again and kind regards,\nLeonie",

  // Final-step controls for withdrawing (see issue: discard / not serious).
  seriousCheckLabel:
    "I did not answer this survey seriously. Please do NOT use my responses.",
  discardConfirmText:
    "No problem at all — nothing has been saved and you can simply close this " +
    "tab. Thank you anyway!",

  // How many times each scenario video may be played.
  maxVideoPlays: 3,

  // "Interest in the real-world study" section at the end.
  contactEmail: "leonie.voegler@yahoo.de",
  contactSubject: "Interest in Garching Real-World Study",
  contactBody:
    "Hello,\n\nI am interested in participating in the real-world study at the " +
    "research center in Garching.\n\nBest regards",
};

// ----------------------------------------------------------------------------
// 1. CONSENT & DATA PRIVACY
// ----------------------------------------------------------------------------
const consentStep = {
  id: "consent",
  video: null,
  intro: surveyConfig.intro, // the "information above" the second checkbox refers to
  questions: [
    {
      id: "Q001",
      type: "consent",
      prompt: "Please confirm the following to take part:",
      items: [
        {
          code: "SQ001",
          label:
            "I am 18 years or older and consent to participate in this study.",
        },
        {
          code: "SQ002",
          label: "I have read and understood the information above.",
        },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// 2. DEMOGRAPHIC INFORMATION
// ----------------------------------------------------------------------------
const demographicStep = {
  id: "demographics",
  video: null,
  title: "A Few Questions About You",
  help:
    "Just some basics about who is taking part — this only helps us describe " +
    "the group of people in the study. Pick “Prefer not to say” for anything " +
    "you would rather skip.",
  questions: [
    {
      id: "Q002",
      type: "dropdown",
      prompt: "Age Group",
      options: [
        "18-20",
        "21-25",
        "26-30",
        "31-35",
        "36-40",
        "41-50",
        "51-60",
        "61-70",
      ],
    },
    {
      id: "Q003",
      type: "dropdown",
      prompt: "Gender",
      options: ["Female", "Male", "Non-binary", "Prefer not to say"],
    },
    {
      id: "Q010",
      type: "single-choice",
      prompt: "Country of Residence",
      allowOther: true,
      otherLabel: "Another country",
      otherPlaceholder: "Which country do you live in?",
      options: ["Germany"],
    },
    {
      id: "Q011",
      type: "dropdown",
      prompt: "Current Status",
      allowOther: true,
      otherPlaceholder: "Please describe your current status",
      options: [
        "Apprentice / Trainee",
        "Student",
        "Employed",
        "Self-employed",
        "Job-seeking",
        "Retired",
      ],
    },
    {
      id: "Q012",
      type: "dropdown",
      prompt: "Field of Study / Occupation",
      allowOther: true,
      otherPlaceholder: "Please name your field of study or occupation",
      options: [
        "Agriculture",
        "Business & Administration",
        "Design, Arts, Architecture & Media",
        "Education & Pedagogy",
        "Engineering & Manufacturing (Mechanical, Electrical, Robotics, etc.)",
        "Finance & Economics",
        "Healthcare, Medicine & Nursing",
        "Humanities (Philosophy, History, Languages, etc.)",
        "IT & Computer Science",
        "Law",
        "Natural Sciences (Physics, Biology, Chemistry, etc.)",
        "Real Estate & Property Management",
        "Retail & Services",
        "Social Sciences & Psychology",
        "Prefer not to say",
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// 3. INTRODUCTORY QUESTIONS  (bipolar sliders, -5 … 0 … +5)
// ----------------------------------------------------------------------------
const AGREE_SCALE = {
  min: -5,
  max: 5,
  step: 1,
  minLabel: "Strongly disagree",
  midLabel: "Neutral",
  maxLabel: "Strongly agree",
};

const introStep = {
  id: "intro-questions",
  video: null,
  title: "Introductory Questions",
  help: "Two short sets of statements before the video clips begin.",
  questions: [
    {
      id: "Q008",
      type: "grid",
      prompt: "Prior Knowledge and Experience",
      help:
        "This is just to get a sense of how familiar this whole topic already " +
        "is to you — robots themselves, and the ethical discussions around " +
        "them. There are no right answers, so go with your gut. Drag each " +
        "slider from “Strongly disagree” to “Strongly agree”.",
      ...AGREE_SCALE,
      items: [
        { code: "SQ001", label: "I have prior experience working with or studying robots." },
        { code: "SQ002", label: "I am familiar with ethical concepts and discussions around AI/robotics." },
        { code: "SQ003", label: "I have interacted with a robot in person before." },
        { code: "SQ004", label: "I have interacted specifically with a humanoid robot before." },
        { code: "SQ005", label: "I have participated in a human-robot interaction study before." },
      ],
    },
    {
      id: "Q009",
      type: "grid",
      prompt: "Personal Reflection",
      help:
        "Now a few statements about how you personally feel about robots and " +
        "new technology in general. Again, just your honest first reaction.",
      ...AGREE_SCALE,
      items: [
        { code: "SQ001", label: "In general, I tend to trust new technology." },
        { code: "SQ002", label: "I am interested in autonomous robots." },
        { code: "SQ003", label: "I believe robots would not intentionally harm a human." },
        { code: "SQ004", label: "I feel comfortable being physically close to robots." },
        { code: "SQ005", label: "I am concerned about robots making decisions that affect people." },
        { code: "SQ006", label: "I believe robots can behave in a fair and unbiased way." },
        { code: "SQ007", label: "I would feel safe walking past a robot in a shared space." },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// 3b. ATTENTION CHECK  (inserted roughly two-thirds of the way through)
// ----------------------------------------------------------------------------
const attentionStep = {
  id: "attention-check",
  video: null,
  title: "Quick Check",
  help:
    "Just making sure the page is working for you and that you are still with " +
    "us — this one is not about your opinion.",
  questions: [
    {
      id: "attention_check",
      type: "slider",
      prompt: "To show you are paying attention, please set this slider to +3.",
      min: -5,
      max: 5,
      step: 1,
      minLabel: "-5",
      maxLabel: "+5",
    },
  ],
};

// ----------------------------------------------------------------------------
// 4. SCENARIO-BASED QUESTIONS
//
// The same 6-item question block (LimeSurvey code Q020) is asked after every
// scenario video. Add / edit your clips in `videos` below.
// ----------------------------------------------------------------------------
const INTENSITY_SCALE = {
  min: -5,
  max: 5,
  step: 1,
  minLabel: "Not at all",
  midLabel: "Neutral",
  maxLabel: "Very much",
};

const scenarioQuestion = {
  id: "Q020",
  type: "grid",
  prompt: "How did you experience this interaction?",
  help:
    "Think back to the clip you just watched and imagine you were one of the " +
    "people in the scene. Drag each slider to wherever feels right for you.",
  ...INTENSITY_SCALE,
  items: [
    { code: "SQ001", label: "How comfortable did you feel during this interaction?" },
    { code: "SQ002", label: "How fair did the robot's behavior seem toward the people in the scene?" },
    { code: "SQ003", label: "How predictable was the robot's behavior?" },
    { code: "SQ004", label: "How safe did you feel during this interaction?" },
    { code: "SQ005", label: "How much would you trust this robot in this situation?" },
    { code: "SQ006", label: "How ethically appropriate would you rate the robot's behavior overall?" },
  ],
};

// Where the video files are served from — a Cloudflare R2 public bucket.
// The clips were uploaded inside a "00_final_videos/" folder, so that prefix
// is part of the base URL. To go back to local files (in public/videos/),
// set this to "/videos".
const VIDEO_BASE =
  "https://pub-7d29a674a3ed479ba3d497bb7504ae01.r2.dev/00_final_videos";

// One entry per clip. `id` is stored in the database as `video_id` — keep the
// descriptive names so you can tell the conditions apart when analysing.
const videos = [
  { id: "baseline", file: "baseline_LV.mp4" },
  { id: "comfort_plus", file: "comfort_plus_LV.mp4" },
  { id: "comfort_minus", file: "comfort_minus_LV.mp4" },
  { id: "fairness_plus", file: "fairness_plus_LV.mp4" },
  { id: "fairness_minus", file: "fairness_minus_LV.mp4" },
  { id: "predictability_plus", file: "predictability_plus_LV.mp4" },
  { id: "predictability_minus", file: "predictability_minus_LV.mp4" },
  { id: "safety_plus", file: "safety_plus_LV.mp4" },
  { id: "safety_minus", file: "safety_minus_LV.mp4" },
  { id: "trust_plus", file: "trust_plus_LV.mp4" },
  { id: "trust_minus", file: "trust_minus_LV.mp4" },
  { id: "best_case", file: "best_case_LV.mp4" },
  { id: "worst_case", file: "worst_case_LV.mp4" },
];

// Fisher–Yates shuffle.
function shuffle(input) {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// "baseline" is always shown first; every other clip is put in a random order
// that is drawn fresh for each participant (once per page load), so the
// sequence cannot bias the results. The position each participant actually saw
// is stored with their answers (question_id "presentation_order").
const baselineVideo = videos.find((v) => v.id === "baseline");
const otherVideos = videos.filter((v) => v.id !== "baseline");
const orderedVideos = [
  ...(baselineVideo ? [baselineVideo] : []),
  ...shuffle(otherVideos),
];

const videoSteps = orderedVideos.map((v, i) => ({
  id: v.id,
  videoUrl: `${VIDEO_BASE}/${v.file}`,
  videoLabel: `Scenario ${i + 1}`,
  position: i + 1,
  questions: [scenarioQuestion],
}));

// ----------------------------------------------------------------------------
// 5. FINAL REMARKS
// ----------------------------------------------------------------------------
const finalStep = {
  id: "final-remarks",
  video: null,
  title: "Final Remarks",
  help: "Almost done — these two questions are optional.",
  questions: [
    {
      id: "Q017",
      type: "text",
      prompt: "What stood out to you across the scenarios overall?",
    },
    {
      id: "Q019",
      type: "text",
      prompt:
        "Did you notice anything the robot did that felt particularly positive or negative?",
    },
  ],
};

// Insert the attention check about two-thirds of the way through the videos.
const attentionAfter = Math.round((videoSteps.length * 2) / 3);

export const steps = [
  consentStep,
  demographicStep,
  introStep,
  ...videoSteps.slice(0, attentionAfter),
  attentionStep,
  ...videoSteps.slice(attentionAfter),
  finalStep,
];
