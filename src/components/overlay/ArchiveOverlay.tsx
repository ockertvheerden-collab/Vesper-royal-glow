import { Pause, Play, X } from "lucide-react";
import { useEffect } from "react";
import { CHARACTERS } from "@/data/characters";
import { cn } from "@/lib/utils";
import { useArchive } from "@/store/archive";
import { Button } from "@/components/ui/button";

function CircleMark({ className }: { className?: string }) {
  const ticks = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: 16 + Math.cos(a) * 8.4,
      y1: 16 + Math.sin(a) * 8.4,
      x2: 16 + Math.cos(a) * 11.1,
      y2: 16 + Math.sin(a) * 11.1,
    };
  });

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
      {ticks.map((t) => (
        <line
          key={`${t.x1}-${t.y1}`}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function RosterItem({
  id,
  compact,
}: {
  id: string;
  compact?: boolean;
}) {
  const character = CHARACTERS.find((c) => c.id === id);
  const selectedId = useArchive((s) => s.selectedId);
  const hoveredId = useArchive((s) => s.hoveredId);
  const setSelected = useArchive((s) => s.setSelected);
  const setHovered = useArchive((s) => s.setHovered);
  if (!character) return null;
  const active = selectedId === character.id;
  const lit = active || hoveredId === character.id;

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => setSelected(active ? null : character.id)}
        className={cn(
          "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-opacity",
          lit ? "border-accent opacity-100" : "border-border opacity-80",
        )}
        aria-pressed={active}
        aria-label={character.name}
      >
        <img
          src={character.portrait}
          alt=""
          className="size-full object-cover"
          crossOrigin="anonymous"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setSelected(active ? null : character.id)}
      onMouseEnter={() => setHovered(character.id)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
        active ? "bg-surface-2" : "hover:bg-surface-2/70",
      )}
      aria-pressed={active}
    >
      <span
        className={cn(
          "size-11 overflow-hidden rounded-full border",
          lit ? "border-accent" : "border-border",
        )}
      >
        <img
          src={character.portrait}
          alt=""
          className="size-full object-cover"
          crossOrigin="anonymous"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium text-fg">{character.name}</span>
        <span className="block truncate text-xs uppercase tracking-widest text-muted">
          {character.role}
        </span>
      </span>
    </button>
  );
}

function Dossier() {
  const selectedId = useArchive((s) => s.selectedId);
  const setSelected = useArchive((s) => s.setSelected);
  const character = CHARACTERS.find((c) => c.id === selectedId);
  if (!character) return null;

  return (
    <aside
      className="pointer-events-auto flex w-full flex-col gap-4 rounded-xl border border-border bg-surface p-5 md:max-w-sm"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{character.role}</p>
          <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-fg">
            {character.name}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 shrink-0"
          onClick={() => setSelected(null)}
          aria-label="Close dossier"
        >
          <X className="size-4" />
        </Button>
      </div>
      <p className="text-sm leading-relaxed text-muted">{character.bio}</p>
      <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Origin</dt>
          <dd className="mt-1 text-fg">{character.origin}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Affinity</dt>
          <dd className="mt-1 text-fg">{character.affinity}</dd>
        </div>
      </dl>
    </aside>
  );
}

export function ArchiveOverlay() {
  const selectedId = useArchive((s) => s.selectedId);
  const autoRotate = useArchive((s) => s.autoRotate);
  const interacting = useArchive((s) => s.interacting);
  const reducedMotion = useArchive((s) => s.reducedMotion);
  const setAutoRotate = useArchive((s) => s.setAutoRotate);
  const setSelected = useArchive((s) => s.setSelected);
  const cycle = useArchive((s) => s.cycle);
  const setReducedMotion = useArchive((s) => s.setReducedMotion);
  const spinning = autoRotate && !interacting && !selectedId && !reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setReducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") cycle(1);
      if (e.key === "ArrowLeft") cycle(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle, setSelected]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 pb-20 md:p-6 md:pb-16">
      <header className="flex items-start justify-between gap-4">
        <div className="pointer-events-auto flex items-center gap-3">
          <CircleMark className="size-8 text-accent" />
          <div>
            <p className="font-display text-xl font-medium tracking-tight text-fg md:text-2xl">
              Vesper
            </p>
            <p className="text-xs uppercase tracking-widest text-muted">The last circle of names</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="pointer-events-auto rounded-md"
          onClick={() => setAutoRotate(!autoRotate)}
          aria-pressed={spinning}
        >
          {spinning ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          <span className="hidden sm:inline">{spinning ? "Orbiting" : "Paused"}</span>
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 pt-4 md:flex-row md:items-stretch">
        <section className="pointer-events-auto hidden w-64 shrink-0 flex-col md:flex">
          <p className="mb-3 text-xs uppercase tracking-widest text-subtle">Featured in the circle</p>
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-2">
            {CHARACTERS.map((c) => (
              <RosterItem key={c.id} id={c.id} />
            ))}
          </div>
        </section>

        <div className="flex flex-1 flex-col items-end justify-end md:justify-center">
          {selectedId ? (
            <div className="w-full md:w-auto">
              <Dossier />
            </div>
          ) : null}
        </div>
      </div>

      <footer className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <p className="hidden text-xs text-subtle md:block">
          Drag to orbit · Click a portrait to focus · Esc to step back
        </p>
        <div className="pointer-events-auto md:hidden">
          <p className="mb-2 text-xs uppercase tracking-widest text-subtle">Featured</p>
          <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-border bg-surface p-2">
            {CHARACTERS.map((c) => (
              <RosterItem key={c.id} id={c.id} compact />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
