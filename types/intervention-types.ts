import { DangerCode, Coordinates } from './types';

export type Intervention = {
  id: string;
  date: string;
  isOngoing: boolean;
  dangerCode: DangerCode;
  address: string;
  customerName: string;
  location: Coordinates;
};
