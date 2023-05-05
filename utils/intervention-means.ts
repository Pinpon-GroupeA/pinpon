import { Tables, supabase } from './supabase';

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
