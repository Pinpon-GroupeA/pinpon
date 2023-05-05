import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { Icon } from 'native-base';

import Providers from '../components/Providers';
import { signOut } from '../utils/auth';

export default function Layout() {
  const navigation = useNavigation();
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
                  navigation.dispatch({ type: 'POP_TO_TOP' });
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
