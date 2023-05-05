import { supabase } from './supabase';
import { Request } from '../types/request-types';

export const fetchPendingRequests = async () => {
  const { data, error } = await supabase.from('requests').select().eq('status', 'EN_ATTENTE');

  if (error) {
    throw error;
  }

  return data as Request[];
};
