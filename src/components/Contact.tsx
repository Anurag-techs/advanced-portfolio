import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, Download, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profile';
import { LivingNeuralNetwork3D } from './LivingNeuralNetwork3D';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto generation for verified delivery
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-navy-950/90 border-t border-slate-900 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Subtitle & Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-4 w-fit">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LET&apos;S CONNECT</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-extrabold text-white leading-tight mb-4">
              Have an idea or <span className="gradient-cyan-blue">opportunity?</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8 font-inter">
              Let&apos;s build something amazing together. Reach out for collaborations, AI engineering, full-stack architectures, or just to talk tech.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="glow-button inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                <span>Send a Message</span>
              </a>

              <a
                href={profileData.contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3 max-w-md">
              {/* Email Card */}
              <div className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Email</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200">{profileData.contact.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">LinkedIn</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-blue-300 transition-colors">
                      {profileData.contact.linkedinUsername}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                  Connect &rarr;
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-slate-600 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">GitHub</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {profileData.contact.githubUsername}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                  Explore &rarr;
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Redesigned Living Neural Network Visual */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-navy-900/50 to-navy-950 border border-cyan-500/30 p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden">
              {/* 3D Living Neural Network replacing the old globe */}
              <LivingNeuralNetwork3D />

              {/* Interactive Quick Direct Contact Form */}
              <form onSubmit={handleFormSubmit} className="w-full space-y-3 mt-4 pt-4 border-t border-slate-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Your message or project idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500 resize-none"
                />

                <button
                  type="submit"
                  className="w-full glow-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </button>

                {isSubmitted && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
                    Opening your default email client with your message prepared!
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
