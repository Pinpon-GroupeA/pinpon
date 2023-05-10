import { useRouter } from 'expo-router';
import { Button, Heading, ScrollView, VStack } from 'native-base';
import { useState } from 'react';

import { useAppStore } from '../../stores/store';
import { MeanType, MeanTypeToRequest } from '../../types/mean-types';
import { createIntervention } from '../../utils/intervention';
import { createMultipleInterventionMeans } from '../../utils/intervention-mean';
import { fetchAvailableMeans, updateMeanStatus } from '../../utils/means';
import ErrorModal from '../ErrorModal';
import MeanRequestItem from '../means/mean-request/NewMeanRequestItem';

type InitialMeansRequestProps = {
  meanTypes: MeanType[];
};

export default function InitialMeansRequest({ meanTypes }: InitialMeansRequestProps) {
  const router = useRouter();
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

  const handleSubmit = async () => {
    if (interventionCreationData) {
      try {
        const newIntervention = (await createIntervention(interventionCreationData))[0];
        resetInterventionCreationData();

        requestedMeanTypes.forEach(async (meanType) => {
          if (meanType.numberOfRequests === 0) return;

          const availableMeans = await fetchAvailableMeans(meanType.mean_type);
          const isEnoughMeansAvailable = availableMeans.length >= meanType.numberOfRequests;
          const numberOfMeansToRequest = isEnoughMeansAvailable
            ? meanType.numberOfRequests
            : availableMeans.length;

          availableMeans.forEach(async (mean) => {
            await updateMeanStatus(mean.id, false);
          });

          const nowPlusTwentyMinutes = new Date();
          nowPlusTwentyMinutes.setMinutes(nowPlusTwentyMinutes.getMinutes() + 20);

          const interventionMeansRequests = Array.from(
            { length: numberOfMeansToRequest },
            (_, i) => ({
              is_on_site: false,
              using_crm: false,
              sector_arrival: nowPlusTwentyMinutes,
              request_date: new Date().toISOString(),
              danger_code: newIntervention.danger_code,
              intervention_id: newIntervention.id,
              mean_id: availableMeans[i].id,
            })
          );

          await createMultipleInterventionMeans(interventionMeansRequests);

          router.push('/intervention');
        });
      } catch (e) {
        setError((e as Error).message);
      }
    } else {
      setError("Pas de données d'intervention");
    }
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
        <Button mt="2" colorScheme="teal" variant="outline">
          Réinitialiser
        </Button>
      </ScrollView>
      <ErrorModal message={error} isOpen={error !== ''} onClose={() => setError('')} />
    </VStack>
  );
}
