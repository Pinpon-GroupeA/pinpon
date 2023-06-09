import { DangerCode, Coordinates } from './global-types';

export type Intervention = {
  id: number;
  created_at: string;
  is_ongoing: boolean;
  danger_code: DangerCode;
  status_intervention: InterventionStatus;
  address?: string;
  customerName?: string;
  location: Coordinates;
};

export type CreateInterventionData = Omit<Intervention, 'id' | 'created_at' | 'is_ongoing'>;

export type InterventionStatus = 'PENDING' | 'ONGOING' | 'OVER';

export type InterventionListData = Intervention & {
  pendingRequests: number;
};
