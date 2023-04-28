import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { getSession } from '../utils/session';

type SessionQuery = {
  session?: Session;
};

export default function useSession() {
  return useQuery<SessionQuery>({
    queryKey: ['session'],
    queryFn: getSession,
  });
}
