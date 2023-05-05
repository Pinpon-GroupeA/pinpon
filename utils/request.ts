import { supabase } from './supabase';
import { Request } from '../types/request-types';

export const fetchPendingRequests = async () => {
  const { data, error } = await supabase.from('requests').select().eq('status', 'EN_ATTENTE');

  if (error) {
    throw error;
  }

  return data as Request[];
};

export const deleteRequest = async (requestId: number) => {
  const { error } = await supabase.from('requests').delete().eq('id', requestId);

  if (error) {
    throw error;
  }
};
