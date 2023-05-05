import { Tables, supabase } from './supabase';
import { Coordinates } from '../types/global-types';
import { MeanTypeEnum } from '../types/mean-types';

export const fetchAvailableMeans = async (meanType: MeanTypeEnum) => {
  const { data, error } = await supabase
    .from(Tables.means)
    .select('id')
    .eq('is_available', true)
    .eq('mean_type', meanType);

  if (error) {
    throw error;
  }

  return data as { id: number }[];
};

export const updateMeanLocation = async (meanId: number, location: Coordinates) => {
  const { error } = await supabase.from(Tables.means).update({ location }).eq('id', meanId);

  if (error) {
    throw error;
  }
};

export const updateMeanStatus = async (meanId: number, is_available: boolean) => {
  const { error } = await supabase.from(Tables.means).update({ is_available }).eq('id', meanId);

  if (error) {
    throw error;
  }
};
