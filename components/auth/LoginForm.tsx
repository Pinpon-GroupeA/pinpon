import { useRouter } from 'expo-router';
import { Box, Button, Center, FormControl, Heading, Input, ScrollView, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Colors from '../../constants/colors';
import useLogin from '../../hooks/useLogin';
import { useAppStore } from '../../stores/store';
import { UserType } from '../../types/user';
import ErrorModal from '../ErrorModal';

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [error, setError] = useState('');
  const router = useRouter();
  const { mutateAsync, isLoading } = useLogin();
  const setUserType = useAppStore((state) => state.setRole);

  const signIn = async (email: string, password: string, type: UserType) => {
    try {
      await mutateAsync({ email, password });
      setUserType(type);
      router.replace('/intervention');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <ScrollView>
      <Center w="100%">
        <Box p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            🚨 Pinpon
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Connectez-vous pour continuer
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur } }) => (
                  <Input
                    variant="filled"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    bgColor="white"
                    _focus={{ borderColor: Colors.TURQUOISE }}
                  />
                )}
              />
              <FormControl.ErrorMessage>{errors.email?.message}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur } }) => (
                  <Input
                    variant="filled"
                    type="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    bgColor="white"
                    _focus={{ borderColor: Colors.TURQUOISE }}
                  />
                )}
              />
              <FormControl.ErrorMessage>{errors.password?.message}</FormControl.ErrorMessage>
            </FormControl>
            <Button
              mt="2"
              disabled={isLoading}
              colorScheme="teal"
              onPress={handleSubmit(({ email, password }) => signIn(email, password, 'CODIS'))}
            >
              Connexion CODIS
            </Button>
            <Button
              mt="2"
              disabled={isLoading}
              colorScheme="teal"
              onPress={handleSubmit(({ email, password }) => signIn(email, password, 'COS'))}
            >
              Connexion COS
            </Button>
          </VStack>
        </Box>

        <ErrorModal message={error} isOpen={error !== ''} onClose={() => setError('')} />
      </Center>
    </ScrollView>
  );
}
