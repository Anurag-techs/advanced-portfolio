import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { techPlanets, type PlanetConfig } from '../data/skills';

interface RealisticPlanetProps {
  planet: PlanetConfig;
  isSelected: boolean;
  onSelect: (planet: PlanetConfig) => void;
  onHover: (name: string | null) => void;
}

const RealisticPlanet: React.FC<RealisticPlanetProps> = ({
  planet,
  isSelected,
  onSelect,
  onHover,
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Procedural surface details
  const { inclination, moonSpeed } = useMemo(() => {
    return {
      inclination: (Math.random() - 0.5) * 0.35, // Varied 3D orbit angle
      moonSpeed: 2.5 + Math.random() * 1.5,
    };
  }, []);

  useFrame((state, delta) => {
    if (!planetGroupRef.current) return;

    // Orbital revolution
    const t = state.clock.elapsedTime * planet.speed * 0.45 + planet.angleOffset;
    const x = Math.cos(t) * planet.orbitRadius;
    const z = Math.sin(t) * planet.orbitRadius;
    const y = Math.sin(t) * (planet.orbitRadius * inclination);
    planetGroupRef.current.position.set(x, y, z);

    // Axial self-rotation
    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * 0.8;
      bodyRef.current.rotation.x = 0.15;
    }

    // Planetary rings rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }

    // Mini moon orbit
    if (moonRef.current) {
      const mt = state.clock.elapsedTime * moonSpeed;
      moonRef.current.position.set(
        Math.cos(mt) * (planet.size + 0.28),
        Math.sin(mt * 0.5) * 0.1,
        Math.sin(mt) * (planet.size + 0.28)
      );
    }
  });

  const isHighlighted = hovered || isSelected;

  return (
    <group ref={planetGroupRef}>
      {/* Interactive Planet Body */}
      <mesh
        ref={bodyRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(planet.name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
        scale={isHighlighted ? [1.25, 1.25, 1.25] : [1, 1, 1]}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={planet.roughness}
          metalness={planet.metalness}
          emissive={planet.atmosphereColor}
          emissiveIntensity={isHighlighted ? 0.75 : 0.25}
        />
      </mesh>

      {/* Atmospheric Glow Rim (Fresnel simulation) */}
      <mesh scale={isHighlighted ? [planet.size * 1.5, planet.size * 1.5, planet.size * 1.5] : [planet.size * 1.28, planet.size * 1.28, planet.size * 1.28]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={planet.atmosphereColor}
          transparent
          opacity={isHighlighted ? 0.45 : 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn-Style Planetary Rings if configured */}
      {planet.hasRings && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[planet.size * 1.45, planet.size * 2.3, 36]} />
          <meshBasicMaterial
            color={planet.atmosphereColor}
            side={THREE.DoubleSide}
            transparent
            opacity={isHighlighted ? 0.75 : 0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Orbiting Satellite Moon if configured */}
      {planet.hasMoon && (
        <mesh ref={moonRef}>
          <sphereGeometry args={[planet.size * 0.28, 16, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#94a3b8"
            emissiveIntensity={0.3}
            roughness={0.7}
          />
        </mesh>
      )}

      {/* Billboard Technology Name Label */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, planet.size + 0.38, 0]}
          fontSize={0.24}
          color={isHighlighted ? '#ffffff' : planet.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#040711"
        >
          {planet.name}
        </Text>
      </Billboard>
    </group>
  );
};

const CentralStar: React.FC = () => {
  const starRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.15;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.25;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      coronaRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={starRef}>
      {/* Inner Luminary Core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Dynamic Geodesic Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.95, 20, 20]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe={true}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Atmospheric Pulse Glow */}
      <mesh>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Central Star Billboard Badge */}
      <Billboard follow={true}>
        <Text position={[0, 0, 0]} fontSize={0.28} color="#040711" anchorX="center" anchorY="middle">
          AI CORE
        </Text>
      </Billboard>
    </group>
  );
};

// Orbital Path Dust Rings
const OrbitalPaths: React.FC = () => {
  const radii = [2.5, 3.4, 4.3];

  return (
    <group>
      {radii.map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.2 - idx * 0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

const TechUniverseScene: React.FC<{
  selectedPlanet: PlanetConfig | null;
  onSelectPlanet: (planet: PlanetConfig) => void;
  onHoverPlanet: (name: string | null) => void;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ selectedPlanet, onSelectPlanet, onHoverPlanet, mousePos }) => {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!sceneRef.current) return;
    // Gentle mouse camera parallax
    const targetY = mousePos.current.x * 0.35;
    const targetX = -mousePos.current.y * 0.25;
    sceneRef.current.rotation.y += (targetY - sceneRef.current.rotation.y) * 0.04;
    sceneRef.current.rotation.x += (targetX - sceneRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={sceneRef}>
      {/* Lighting System */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#00f0ff" distance={12} decay={2} />
      <pointLight position={[6, 8, 6]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-6, -6, -6]} intensity={0.8} color="#a855f7" />

      {/* Central Star */}
      <CentralStar />

      {/* Orbital Path Rings */}
      <OrbitalPaths />

      {/* Realistic 3D Tech Planets */}
      {techPlanets.map((planet) => (
        <RealisticPlanet
          key={planet.name}
          planet={planet}
          isSelected={selectedPlanet?.name === planet.name}
          onSelect={onSelectPlanet}
          onHover={onHoverPlanet}
        />
      ))}
    </group>
  );
};

export const TechOrbit3D: React.FC<{
  onHoverNode: (name: string | null) => void;
  onSelectPlanet: (planet: PlanetConfig) => void;
  selectedPlanet: PlanetConfig | null;
}> = ({ onHoverNode, onSelectPlanet, selectedPlanet }) => {
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
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 3.8, 8.5], fov: 46 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <TechUniverseScene
          selectedPlanet={selectedPlanet}
          onSelectPlanet={onSelectPlanet}
          onHoverPlanet={onHoverNode}
          mousePos={mousePos}
        />
      </Canvas>

      {/* Quick Helper Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-navy-950/85 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-md flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Click or hover planets to view technical architecture role</span>
      </div>
    </div>
  );
};

