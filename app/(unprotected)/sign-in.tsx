import { Stack } from 'expo-router';

import Auth from '../../components/auth/LoginForm';

export default function SignIn() {
  return (
    <>
      <Stack.Screen options={{ title: 'Connexion', headerShown: false }} />
      <Auth />
    </>
  );
}
