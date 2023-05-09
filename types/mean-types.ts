import { Coordinates, DangerCode } from './global-types';

export type InterventionMean = {
  id: number;
  intervention_id: number;
  mean_id: number;
  means: Mean;
  request_date: string;
  scheduled_arrival: string;
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
  location: Coordinates;
  firefighter_related: string;
  mean_type: MeanTypeEnum;
  danger_code: DangerCode;
};

export type OtherMean = {
  id: number;
  danger_code: DangerCode;
  intervention_id: number;
  location: Coordinates;
  category: MeanCategory;
  points: Coordinates[];
};

export type MeanCategory = 'PS' | 'SD' | 'ZA' | 'PL';

export type MeanTypeEnum = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';

export type MeanType = {
  id: number;
  mean_type: MeanTypeEnum;
  label: string;
  firefighter_related: boolean;
};

export type MeanModalProps = {
  id: number;
  crmArrival: string | null;
  sectorArrival: string | null;
  availableAt: string | null;
};
