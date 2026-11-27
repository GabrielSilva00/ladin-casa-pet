export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mt-10 border border-osso/15 corner-chamfer-sm p-10 text-center bg-osso/5">
      <h3 className="font-display text-[22px] text-osso">{title}</h3>
      {hint ? <p className="mt-2 font-sans text-[14px] text-osso/60">{hint}</p> : null}
    </div>
  );
}

export function AdminHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-6 border-b border-osso/10 pb-6">
      <div>
        <div className="font-sans text-[10px] uppercase font-semibold tracking-wider2 text-mate">({eyebrow})</div>
        <h1 className="mt-2 font-display text-[clamp(32px,4vw,52px)] text-osso">{title}</h1>
      </div>
      {action}
    </header>
  );
}
