import { MaterialIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Button, FormControl, Heading, Icon, Input, Select, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DangerCode } from '../../types/types';
import { CreateInterventionData, createIntervention } from '../../utils/intervention';
import ErrorModal from '../ErrorModal';

type FormInputs = {
  dangerType: DangerCode;
  address?: string;
  longitude: number;
  latitude: number;
};

export default function InterventionCreationForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [error, setError] = useState('');

  const onSubmit = async ({ dangerType, address, latitude, longitude }: FormInputs) => {
    try {
      await mutateAsync({
        danger_code: dangerType,
        address,
        location: {
          longitude,
          latitude,
        },
      });
    } catch (error) {
      setError((error as Error).message);
      return;
    }

    router.push('/intervention');

    // ToastAndroid.show('Intervention créée', ToastAndroid.SHORT);
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateInterventionData) => createIntervention(data),
  });

  return (
    <VStack space={3} mt="5" mx="2">
      <Heading
        _dark={{
          color: 'warmGray.200',
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="md"
      >
        Création d'une intervention
      </Heading>
      <FormControl isRequired isInvalid={'language' in errors}>
        <FormControl.Label>Type de danger</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Choisir un type de danger"
              selectedValue={value}
              onValueChange={(itemValue: string) => {
                onChange(itemValue);
              }}
              _selectedItem={{
                bg: 'teal.500',
              }}
              dropdownOpenIcon={<Icon as={MaterialIcons} name="arrow-drop-up" size={6} />}
              dropdownCloseIcon={<Icon as={MaterialIcons} name="arrow-drop-down" size={6} />}
            >
              <Select.Item label="Incendie" value="INC" />
              <Select.Item label="Secours à personne" value="SAP" />
            </Select>
          )}
          name="dangerType"
          rules={{ required: 'Field is required' }}
        />
        <FormControl.ErrorMessage>{errors.dangerType?.message}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={'address' in errors}>
        <FormControl.Label>Adresse</FormControl.Label>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur } }) => (
            <Input onBlur={onBlur} onChangeText={onChange} />
          )}
        />
        <FormControl.ErrorMessage>{errors.address?.message}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={'latitude' in errors}>
        <FormControl.Label>Lattitude</FormControl.Label>
        <Controller
          control={control}
          name="latitude"
          render={({ field: { onChange, onBlur } }) => (
            <Input onBlur={onBlur} onChangeText={onChange} inputMode="numeric" />
          )}
        />
        <FormControl.ErrorMessage>{errors.latitude?.message}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={'longitude' in errors}>
        <FormControl.Label>Longitude</FormControl.Label>
        <Controller
          control={control}
          name="longitude"
          render={({ field: { onChange, onBlur } }) => (
            <Input onBlur={onBlur} onChangeText={onChange} inputMode="numeric" />
          )}
        />
        <FormControl.ErrorMessage>{errors.longitude?.message}</FormControl.ErrorMessage>
      </FormControl>
      <Button
        mt="2"
        // disabled={isLoading}
        colorScheme="teal"
        onPress={handleSubmit(onSubmit)}
      >
        Créer
      </Button>
      <ErrorModal message={error} isOpen={error !== ''} onClose={() => setError('')} />
    </VStack>
  );
}
