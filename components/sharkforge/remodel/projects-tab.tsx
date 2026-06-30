"use client"

import { useMemo, useState } from "react"
import { Search, Plus } from "lucide-react"
import { ProjectCard, ChipRow, SortRow } from "./parts"
import { EmptyState } from "../ui-kit"
import { Hammer } from "lucide-react"
import { PROJECTS, projectSpend, projectExpenses, type Project } from "./data"

const FILTERS = ["All", "Active", "Completed", "With Expenses", "No Expenses"]
const SORTS = ["Newest", "Name A→Z", "Most Spent", "Least Spent", "Earliest Start"]

export function ProjectsTab({
  onNewProject,
  onOpenProject,
}: {
  onNewProject: () => void
  onOpenProject: (p: Project) => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("Active")
  const [sort, setSort] = useState("Newest")

  const list = useMemo(() => {
    let r = [...PROJECTS]
    const q = query.trim().toLowerCase()
    if (q) r = r.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    if (filter === "Active") r = r.filter((p) => p.status === "in-flight")
    else if (filter === "Completed") r = r.filter((p) => p.status === "completed")
    else if (filter === "With Expenses") r = r.filter((p) => projectExpenses(p.id).length > 0)
    else if (filter === "No Expenses") r = r.filter((p) => projectExpenses(p.id).length === 0)

    switch (sort) {
      case "Name A→Z":
        r.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "Most Spent":
        r.sort((a, b) => projectSpend(b.id) - projectSpend(a.id))
        break
      case "Least Spent":
        r.sort((a, b) => projectSpend(a.id) - projectSpend(b.id))
        break
      case "Earliest Start":
        r.sort((a, b) => a.startDate.localeCompare(b.startDate))
        break
      default:
        r.sort((a, b) => b.startDate.localeCompare(a.startDate))
    }
    return r
  }, [query, filter, sort])

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="sf-eyebrow">Projects</p>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{PROJECTS.length} builds</h2>
        </div>
        <button
          type="button"
          onClick={onNewProject}
          className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-95"
        >
          <Plus className="size-3.5" />
          New
        </button>
      </div>

      {/* search */}
      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <ChipRow options={FILTERS} value={filter} onChange={setFilter} />
      <SortRow options={SORTS} value={sort} onChange={setSort} />

      <div key={`${filter}-${sort}-${query}`} className="sf-animate-rise space-y-3 pt-1">
        {list.length === 0 ? (
          <EmptyState
            icon={<Hammer className="size-6" />}
            title="No projects found"
            description="Try a different filter or start a new build."
            action="New Project"
            onAction={onNewProject}
          />
        ) : (
          list.map((p) => <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />)
        )}
      </div>
    </div>
  )
}
