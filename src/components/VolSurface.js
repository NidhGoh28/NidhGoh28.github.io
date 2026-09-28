"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useThemeColor, { usePrefersReducedMotion } from "./useThemeColor";

/*
  An implied-volatility surface σ(K, T), drawn as a living wireframe.
  - smile:  σ rises for strikes far from the money  (k = log-moneyness)
  - skew:   downside strikes are richer than upside
  - term:   the smile flattens as maturity T grows
  A slow "vol shock" ripples across it so it breathes.
*/
const SEG = 44;

function sigma(k, T, t) {
  const atm = 0.2 + 0.03 * Math.sin(t * 0.5 + T * 2.2);
  const smile = (0.26 * k * k) / Math.sqrt(T + 0.35);
  const skew = (-0.09 * k) / Math.sqrt(T + 0.4);
  const shock = 0.05 * Math.exp(-((k + 0.2 * Math.sin(t * 0.4)) ** 2) * 3) * Math.sin(t * 0.9 - T * 3);
  return atm + smile + skew + shock;
}

function Surface({ mouse, reduced }) {
  const group = useRef(null);
  const signal = useThemeColor("--signal");
  const amber = useThemeColor("--amber", "#f6b44b");

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(6, 6, SEG, SEG);
    g.rotateX(-Math.PI / 2);
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3));
    return g;
  }, []);

  const cA = useMemo(() => new THREE.Color(), []);
  const cB = useMemo(() => new THREE.Color(), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useEffect(() => { cA.set(signal); cB.set(amber); }, [signal, amber, cA, cB]);

  useFrame((state) => {
    const t = reduced ? 1 : state.clock.elapsedTime;
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const k = x / 3;                     // log-moneyness in [-1, 1]
      const T = (z + 3) / 6 * 2 + 0.05;    // maturity in years
      const s = sigma(k, T, t);
      pos.setY(i, (s - 0.26) * 5.5);
      const h = Math.min(1, Math.max(0, (s - 0.17) / 0.32));
      tmp.copy(cA).lerp(cB, h);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;

    const g = group.current;
    if (g) {
      const tx = -0.5 + mouse.current.y * 0.25;
      const ty = (reduced ? 0.6 : t * 0.12) + mouse.current.x * 0.6;
      g.rotation.x += (tx - g.rotation.x) * 0.06;
      g.rotation.y += (ty - g.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={group} rotation={[-0.5, 0.6, 0]}>
      <mesh geometry={geo}>
        <meshBasicMaterial vertexColors wireframe transparent opacity={0.55} />
      </mesh>
      <points geometry={geo}>
        <pointsMaterial vertexColors size={0.055} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
      {/* floor grid for depth */}
      <gridHelper args={[6, 12, signal, signal]} position={[0, -1.3, 0]} material-transparent material-opacity={0.12} />
    </group>
  );
}

export default function VolSurface() {
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };

  return (
    <div className="vs-wrap" onPointerMove={onMove} onPointerLeave={() => (mouse.current = { x: 0, y: 0 })}>
      <Canvas camera={{ position: [0, 3.6, 9.6], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <Surface mouse={mouse} reduced={reduced} />
      </Canvas>
      <div className="vs-hud mono">
        <span className="vs-live"><i />live</span>
        <span>implied vol surface</span>
        <span className="vs-eq">σ(K, T)</span>
      </div>
      <div className="vs-axes mono">
        <span>strike K →</span>
        <span>maturity T →</span>
      </div>
    </div>
  );
}
