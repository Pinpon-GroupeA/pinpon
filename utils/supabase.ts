
import { createClient } from '@supabase/supabase-js';
import {ANON_KEY, API_EXTERNAL_URL} from '@env'
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

export const supabase = createClient(API_EXTERNAL_URL,ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const Tables = {
  INTERVENTIONS: 'interventions',
  INTERVENTIONS_MEANS_LINK: 'interventions_means_link',
  INTERVENTIONS_DANGER_LINK: 'interventions_danger_link',
  MEANS: 'means',
  REQUESTS: 'Requests',
  PROFILES: 'profiles'
}

export const Columns = {
  ID: 'id',
  LOCATION: 'location',
  INTERVENTION_ID: 'intervention_id'
}