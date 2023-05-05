import { MeanType } from './mean-types';

export type Request = {
  id: number;
  status: RequestStatus;
  request_time: string;
  mean_type: MeanType;
};

export type RequestStatus = 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
