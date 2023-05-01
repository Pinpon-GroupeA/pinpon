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

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MeanType = 'VSAV' | 'FPT' | 'VLCG' | 'OTHER';

export type DangerCode = 'INC' | 'SAP';

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
