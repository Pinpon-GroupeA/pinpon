import { Coordinates, DangerCode } from './types';

export type Intervention = {
  id: number;
  date: string;
  isOngoing: boolean;
  dangerCode: DangerCode;
  address: string;
  customerName: string;
  location: Coordinates;
};

export type InterventionStatus = 'PENDING' | 'ONGOING' | 'OVER';
