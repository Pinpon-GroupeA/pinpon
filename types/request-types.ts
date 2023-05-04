import { MeanType } from './mean-types';

export type Request = {
  id: number;
  status: RequestStatus;
  request_date: string;
  mean_type: MeanType;
};

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REFUSED';
