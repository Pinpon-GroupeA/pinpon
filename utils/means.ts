import { Tables, supabase } from './supabase';
import { Coordinates, DangerCode } from '../types/global-types';
import { InterventionMean, Mean, OtherMean } from '../types/mean-types';

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

export const updateMeanLocation = async (meanId: number, location: Coordinates) => {
  const { error } = await supabase.from(Tables.means).update({ location }).eq('id', meanId);

  if (error) {
    throw error;
  }
};

export const updateMeanDangerCode = async (meanId: number, dangerCode: DangerCode) => {
  const { error } = await supabase
    .from(Tables.interventionMeansLink)
    .update({ danger_code: dangerCode })
    .eq('mean_id', meanId);

  if (error) {
    throw error;
  }
};

export const fetchOtherMeans = async (interventionId?: string | string[]) => {
  if (!interventionId) {
    return [];
  }

  const { data, error } = await supabase
    .from(Tables.otherMeans)
    .select('*')
    .eq('intervention_id', interventionId);

  if (error) {
    throw error;
  }

  return data as OtherMean[];
};

export const createOtherMean = async (otherMean: OtherMean) => {
  const { error } = await supabase.from(Tables.otherMeans).insert([otherMean]);

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

export const getOtherMeansPlaced = (otherMeans: OtherMean[]) => {
  return otherMeans.filter((otherMean) => otherMean.location);
};

export const getInterventionMeanFromMean = async (interventionMean: InterventionMean) => {
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
