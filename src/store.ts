import { create } from 'zustand';

export type LayoutContext = 'FOCUS' | 'DISCOVERY' | 'DASHBOARD';

export interface LayoutState {
  context: LayoutContext;
  heatmapDensity: 'LOW' | 'MEDIUM' | 'HIGH';
  sidebarVisible: boolean;
  navPosition: 'TOP' | 'SIDE' | 'BOTTOM';
  cardGrid: number;
  // Actions
  setContext: (ctx: LayoutContext) => void;
  simulateHeatmap: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  context: 'DISCOVERY',
  heatmapDensity: 'LOW',
  sidebarVisible: false,
  navPosition: 'TOP',
  cardGrid: 3,

  setContext: (ctx) => {
    // AI simulation: dynamically infer layout primitives based on context shifts
    switch (ctx) {
      case 'FOCUS':
        set({ context: ctx, sidebarVisible: false, navPosition: 'BOTTOM', cardGrid: 1 });
        break;
      case 'DASHBOARD':
        set({ context: ctx, sidebarVisible: true, navPosition: 'SIDE', cardGrid: 4 });
        break;
      case 'DISCOVERY':
      default:
        set({ context: ctx, sidebarVisible: false, navPosition: 'TOP', cardGrid: 3 });
        break;
    }
  },

  simulateHeatmap: () => {
    // Simulates an AI reading heatmap hotspots and shifting UI density
    const densities: ('LOW' | 'MEDIUM' | 'HIGH')[] = ['LOW', 'MEDIUM', 'HIGH'];
    const newDensity = densities[Math.floor(Math.random() * densities.length)];
    const newGrid = newDensity === 'HIGH' ? 4 : newDensity === 'MEDIUM' ? 3 : 2;
    
    set({ heatmapDensity: newDensity, cardGrid: newGrid });
  }
}));
