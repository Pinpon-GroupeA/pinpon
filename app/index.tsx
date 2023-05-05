import { Redirect } from 'expo-router';

import useSession from '../hooks/useSession';

export default function App() {
  const { data } = useSession();

  if (data?.session) {
    return <Redirect href="/intervention" />;
  }

  return <Redirect href="/sign-in" />;
}
