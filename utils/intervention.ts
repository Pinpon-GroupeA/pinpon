import { Intervention } from '../types/intervention-types';
import { supabase } from './supabase';

export type CreateInterventionData = Omit<Intervention, 'id' | 'start_date' | 'is_ongoing'>;

export const createIntervention = async (interventionData: CreateInterventionData) => {
  const { data, error } = await supabase.from('Interventions').insert(interventionData);

  if (error) {
    throw error;
  }

  return data;
};

export const fetchInterventions = async (): Promise<Intervention[]> => {
  const { data, error } = await supabase
    .from('Interventions')
    .select('*')
    .order('start_date', { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return data as Intervention[];
};
