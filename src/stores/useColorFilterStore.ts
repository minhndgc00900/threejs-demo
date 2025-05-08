import { create } from 'zustand';

interface ColorFilter {
  threshold: number;
  color: string;
}

interface ColorFilterState {
  activeFilter: ColorFilter | null;
  setActiveFilter: (filter: ColorFilter | null) => void;
}

const useColorFilterStore = create<ColorFilterState>((set) => ({
  activeFilter: null,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));

export default useColorFilterStore; 