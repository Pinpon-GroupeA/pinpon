import { Stack } from 'expo-router';
import { Box } from 'native-base';

import MapBackground from '../../../../../components/map/MapBackground';

export default function Map() {
  return (
    <Box flex="1">
      <Stack.Screen options={{ title: 'Carte' }} />
      <MapBackground />
    </Box>
  );
}
