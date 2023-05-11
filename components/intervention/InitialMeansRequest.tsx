import { useRouter } from 'expo-router';
import { Button, Heading, ScrollView, VStack, useToast } from 'native-base';
import { useState } from 'react';

import { useAppStore } from '../../stores/store';
import { Intervention } from '../../types/intervention-types';
import { MeanType, MeanTypeToRequest } from '../../types/mean-types';
import { createIntervention } from '../../utils/intervention';
import { createMultipleInterventionMeans } from '../../utils/intervention-mean';
import { fetchAvailableMeans } from '../../utils/means';
import Alert from '../Alert';
import ErrorModal from '../ErrorModal';
import MeanRequestItem from '../means/mean-request/MeanRequestItem';

type InitialMeansRequestProps = {
  meanTypes: MeanType[];
};

export default function InitialMeansRequest({ meanTypes }: InitialMeansRequestProps) {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState('');
  const [requestedMeanTypes, setRequestedMeanTypes] = useState<MeanTypeToRequest[]>(
    meanTypes.map((mean) => ({ ...mean, numberOfRequests: 0 }))
  );

  const interventionCreationData = useAppStore((state) => state.interventionCreationData);
  const resetInterventionCreationData = useAppStore((state) => state.resetInterventionCreationData);

  const onDecrementMeanClicked = (meanId: number) =>
    setRequestedMeanTypes((means) =>
      means.map((mean) => {
        if (mean.id === meanId && mean.numberOfRequests > 0) {
          return { ...mean, numberOfRequests: mean.numberOfRequests - 1 };
        }
        return mean;
      })
    );

  const onIncrementMeanClicked = (meanId: number) => {
    setRequestedMeanTypes((means) =>
      means.map((mean) => {
        if (mean.id === meanId) {
          return { ...mean, numberOfRequests: mean.numberOfRequests + 1 };
        }
        return mean;
      })
    );
  };

  const resetNumberOfRequests = () =>
    setRequestedMeanTypes((means) => means.map((mean) => ({ ...mean, numberOfRequests: 0 })));

  const insertNewIntervention = async () => {
    try {
      if (!interventionCreationData) throw new Error('Intervention creation data is missing');

      const newIntervention = (await createIntervention(interventionCreationData))[0];
      resetInterventionCreationData();

      return newIntervention;
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const insertInterventionMeans = async (intervention: Intervention) => {
    requestedMeanTypes.forEach(async (meanType) => {
      if (meanType.numberOfRequests === 0) return;

      const availableMeans = await fetchAvailableMeans(meanType.mean_type);
      const isEnoughMeansAvailable = availableMeans.length >= meanType.numberOfRequests;
      const numberOfMeansToRequest = isEnoughMeansAvailable
        ? meanType.numberOfRequests
        : availableMeans.length;

      if (!isEnoughMeansAvailable) {
        // TODO: Improve this toast: it is quickly dimissed after the navigation
        toast.show({
          render: () => (
            <Alert
              variant="subtle"
              status="warning"
              textContent={`Nombre de ${meanType.mean_type} insuffisant. Réservation de ${numberOfMeansToRequest} unités.`}
            />
          ),
        });
      }

      const scheduledArrival = new Date();
      scheduledArrival.setMinutes(scheduledArrival.getMinutes() + 20);

      const interventionMeansRequests = Array.from({ length: numberOfMeansToRequest }, (_, i) => ({
        is_on_site: false,
        using_crm: false,
        scheduled_arrival: scheduledArrival,
        request_date: new Date().toISOString(),
        danger_code: intervention.danger_code,
        intervention_id: intervention.id,
        mean_id: availableMeans[i].id,
      }));

      try {
        await createMultipleInterventionMeans(interventionMeansRequests);
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  const handleSubmit = async () => {
    const newIntervention = await insertNewIntervention();
    if (!newIntervention) return;

    await insertInterventionMeans(newIntervention);

    toast.show({
      render: () => (
        <Alert
          variant="subtle"
          status="success"
          textContent={`Intervention #${newIntervention.id} créée avec succès`}
        />
      ),
    });

    router.push('/intervention');
  };

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
        Demande de moyens initiale
      </Heading>
      <ScrollView mb="5%">
        {requestedMeanTypes.map((mean) => (
          <MeanRequestItem
            meanToRequest={mean}
            onDecrementClicked={() => onDecrementMeanClicked(mean.id)}
            onIncrementClicked={() => onIncrementMeanClicked(mean.id)}
            key={mean.id}
          />
        ))}
        <Button mt="6" colorScheme="teal" onPress={handleSubmit}>
          Confirmer
        </Button>
        <Button mt="2" colorScheme="teal" variant="outline" onPress={resetNumberOfRequests}>
          Réinitialiser
        </Button>
      </ScrollView>
      <ErrorModal message={error} isOpen={error !== ''} onClose={() => setError('')} />
    </VStack>
  );
}
