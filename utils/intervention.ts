import { supabase } from './supabase';
import { Coordinates } from '../types/global-types';
import { Intervention, InterventionStatus } from '../types/intervention-types';

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

export const fetchInterventionLocation = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from('interventions')
    .select('location')
    .eq('id', interventionId);

  if (error) {
    throw error;
  }

  return data[0]?.location as Coordinates;
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

export const castInterventionIdAsNumber = (interventionId?: string | string[]) => {
  if (!interventionId) {
    return 0;
  }

  return parseInt(interventionId as string, 10);
};
