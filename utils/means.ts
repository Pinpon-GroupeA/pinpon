import { Tables, supabase } from './supabase';
import { Coordinates } from '../types/global-types';
import { Mean, MeanTypeEnum } from '../types/mean-types';

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

export const requestsRequest = async (id: Partial<URLSearchParams>): Promise<Request[]> => {
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
