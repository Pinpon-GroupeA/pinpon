import { create } from 'zustand';

import { UserType } from '../types/user';

type AppStoreType = {
  role: UserType;
  setRole: (role: UserType) => void;
  selectedSymbol?: string;
  setSelectedSymbol: (selectedSymbol?: string) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  role: 'COS',
  setRole: (role) => set({ role }),
  selectedSymbol: undefined,
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
}));
