import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LivingNeuralField: React.FC<{ mousePos: React.MutableRefObject<{ x: number; y: number }> }> = ({ mousePos }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate asymmetric grid of nodes
  const { initialPositions, lineIndices, pulseData } = useMemo(() => {
    const cols = 18;
    const rows = 12;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const spacingX = 0.55;
    const spacingZ = 0.55;
    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -((rows - 1) * spacingZ) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 3;
        // Asymmetric offset for organic neural topology
        const jitterX = (Math.random() - 0.5) * 0.15;
        const jitterZ = (Math.random() - 0.5) * 0.15;
        positions[idx] = startX + c * spacingX + jitterX;
        positions[idx + 1] = 0; // Will be animated
        positions[idx + 2] = startZ + r * spacingZ + jitterZ;
      }
    }

    // Connect neighbors (horizontal, vertical, diagonal)
    const indices: number[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const curr = r * cols + c;
        if (c + 1 < cols) indices.push(curr, r * cols + (c + 1));
        if (r + 1 < rows) indices.push(curr, (r + 1) * cols + c);
        if (r + 1 < rows && c + 1 < cols && Math.random() > 0.45) {
          indices.push(curr, (r + 1) * cols + (c + 1));
        }
      }
    }

    // Travelling signal pulses along edges
    const pulseCount = 28;
    const pulses = [];
    for (let i = 0; i < pulseCount; i++) {
      const edgeIdx = Math.floor(Math.random() * (indices.length / 2));
      pulses.push({
        nodeA: indices[edgeIdx * 2],
        nodeB: indices[edgeIdx * 2 + 1],
        progress: Math.random(),
        speed: 0.6 + Math.random() * 0.8,
      });
    }

    return {
      initialPositions: positions,
      lineIndices: new Uint16Array(indices),
      pulseData: pulses,
    };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current || !pulsesRef.current || !groupRef.current) return;

    const t = state.clock.elapsedTime * 0.9;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentPositions = posAttr.array as Float32Array;

    // 1. Calculate undulating neural wave heights
    const totalNodes = initialPositions.length / 3;
    for (let i = 0; i < totalNodes; i++) {
      const x = initialPositions[i * 3];
      const z = initialPositions[i * 3 + 2];
      // Multi-frequency wave calculation for natural organic flow
      const wave =
        Math.sin(x * 1.1 + t) * 0.45 +
        Math.cos(z * 1.3 + t * 0.7) * 0.35 +
        Math.sin((x + z) * 0.8 + t * 1.2) * 0.2;
      currentPositions[i * 3 + 1] = wave;
    }
    posAttr.needsUpdate = true;

    // 2. Update line positions to match node wave
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    (linePosAttr.array as Float32Array).set(currentPositions);
    linePosAttr.needsUpdate = true;

    // 3. Update travelling electric pulse packets
    const pulsePosAttr = pulsesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pulsePositions = pulsePosAttr.array as Float32Array;
    for (let i = 0; i < pulseData.length; i++) {
      const p = pulseData[i];
      p.progress += delta * p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
      }
      const idxA = p.nodeA * 3;
      const idxB = p.nodeB * 3;
      pulsePositions[i * 3] = currentPositions[idxA] + (currentPositions[idxB] - currentPositions[idxA]) * p.progress;
      pulsePositions[i * 3 + 1] = currentPositions[idxA + 1] + (currentPositions[idxB + 1] - currentPositions[idxA + 1]) * p.progress;
      pulsePositions[i * 3 + 2] = currentPositions[idxA + 2] + (currentPositions[idxB + 2] - currentPositions[idxA + 2]) * p.progress;
    }
    pulsePosAttr.needsUpdate = true;

    // 4. Smooth camera parallax
    const targetRotX = 0.55 + mousePos.current.y * 0.2;
    const targetRotY = mousePos.current.x * 0.3;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[0.55, 0, 0]} position={[0, -0.4, 0]}>
      {/* 1. Neural Synapse Threads */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(initialPositions), 3]}
          />
          <bufferAttribute attach="index" args={[lineIndices, 1]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 2. Synaptic Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(initialPositions), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color="#00f0ff"
          transparent
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Travelling Electric Signal Pulses */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(pulseData.length * 3), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#ffffff"
          transparent
          opacity={1}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const LivingNeuralNetwork3D: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 2.5, 6.2], fov: 48 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 4, 0]} intensity={2.5} color="#00f0ff" />
        <LivingNeuralField mousePos={mousePos} />
      </Canvas>

      {/* Futuristic Telemetry HUD Label */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-navy-950/80 border border-slate-800/80 px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-1.5 text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>LIVING NEURAL NETWORK // ACTIVE SYNAPSES</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">28 PULSE SIGNALS / 60 FPS</span>
      </div>
    </div>
  );
};
