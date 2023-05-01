import { Stack } from 'expo-router';
import { Flex } from 'native-base';

export default function Layout() {
  return (
    <Flex flex={1} px="2" pt="2">
      <Stack screenOptions={{ headerShown: false }} />
    </Flex>
  );
}
