import { Spinner, Text } from 'native-base';
import { ReactNode } from 'react';

import Guard from './Guard';
import useSession from '../hooks/useSession';

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { data, isLoading, isError } = useSession();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Error while fetching user</Text>;
  }

  return <Guard user={data?.session?.user}>{children}</Guard>;
}
