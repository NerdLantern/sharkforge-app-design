export type PrEntry = { date: string; weight: number }

export type Exercise = {
  id: string
  name: string
  bodyPart: BodyPart
  history: PrEntry[] // chronological, oldest -> newest
}

export const BODY_PARTS = [
  "Chest",
  "Triceps",
  "Back",
  "Biceps",
  "Shoulders",
  "Traps",
  "Legs",
  "Glutes",
  "Abs",
] as const

export type BodyPart = (typeof BODY_PARTS)[number]

/* Helpers ---------------------------------------------------------------- */

export function currentPr(ex: Exercise): PrEntry {
  return ex.history[ex.history.length - 1]
}

export function previousPr(ex: Exercise): PrEntry | null {
  return ex.history.length > 1 ? ex.history[ex.history.length - 2] : null
}

export function prettyDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function shortMonth(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).replace(" ", " '")
}

/* Seed data -------------------------------------------------------------- */

export const EXERCISES: Exercise[] = [
  {
    id: "bench-iso",
    name: "Bench Press (ISO Horizontal)",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-10", weight: 250 },
      { date: "2026-04-28", weight: 260 },
      { date: "2026-05-15", weight: 270 },
      { date: "2026-05-29", weight: 280 },
    ],
  },
  {
    id: "chest-fly",
    name: "Chest Fly",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-22", weight: 180 },
      { date: "2026-05-08", weight: 195 },
      { date: "2026-05-31", weight: 200 },
      { date: "2026-06-12", weight: 220 },
    ],
  },
  {
    id: "magnum-incline",
    name: "Magnum Incline Bench Press",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-30", weight: 160 },
      { date: "2026-05-20", weight: 178 },
      { date: "2026-06-06", weight: 192 },
    ],
  },
  {
    id: "bench-press",
    name: "Bench Press",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-12", weight: 155 },
      { date: "2026-05-02", weight: 170 },
      { date: "2026-05-29", weight: 185 },
    ],
  },
  {
    id: "bench-incline",
    name: "Bench Press (Incline)",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-18", weight: 135 },
      { date: "2026-05-10", weight: 150 },
      { date: "2026-05-31", weight: 165 },
    ],
  },
  {
    id: "dumbbell-press",
    name: "Dumbbell Press",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-15", weight: 45 },
      { date: "2026-05-12", weight: 52.5 },
      { date: "2026-05-29", weight: 60 },
    ],
  },
  {
    id: "dumbbell-fly",
    name: "Dumbbell Fly",
    bodyPart: "Chest",
    history: [
      { date: "2026-04-20", weight: 40 },
      { date: "2026-05-29", weight: 55 },
    ],
  },
  {
    id: "decline-cable-fly",
    name: "Decline Cable Fly",
    bodyPart: "Chest",
    history: [
      { date: "2026-05-18", weight: 42.5 },
      { date: "2026-06-03", weight: 50 },
    ],
  },

  /* Triceps */
  {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    bodyPart: "Triceps",
    history: [
      { date: "2026-04-22", weight: 70 },
      { date: "2026-05-20", weight: 85 },
      { date: "2026-06-10", weight: 95 },
    ],
  },
  {
    id: "skullcrusher",
    name: "Skullcrusher",
    bodyPart: "Triceps",
    history: [
      { date: "2026-05-01", weight: 80 },
      { date: "2026-06-08", weight: 95 },
    ],
  },
  {
    id: "overhead-extension",
    name: "Overhead Cable Extension",
    bodyPart: "Triceps",
    history: [
      { date: "2026-05-14", weight: 60 },
      { date: "2026-06-14", weight: 72.5 },
    ],
  },

  /* Back */
  {
    id: "deadlift",
    name: "Deadlift",
    bodyPart: "Back",
    history: [
      { date: "2026-03-30", weight: 365 },
      { date: "2026-04-25", weight: 405 },
      { date: "2026-05-22", weight: 425 },
      { date: "2026-06-18", weight: 455 },
    ],
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    bodyPart: "Back",
    history: [
      { date: "2026-04-18", weight: 160 },
      { date: "2026-05-30", weight: 190 },
    ],
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    bodyPart: "Back",
    history: [
      { date: "2026-04-28", weight: 185 },
      { date: "2026-06-05", weight: 225 },
    ],
  },

  /* Biceps */
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    bodyPart: "Biceps",
    history: [
      { date: "2026-04-20", weight: 80 },
      { date: "2026-06-02", weight: 100 },
    ],
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    bodyPart: "Biceps",
    history: [
      { date: "2026-05-05", weight: 35 },
      { date: "2026-06-12", weight: 45 },
    ],
  },

  /* Shoulders */
  {
    id: "overhead-press",
    name: "Overhead Press",
    bodyPart: "Shoulders",
    history: [
      { date: "2026-04-14", weight: 115 },
      { date: "2026-05-26", weight: 145 },
    ],
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    bodyPart: "Shoulders",
    history: [
      { date: "2026-05-08", weight: 25 },
      { date: "2026-06-15", weight: 35 },
    ],
  },

  /* Traps */
  {
    id: "barbell-shrug",
    name: "Barbell Shrug",
    bodyPart: "Traps",
    history: [
      { date: "2026-04-26", weight: 225 },
      { date: "2026-06-09", weight: 275 },
    ],
  },

  /* Legs */
  {
    id: "back-squat",
    name: "Barbell Back Squat",
    bodyPart: "Legs",
    history: [
      { date: "2026-03-28", weight: 275 },
      { date: "2026-04-22", weight: 295 },
      { date: "2026-05-18", weight: 315 },
      { date: "2026-06-20", weight: 335 },
    ],
  },
  {
    id: "leg-press",
    name: "Leg Press",
    bodyPart: "Legs",
    history: [
      { date: "2026-04-16", weight: 450 },
      { date: "2026-06-01", weight: 540 },
    ],
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    bodyPart: "Legs",
    history: [
      { date: "2026-05-04", weight: 225 },
      { date: "2026-06-16", weight: 275 },
    ],
  },

  /* Glutes */
  {
    id: "hip-thrust",
    name: "Hip Thrust",
    bodyPart: "Glutes",
    history: [
      { date: "2026-04-24", weight: 245 },
      { date: "2026-06-07", weight: 315 },
    ],
  },

  /* Abs */
  {
    id: "cable-crunch",
    name: "Cable Crunch",
    bodyPart: "Abs",
    history: [
      { date: "2026-05-10", weight: 90 },
      { date: "2026-06-13", weight: 120 },
    ],
  },
]
