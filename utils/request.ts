import { supabase } from './supabase';
import { Request } from '../types/request-types';

export const fetchRequestsOfIntervention = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from('requests')
    .select()
    .eq('intervention_id', interventionId);

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
