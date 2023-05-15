import { Tables, supabase } from './supabase';
import { Coordinates } from '../types/global-types';
import {
  CreateInterventionData,
  Intervention,
  InterventionStatus,
} from '../types/intervention-types';

export const createIntervention = async (interventionData: CreateInterventionData) => {
  const { data, error } = await supabase.from('interventions').insert(interventionData).select();

  if (error) {
    throw error;
  }

  return data as Intervention[];
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

export const deleteIntervention = async (id: number) => {
  const { data, error } = await supabase.from('interventions').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

export const markAsCompleted = async (id: number) => {
  const { data, error } = await supabase
    .from('interventions')
    .update({ status_intervention: 'OVER' })
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
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

export const fetchInterventionAddressDangerCodeAndDate = async (
  interventionId?: string | string[]
) => {
  const { data, error } = await supabase
    .from(Tables.interventions)
    .select('address, danger_code, created_at')
    .eq('id', interventionId);

  if (error) {
    throw error;
  }

  return data[0] as { address: string; danger_code: string; created_at: string };
};

export const fetchInterventionsIdAddressAndDate = async () => {
  const { data, error } = await supabase
    .from(Tables.interventions)
    .select('id,address, created_at');

  if (error) {
    throw error;
  }

  return data as { id: number; address: string; created_at: string }[];
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
