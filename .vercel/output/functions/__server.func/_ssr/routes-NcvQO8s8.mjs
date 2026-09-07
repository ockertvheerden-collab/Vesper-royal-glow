import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { G as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { i as Pause, r as Play, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NcvQO8s8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var RING_RADIUS = 6.45;
var CHARACTERS = [
	{
		id: "kael",
		name: "Kael Voss",
		role: "Pathfinder",
		origin: "The Wind Roads",
		affinity: "Ashlight",
		portrait: "/portraits/kael.jpg",
		glow: "#a8b7c4",
		bio: "Walks the Wind Roads mapping storms that eat the mile-markers. He keeps a dead compass because the needle still trembles before weather that has not arrived."
	},
	{
		id: "iri",
		name: "Iri Solenne",
		role: "Cartographer",
		origin: "The Quiet Sheets",
		affinity: "Stillwater",
		portrait: "/portraits/iri.jpg",
		glow: "#9aabb8",
		bio: "Draws maps of places that refuse to stay still. Her sheets are quiet; the ink is not. She records silence the way other people record rivers."
	},
	{
		id: "wren",
		name: "Wren Hale",
		role: "Blade-keeper",
		origin: "The Threshold",
		affinity: "Iron hush",
		portrait: "/portraits/wren.jpg",
		glow: "#c5c8cc",
		bio: "Holds the last unnamed blade in the Circle. They speak little, count everything, and stand where a door used to be until someone else is ready to."
	},
	{
		id: "sable",
		name: "Sable Quen",
		role: "Archivist",
		origin: "The Uncopied Book",
		affinity: "Inkgrain",
		portrait: "/portraits/sable.jpg",
		glow: "#b7c2c8",
		bio: "Keeps the names that would otherwise thin into rumor. She writes in a book that cannot be copied, only sat with, and she never hurries a sentence."
	},
	{
		id: "nox",
		name: "Nox Arden",
		role: "Night medic",
		origin: "The Late Infirmary",
		affinity: "Cool embers",
		portrait: "/portraits/nox.jpg",
		glow: "#9eaea8",
		bio: "Works the hours when pain is loudest and language is thin. He mends what the dusk unravels, then sits until morning without asking for thanks."
	},
	{
		id: "lyra",
		name: "Lyra Finch",
		role: "Wind-runner",
		origin: "The High Cold",
		affinity: "Gale thread",
		portrait: "/portraits/lyra.jpg",
		glow: "#b4c0c9",
		bio: "Carries messages across the high cold. She treats distance as a kind of weather: something you dress for, not something you fear."
	},
	{
		id: "oren",
		name: "Oren Vale",
		role: "Stone-singer",
		origin: "The Last Span",
		affinity: "Bedrock",
		portrait: "/portraits/oren.jpg",
		glow: "#b8b3a8",
		bio: "Listens to masonry until it tells him where it will fail. He hums to bridges. They last longer than they should, and he never calls it magic."
	},
	{
		id: "mira",
		name: "Mira Chen",
		role: "Signal-seer",
		origin: "The Listening Post",
		affinity: "Static",
		portrait: "/portraits/mira.jpg",
		glow: "#a7b4c2",
		bio: "Tends the last listening post on the dusk line. She hears names in static and knows which ones are still walking, which have only been remembered."
	}
];
function getRingPosition(index) {
	const t = index / CHARACTERS.length * Math.PI * 2 - Math.PI / 2;
	const y = Math.sin(index * 1.15) * .42;
	return [
		Math.cos(t) * RING_RADIUS,
		y,
		Math.sin(t) * RING_RADIUS
	];
}
var useArchive = create((set, get) => ({
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
	setReducedMotion: (value) => set({
		reducedMotion: value,
		autoRotate: value ? false : get().autoRotate
	}),
	cycle: (dir) => {
		const ids = CHARACTERS.map((c) => c.id);
		const current = get().selectedId;
		const next = ids[((current ? ids.indexOf(current) : dir === 1 ? -1 : 0) + dir + ids.length) % ids.length];
		if (next) set({ selectedId: next });
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-opacity disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			subtle: "bg-surface-2 text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function CircleMark({ className }) {
	const ticks = Array.from({ length: 8 }, (_, i) => {
		const a = i / 8 * Math.PI * 2 - Math.PI / 2;
		return {
			x1: 16 + Math.cos(a) * 8.4,
			y1: 16 + Math.sin(a) * 8.4,
			x2: 16 + Math.cos(a) * 11.1,
			y2: 16 + Math.sin(a) * 11.1
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "11.2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "2.1",
				fill: "currentColor"
			}),
			ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: t.x1,
				y1: t.y1,
				x2: t.x2,
				y2: t.y2,
				stroke: "currentColor",
				strokeWidth: "1.3",
				strokeLinecap: "round"
			}, `${t.x1}-${t.y1}`))
		]
	});
}
function RosterItem({ id, compact }) {
	const character = CHARACTERS.find((c) => c.id === id);
	const selectedId = useArchive((s) => s.selectedId);
	const hoveredId = useArchive((s) => s.hoveredId);
	const setSelected = useArchive((s) => s.setSelected);
	const setHovered = useArchive((s) => s.setHovered);
	if (!character) return null;
	const active = selectedId === character.id;
	const lit = active || hoveredId === character.id;
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setSelected(active ? null : character.id),
		className: cn("flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-opacity", lit ? "border-accent opacity-100" : "border-border opacity-80"),
		"aria-pressed": active,
		"aria-label": character.name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: character.portrait,
			alt: "",
			className: "size-full object-cover",
			crossOrigin: "anonymous"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setSelected(active ? null : character.id),
		onMouseEnter: () => setHovered(character.id),
		onMouseLeave: () => setHovered(null),
		className: cn("flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors", active ? "bg-surface-2" : "hover:bg-surface-2/70"),
		"aria-pressed": active,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-11 overflow-hidden rounded-full border", lit ? "border-accent" : "border-border"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: character.portrait,
				alt: "",
				className: "size-full object-cover",
				crossOrigin: "anonymous"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-medium text-fg",
				children: character.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs uppercase tracking-widest text-muted",
				children: character.role
			})]
		})]
	});
}
function Dossier() {
	const selectedId = useArchive((s) => s.selectedId);
	const setSelected = useArchive((s) => s.setSelected);
	const character = CHARACTERS.find((c) => c.id === selectedId);
	if (!character) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto flex w-full flex-col gap-4 rounded-xl border border-border bg-surface p-5 md:max-w-sm",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: character.role
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-medium tracking-tight text-fg",
					children: character.name
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-10 shrink-0",
					onClick: () => setSelected(null),
					"aria-label": "Close dossier",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: character.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs uppercase tracking-widest text-subtle",
					children: "Origin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-fg",
					children: character.origin
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs uppercase tracking-widest text-subtle",
					children: "Affinity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-fg",
					children: character.affinity
				})] })]
			})
		]
	});
}
function ArchiveOverlay() {
	const selectedId = useArchive((s) => s.selectedId);
	const autoRotate = useArchive((s) => s.autoRotate);
	const interacting = useArchive((s) => s.interacting);
	const reducedMotion = useArchive((s) => s.reducedMotion);
	const setAutoRotate = useArchive((s) => s.setAutoRotate);
	const setSelected = useArchive((s) => s.setSelected);
	const cycle = useArchive((s) => s.cycle);
	const setReducedMotion = useArchive((s) => s.setReducedMotion);
	const spinning = autoRotate && !interacting && !selectedId && !reducedMotion;
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReducedMotion(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [setReducedMotion]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setSelected(null);
			if (e.key === "ArrowRight") cycle(1);
			if (e.key === "ArrowLeft") cycle(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [cycle, setSelected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 pb-20 md:p-6 md:pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMark, { className: "size-8 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-medium tracking-tight text-fg md:text-2xl",
						children: "Vesper"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						children: "The last circle of names"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "pointer-events-auto rounded-md",
					onClick: () => setAutoRotate(!autoRotate),
					"aria-pressed": spinning,
					children: [spinning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: spinning ? "Orbiting" : "Paused"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col justify-between gap-4 pt-4 md:flex-row md:items-stretch",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pointer-events-auto hidden w-64 shrink-0 flex-col md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs uppercase tracking-widest text-subtle",
						children: "Featured in the circle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1 rounded-xl border border-border bg-surface p-2",
						children: CHARACTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterItem, { id: c.id }, c.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 flex-col items-end justify-end md:justify-center",
					children: selectedId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full md:w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dossier, {})
					}) : null
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-xs text-subtle md:block",
					children: "Drag to orbit · Click a portrait to focus · Esc to step back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs uppercase tracking-widest text-subtle",
						children: "Featured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 overflow-x-auto rounded-xl border border-border bg-surface p-2",
						children: CHARACTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterItem, {
							id: c.id,
							compact: true
						}, c.id))
					})]
				})]
			})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var scenePromise = import("./CharacterScene-ZsbfkwxX.mjs");
var CharacterScene = (0, import_react.lazy)(() => scenePromise);
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-medium tracking-tight text-fg",
				children: "Vesper"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs uppercase tracking-widest text-muted",
				children: "Gathering the circle"
			})]
		})
	});
}
function subscribe() {
	return () => {};
}
function Home() {
	const isClient = (0, import_react.useSyncExternalStore)(subscribe, () => true, () => false);
	const sceneReady = useArchive((s) => s.sceneReady);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterScene, {})
			}) : null,
			!sceneReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveOverlay, {})
		]
	});
}
//#endregion
export { getRingPosition as a, RING_RADIUS as i, useArchive as n, CHARACTERS as r, routes_exports as t };
