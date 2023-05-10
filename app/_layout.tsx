import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Icon } from 'native-base';

import Providers from '../components/Providers';
import { signOut } from '../utils/auth';

export default function Layout() {
  const router = useRouter();

  return (
    <Providers>
      <Stack
        initialRouteName="/sign-in"
        screenOptions={{
          headerShown: true,
          headerTitle: 'Pinpon',
          headerRight: () => (
            <Icon
              as={MaterialIcons}
              name="logout"
              color="black"
              size="xl"
              onPress={async () => {
                const isDone = await signOut();

                if (isDone) {
                  router.push('/sign-in');
                }
              }}
            />
          ),
        }}
      />
    </Providers>
  );
}
