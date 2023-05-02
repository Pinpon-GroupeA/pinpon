import { Coordinates, DangerCode } from './global-types';

export type Mean = {
  id: string;
  label: string;
  requestTime: string;
  schduledArrivalTime: string;
  CRMArrivalTime: string;
  onSiteArrivalTime: string;
  availableTime: string;
  location: Coordinates;
  meanType: MeanType;
  dangerCode: DangerCode;
};

export type MeanType = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';
