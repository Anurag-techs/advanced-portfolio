export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Full Stack' | 'Desktop Apps' | 'Web Apps';
  subtitle: string;
  shortDescription: string;
  tags: string[];
  image: string;
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  overview: string;
  problem: string;
  features: string[];
  techStack: { name: string; role: string }[];
  architecture: string;
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    description?: string;
  }[];
}

export interface OrbitNode {
  name: string;
  category: string;
  color: string;
  orbitRadius: number;
  speed: number;
  size: number;
  angleOffset: number;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}
