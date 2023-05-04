import { MeanTypeEnum } from './mean-types';

export type Request = {
  id: number;
  intervention_id: number;
  status: RequestStatus;
  request_time: string;
  mean_type: MeanTypeEnum;
};

export type RequestStatus = 'ACCEPTEE' | 'EN_ATTENTE' | 'REFUSEE';
