import { create } from 'zustand';

import { data } from '../data';

interface ProjectsState {
  projects: typeof data.projects.projects;
  active: number | null;
  setActive: (active: number | null) => void;
  getItem: (
    index: number | null
  ) => (typeof data.projects.projects)[number] | null;
  getActive: () => (typeof data.projects.projects)[number] | null;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: data.projects.projects,
  active: null,
  setActive: (active) => set({ active }),
  getItem: (index) => {
    if (index === null) return null;
    return data.projects.projects[index] ?? null;
  },
  getActive: () => {
    const active = get().active;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe
    return active !== null ? data.projects.projects[active]! : null;
  },
}));
