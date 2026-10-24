import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'specs' | 'philosophy'>('system');

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-navy-950/70 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Biography & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT ME</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-white leading-tight mb-6">
              Passionate about AI and building{' '}
              <span className="gradient-cyan-blue">real world products.</span>
            </h2>

            {/* Biography */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-inter font-normal">
              {profileData.aboutBio}
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Currently pursuing my B.Tech in Computer Science and Engineering with an intensive focus in AI & Machine Learning. My approach centers on pragmatic engineering: writing modular, maintainable code, integrating computer vision and generative intelligence into intuitive web architectures, and testing systems against real human workflows.
            </p>

            {/* 3 Metric Cards matching mockup */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              {profileData.highlights.map((h, idx) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-navy-900/60 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-cyan-400 mb-1">
                    {h.label}
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{h.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{h.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href="#journey"
                className="glow-button inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                <span>More About Me</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Sci-Fi Neural Lab Holographic HUD & Workspace */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-blue-500/20 shadow-2xl shadow-cyan-950/50">
              <div className="rounded-2xl bg-navy-950/95 border border-slate-800/80 p-5 sm:p-6 overflow-hidden">
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      neural_lab_terminal // anurag.ai
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    ONLINE
                  </div>
                </div>

                {/* Subnav Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('system')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'system'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    System Status
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'specs'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Engineering Stack
                  </button>
                  <button
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'philosophy'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Core Philosophy
                  </button>
                </div>

                {/* Tab Contents */}
                {activeTab === 'system' && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-navy-900/80 border border-cyan-500/20 text-slate-300 space-y-2">
                      <div className="flex justify-between items-center text-slate-400 text-[11px]">
                        <span>ACADEMIC STATUS</span>
                        <span className="text-cyan-400">ACTIVE [B.Tech CSE]</span>
                      </div>
                      <p className="text-slate-200">
                        Specialization: <span className="text-cyan-300 font-semibold">Artificial Intelligence & Machine Learning</span>
                      </p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-[85%]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Primary Stack</div>
                        <div className="text-slate-200 font-semibold mt-1">Python · React · Node</div>
                      </div>
                      <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Interactive 3D</div>
                        <div className="text-cyan-400 font-semibold mt-1">Three.js · R3F</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-navy-900/40 border border-slate-800/80">
                      <div className="text-slate-400 text-[11px] mb-2 flex items-center justify-between">
                        <span>LIVE TELEMETRY STREAM</span>
                        <span className="text-emerald-400">60 FPS · 0.2ms Latency</span>
                      </div>
                      <div className="flex items-end gap-1 h-12 pt-2">
                        {[40, 65, 30, 85, 95, 60, 75, 45, 90, 80, 50, 70, 88, 62, 78].map((val, i) => (
                          <div
                            key={i}
                            style={{ height: `${val}%` }}
                            className="flex-1 bg-gradient-to-t from-cyan-600/30 to-cyan-400 rounded-t-sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                      <span className="text-cyan-400 font-semibold">[01] Machine Learning & Vision</span>
                      <p className="text-slate-300 mt-1">TensorFlow, OpenCV, Data Pipelines, PyTorch basics, Real-time Object Tracking</p>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                      <span className="text-blue-400 font-semibold">[02] Web & Cloud Engineering</span>
                      <p className="text-slate-300 mt-1">React, Vite, TypeScript, Tailwind CSS, Node.js, Express, REST APIs</p>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                      <span className="text-purple-400 font-semibold">[03] Database & Systems</span>
                      <p className="text-slate-300 mt-1">MongoDB, MySQL, Git version control, Edge device deployment simulation</p>
                    </div>
                  </div>
                )}

                {activeTab === 'philosophy' && (
                  <div className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 font-inter text-xs text-slate-300 leading-relaxed space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
                      <Code2 className="w-4 h-4" />
                      <span>Software that Serves a Tangible Purpose</span>
                    </div>
                    <p>
                      &quot;I don&apos;t build software simply to check boxes. Whether it is preventing rail track accidents via Edge AI, streamlining ridesharing, or crafting responsive 3D interfaces, every system must solve an unambiguous real-world problem with speed and reliability.&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
