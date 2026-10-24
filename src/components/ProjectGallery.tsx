import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { projectsData } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../types';

export const ProjectGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = ['All', 'AI/ML', 'Full Stack', 'Desktop Apps', 'Web Apps'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background border-t border-slate-900/80">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-3 w-fit">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED PROJECTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              Projects that solve <span className="gradient-cyan-blue">real problems.</span>
            </h2>
          </div>

          <a
            href="https://github.com/Anurag-techs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
          >
            <span>View All Projects on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Filter Tabs matching mockup */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-800/60">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-cyan-glow/40 scale-105'
                  : 'bg-navy-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
