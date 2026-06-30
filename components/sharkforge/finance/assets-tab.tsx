"use client"

import { ASSET_GROUPS, fmt, sum } from "./data"
import { GroupCard, RowActions, TabHeader } from "./parts"

export function AssetsTab({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <TabHeader eyebrow="Portfolio" title="Assets & Holdings" addLabel="Add asset" onAdd={onAdd} />

      {ASSET_GROUPS.map((g) => (
        <GroupCard key={g.category} category={g.category} total={fmt(sum(g.items))}>
          {g.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-semibold text-foreground">{item.name}</p>
                {item.sub ? <p className="truncate text-[0.8125rem] text-muted-foreground">{item.sub}</p> : null}
              </div>
              <span className="sf-num shrink-0 text-[0.9375rem] font-semibold text-primary">{fmt(item.value)}</span>
              <RowActions />
            </div>
          ))}
        </GroupCard>
      ))}
    </div>
  )
}
