import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Icon, Badge, Box } from 'native-base';

import Providers from '../components/Providers';
import { useAppStore } from '../stores/store';
import { signOut } from '../utils/auth';

export default function Layout() {
  const router = useRouter();
  const userRole = useAppStore((state) => state.role);

  return (
    <Providers>
      <Stack
        initialRouteName="/sign-in"
        screenOptions={{
          headerShown: true,
          headerTitle: 'Pinpon',
          headerRight: () => (
            <Box flexDirection="row">
              {userRole && (
                <Badge variant="outline" mr={2}>
                  {userRole}
                </Badge>
              )}
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
            </Box>
          ),
        }}
      />
    </Providers>
  );
}
