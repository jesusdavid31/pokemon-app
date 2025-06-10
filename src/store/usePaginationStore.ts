import { create } from 'zustand';

interface PaginationState {
    page: number;
    setPage: (newPage: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    setPage: (newPage) => set({ page: newPage }),
}));