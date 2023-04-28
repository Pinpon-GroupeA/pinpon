import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

import useProtectedRoute from '../hooks/useProtectedRoutes';

type GuardProps = {
  user?: User;
  children: ReactNode;
};

export default function Guard({ user, children }: GuardProps) {
  useProtectedRoute(user);

  return <>{children}</>;
}
