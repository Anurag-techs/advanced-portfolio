import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { journeyMilestones, pathMilestones } from '../data/journey';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>EXPERIENCE & EDUCATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-extrabold text-white tracking-tight">
            My Journey <span className="gradient-cyan-blue">So Far.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A chronological timeline of academic achievements, self-driven research, hackathons, and product engineering.
          </p>
        </motion.div>

        {/* Two Column Layout: Left Timeline, Right Sci-Fi Mountain Peak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Illuminated Vertical Path with Scroll Motion */}
          <div className="lg:col-span-7 relative">
            {/* Luminous vertical line with entrance animation */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ originY: 0 }}
              className="absolute top-4 bottom-4 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-slate-800 shadow-cyan-glow"
            />

            <div className="space-y-8 relative">
              {journeyMilestones.map((item, index) => (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex items-start gap-4 sm:gap-6 pl-1 sm:pl-2 group"
                >
                  {/* Glowing node point */}
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-navy-950 border-2 border-cyan-400 flex items-center justify-center shrink-0 shadow-cyan-glow/50 group-hover:scale-110 group-hover:border-white transition-all z-10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-white animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-5 rounded-2xl bg-navy-900/60 border border-slate-800 group-hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-inter">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Holographic Mountain Peak / Milestone Stepper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-900/80 to-navy-950 border border-cyan-500/30 shadow-2xl overflow-hidden">
              {/* Sci-Fi Peak Background Glow & Mountain Silhouette */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                    ENGINEERING HORIZON
                  </div>
                  <h3 className="font-orbitron text-xl font-bold text-white">
                    Ascending the Summit
                  </h3>
                </div>

                {/* 4 Holographic Stepping Stones matching mockup */}
                <div className="space-y-4 pt-2">
                  {pathMilestones.map((m, idx) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      style={{ transform: `translateX(${idx * 14}px)` }}
                      className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-300 flex items-center justify-between ${
                        idx === 3
                          ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/90 border-cyan-400 shadow-cyan-glow/40 scale-105'
                          : 'bg-navy-900/60 border-slate-800 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                          0{m.step}
                        </span>
                        <div>
                          <div className="font-orbitron font-bold text-sm text-white">
                            {m.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {m.desc}
                          </div>
                        </div>
                      </div>

                      {idx === 3 && (
                        <span className="px-2 py-1 rounded bg-cyan-500 text-navy-950 font-mono text-[10px] font-extrabold uppercase shadow-cyan-glow">
                          Target
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800/80 text-xs font-mono text-slate-400 text-center">
                  Driven by perpetual learning, algorithmic curiosity, and relentless curiosity.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
