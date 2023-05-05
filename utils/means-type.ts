import { supabase } from './supabase';
import { MeanType } from '../types/mean-types';

export type CreateInterventionData = Omit<MeanType, 'id'>;

export const fetchMeansTypes = async (): Promise<MeanType[]> => {
  const { data, error } = await supabase
    .from('means_type')
    .select('mean_type, label')
    .eq('firefighter_related', true);

  if (error) {
    throw error;
  }

  return data as MeanType[];
};
