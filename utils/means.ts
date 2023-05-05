import { InterventionMeansLinkColumns, Tables, supabase } from './supabase';
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

export const meansRequest = async (id: number): Promise<Mean[]> => {
  const { data, error } = await supabase
    .from(Tables.interventionMeansLink)
    .select('*')
    .eq(InterventionMeansLinkColumns.interventionId, id);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data as Mean[];
};

export const getlocalTime = (): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
};

export const sendCRM = async (id: number) => {
  await supabase
    .from(Tables.interventionMeansLink)
    .update({ crm_arrival: getlocalTime() })
    .eq('id', id);
};

export const sendSector = async (id: number) => {
  await supabase
    .from(Tables.interventionMeansLink)
    .update({ sector_arrival: getlocalTime() })
    .eq('id', id);
};

export const sendAvailable = async (id: number) => {
  await supabase
    .from(Tables.interventionMeansLink)
    .update({ available_at: getlocalTime() })
    .eq('id', id);
};

export const deleteMeans = async (id: number) => {
  await supabase.from(Tables.requests).delete().eq('id', id);
};
