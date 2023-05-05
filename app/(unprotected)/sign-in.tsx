import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Auth from '../../components/auth/LoginForm';

export default function SignIn() {
  return (
    <SafeAreaView style={styles.flex}>
      <Stack.Screen options={{ title: 'Connexion', headerShown: false }} />
      <Auth />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
