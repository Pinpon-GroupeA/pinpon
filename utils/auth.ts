import { supabase } from './supabase';

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
};
