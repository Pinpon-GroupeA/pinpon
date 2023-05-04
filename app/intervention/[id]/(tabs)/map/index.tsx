import { Stack } from 'expo-router';
import { Box } from 'native-base';

export default function Map() {
  return (
    <Box flex="1">
      <Stack.Screen options={{ title: 'Carte' }} />
    </Box>
  );
  // return <MapBackground />;
}
