import { Tables, supabase } from './supabase';
import { Request } from '../types/request-types';

export const fetchRequests = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase.from(Tables.requests).select();

  if (error) {
    throw error;
  }

  return data as Request[];
};

export const deleteRequest = async (requestId: number) => {
  const { error } = await supabase.from(Tables.requests).delete().eq('id', requestId);

  if (error) {
    throw error;
  }
};
