import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { E as MathUtils, G as require_jsx_runtime, N as SRGBColorSpace, V as Vector3, a as useTexture, c as useCursor, d as useFrame, f as useThree, i as OrbitControls, l as Canvas, n as Stars, o as Line, r as ContactShadows, s as Billboard, t as Sparkles } from "../_libs/@react-three/drei+[...].mjs";
import { a as getRingPosition, i as RING_RADIUS, n as useArchive, r as CHARACTERS } from "./routes-NcvQO8s8.mjs";
import { n as EffectComposer, r as Vignette, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CharacterScene-ZsbfkwxX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OVERVIEW_POS = new Vector3(0, 2.55, 13.6);
var OVERVIEW_TARGET = new Vector3(0, .18, 0);
function CoreShard() {
	const group = (0, import_react.useRef)(null);
	useFrame((state, delta) => {
		const d = Math.min(delta, .1);
		const g = group.current;
		if (!g) return;
		g.rotation.y += d * .18;
		g.position.y = Math.sin(state.clock.elapsedTime * .7) * .08;
		g.rotation.z = Math.sin(state.clock.elapsedTime * .35) * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.78, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c5cdd4",
				roughness: .22,
				metalness: .58,
				emissive: "#8ea0ae",
				emissiveIntensity: .28
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: .58,
				rotation: [
					.72,
					.4,
					.18
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.78, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#9eafbc",
					roughness: .16,
					metalness: .42,
					transparent: true,
					opacity: .55,
					emissive: "#b8c4ce",
					emissiveIntensity: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: "#b8c4ce",
				intensity: 2.2,
				distance: 12
			})
		]
	});
}
function StageRing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.15,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				RING_RADIUS - .22,
				RING_RADIUS + .18,
				96
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#b8c4ce",
				transparent: true,
				opacity: .22,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.15,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				2.1,
				2.22,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#9eb4c8",
				transparent: true,
				opacity: .28,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.16,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [2.05, 64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#101214",
				transparent: true,
				opacity: .55
			})]
		})
	] });
}
function ConstellationLines() {
	const ring = (0, import_react.useMemo)(() => {
		const pts = CHARACTERS.map((_, i) => new Vector3(...getRingPosition(i)));
		pts.push(pts[0].clone());
		return pts;
	}, []);
	const radials = (0, import_react.useMemo)(() => CHARACTERS.map((_, i) => [new Vector3(0, 0, 0), new Vector3(...getRingPosition(i))]), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: ring,
		color: "#b8c4ce",
		transparent: true,
		opacity: .16,
		lineWidth: 1
	}), radials.map((pts, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: pts,
		color: "#9eb4c8",
		transparent: true,
		opacity: .07,
		lineWidth: 1
	}, CHARACTERS[i].id))] });
}
function LightBeams() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: CHARACTERS.map((c, i) => {
		const [x, y, z] = getRingPosition(i);
		const h = y + 1.15;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				-1.15 + h / 2,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.012,
				.012,
				h,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: c.glow,
				transparent: true,
				opacity: .18
			})]
		}, c.id);
	}) });
}
function CharacterMarker({ character, index }) {
	const texture = useTexture(character.portrait);
	texture.colorSpace = SRGBColorSpace;
	const selectedId = useArchive((s) => s.selectedId);
	const hoveredId = useArchive((s) => s.hoveredId);
	const setSelected = useArchive((s) => s.setSelected);
	const setHovered = useArchive((s) => s.setHovered);
	const selected = selectedId === character.id;
	const hovered = hoveredId === character.id;
	const active = selected || hovered;
	useCursor(hovered);
	const group = (0, import_react.useRef)(null);
	const [x, y, z] = getRingPosition(index);
	useFrame((state) => {
		const g = group.current;
		if (!g) return;
		const bob = Math.sin(state.clock.elapsedTime * .8 + index) * .06;
		g.position.y = y + bob;
		const target = active ? 1.16 : 1;
		g.scale.setScalar(MathUtils.lerp(g.scale.x, target, .12));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		position: [
			x,
			y,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Billboard, {
			follow: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-.04
					],
					scale: 1.85,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.72, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: character.glow,
						transparent: true,
						opacity: active ? .28 : .12,
						blending: 2,
						depthWrite: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					onPointerOver: (e) => {
						e.stopPropagation();
						setHovered(character.id);
					},
					onPointerOut: () => setHovered(null),
					onClick: (e) => {
						e.stopPropagation();
						setSelected(selected ? null : character.id);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.74, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: texture,
						roughness: .55,
						metalness: .05
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					scale: 1.02,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
						.76,
						.86,
						48
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: character.glow,
						transparent: true,
						opacity: active ? .95 : .5,
						side: 2
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.95,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.08,
				.14,
				.12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c2024",
				metalness: .4,
				roughness: .4
			})]
		})]
	});
}
function CameraRig() {
	const { camera, controls } = useThree();
	const selectedId = useArchive((s) => s.selectedId);
	const reducedMotion = useArchive((s) => s.reducedMotion);
	const setCameraBusy = useArchive((s) => s.setCameraBusy);
	const progress = (0, import_react.useRef)(1);
	const fromPos = (0, import_react.useRef)(new Vector3());
	const fromTarget = (0, import_react.useRef)(new Vector3());
	const toPos = (0, import_react.useRef)(new Vector3());
	const toTarget = (0, import_react.useRef)(new Vector3());
	(0, import_react.useEffect)(() => {
		const c = controls;
		if (!c) return;
		fromPos.current.copy(camera.position);
		fromTarget.current.copy(c.target);
		const index = CHARACTERS.findIndex((ch) => ch.id === selectedId);
		if (index >= 0) {
			const [x, y, z] = getRingPosition(index);
			const len = Math.hypot(x, z) || 1;
			const dist = 3.85;
			toTarget.current.set(x, y, z);
			toPos.current.set(x + x / len * dist, y + .42, z + z / len * dist);
		} else {
			toPos.current.copy(OVERVIEW_POS);
			toTarget.current.copy(OVERVIEW_TARGET);
		}
		progress.current = 0;
		setCameraBusy(true);
	}, [
		selectedId,
		camera,
		controls,
		setCameraBusy
	]);
	useFrame((_, delta) => {
		const c = controls;
		if (!c || progress.current >= 1) return;
		const dur = reducedMotion ? .05 : 1.15;
		progress.current = Math.min(1, progress.current + Math.min(delta, .1) / dur);
		const k = 1 - (1 - progress.current) ** 3;
		camera.position.lerpVectors(fromPos.current, toPos.current, k);
		c.target.lerpVectors(fromTarget.current, toTarget.current, k);
		c.update();
		if (progress.current >= 1) setCameraBusy(false);
	});
	return null;
}
function SceneContents() {
	const selectedId = useArchive((s) => s.selectedId);
	const interacting = useArchive((s) => s.interacting);
	const cameraBusy = useArchive((s) => s.cameraBusy);
	const autoRotate = useArchive((s) => s.autoRotate);
	const reducedMotion = useArchive((s) => s.reducedMotion);
	const setInteracting = useArchive((s) => s.setInteracting);
	const timer = (0, import_react.useRef)(null);
	const spinning = autoRotate && !interacting && !selectedId && !reducedMotion && !cameraBusy;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#070809"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#070809",
				11,
				30
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .22 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d7dde4",
			"#16181c",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				6,
				10,
				5
			],
			intensity: .85,
			color: "#e8ecef"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-7,
				4,
				-4
			],
			intensity: .25,
			color: "#9eb4c8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 42,
			depth: 28,
			count: 1800,
			factor: 2.6,
			saturation: 0,
			fade: true,
			speed: .35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			count: 48,
			scale: 14,
			size: 2.2,
			speed: .28,
			opacity: .35,
			color: "#b8c4ce"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreShard, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRing, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConstellationLines, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightBeams, {}),
		CHARACTERS.map((character, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterMarker, {
			character,
			index
		}, character.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-1.22,
				0
			],
			opacity: .38,
			scale: 22,
			blur: 2.4,
			far: 7,
			color: "#000000"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			enablePan: false,
			enableDamping: true,
			dampingFactor: .08,
			minDistance: 5.5,
			maxDistance: 20,
			minPolarAngle: Math.PI / 3.1,
			maxPolarAngle: Math.PI / 2.08,
			autoRotate: spinning,
			autoRotateSpeed: .55,
			rotateSpeed: .68,
			zoomSpeed: .65,
			onStart: () => {
				if (timer.current) window.clearTimeout(timer.current);
				setInteracting(true);
			},
			onEnd: () => {
				if (timer.current) window.clearTimeout(timer.current);
				timer.current = window.setTimeout(() => setInteracting(false), 2200);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, {
			enableNormalPass: false,
			multisampling: 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
				luminanceThreshold: .72,
				luminanceSmoothing: .28,
				intensity: .42,
				mipmapBlur: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
				eskil: false,
				offset: .28,
				darkness: .58
			})]
		})
	] });
}
function CharacterScene() {
	const dragged = (0, import_react.useRef)(false);
	const setSelected = useArchive((s) => s.setSelected);
	const setSceneReady = useArchive((s) => s.setSceneReady);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "h-full w-full touch-none",
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		},
		camera: {
			position: [
				0,
				2.55,
				13.6
			],
			fov: 42,
			near: .1,
			far: 80
		},
		onCreated: () => setSceneReady(true),
		onPointerDown: () => {
			dragged.current = false;
		},
		onPointerMove: (e) => {
			if (e.buttons) dragged.current = true;
		},
		onPointerMissed: () => {
			if (!dragged.current) setSelected(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneContents, {})
		})
	});
}
//#endregion
export { CharacterScene };
