import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Neural Sphere Component
const NeuralSphere: React.FC<{ mousePos: React.MutableRefObject<{ x: number; y: number }> }> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate node vertices on a sphere surface & random inner depth
  const { nodePositions, lineIndices, particlePositions } = useMemo(() => {
    const nodeCount = 140;
    const radius = 2.4;
    const positions = new Float32Array(nodeCount * 3);
    const coords: THREE.Vector3[] = [];

    // Distribute points on sphere using Fibonacci spiral for even density
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Slight random radial perturbation for organic neural feel
      const r = radius * (0.88 + Math.random() * 0.24);
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const actualY = y * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = actualY;
      positions[i * 3 + 2] = z;
      coords.push(new THREE.Vector3(x, actualY, z));
    }

    // Connect nearby nodes with neural synapses lines
    const maxDistance = 1.35;
    const lineIndicesList: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = coords[i].distanceTo(coords[j]);
        if (dist < maxDistance && connections < 4) {
          lineIndicesList.push(i, j);
          connections++;
        }
      }
    }

    // Ambient floating particles around sphere
    const particleCount = 200;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pRadius = 2.8 + Math.random() * 2.2;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiAngle = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phiAngle);
      pPositions[i * 3] = pRadius * sinPhi * Math.cos(theta);
      pPositions[i * 3 + 1] = pRadius * sinPhi * Math.sin(theta);
      pPositions[i * 3 + 2] = pRadius * Math.cos(phiAngle);
    }

    return {
      nodePositions: positions,
      lineIndices: new Uint16Array(lineIndicesList),
      particlePositions: pPositions,
    };
  }, []);

  // Frame loop with continuous rotation & damped mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

    // Mouse parallax tracking
    const targetRotX = mousePos.current.y * 0.35;
    const targetRotY = mousePos.current.x * 0.45;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY - (groupRef.current.rotation.y % (Math.PI * 2))) * 0.02;

    // Orbiting rings counter-rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.rotation.x += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3;
      ring2Ref.current.rotation.z -= delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.18;
      ring3Ref.current.rotation.y += delta * 0.22;
    }

    // Points breathing scale
    if (pointsRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      pointsRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Core Glowing Nucleus */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.12}
          wireframe={true}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 2. Neural Nodes (Points) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color="#00f0ff"
          transparent
          opacity={0.95}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Interconnecting Synapses (Lines) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 4. Orbital Tech Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.6, 0.012, 16, 100]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <torusGeometry args={[4.0, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Ambient Floating Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#a5f3fc"
          transparent
          opacity={0.65}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const NeuralCore: React.FC = () => {
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
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
          <NeuralSphere mousePos={mousePos} />
        </Suspense>
      </Canvas>

      {/* Floating Hologram Labels matching mockup */}
      <div className="absolute top-[18%] left-[10%] sm:left-[15%] pointer-events-none transform -translate-y-1/2 animate-float-slow">
        <div className="px-3 py-1 rounded-full bg-navy-950/80 border border-cyan-400/40 backdrop-blur-md shadow-cyan-glow/20 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-cyan-300 uppercase">AI / ML</span>
        </div>
      </div>

      <div className="absolute top-[28%] right-[8%] sm:right-[14%] pointer-events-none transform -translate-y-1/2 animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="px-3.5 py-1 rounded-full bg-navy-950/80 border border-blue-400/40 backdrop-blur-md shadow-blue-glow/20 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-blue-300 uppercase">Full-Stack</span>
        </div>
      </div>

      <div className="absolute bottom-[26%] right-[12%] sm:right-[18%] pointer-events-none transform -translate-y-1/2 animate-float-slow" style={{ animationDelay: '3s' }}>
        <div className="px-3.5 py-1 rounded-full bg-navy-950/80 border border-cyan-400/30 backdrop-blur-md shadow-cyan-glow/15 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[11px] font-mono font-medium tracking-wider text-cyan-200">Real World Impact</span>
        </div>
      </div>

      <div className="absolute bottom-[10%] right-[6%] pointer-events-none">
        <div className="px-4 py-2 rounded-xl bg-navy-900/90 border border-cyan-500/30 backdrop-blur-md shadow-glass-glow flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-medium text-slate-200">
            Let&apos;s Build <span className="text-cyan-400 font-bold">the Future</span>
          </span>
        </div>
      </div>
    </div>
  );
};
