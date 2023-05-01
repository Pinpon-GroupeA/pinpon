import { DangerCode, Coordinates } from './types';

export type Intervention = {
  id: string;
  date: string;
  isOngoing: boolean;
  dangerCode: DangerCode;
  adress: string;
  customerName: string;
  location: Coordinates;
};
