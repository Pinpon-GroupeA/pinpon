import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

type GuardProps = {
  user?: User;
  children: ReactNode;
};

export default function Guard({ user, children }: GuardProps) {
  // useProtectedRoute(user);

  return <>{children}</>;
}
