import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profile';
import { NeuralCore } from './NeuralCore';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 neural-grid neural-radial overflow-hidden"
    >
      {/* Background ambient glow spheres */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Hero Typography, Real Portrait & CTA */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-6 w-fit shadow-cyan-glow/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {profileData.eyebrow}
          </motion.div>

          {/* Heading with Integrated Real Profile Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 mb-4"
          >
            {/* Real Profile Photo Card */}
            <div className="relative group shrink-0">
              {/* Subtle Cyan Aura & Rotating Border Accent */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/50 via-blue-600/30 to-cyan-400/50 blur-sm opacity-75 group-hover:opacity-100 transition duration-500" />

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden bg-navy-950 border-2 border-cyan-400/60 shadow-xl shadow-cyan-950/80 backdrop-blur-md">
                {!imgError ? (
                  <img
                    src={profileData.avatarUrl}
                    alt="Photograph of Anurag Singh - AI/ML & Full-Stack Developer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 font-orbitron font-extrabold text-2xl text-cyan-400">
                    {profileData.monogram}
                  </div>
                )}

                {/* Subtle glass reflection sheen on corner */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

                {/* Active Status Badge */}
                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-navy-950/90 border border-cyan-400/50 text-[9px] font-mono font-bold text-cyan-300 flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  ONLINE
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-1">
              <p className="text-slate-400 text-base sm:text-lg font-space font-medium tracking-wide">
                {profileData.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-extrabold tracking-tight text-white leading-tight">
                {profileData.heading}
              </h1>
              <div className="flex items-center gap-2 pt-0.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                  Verified Engineer · AI & Full-Stack
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold gradient-cyan-blue mb-4 tracking-wide"
          >
            {profileData.tagline}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8"
          >
            {profileData.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a
              href="#projects"
              className="glow-button inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={profileData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-button inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 pt-4 border-t border-slate-800/60 max-w-md"
          >
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-cyan-glow/20 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-cyan-glow/20 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-cyan-glow/20 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <span className="text-xs font-mono text-slate-500 ml-2">
              anurag-techs
            </span>
          </motion.div>
        </div>

        {/* Right Column: 3D Neural Core Interactive Scene */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <NeuralCore />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
};
