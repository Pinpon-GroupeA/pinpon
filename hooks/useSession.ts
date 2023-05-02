import { useQuery } from '@tanstack/react-query';

import { getSession } from '../utils/session';

export default function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
  });
}
