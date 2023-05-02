import { DangerCode, Coordinates } from './global-types';

export type Intervention = {
  id: string;
  created_at: string;
  is_ongoing: boolean;
  danger_code: DangerCode;
  status_intervention: InterventionStatus;
  address?: string;
  customerName?: string;
  location: Coordinates;
};

export type InterventionStatus = 'PENDING' | 'ONGOING' | 'OVER';
