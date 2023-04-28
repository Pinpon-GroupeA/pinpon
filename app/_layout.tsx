import { Slot } from 'expo-router';
import { Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import Providers from '../components/Providers';

export default function Layout() {
  return (
    <Providers>
      <SafeAreaView>
        <Box pt="2" px="2">
          <Slot />
        </Box>
      </SafeAreaView>
    </Providers>
  );
}
