export type Character = {
  id: string;
  name: string;
  role: string;
  origin: string;
  affinity: string;
  portrait: string;
  glow: string;
  bio: string;
};

export const RING_RADIUS = 6.45;

export const CHARACTERS: Character[] = [
  {
    id: "kael",
    name: "Kael Voss",
    role: "Pathfinder",
    origin: "The Wind Roads",
    affinity: "Ashlight",
    portrait: "/portraits/kael.jpg",
    glow: "#a8b7c4",
    bio: "Walks the Wind Roads mapping storms that eat the mile-markers. He keeps a dead compass because the needle still trembles before weather that has not arrived.",
  },
  {
    id: "iri",
    name: "Iri Solenne",
    role: "Cartographer",
    origin: "The Quiet Sheets",
    affinity: "Stillwater",
    portrait: "/portraits/iri.jpg",
    glow: "#9aabb8",
    bio: "Draws maps of places that refuse to stay still. Her sheets are quiet; the ink is not. She records silence the way other people record rivers.",
  },
  {
    id: "wren",
    name: "Wren Hale",
    role: "Blade-keeper",
    origin: "The Threshold",
    affinity: "Iron hush",
    portrait: "/portraits/wren.jpg",
    glow: "#c5c8cc",
    bio: "Holds the last unnamed blade in the Circle. They speak little, count everything, and stand where a door used to be until someone else is ready to.",
  },
  {
    id: "sable",
    name: "Sable Quen",
    role: "Archivist",
    origin: "The Uncopied Book",
    affinity: "Inkgrain",
    portrait: "/portraits/sable.jpg",
    glow: "#b7c2c8",
    bio: "Keeps the names that would otherwise thin into rumor. She writes in a book that cannot be copied, only sat with, and she never hurries a sentence.",
  },
  {
    id: "nox",
    name: "Nox Arden",
    role: "Night medic",
    origin: "The Late Infirmary",
    affinity: "Cool embers",
    portrait: "/portraits/nox.jpg",
    glow: "#9eaea8",
    bio: "Works the hours when pain is loudest and language is thin. He mends what the dusk unravels, then sits until morning without asking for thanks.",
  },
  {
    id: "lyra",
    name: "Lyra Finch",
    role: "Wind-runner",
    origin: "The High Cold",
    affinity: "Gale thread",
    portrait: "/portraits/lyra.jpg",
    glow: "#b4c0c9",
    bio: "Carries messages across the high cold. She treats distance as a kind of weather: something you dress for, not something you fear.",
  },
  {
    id: "oren",
    name: "Oren Vale",
    role: "Stone-singer",
    origin: "The Last Span",
    affinity: "Bedrock",
    portrait: "/portraits/oren.jpg",
    glow: "#b8b3a8",
    bio: "Listens to masonry until it tells him where it will fail. He hums to bridges. They last longer than they should, and he never calls it magic.",
  },
  {
    id: "mira",
    name: "Mira Chen",
    role: "Signal-seer",
    origin: "The Listening Post",
    affinity: "Static",
    portrait: "/portraits/mira.jpg",
    glow: "#a7b4c2",
    bio: "Tends the last listening post on the dusk line. She hears names in static and knows which ones are still walking, which have only been remembered.",
  },
];

export function getRingPosition(index: number): [number, number, number] {
  const n = CHARACTERS.length;
  const t = (index / n) * Math.PI * 2 - Math.PI / 2;
  const y = Math.sin(index * 1.15) * 0.42;
  return [Math.cos(t) * RING_RADIUS, y, Math.sin(t) * RING_RADIUS];
}

export function characterIndex(id: string) {
  return CHARACTERS.findIndex((c) => c.id === id);
}
