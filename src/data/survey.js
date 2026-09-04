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
// Every question may have a `help` string, a short friendly explanation shown
// under the question title.
//
// Style note: no dashes as punctuation anywhere in participant-facing text.
// Use commas, full stops or parentheses instead.
// ============================================================================

export const surveyConfig = {
  title: "Ethical Perception Index",

  // PAGE 1: leads into the topic.
  intro:
    "Hello everyone!\n\n" +
    "Robots and automated systems are becoming an increasingly common part of " +
    "our everyday lives, from vacuum cleaners and service robots in shops to " +
    "automated warehouses, hospital assistance, and even surgical " +
    "applications. As these technologies become more advanced, they are " +
    "increasingly able to act autonomously and make decisions in the moment " +
    "without a person guiding every step.\n\n" +
    "In these situations, being technically safe and functional is no longer " +
    "enough. People also judge robots by how their behavior makes them feel, " +
    "whether they seem fair, trustworthy, predictable, and considerate of the " +
    "people around them. These social and ethical qualities can strongly " +
    "influence whether we feel comfortable with and accept a robot. However, " +
    "they are often studied separately, and there is still no common approach " +
    "for evaluating a robot's ethical behavior. This study is a first step " +
    "towards developing such an approach.\n\n" +
    "In the clips that follow, you will see a humanoid robot (Unitree G1) " +
    "moving and interacting in a shared space with one or multiple humans. " +
    "For each clip, please imagine that you are the person in the scene and " +
    "tell us how the situation made you feel.\n\n" +
    "There are no right or wrong answers. We are simply interested in your " +
    "honest first impression.\n\n" +
    "Thank you very much for your participation!\n\n" +
    "Best regards, Leonie : )",

  // PAGE 2: practical notes, shown above the consent checkboxes.
  practical:
    "A few practical notes before you begin. The survey takes about 15 to 20 " +
    "minutes. You will watch {count} short clips and answer a handful of quick " +
    "questions after each one. Your answers are anonymous and used only for " +
    "academic research (a master's thesis). You can stop at any time, no " +
    "reason needed.",

  // Shown on the very last screen.
  endText: "Have a great day : )",

  // Final-step controls for withdrawing.
  seriousCheckLabel:
    "I did not answer this survey seriously. Please do NOT use my responses.",
  discardConfirmText:
    "No problem at all. Nothing has been saved and you can simply close this " +
    "tab. Thank you anyway.",

  // How many times each scenario video may be played.
  maxVideoPlays: 3,

  // "Interest in the real-world study" section at the end.
  interestHeading: "Interested in the real-world study?",
  interestText:
    "As a next step we are planning real-world validation experiments with the " +
    "robot at the research center in Garching. We would be glad if you would " +
    "like to take part. Participation is completely voluntary and optional, " +
    "and it has no connection to your answers above. If you are interested, " +
    "use the button below or simply email us.",
  contactEmail: "leonie.voegler@yahoo.de",
  contactSubject: "Interest in Garching Real-World Study",
  contactBody:
    "Hello,\n\nI am interested in taking part in the real-world validation " +
    "experiments at the research center in Garching.\n\nBest regards",
};

// ----------------------------------------------------------------------------
// 1. CONSENT & DATA PRIVACY
// ----------------------------------------------------------------------------
const consentStep = {
  id: "consent",
  video: null,
  intro: surveyConfig.practical, // the "information above" the second checkbox refers to
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
    "Just some basics about who is taking part. This only helps us describe " +
    "the group of people in the study.",
  questions: [
    {
      id: "Q002",
      type: "dropdown",
      prompt: "Age Group",
      options: [
        "18 to 20",
        "21 to 25",
        "26 to 30",
        "31 to 35",
        "36 to 40",
        "41 to 50",
        "51 to 60",
        "61 to 70",
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
        "Apprentice or Trainee",
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
      prompt: "Field of Study or Occupation",
      allowOther: true,
      otherPlaceholder: "Please name your field of study or occupation",
      options: [
        "Agriculture",
        "Business and Administration",
        "Design, Arts, Architecture and Media",
        "Education and Pedagogy",
        "Engineering and Manufacturing (mechanical, electrical, robotics, etc.)",
        "Finance and Economics",
        "Healthcare, Medicine and Nursing",
        "Humanities (philosophy, history, languages, etc.)",
        "IT and Computer Science",
        "Law",
        "Natural Sciences (physics, biology, chemistry, etc.)",
        "Real Estate and Property Management",
        "Retail and Services",
        "Social Sciences and Psychology",
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
        "Here are a few statements to get a sense of how familiar some topics " +
        "already are to you, robots themselves as well as the ethical " +
        "discussions around them. Drag each slider from “Strongly disagree” " +
        "to “Strongly agree”.",
      ...AGREE_SCALE,
      items: [
        { code: "SQ001", label: "I have prior experience working with or studying robots." },
        { code: "SQ002", label: "I am familiar with ethical concepts and discussions around AI and robotics." },
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

// The keyword that names the dimension being asked about is wrapped in **…**
// and shown in bold.
const scenarioQuestion = {
  id: "Q020",
  type: "grid",
  prompt: "How did you experience this interaction?",
  help:
    "Think back to the clip you just watched and imagine you were the person " +
    "in the scene. Drag each slider to wherever feels right for you.",
  ...INTENSITY_SCALE,
  items: [
    { code: "SQ001", label: "How **comfortable** did you feel during this interaction?" },
    { code: "SQ002", label: "How **fair** did the robot's behavior seem toward the people in the scene?" },
    { code: "SQ003", label: "How **predictable** was the robot's behavior?" },
    { code: "SQ004", label: "How **safe** did you feel during this interaction?" },
    { code: "SQ005", label: "How much would you **trust** this robot in this situation?" },
    { code: "SQ006", label: "How **ethically appropriate** would you rate the robot's behavior overall?" },
  ],
};

// Attention check. It is NOT its own page and not styled differently: it is
// added as one more row on ONE scenario grid (see attentionAt below), so it
// looks exactly like the other sliders. In the data it lands as
// question_id "Q020::attention_check" on that scenario's video_id.
// Filter out anyone whose answer there is not 3.
const attentionItem = {
  code: "attention_check",
  label: "For quality control, please set this slider to +3.",
};

// Where the video files are served from (a Cloudflare R2 public bucket). The
// clips were uploaded inside a "00_final_videos/" folder, so that prefix is
// part of the base URL. To go back to local files (in public/videos/), set
// this to "/videos".
const VIDEO_BASE =
  "https://pub-7d29a674a3ed479ba3d497bb7504ae01.r2.dev/00_final_videos";

// One entry per clip. `id` is stored in the database as `video_id`, keep the
// descriptive names so you can tell the conditions apart when analyzing.
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

// Fisher-Yates shuffle.
function shuffle(input) {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// "baseline" is always shown first; every other clip is put in a random order
// drawn fresh for each participant (once per page load), so the sequence
// cannot bias the results. The position each participant actually saw is
// stored with their answers (question_id "presentation_order").
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

// Hide the attention check inside the scenario about two-thirds of the way in,
// as an extra slider row on that scenario's grid.
const attentionAt = Math.min(
  videoSteps.length - 1,
  Math.round((videoSteps.length * 2) / 3)
);
videoSteps[attentionAt] = {
  ...videoSteps[attentionAt],
  questions: [
    { ...scenarioQuestion, items: [...scenarioQuestion.items, attentionItem] },
  ],
};

// ----------------------------------------------------------------------------
// 5. FINAL REMARKS
// ----------------------------------------------------------------------------
const finalStep = {
  id: "final-remarks",
  video: null,
  title: "Final Remarks",
  help: "Almost done. These two questions are optional.",
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

export const steps = [
  consentStep,
  demographicStep,
  introStep,
  ...videoSteps,
  finalStep,
];
