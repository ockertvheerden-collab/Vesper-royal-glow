import { create } from "zustand";
import { CHARACTERS } from "@/data/characters";

type ArchiveState = {
  selectedId: string | null;
  hoveredId: string | null;
  interacting: boolean;
  cameraBusy: boolean;
  sceneReady: boolean;
  autoRotate: boolean;
  reducedMotion: boolean;
  setSelected: (id: string | null) => void;
  setHovered: (id: string | null) => void;
  setInteracting: (value: boolean) => void;
  setCameraBusy: (value: boolean) => void;
  setSceneReady: (value: boolean) => void;
  setAutoRotate: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  cycle: (dir: 1 | -1) => void;
};

export const useArchive = create<ArchiveState>((set, get) => ({
  selectedId: null,
  hoveredId: null,
  interacting: false,
  cameraBusy: false,
  sceneReady: false,
  autoRotate: true,
  reducedMotion: false,
  setSelected: (id) => set({ selectedId: id }),
  setHovered: (id) => set({ hoveredId: id }),
  setInteracting: (value) => set({ interacting: value }),
  setCameraBusy: (value) => set({ cameraBusy: value }),
  setSceneReady: (value) => set({ sceneReady: value }),
  setAutoRotate: (value) => set({ autoRotate: value }),
  setReducedMotion: (value) =>
    set({ reducedMotion: value, autoRotate: value ? false : get().autoRotate }),
  cycle: (dir) => {
    const ids = CHARACTERS.map((c) => c.id);
    const current = get().selectedId;
    const i = current ? ids.indexOf(current) : dir === 1 ? -1 : 0;
    const next = ids[(i + dir + ids.length) % ids.length];
    if (next) set({ selectedId: next });
  },
}));
