import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Providers from '../components/Providers';

export default function Layout() {
  return (
    <Providers>
      <SafeAreaView style={styles.flex}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </Providers>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
