import { create } from 'zustand';


// This is the data for the navbar items
type NavLinkState = {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

// setup to use global navlink state for highlighting active tab
export const useNavStore = create<NavLinkState>((set) => ({
    activeIndex: 0,
    setActiveIndex: (index) => set(() => ({ activeIndex: index })),
}));