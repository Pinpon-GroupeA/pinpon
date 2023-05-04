import { location, DangerCode } from './types';

export type Mean = {
  id: string;
  label: string;
  requestTime: string;
  schduledArrivalTime: string;
  CRMArrivalTime: string;
  onSiteArrivalTime: string;
  availableTime: string;
  location: location;
  meanType: MeanType;
  dangerCode: DangerCode;
};

export type MeanType = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';
