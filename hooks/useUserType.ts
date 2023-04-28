import { useQuery } from '@tanstack/react-query';

import { getUserType } from '../utils/user';

export default function useUserType(email: string) {
  return useQuery({
    queryKey: ['userType', email],
    queryFn: () => getUserType(email),
  });
}
