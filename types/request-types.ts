import { MeanType } from './mean-types';

export type Request = {
  id: number;
  status: RequestStatus;
  requestDate: string;
  requestedMeanType: MeanType;
};

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
