import { supabase } from './supabase';
import { UserType } from '../types/user';

export const getUserType = async (email: string): Promise<UserType> => {
  const { data, error } = await supabase.from('user').select('role').eq('email', email);

  if (error) {
    throw new Error(error.message);
  }

  return data?.at(0)?.role as UserType;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
