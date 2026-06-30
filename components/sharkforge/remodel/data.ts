export type ProjectStatus = "in-flight" | "completed" | "planning"

export type Project = {
  id: string
  name: string
  description: string
  startDate: string // ISO
  status: ProjectStatus
  progress: number // 0-100
  targetDate?: string // ISO, used for countdown
  links?: string[]
}

export type ExpenseKind = "materials" | "labor"

export type Expense = {
  id: string
  projectId: string
  name: string
  date: string // ISO
  materials: number
  labor: number
  notes?: string
  hasReceipt?: boolean
  isReturn?: boolean // negative / refund
  trashed?: boolean
}

/* Deterministic "today" so the UI is stable */
export const NOW = new Date("2026-06-30T09:41:00")

export const PROJECTS: Project[] = [
  {
    id: "porch-yard",
    name: "Porch & Yard",
    description: "Clean up front porch and backyard. Redecorate it.",
    startDate: "2026-06-08",
    targetDate: "2026-07-22",
    status: "in-flight",
    progress: 24,
    links: ["https://pinterest.com/board/porch-ideas"],
  },
  {
    id: "kitchen-island",
    name: "Kitchen Island",
    description: "Install a new island with quartz countertop and cabinetry.",
    startDate: "2026-05-30",
    targetDate: "2026-07-10",
    status: "in-flight",
    progress: 62,
  },
  {
    id: "curb-feather",
    name: "Curb Feather",
    description: "Refresh the driveway and front walkway concrete.",
    startDate: "2026-06-01",
    status: "completed",
    progress: 100,
  },
  {
    id: "garage",
    name: "Garage Storage",
    description: "Overhead racks, wall systems and epoxy floor.",
    startDate: "2026-04-12",
    status: "completed",
    progress: 100,
  },
  {
    id: "master-bath",
    name: "Master Bath",
    description: "Walk-in shower, double vanity, heated floor.",
    startDate: "2026-03-02",
    status: "completed",
    progress: 100,
  },
  {
    id: "office",
    name: "Home Office",
    description: "Built-in desk, shelving and acoustic panels.",
    startDate: "2026-02-15",
    status: "completed",
    progress: 100,
  },
  {
    id: "deck",
    name: "Back Deck",
    description: "Composite decking and pergola.",
    startDate: "2026-01-20",
    status: "completed",
    progress: 100,
  },
  {
    id: "fence",
    name: "Perimeter Fence",
    description: "Cedar privacy fence around the yard.",
    startDate: "2025-11-08",
    status: "completed",
    progress: 100,
  },
  {
    id: "laundry",
    name: "Laundry Room",
    description: "Cabinets, folding counter and sink.",
    startDate: "2025-10-01",
    status: "completed",
    progress: 100,
  },
  {
    id: "guest-room",
    name: "Guest Room",
    description: "Paint, flooring and closet system.",
    startDate: "2025-09-12",
    status: "completed",
    progress: 100,
  },
  {
    id: "entryway",
    name: "Entryway",
    description: "Mudroom bench, hooks and tile.",
    startDate: "2025-08-20",
    status: "completed",
    progress: 100,
  },
]

export const EXPENSES: Expense[] = [
  { id: "e1", projectId: "porch-yard", name: "Artificial Grass Wall Panels", date: "2026-06-23", materials: 132.08, labor: 0, hasReceipt: true, notes: "12-Pack 20×20 in. Artificial Grass Wall Panels" },
  { id: "e2", projectId: "porch-yard", name: "Cordless Lawn Mower", date: "2026-06-22", materials: 471.31, labor: 0, hasReceipt: true },
  { id: "e3", projectId: "kitchen-island", name: "Kitchen Countertop", date: "2026-06-17", materials: 151.0, labor: 0, hasReceipt: true },
  { id: "e4", projectId: "kitchen-island", name: "Island Cabinets", date: "2026-06-17", materials: 480.0, labor: 0 },
  { id: "e5", projectId: "curb-feather", name: "Concrete Finishing Supplies", date: "2026-06-16", materials: 50.24, labor: 0 },
  { id: "e6", projectId: "porch-yard", name: "Concrete Repair Supplies", date: "2026-06-16", materials: 41.49, labor: 0, hasReceipt: true },
  { id: "e7", projectId: "porch-yard", name: "Patio Door Handle", date: "2026-06-18", materials: 44.97, labor: 0 },
  { id: "e8", projectId: "kitchen-island", name: "Plumber — Sink Hookup", date: "2026-06-14", materials: 0, labor: 220.0, notes: "2 hr labor" },
  { id: "e9", projectId: "porch-yard", name: "Outdoor String Lights", date: "2026-06-12", materials: 68.4, labor: 0, hasReceipt: true },
  { id: "e10", projectId: "kitchen-island", name: "Quartz Slab Deposit", date: "2026-06-10", materials: 1200.0, labor: 0 },
  { id: "e11", projectId: "porch-yard", name: "Returned Paint (wrong color)", date: "2026-06-09", materials: 38.5, labor: 0, isReturn: true, hasReceipt: true, notes: "Refund — wrong sheen" },
  { id: "e12", projectId: "curb-feather", name: "Concrete Mix (40 bags)", date: "2026-06-05", materials: 312.0, labor: 0, hasReceipt: true },
  { id: "e13", projectId: "kitchen-island", name: "Cabinet Hardware", date: "2026-06-04", materials: 89.75, labor: 0 },
  { id: "e14", projectId: "porch-yard", name: "Mulch & Topsoil", date: "2026-06-03", materials: 124.6, labor: 0 },
  { id: "e15", projectId: "garage", name: "Epoxy Floor Kit", date: "2026-04-20", materials: 410.0, labor: 0, hasReceipt: true },
]

/* ---------- selectors ---------- */

export const projectById = (id: string) => PROJECTS.find((p) => p.id === id)

export const expenseTotal = (e: Expense) => {
  const sum = e.materials + e.labor
  return e.isReturn ? -sum : sum
}

export const projectExpenses = (projectId: string) =>
  EXPENSES.filter((e) => e.projectId === projectId && !e.trashed)

export const projectSpend = (projectId: string) =>
  projectExpenses(projectId).reduce((acc, e) => acc + expenseTotal(e), 0)

export const totalInvested = () =>
  EXPENSES.filter((e) => !e.trashed).reduce((acc, e) => acc + expenseTotal(e), 0)

export const activeCount = () => PROJECTS.filter((p) => p.status === "in-flight").length

export const daysUntil = (iso?: string) => {
  if (!iso) return null
  const d = new Date(iso + "T00:00:00")
  const diff = Math.ceil((d.getTime() - NOW.getTime()) / 86400000)
  return diff
}

export const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
