import { Coordinates, DangerCode } from './global-types';

export type InterventionMean = {
  id: number;
  intervention_id: number;
  mean_id: number;
  means: Mean;
  request_date: string;
  acheduled_arrival: string;
  crm_arrival: string;
  sector_arrival: string;
  available_at: string;
  danger_code: DangerCode;
  using_crm: boolean;
  is_on_site: boolean;
};

export type Mean = {
  id: number;
  label: string;
  is_available: boolean;
  mean_type: MeanType;
  location: Coordinates;
  firefighter_related: string;
};

export type OtherMean = {
  id: number;
  danger_code: DangerCode;
  intervention_id: number;
  location: Coordinates;
  category: MeanCategory;
};

export type MeanType = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';

export type MeanCategory = 'PS' | 'SD' | 'ZA';
