import { Coordinates, DangerCode } from './types';

export type Intervention = {
  id: string;
  start_date: string;
  is_ongoing: boolean;
  danger_code: DangerCode;
  address?: string;
  customerName?: string;
  location: Coordinates;
};
