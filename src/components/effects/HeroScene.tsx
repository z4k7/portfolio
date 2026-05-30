"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  mouseNorm: { x: number; y: number };
}

// ─── Gold logo plane ──────────────────────────────────────────────────────────
function LogoPlane() {
  const texture = useLoader(THREE.TextureLoader, "/zak_logo.png");
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshStandardMaterial
        map={texture}
        transparent
        depthWrite={false}
        color="#c9a84c"
        emissive="#c9a84c"
        emissiveMap={texture}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

// ─── Orbital ring ─────────────────────────────────────────────────────────────
function OrbitalRing({
  radius, rotX, rotZ, speed, opacity, color = "#c9a84c",
}: {
  radius: number; rotX: number; rotZ: number;
  speed: number; opacity: number; color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const geo = useMemo(() => new THREE.TorusGeometry(radius, 0.007, 6, 120), [radius]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * speed;
  });

  return (
    <group ref={groupRef} rotation={[rotX, 0, rotZ]}>
      <mesh geometry={geo}>
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function SceneRoot({ mouseNorm }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    tilt.current.x += (mouseNorm.y * 0.22 - tilt.current.x) * 0.04;
    tilt.current.y += (mouseNorm.x * 0.22 - tilt.current.y) * 0.04;
    groupRef.current.rotation.x = tilt.current.x;
    groupRef.current.rotation.y = tilt.current.y;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <LogoPlane />
      </Suspense>

      <OrbitalRing
        radius={1.55} rotX={Math.PI / 2.2} rotZ={0.3}
        speed={0.22} opacity={0.55} color="#c9a84c"
      />
      <OrbitalRing
        radius={1.9} rotX={Math.PI / 6} rotZ={-0.5}
        speed={-0.14} opacity={0.32} color="#ead99a"
      />
      <OrbitalRing
        radius={1.72} rotX={0} rotZ={0}
        speed={0.08} opacity={0.15} color="#8b6a1a"
      />
    </group>
  );
}

// ─── Canvas export ────────────────────────────────────────────────────────────
export default function HeroScene({ mouseNorm }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 54, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 4]} color="#c9a84c" intensity={2.5} />
      <pointLight position={[-2, -2, 2]} color="#ead99a" intensity={0.8} />
      <SceneRoot mouseNorm={mouseNorm} />
    </Canvas>
  );
}
