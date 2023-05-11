import { MeanTypeEnum } from './mean-types';

export type Request = {
  id: number;
  intervention_id: number;
  request_time: string;
  mean_type: MeanTypeEnum;
};

export type NumberOfRequests = {
  intervention_id: number;
  number_of_requests: number;
};

export type RequestStatus = 'ACCEPTEE' | 'EN_ATTENTE' | 'REFUSEE';
