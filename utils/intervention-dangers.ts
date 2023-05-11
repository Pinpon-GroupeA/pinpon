import { Tables, supabase } from './supabase';
import { Coordinates } from '../types/global-types';
import { OtherMean } from '../types/mean-types';

export const fetchInterventionDangers = async (interventionId?: string | string[]) => {
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

export const deleteOtherMean = async (otherMeanId: number) => {
  const { error } = await supabase.from(Tables.otherMeans).delete().eq('id', otherMeanId);

  if (error) {
    throw error;
  }
};

export const updateOtherMeanLocation = async (otherMeanId: number, location: Coordinates) => {
  const { error } = await supabase
    .from(Tables.otherMeans)
    .update({ location })
    .eq('id', otherMeanId);

  if (error) {
    throw error;
  }
};

export const getOtherMeansPlaced = (otherMeans: OtherMean[]) => {
  return otherMeans.filter((otherMean) => otherMean.location);
};
