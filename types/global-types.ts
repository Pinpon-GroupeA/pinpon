export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type DangerCode = 'INC' | 'SAP' | 'EAU' | 'PART' | 'COM' | 'OTHER';

export type SymbolsType =
  | 'FireFighterVehicle'
  | 'Star'
  | 'InvertedTriangle'
  | 'Triangle'
  | 'Explosion';

export type SizeType = {
  width: number;
  height: number;
};
