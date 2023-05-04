import { Intervention, InterventionStatus } from '../types/intervention-types';
import { supabase } from './supabase';

export type CreateInterventionData = Omit<Intervention, 'id' | 'created_at' | 'is_ongoing'>;

export const createIntervention = async (interventionData: CreateInterventionData) => {
  const { error } = await supabase.from('interventions').insert(interventionData);

  if (error) {
    throw error;
  }
};

export const fetchInterventions = async (): Promise<Intervention[]> => {
  const { data, error } = await supabase
    .from('interventions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return data as Intervention[];
};

export const getStatusMessage = (status: InterventionStatus) => {
  switch (status) {
    case 'PENDING':
      return 'En attente';
    case 'ONGOING':
      return 'En cours';
    case 'OVER':
      return 'Terminée';
  }
};

export const getStatusBadgeColor = (status: InterventionStatus) => {
  switch (status) {
    case 'PENDING':
      return 'info';
    case 'ONGOING':
      return 'danger';
    case 'OVER':
      return 'success';
  }
};
