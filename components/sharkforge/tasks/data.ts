export type Repeat = "None" | "Daily" | "Weekly" | "Monthly"

export type Subtask = { title: string; done: boolean }

export type Task = {
  id: string
  title: string
  /** ISO-ish parts to avoid timezone drift */
  year: number
  month: number // 0-indexed
  day: number
  hour: number
  minute: number
  completed: boolean
  repeat: Repeat
  subtasks?: Subtask[]
}

/* Deterministic "now" anchored to the SharkForge timeline (Tue Jun 30, 2026, 2:52pm). */
export const NOW = { year: 2026, month: 5, day: 30, hour: 14, minute: 52 }

export function taskDate(t: { year: number; month: number; day: number; hour: number; minute: number }) {
  return new Date(t.year, t.month, t.day, t.hour, t.minute)
}

export const NOW_DATE = taskDate(NOW)

/** Whole-day delta from today (negative = overdue). */
export function dayDelta(t: Task) {
  const a = new Date(t.year, t.month, t.day)
  const b = new Date(NOW.year, NOW.month, NOW.day)
  return Math.round((a.getTime() - b.getTime()) / 86_400_000)
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatWhen(t: Task) {
  const d = taskDate(t)
  return `${DAYS[d.getDay()]} ${MONTHS[t.month]} ${t.day} · ${formatTime(t)}`
}

export function formatTime(t: { hour: number; minute: number }) {
  const period = t.hour >= 12 ? "PM" : "AM"
  const h = t.hour % 12 === 0 ? 12 : t.hour % 12
  return `${h}:${String(t.minute).padStart(2, "0")} ${period}`
}

export function deltaLabel(d: number) {
  if (d === 0) return "Today"
  return d > 0 ? `+${d}d` : `${d}d`
}

/* ------------------------------------------------------------------ */
/*  Active (incomplete) tasks                                         */
/* ------------------------------------------------------------------ */

export const ACTIVE_TASKS: Task[] = [
  {
    id: "jim-setup",
    title: "Jim's Setup",
    year: 2026,
    month: 5,
    day: 1,
    hour: 10,
    minute: 27,
    completed: false,
    repeat: "None",
    subtasks: [
      { title: "Order monitor arm", done: true },
      { title: "Provision laptop", done: false },
      { title: "Create accounts", done: false },
    ],
  },
  { id: "vip-apis", title: "Get VIP APIs", year: 2026, month: 5, day: 12, hour: 10, minute: 28, completed: false, repeat: "None" },
  { id: "cloudcover", title: "CloudCover Fix Colombus", year: 2026, month: 5, day: 18, hour: 9, minute: 0, completed: false, repeat: "None" },
  { id: "bunt", title: "Bunt tickets", year: 2026, month: 5, day: 22, hour: 8, minute: 35, completed: false, repeat: "None" },
  {
    id: "ohio",
    title: "Follow up new Ohio locations",
    year: 2026,
    month: 5,
    day: 29,
    hour: 14,
    minute: 8,
    completed: false,
    repeat: "Weekly",
  },
  { id: "meg", title: "Meg's Surprise Trip", year: 2026, month: 6, day: 17, hour: 6, minute: 0, completed: false, repeat: "None" },
  {
    id: "liberty-sprint",
    title: "Liberty Beverage 90 Days Sprint",
    year: 2026,
    month: 7,
    day: 12,
    hour: 8,
    minute: 0,
    completed: false,
    repeat: "Monthly",
  },
]

/* ------------------------------------------------------------------ */
/*  Completed archive                                                 */
/* ------------------------------------------------------------------ */

export const ARCHIVE_TASKS: Task[] = [
  { id: "suit", title: "Suit", year: 2026, month: 5, day: 22, hour: 7, minute: 21, completed: true, repeat: "None" },
  { id: "basement", title: "Basement", year: 2026, month: 5, day: 22, hour: 7, minute: 21, completed: true, repeat: "None" },
  { id: "mowing", title: "Mowing", year: 2026, month: 5, day: 22, hour: 7, minute: 21, completed: true, repeat: "Weekly" },
  { id: "shaving", title: "Shaving", year: 2026, month: 5, day: 20, hour: 13, minute: 21, completed: true, repeat: "None" },
  { id: "hair", title: "Hair", year: 2026, month: 5, day: 20, hour: 13, minute: 21, completed: true, repeat: "None" },
  {
    id: "primebody",
    title: "Change Payment on PrimeBody",
    year: 2026,
    month: 5,
    day: 18,
    hour: 9,
    minute: 40,
    completed: true,
    repeat: "None",
  },
  { id: "lawyer", title: "Pay Lawyer", year: 2026, month: 5, day: 17, hour: 8, minute: 46, completed: true, repeat: "None" },
  { id: "baraca", title: "Baraca", year: 2026, month: 5, day: 14, hour: 12, minute: 56, completed: true, repeat: "None" },
  {
    id: "rocks",
    title: "Rocks Hawthorne and case cover",
    year: 2026,
    month: 5,
    day: 11,
    hour: 18,
    minute: 10,
    completed: true,
    repeat: "None",
  },
  {
    id: "liberty-crm",
    title: "Liberty Beverage CRM Meeting",
    year: 2026,
    month: 5,
    day: 11,
    hour: 15,
    minute: 51,
    completed: true,
    repeat: "None",
  },
  { id: "rufus", title: "Rufus", year: 2026, month: 5, day: 11, hour: 4, minute: 42, completed: true, repeat: "None" },
  { id: "garbage", title: "Garbage Dump Mexican Guy", year: 2026, month: 5, day: 11, hour: 4, minute: 42, completed: true, repeat: "None" },
  { id: "phone-cover", title: "Phone Cover", year: 2026, month: 5, day: 11, hour: 4, minute: 42, completed: true, repeat: "None" },
]
