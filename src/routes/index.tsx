import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useSyncExternalStore } from "react";
import { ArchiveOverlay } from "@/components/overlay/ArchiveOverlay";
import { useArchive } from "@/store/archive";

export const Route = createFileRoute("/")({ component: Home });

const scenePromise = import("@/components/scene/CharacterScene");
const CharacterScene = lazy(() => scenePromise);

function BootScreen() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg">
      <div className="text-center">
        <p className="font-display text-3xl font-medium tracking-tight text-fg">Vesper</p>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted">Gathering the circle</p>
      </div>
    </div>
  );
}

function subscribe() {
  return () => {};
}

function Home() {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const sceneReady = useArchive((s) => s.sceneReady);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      {isClient ? (
        <Suspense fallback={null}>
          <CharacterScene />
        </Suspense>
      ) : null}
      {!sceneReady ? <BootScreen /> : null}
      <ArchiveOverlay />
    </main>
  );
}
