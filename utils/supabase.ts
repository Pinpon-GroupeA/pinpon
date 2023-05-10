import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const Tables = {
  interventions: 'interventions',
  interventionMeansLink: 'interventions_means_link',
  otherMeans: 'interventions_danger_link',
  means: 'means',
  meansTypes: 'means_types',
  requests: 'requests',
  profiles: 'profiles',
  users: 'users',
  droneData: 'drone_data',
};

export const InterventionColumns = {
  id: 'id',
  dangerCode: 'danger_code',
  address: 'address',
  location: 'location',
  statusIntervention: 'status_intervention',
  createdAt: 'created_at',
};

export const InterventionMeansLinkColumns = {
  id: 'id',
  interventionId: 'intervention_id',
  meanId: 'mean_id',
  dangerCode: 'danger_code',
  usingCrm: 'using_crm',
  requestDate: 'request_date',
  scheduledArrival: 'scheduled_arrival',
  crmArrival: 'crm_arrival',
  sectorArrival: 'sector_arrival',
  isOnSite: 'is_on_site',
};

export const DroneColumns = {
  id: 'id',
  interventionId: 'intervention_id',
  position: 'position',
  currentTime: 'current_time',
  trajectType: 'traject_type',
  traject: 'traject',
  isStopped: 'is_stopped',
};

export const InterventionDangerLinkColumns = {
  id: 'id',
  interventionId: 'intervention_id',
  dangerCode: 'danger_code',
  location: 'location',
};

export const MeansColumns = {
  id: 'id',
  label: 'label',
  isAvailable: 'is_available',
  meanType: 'mean_type',
  location: 'location',
  fireFighterRelated: 'fire_fighter_related',
};

export const MeansTypesColumns = {
  id: 'id',
  meanType: 'mean_type',
  label: 'label',
  fireFighterRelated: 'fire_fighter_related',
};

export const RequestsColumns = {
  id: 'id',
  interventionId: 'intervention_id',
  status: 'status',
  request_time: 'request_time',
  meanType: 'mean_type',
};

export const UsersColumns = {
  id: 'id',
  email: 'email',
};
