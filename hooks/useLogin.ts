import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../utils/supabase';

type LoginParams = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginParams) => login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
    },
  });
}
