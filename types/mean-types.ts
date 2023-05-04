import { Coordinates, DangerCode } from './types';

export type Mean = {
  id: number;
  label: string;
  requestTime: string;
  schduledArrivalTime: string;
  CRMArrivalTime: string;
  onSiteArrivalTime: string;
  availableTime: string;
  location: Coordinates;
  meanType: MeanTypeEnum;
  dangerCode: DangerCode;
};

export type MeanTypeEnum = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';

export type MeanType = {
  id: number;
  mean_type: MeanTypeEnum;
  label: string;
  firefighter_related: boolean;
};
