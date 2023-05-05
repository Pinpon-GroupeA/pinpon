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

export const requestsRequest = async (id: string): Promise<Request[]> => {
  const { data, error } = await supabase.from('Requests').select('*').eq('id_inter', id);
  if (error) {
    throw new Error(error.message);
  }
  return data as Request[];
};

export const meansRequest = async (id: string): Promise<Mean[]> => {
  const { data, error } = await supabase
    .from('interventions_means_link')
    .select('*')
    .eq('intervention_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data as Mean[];
};

export const getlocalTime = (): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
};

export const sendCRM = async (id: string) => {
  await supabase
    .from('interventions_means_link')
    .update({ crm_arrival: getlocalTime() })
    .eq('id', id);
};

export const sendSector = async (id: string) => {
  await supabase
    .from('interventions_means_link')
    .update({ sector_arrival: getlocalTime() })
    .eq('id', id);
};

export const sendAvailable = async (id: string) => {
  await supabase
    .from('interventions_means_link')
    .update({ available_at: getlocalTime() })
    .eq('id', id);
};

export const deleteMeans = async (id: string) => {
  await supabase.from('Requests').delete().eq('id', id);
};

export const getMilitaryTime = (date: string) => {
  return date.slice(11, 13) + date.slice(14, 16);
};

export const getDate = (date: string) => {
  let hour = parseInt(date.slice(11, 13), 2);
  let min = parseInt(date.slice(14, 16), 2);
  let hourS = '';
  let minS = '';
  min += 20;
  if (min > 59) {
    min = min - 60;
    hour++;
    if (hour === 24) {
      hour = 0;
    }
  }

  if (min < 10) {
    minS = '0' + min.toString();
  } else {
    minS = min.toString();
  }

  if (hour < 10) {
    hourS = '0' + hour.toString();
  } else {
    hourS = hour.toString();
  }

  return hourS + minS;
};
