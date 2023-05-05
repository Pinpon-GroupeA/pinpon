import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import debounce from 'lodash.debounce';
import { Button, FormControl, Heading, Icon, Input, ScrollView, Select, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DangerCode } from '../../types/types';
import { searchCoordinates } from '../../utils/geocoding';
import { CreateInterventionData, createIntervention } from '../../utils/intervention';
import ErrorModal from '../ErrorModal';

type FormInputs = {
  dangerType: DangerCode;
  street?: string;
  postalCode: string;
  city: string;
  longitude: number;
  latitude: number;
};

export default function InterventionCreationForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      dangerType: undefined,
      street: '',
      latitude: NaN,
      longitude: NaN,
    },
  });
  const [error, setError] = useState('');

  const { refetch } = useQuery(['geocoding'], {
    queryFn: () => {
      const { street, postalCode, city } = getValues();

      if (!street || !postalCode || !city)
        return Promise.resolve({ latitude: NaN, longitude: NaN });

      return searchCoordinates({ street, city, postalcode: postalCode });
    },
    enabled: false,
  });

  const onSubmit = async ({
    dangerType,
    street,
    postalCode,
    city,
    latitude,
    longitude,
  }: FormInputs) => {
    try {
      await mutateAsync({
        danger_code: dangerType,
        address: `${street} ${postalCode} ${city}`,
        status_intervention: 'PENDING',
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

    // ToastAndroid.show('intervention créée', ToastAndroid.SHORT);
  };

  const getAddressCoordinates = async () => {
    const { data } = await refetch();

    if (data?.latitude && data?.longitude) {
      setValue('latitude', data.latitude);
      setValue('longitude', data.longitude);
    }
  };

  const debouncedGetAddressCoordinates = useCallback(debounce(getAddressCoordinates, 500), []);

  useEffect(() => () => debouncedGetAddressCoordinates.cancel(), [getValues]);

  const { mutateAsync, isLoading } = useMutation({
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
      <ScrollView mb="5%">
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
        <FormControl isInvalid={'street' in errors}>
          <FormControl.Label>Rue</FormControl.Label>
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(newValue) => {
                  onChange(newValue);

                  if (newValue && newValue !== '') {
                    debouncedGetAddressCoordinates();
                  }
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>{errors.street?.message}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'postalCode' in errors}>
          <FormControl.Label>Code postal</FormControl.Label>
          <Controller
            control={control}
            name="postalCode"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                inputMode="numeric"
                onBlur={onBlur}
                onChangeText={(newValue) => {
                  onChange(newValue);

                  if (newValue && newValue !== '') {
                    debouncedGetAddressCoordinates();
                  }
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>{errors.postalCode?.message}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'city' in errors}>
          <FormControl.Label>Ville</FormControl.Label>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(newValue) => {
                  onChange(newValue);

                  if (newValue && newValue !== '') {
                    debouncedGetAddressCoordinates();
                  }
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>{errors.city?.message}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'latitude' in errors}>
          <FormControl.Label>Latitude</FormControl.Label>
          <Controller
            control={control}
            name="latitude"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                value={isNaN(value) ? '' : String(value)}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="numeric"
              />
            )}
          />
          <FormControl.ErrorMessage>{errors.latitude?.message}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'longitude' in errors}>
          <FormControl.Label>Longitude</FormControl.Label>
          <Controller
            control={control}
            name="longitude"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                value={isNaN(value) ? '' : String(value)}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="numeric"
              />
            )}
          />
          <FormControl.ErrorMessage>{errors.longitude?.message}</FormControl.ErrorMessage>
        </FormControl>
        <Button mt="6" disabled={isLoading} colorScheme="teal" onPress={handleSubmit(onSubmit)}>
          Créer
        </Button>
        <Button
          mt="2"
          disabled={isLoading}
          colorScheme="teal"
          variant="outline"
          onPress={() => reset()}
        >
          Réinitialiser
        </Button>
      </ScrollView>
      <ErrorModal message={error} isOpen={error !== ''} onClose={() => setError('')} />
    </VStack>
  );
}
