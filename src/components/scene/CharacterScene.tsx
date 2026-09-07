import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  ContactShadows,
  Line,
  OrbitControls,
  Sparkles,
  Stars,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  CHARACTERS,
  RING_RADIUS,
  getRingPosition,
  type Character,
} from "@/data/characters";
import { useArchive } from "@/store/archive";

const OVERVIEW_POS = new THREE.Vector3(0, 2.55, 13.6);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0.18, 0);

type OrbitHandle = {
  target: THREE.Vector3;
  enabled: boolean;
  update: () => void;
};

function CoreShard() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    const g = group.current;
    if (!g) return;
    g.rotation.y += d * 0.18;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#c5cdd4"
          roughness={0.22}
          metalness={0.58}
          emissive="#8ea0ae"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh scale={0.58} rotation={[0.72, 0.4, 0.18]}>
        <icosahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#9eafbc"
          roughness={0.16}
          metalness={0.42}
          transparent
          opacity={0.55}
          emissive="#b8c4ce"
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight color="#b8c4ce" intensity={2.2} distance={12} />
    </group>
  );
}

function StageRing() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <ringGeometry args={[RING_RADIUS - 0.22, RING_RADIUS + 0.18, 96]} />
        <meshBasicMaterial
          color="#b8c4ce"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <ringGeometry args={[2.1, 2.22, 64]} />
        <meshBasicMaterial
          color="#9eb4c8"
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]}>
        <circleGeometry args={[2.05, 64]} />
        <meshBasicMaterial color="#101214" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function ConstellationLines() {
  const ring = useMemo(() => {
    const pts = CHARACTERS.map((_, i) => new THREE.Vector3(...getRingPosition(i)));
    pts.push(pts[0]!.clone());
    return pts;
  }, []);

  const radials = useMemo(
    () => CHARACTERS.map((_, i) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...getRingPosition(i))]),
    [],
  );

  return (
    <group>
      <Line points={ring} color="#b8c4ce" transparent opacity={0.16} lineWidth={1} />
      {radials.map((pts, i) => (
        <Line
          key={CHARACTERS[i]!.id}
          points={pts}
          color="#9eb4c8"
          transparent
          opacity={0.07}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function LightBeams() {
  return (
    <group>
      {CHARACTERS.map((c, i) => {
        const [x, y, z] = getRingPosition(i);
        const h = y + 1.15;
        return (
          <mesh key={c.id} position={[x, -1.15 + h / 2, z]}>
            <cylinderGeometry args={[0.012, 0.012, h, 8]} />
            <meshBasicMaterial color={c.glow} transparent opacity={0.18} />
          </mesh>
        );
      })}
    </group>
  );
}

function CharacterMarker({ character, index }: { character: Character; index: number }) {
  const texture = useTexture(character.portrait);
  texture.colorSpace = THREE.SRGBColorSpace;
  const selectedId = useArchive((s) => s.selectedId);
  const hoveredId = useArchive((s) => s.hoveredId);
  const setSelected = useArchive((s) => s.setSelected);
  const setHovered = useArchive((s) => s.setHovered);
  const selected = selectedId === character.id;
  const hovered = hoveredId === character.id;
  const active = selected || hovered;
  useCursor(hovered);
  const group = useRef<THREE.Group>(null);
  const [x, y, z] = getRingPosition(index);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const bob = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.06;
    g.position.y = y + bob;
    const target = active ? 1.16 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, 0.12));
  });

  return (
    <group ref={group} position={[x, y, z]}>
      <Billboard follow>
        <mesh position={[0, 0, -0.04]} scale={1.85}>
          <circleGeometry args={[0.72, 48]} />
          <meshBasicMaterial
            color={character.glow}
            transparent
            opacity={active ? 0.28 : 0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(character.id);
          }}
          onPointerOut={() => setHovered(null)}
          onClick={(e) => {
            e.stopPropagation();
            setSelected(selected ? null : character.id);
          }}
        >
          <circleGeometry args={[0.74, 48]} />
          <meshStandardMaterial map={texture} roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh scale={1.02}>
          <ringGeometry args={[0.76, 0.86, 48]} />
          <meshBasicMaterial
            color={character.glow}
            transparent
            opacity={active ? 0.95 : 0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Billboard>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.12, 12]} />
        <meshStandardMaterial color="#1c2024" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, controls } = useThree();
  const selectedId = useArchive((s) => s.selectedId);
  const reducedMotion = useArchive((s) => s.reducedMotion);
  const setCameraBusy = useArchive((s) => s.setCameraBusy);
  const progress = useRef(1);
  const fromPos = useRef(new THREE.Vector3());
  const fromTarget = useRef(new THREE.Vector3());
  const toPos = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const c = controls as OrbitHandle | null;
    if (!c) return;
    fromPos.current.copy(camera.position);
    fromTarget.current.copy(c.target);
    const index = CHARACTERS.findIndex((ch) => ch.id === selectedId);
    if (index >= 0) {
      const [x, y, z] = getRingPosition(index);
      const len = Math.hypot(x, z) || 1;
      const dist = 3.85;
      toTarget.current.set(x, y, z);
      toPos.current.set(x + (x / len) * dist, y + 0.42, z + (z / len) * dist);
    } else {
      toPos.current.copy(OVERVIEW_POS);
      toTarget.current.copy(OVERVIEW_TARGET);
    }
    progress.current = 0;
    setCameraBusy(true);
  }, [selectedId, camera, controls, setCameraBusy]);

  useFrame((_, delta) => {
    const c = controls as OrbitHandle | null;
    if (!c || progress.current >= 1) return;
    const dur = reducedMotion ? 0.05 : 1.15;
    progress.current = Math.min(1, progress.current + Math.min(delta, 0.1) / dur);
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
  const timer = useRef<number | null>(null);
  const spinning = autoRotate && !interacting && !selectedId && !reducedMotion && !cameraBusy;

  return (
    <>
      <color attach="background" args={["#070809"]} />
      <fog attach="fog" args={["#070809", 11, 30]} />
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#d7dde4", "#16181c", 0.55]} />
      <directionalLight position={[6, 10, 5]} intensity={0.85} color="#e8ecef" />
      <directionalLight position={[-7, 4, -4]} intensity={0.25} color="#9eb4c8" />

      <Stars radius={42} depth={28} count={1800} factor={2.6} saturation={0} fade speed={0.35} />
      <Sparkles count={48} scale={14} size={2.2} speed={0.28} opacity={0.35} color="#b8c4ce" />

      <CoreShard />
      <StageRing />
      <ConstellationLines />
      <LightBeams />

      {CHARACTERS.map((character, index) => (
        <CharacterMarker key={character.id} character={character} index={index} />
      ))}

      <ContactShadows
        position={[0, -1.22, 0]}
        opacity={0.38}
        scale={22}
        blur={2.4}
        far={7}
        color="#000000"
      />

      <CameraRig />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5.5}
        maxDistance={20}
        minPolarAngle={Math.PI / 3.1}
        maxPolarAngle={Math.PI / 2.08}
        autoRotate={spinning}
        autoRotateSpeed={0.55}
        rotateSpeed={0.68}
        zoomSpeed={0.65}
        onStart={() => {
          if (timer.current) window.clearTimeout(timer.current);
          setInteracting(true);
        }}
        onEnd={() => {
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setInteracting(false), 2200);
        }}
      />

      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom luminanceThreshold={0.72} luminanceSmoothing={0.28} intensity={0.42} mipmapBlur />
        <Vignette eskil={false} offset={0.28} darkness={0.58} />
      </EffectComposer>
    </>
  );
}

export function CharacterScene() {
  const dragged = useRef(false);
  const setSelected = useArchive((s) => s.setSelected);
  const setSceneReady = useArchive((s) => s.setSceneReady);

  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.55, 13.6], fov: 42, near: 0.1, far: 80 }}
      onCreated={() => setSceneReady(true)}
      onPointerDown={() => {
        dragged.current = false;
      }}
      onPointerMove={(e) => {
        if (e.buttons) dragged.current = true;
      }}
      onPointerMissed={() => {
        if (!dragged.current) setSelected(null);
      }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}

export default CharacterScene;
