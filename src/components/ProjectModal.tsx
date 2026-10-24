import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'techStack' | 'architecture' | 'challenges' | 'results'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'techStack', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'results', label: 'Results' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-navy-950 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden z-10">
        {/* Top Sticky Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-navy-900/90 backdrop-blur-md flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&lt; Back to Projects</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-navy-950 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8">
          {/* Header Section */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-semibold text-cyan-300 uppercase">
                {project.category}
              </span>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-md bg-navy-900 border border-slate-800 text-xs font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-4xl font-orbitron font-extrabold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-inter leading-relaxed">
              {project.subtitle}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Featured Screenshot Display with High-Tech HUD */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black aspect-video max-h-[420px] shadow-lg">
              <img
                src={project.gallery[selectedImageIndex] || project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              {/* Sci-Fi HUD Overlay Elements */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-navy-950/85 border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>TELEMETRY FEED // CAM_0{selectedImageIndex + 1}</span>
              </div>

              {project.id === 'railway-safety' && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-red-950/90 border border-red-500/50 backdrop-blur-md flex items-center gap-2 text-xs font-mono text-red-400">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>HAZARD ALERT SIMULATOR</span>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-navy-950/85 border border-slate-800/80 backdrop-blur-md flex items-center justify-between text-xs font-mono text-slate-300">
                <span>SYSTEM STATUS: OPERATIONAL</span>
                <span className="text-cyan-400">AI INFERENCE: 98.4% CONFIDENCE</span>
              </div>
            </div>

            {/* Thumbnail Reel */}
            {project.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-cyan-400 shadow-cyan-glow/40 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-800 flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-t-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="min-h-[220px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Project Overview</h4>
                  <p className="text-slate-300 leading-relaxed font-inter text-sm sm:text-base">
                    {project.overview}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800">
                  <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">Problem Addressed</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Implemented & Verified Capabilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'techStack' && (
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Technologies & Architecture Roles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="p-4 rounded-xl bg-navy-900/80 border border-cyan-500/20">
                      <div className="font-mono text-sm font-bold text-cyan-300 mb-1">{tech.name}</div>
                      <div className="text-xs text-slate-400">{tech.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">System Data Flow</h4>
                <div className="p-5 rounded-xl bg-navy-900/90 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-200 leading-relaxed">
                  {project.architecture}
                </div>
                <div className="p-4 rounded-xl bg-navy-900/40 border border-slate-800 text-xs text-slate-400">
                  Designed for high-throughput and decoupled fault isolation across client and backend micro-interfaces.
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-3">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Engineering Obstacles & Solutions</h4>
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{challenge}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Verified Outcomes & Key Takeaways</h4>
                <div className="space-y-3">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
                {project.lessonsLearned && (
                  <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800">
                    <h5 className="text-xs font-mono text-slate-400 uppercase mb-2">Engineering Lessons</h5>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {project.lessonsLearned.map((lesson, idx) => (
                        <li key={idx}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
