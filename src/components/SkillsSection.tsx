import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { skillCategories, techPlanets, type PlanetConfig } from '../data/skills';
import { TechOrbit3D } from './TechOrbit3D';

export const SkillsSection: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetConfig | null>(techPlanets[0]);

  // Active info target
  const activePlanet = techPlanets.find((p) => p.name.toLowerCase() === hoveredNode?.toLowerCase()) || selectedPlanet;

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-navy-950/80 border-t border-slate-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL UNIVERSE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-extrabold text-white tracking-tight">
            Technologies I work <span className="gradient-cyan-blue">with.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            An interactive 3D solar system modeling my core engineering stack across AI/ML frameworks, modern web ecosystems, and cloud databases.
          </p>
        </motion.div>

        {/* Main Grid: 3D Tech Orbit on Left + Categorized List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Tech Universe + Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* Canvas Container */}
            <div className="relative rounded-2xl bg-gradient-to-b from-navy-900/60 to-navy-950/90 border border-slate-800/80 p-2 sm:p-3 shadow-2xl overflow-hidden">
              <TechOrbit3D
                onHoverNode={setHoveredNode}
                onSelectPlanet={setSelectedPlanet}
                selectedPlanet={selectedPlanet}
              />
            </div>

            {/* Selected / Hovered Planet Telemetry Info Card */}
            {activePlanet && (
              <motion.div
                key={activePlanet.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-navy-900/90 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-bold text-sm shrink-0 border"
                    style={{
                      background: `${activePlanet.color}20`,
                      borderColor: activePlanet.color,
                      color: activePlanet.color,
                      boxShadow: `0 0 15px ${activePlanet.color}40`,
                    }}
                  >
                    {activePlanet.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-orbitron font-bold text-white text-base">
                        {activePlanet.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-navy-950 border border-slate-700 text-cyan-300 uppercase">
                        {activePlanet.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl font-inter leading-relaxed">
                      {activePlanet.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Categorized Technical Skills Cards */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            {skillCategories.map((catGroup) => (
              <div
                key={catGroup.category}
                className="p-4 rounded-xl bg-navy-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {catGroup.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {catGroup.skills.length} tools
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catGroup.skills.map((skill) => {
                    const isHighlighted = activePlanet?.name.toLowerCase() === skill.name.toLowerCase();
                    return (
                      <button
                        key={skill.name}
                        onClick={() => {
                          const target = techPlanets.find((p) => p.name.toLowerCase() === skill.name.toLowerCase());
                          if (target) setSelectedPlanet(target);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          isHighlighted
                            ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-cyan-glow/30 scale-105'
                            : 'bg-navy-950/70 border border-slate-800/80 text-slate-300 hover:border-slate-700'
                        }`}
                        title={skill.description}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isHighlighted ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                        <span className="font-medium">{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

