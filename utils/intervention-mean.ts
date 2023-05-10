import { Tables, supabase } from './supabase';
import { DangerCode } from '../types/global-types';
import { InterventionMean, Mean } from '../types/mean-types';

export type InterventionMeanCreateType = Omit<
  InterventionMean,
  | 'id'
  | 'means'
  | 'scheduled_arrival'
  | 'crm_arrival'
  | 'sector_arrival'
  | 'available_at'
  | 'danger_code'
>;

export const fecthInterventionMeans = async (interventionId?: string | string[]) => {
  if (!interventionId) {
    return [];
  }

  const { data, error } = await supabase
    .from(Tables.interventionMeansLink)
    .select('*, means(*)')
    .eq('intervention_id', interventionId);

  if (error) {
    throw error;
  }

  return data as InterventionMean[];
};

export const createInterventionMean = async (mean: InterventionMeanCreateType) => {
  const { error } = await supabase.from(Tables.interventionMeansLink).insert([mean]);

  if (error) {
    throw error;
  }
};

export const updateInterventionMeanDangerCode = async (meanId: number, dangerCode: DangerCode) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ danger_code: dangerCode })
    .eq('mean_id', meanId);

  if (error) {
    throw error;
  }
};

export const getFireFighterMeansNotPlaced = (interventionMeans: InterventionMean[]) => {
  return interventionMeans.filter((interventionMean) => !interventionMean.means.location);
};

export const getFireFightersMeansPlaced = (interventionMeans: InterventionMean[]) => {
  return interventionMeans.filter((interventionMean) => interventionMean.means.location);
};

export const getMeansOfInterventionMean = async (interventionMean: InterventionMean) => {
  const { data, error } = await supabase
    .from(Tables.means)
    .select('*')
    .eq('id', interventionMean.mean_id);

  if (error) {
    throw error;
  }

  interventionMean.means = data[0] as Mean;

  return interventionMean as InterventionMean;
};

export const updateCrmArrivalDate = async (meanId: number) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ crm_arrival: 'now()' })
    .eq('id', meanId);

  if (error) {
    throw error;
  }
};

export const updateSectorArrivalDate = async (meanId: number) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ sector_arrival: 'now()' })
    .eq('id', meanId);

  if (error) {
    throw error;
  }
};

export const updateAvailableAtDate = async (meanId: number) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ available_at: 'now()' })
    .eq('id', meanId);

  if (error) {
    throw error;
  }
};

export const updateIsOnSite = async (meanId: number, isOnSite: boolean) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ is_on_site: isOnSite })
    .eq('id', meanId);

  if (error) {
    throw error;
  }
};
