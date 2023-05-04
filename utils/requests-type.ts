import { supabase } from './supabase';
import { Request } from '../types/request-types';

export type CreateRequestData = Omit<Request, 'id'>;

export const createRequest = async (requests: CreateRequestData) => {
  const { data, error } = await supabase.from('requests').insert(requests);

  if (error) {
    throw error;
  }

  return data;
};
