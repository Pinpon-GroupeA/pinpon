import { Tables, supabase } from './supabase';
import { Request } from '../types/request-types';

export type CreateRequestData = Omit<Request, 'id'>;

export const createRequests = async (requests: CreateRequestData[]) => {
  const { data, error } = await supabase.from(Tables.requests).insert(requests).select();

  if (error) {
    throw error;
  }

  return data as Request[];
};
