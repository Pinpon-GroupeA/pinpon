import { create } from 'zustand';

import { SymbolsType } from '../types/global-types';
import { CreateInterventionData } from '../types/intervention-types';
import { UserType } from '../types/user';

type SelectedSymbol = {
  symboleType: SymbolsType;
  id?: number;
};

type AppStoreType = {
  role?: UserType;
  setRole: (role: UserType) => void;
  selectedSymbol?: SelectedSymbol;
  setSelectedSymbol: (selectedSymbol?: SelectedSymbol) => void;
  drawingsColor: string;
  setDrawingsColor: (drawingsDangerCode: string) => void;
  interventionCreationData?: CreateInterventionData;
  setInterventionCreationData: (interventionCreationData: CreateInterventionData) => void;
  resetInterventionCreationData: () => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  role: undefined,
  setRole: (role) => set({ role }),
  selectedSymbol: undefined,
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
  drawingsColor: 'black',
  setDrawingsColor: (drawingsDangerCode) => set({ drawingsColor: drawingsDangerCode }),
  interventionCreationData: undefined,
  setInterventionCreationData: (interventionCreationData) => set({ interventionCreationData }),
  resetInterventionCreationData: () => set({ interventionCreationData: undefined }),
}));
