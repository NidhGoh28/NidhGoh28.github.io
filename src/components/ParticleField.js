"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useThemeColor from "./useThemeColor";

/*
  4 000 particles that re-arrange themselves as you scroll, walking through
  four pictures from probability & dynamics:

    0  unit sphere            (uniform points on S², Fibonacci lattice)
    1  bivariate normal       z = e^{-(x²+y²)/2}
    2  Lorenz attractor       chaos from three ODEs
    3  Monte Carlo fan        40 random-walk price paths
*/

// deterministic PRNG so every visit looks the same
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(rand) {
  const u = Math.max(rand(), 1e-9), v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export const FORMATIONS = [
  { name: "Uniform sphere", eq: "x ∈ S², x ~ U(S²)" },
  { name: "Bivariate normal", eq: "φ(x,y) = e^{−(x²+y²)/2} / 2π" },
  { name: "Lorenz attractor", eq: "ẋ = σ(y − x), ẏ = x(ρ − z) − y, ż = xy − βz" },
  { name: "Monte Carlo paths", eq: "dS = μS dt + σS dW" },
];

function buildFormations(N) {
  const rand = mulberry32(28);
  const sphere = new Float32Array(N * 3);
  const bell = new Float32Array(N * 3);
  const lorenz = new Float32Array(N * 3);
  const fan = new Float32Array(N * 3);

  // Sphere — Fibonacci lattice
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    sphere[i * 3] = 3 * Math.cos(theta) * Math.sin(phi);
    sphere[i * 3 + 1] = 3 * Math.sin(theta) * Math.sin(phi);
    sphere[i * 3 + 2] = 3 * Math.cos(phi);
  }

  // Bivariate normal density surface on a square grid
  const side = Math.ceil(Math.sqrt(N));
  for (let i = 0; i < N; i++) {
    const gx = (i % side) / (side - 1);
    const gz = Math.floor(i / side) / (side - 1);
    const x = (gx - 0.5) * 7;
    const z = (gz - 0.5) * 7;
    const y = 3.2 * Math.exp(-(x * x + z * z) / 2 / 1.1) - 1.4;
    bell[i * 3] = x;
    bell[i * 3 + 1] = y;
    bell[i * 3 + 2] = z;
  }

  // Lorenz attractor (σ=10, ρ=28, β=8/3), RK-ish small Euler steps
  let lx = 0.1, ly = 0, lz = 0;
  const dt = 0.006;
  for (let k = 0; k < 400; k++) { // burn-in onto the attractor
    const dx = 10 * (ly - lx), dy = lx * (28 - lz) - ly, dz = lx * ly - (8 / 3) * lz;
    lx += dx * dt; ly += dy * dt; lz += dz * dt;
  }
  for (let i = 0; i < N; i++) {
    for (let s = 0; s < 2; s++) {
      const dx = 10 * (ly - lx), dy = lx * (28 - lz) - ly, dz = lx * ly - (8 / 3) * lz;
      lx += dx * dt; ly += dy * dt; lz += dz * dt;
    }
    lorenz[i * 3] = lx * 0.13;
    lorenz[i * 3 + 1] = (lz - 25) * 0.13;
    lorenz[i * 3 + 2] = ly * 0.13;
  }

  // Monte Carlo fan — GBM paths in log space
  const PATHS = 40;
  const STEPS = Math.ceil(N / PATHS);
  for (let p = 0; p < PATHS; p++) {
    let logS = 0;
    const depth = (p / (PATHS - 1) - 0.5) * 2.4;
    for (let s = 0; s < STEPS; s++) {
      const i = p * STEPS + s;
      if (i >= N) break;
      logS += 0.004 + 0.075 * gauss(rand);
      fan[i * 3] = (s / (STEPS - 1)) * 7 - 3.5;
      fan[i * 3 + 1] = logS * 1.25;
      fan[i * 3 + 2] = depth;
    }
  }
  return [sphere, bell, lorenz, fan];
}

const smooth = (t) => t * t * (3 - 2 * t);

export default function ParticleField({ progress, count = 4000, reduced = false }) {
  const ref = useRef(null);
  const color = useThemeColor("--particle");
  const stages = useMemo(() => buildFormations(count), [count]);
  const positions = useMemo(() => new Float32Array(stages[0]), [stages]);
  const eased = useRef(0);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    // ease toward the scroll target so formations glide instead of snapping
    const target = reduced ? 0 : progress.current;
    eased.current += (target - eased.current) * Math.min(1, delta * 3);
    const p = Math.min(Math.max(eased.current, 0), 1);

    const last = stages.length - 1;
    const f = p * last;
    const idx = Math.min(Math.floor(f), last - 1);
    const t = smooth(Math.min(Math.max(f - idx, 0), 1));
    const A = stages[idx], B = stages[idx + 1];
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count * 3; i += 3) {
      const w = Math.sin(time * 0.9 + i * 0.013) * 0.012;
      positions[i] = A[i] + (B[i] - A[i]) * t + w;
      positions[i + 1] = A[i + 1] + (B[i + 1] - A[i + 1]) * t + w;
      positions[i + 2] = A[i + 2] + (B[i + 2] - A[i + 2]) * t;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = reduced ? 0.4 : time * 0.06 + p * 0.8;
    pts.rotation.x = 0.18 + p * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={color} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}
