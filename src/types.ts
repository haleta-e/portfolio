export interface Profile {
  name: string;
  bio: string;
  avatarUrl?: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'all' | 'frontend' | 'java' | 'cpp' | string;
  description: string;
  short_description?: string;
  image: string;
  tech?: string[];
  live?: string;
  github?: string;
  live_demo_url?: string;
  github_url?: string;
  role_and_contribution?: string;
  key_features?: string;
  challenges_and_solutions?: string;
  slug?: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface LearningItem {
  id: number;
  title: string;
  progress: number;
  description?: string;
  name?: string;
}

export interface Experience {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
}

export interface Certificate {
  id: number;
  title: string;
  organization: string;
  image: string;
  description: string;
}

export type ModalType = 'profile' | 'project' | 'skill' | 'learning' | 'experience' | 'certificate' | null;

export interface EditModalState {
  type: ModalType;
  item: any | null; // null means create mode, object means edit mode
  isOpen: boolean;
}
