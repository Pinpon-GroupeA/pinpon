import { Tables, supabase } from './supabase';
import { Request } from '../types/request-types';

export const fetchRequestsOfIntervention = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from(Tables.requests)
    .select()
    .eq('intervention_id', interventionId);

  if (error) {
    throw error;
  }

  return data as Request[];
};

export const fetchNumberOfRequests = async () => {
  const { count, error } = await supabase.from(Tables.requests).select('*', { count: 'exact' });

  if (error) {
    throw error;
  }

  return count as number;
};

export const fetchNumberOfRequestsOfIntervention = async (
  interventionId: number
): Promise<number> => {
  const { count, error } = await supabase
    .from(Tables.requests)
    .select('*', { count: 'exact' })
    .eq('intervention_id', interventionId);

  if (error) {
    throw error;
  }

  return count as number;
};

export const deleteRequest = async (requestId: number) => {
  const { error } = await supabase.from(Tables.requests).delete().eq('id', requestId);

  if (error) {
    throw error;
  }
};
