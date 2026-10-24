import type { SkillCategory, OrbitNode } from '../types';

export interface PlanetConfig extends OrbitNode {
  planetType: 'gas-ringed' | 'terrestrial-banded' | 'sapphire-grid' | 'amber-plasma' | 'bio-emerald' | 'jade-world' | 'violet-moon' | 'ruby-core';
  ringColor?: string;
  hasRings?: boolean;
  hasMoon?: boolean;
  atmosphereColor: string;
  roughness: number;
  metalness: number;
  specular: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: "Advanced", description: "Modern functional components, hooks, custom state management" },
      { name: "TypeScript", level: "Proficient", description: "Type-safe interfaces, generics, scalable codebases" },
      { name: "JavaScript", level: "Advanced", description: "ES6+, async/await, DOM APIs, event loop" },
      { name: "Tailwind CSS", level: "Advanced", description: "Responsive layouts, utility tokens, dark mode design" },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "Proficient", description: "Event-driven runtime, asynchronous microservices" },
      { name: "Express", level: "Proficient", description: "RESTful routing, middleware pipelines, error handling" },
      { name: "Python", level: "Advanced", description: "Core algorithms, data analysis, automation, AI scripts" },
      { name: "Flask", level: "Intermediate", description: "Lightweight micro-APIs for machine learning models" },
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", level: "Proficient", description: "NoSQL schema modeling, aggregation pipelines, Mongoose" },
      { name: "MySQL / SQL", level: "Intermediate", description: "Relational queries, table indexing, normalization" },
    ]
  },
  {
    category: "AI/ML",
    skills: [
      { name: "Python AI/ML", level: "Specialization", description: "Computer vision, NLP pipelines, data preprocessing" },
      { name: "TensorFlow", level: "Practical", description: "Neural network modeling, training, image classification" },
      { name: "OpenCV", level: "Practical", description: "Real-time video stream processing, edge detection" },
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", level: "Advanced", description: "Branching strategies, version control, rebase workflows" },
      { name: "GitHub", level: "Proficient", description: "Open source collaboration, CI/CD actions, repo management" },
      { name: "Vite", level: "Advanced", description: "Ultra-fast bundling, HMR, production optimization" },
      { name: "VS Code", level: "Advanced", description: "Tailored developer environment, debugging, extensions" },
    ]
  }
];

export const techPlanets: PlanetConfig[] = [
  {
    name: "React",
    category: "Frontend",
    color: "#00f0ff",
    atmosphereColor: "#38bdf8",
    planetType: "gas-ringed",
    hasRings: true,
    ringColor: "rgba(0, 240, 255, 0.45)",
    orbitRadius: 2.5,
    speed: 0.55,
    size: 0.38,
    angleOffset: 0,
    roughness: 0.35,
    metalness: 0.2,
    specular: "#ffffff",
    description: "Core UI architecture powering interactive SPAs, real-time telemetry dashboards, and 3D web experiences.",
  },
  {
    name: "Python",
    category: "AI/ML",
    color: "#38bdf8",
    atmosphereColor: "#fbbf24",
    planetType: "terrestrial-banded",
    hasMoon: true,
    orbitRadius: 2.5,
    speed: 0.55,
    size: 0.4,
    angleOffset: Math.PI,
    roughness: 0.5,
    metalness: 0.15,
    specular: "#38bdf8",
    description: "Primary language for computer vision, machine learning models, telemetry ingestion, and backend automation.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    color: "#3b82f6",
    atmosphereColor: "#60a5fa",
    planetType: "sapphire-grid",
    orbitRadius: 3.4,
    speed: 0.4,
    size: 0.34,
    angleOffset: Math.PI / 3,
    roughness: 0.25,
    metalness: 0.4,
    specular: "#ffffff",
    description: "Strict type-safety ensuring bulletproof codebases across complex client and full-stack applications.",
  },
  {
    name: "TensorFlow",
    category: "AI/ML",
    color: "#f97316",
    atmosphereColor: "#fdba74",
    planetType: "amber-plasma",
    orbitRadius: 3.4,
    speed: 0.4,
    size: 0.36,
    angleOffset: (4 * Math.PI) / 3,
    roughness: 0.4,
    metalness: 0.3,
    specular: "#ffedd5",
    description: "Deep learning framework used to architect, train, and test image and hazard detection neural models.",
  },
  {
    name: "Node.js",
    category: "Backend",
    color: "#22c55e",
    atmosphereColor: "#86efac",
    planetType: "bio-emerald",
    orbitRadius: 4.3,
    speed: 0.3,
    size: 0.35,
    angleOffset: Math.PI / 2,
    roughness: 0.45,
    metalness: 0.2,
    specular: "#a7f3d0",
    description: "Asynchronous runtime powering REST APIs, payment webhooks, and scalable backend event services.",
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "#10b981",
    atmosphereColor: "#34d399",
    planetType: "jade-world",
    orbitRadius: 4.3,
    speed: 0.3,
    size: 0.35,
    angleOffset: (3 * Math.PI) / 2,
    roughness: 0.3,
    metalness: 0.5,
    specular: "#d1fae5",
    description: "Flexible document database modeling users, rides, payment histories, and telemetry logs.",
  },
  {
    name: "Express",
    category: "Backend",
    color: "#a855f7",
    atmosphereColor: "#d8b4fe",
    planetType: "violet-moon",
    hasRings: true,
    ringColor: "rgba(168, 85, 247, 0.35)",
    orbitRadius: 4.3,
    speed: 0.3,
    size: 0.32,
    angleOffset: (5 * Math.PI) / 6,
    roughness: 0.4,
    metalness: 0.3,
    specular: "#f3e8ff",
    description: "Lightweight routing and middleware engine connecting clients to database collections securely.",
  },
  {
    name: "Git",
    category: "Tools",
    color: "#f43f5e",
    atmosphereColor: "#fda4af",
    planetType: "ruby-core",
    orbitRadius: 3.4,
    speed: 0.4,
    size: 0.31,
    angleOffset: (5 * Math.PI) / 3,
    roughness: 0.2,
    metalness: 0.7,
    specular: "#ffe4e6",
    description: "Distributed version control managing commits, team branches, and code reproducibility.",
  },
];

// Compatibility export
export const orbitNodes = techPlanets;
