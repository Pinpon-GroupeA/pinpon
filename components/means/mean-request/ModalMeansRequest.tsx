import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Button, Modal, Text, VStack, useToast } from 'native-base';
import React, { useState } from 'react';

import MeanRequestItem from './MeanRequestItem';
import Colors from '../../../constants/colors';
import { MeanType, MeanTypeToRequest } from '../../../types/mean-types';
import { CreateRequestData, createRequests } from '../../../utils/requests-type';
import Alert from '../../Alert';

type ModalMeansRequestProps = {
  meanTypes: MeanType[];
  setShowModal: (showModal: boolean) => void;
};

export default function ModalMeansRequest({ meanTypes, setShowModal }: ModalMeansRequestProps) {
  const [requestedMeanTypes, setRequestedMeanTypes] = useState<MeanTypeToRequest[]>(
    meanTypes.map((mean) => ({ ...mean, numberOfRequests: 0 }))
  );
  const { id: interventionId } = useSearchParams();

  const toast = useToast();
  const isSendingPossible =
    meanTypes.length === 0 ||
    requestedMeanTypes.map((mean) => mean.numberOfRequests).reduce((acc, i) => acc + i, 0) === 0;

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (requests: CreateRequestData[]) => createRequests(requests),
  });

  if (!interventionId || Number.isNaN(Number(interventionId))) {
    throw new Error('Invalid intervention id');
  }

  const onDecrementMeanClicked = (meanId: number) =>
    setRequestedMeanTypes((means) =>
      means.map((mean) => {
        if (mean.id === meanId && mean.numberOfRequests > 0) {
          return { ...mean, numberOfRequests: mean.numberOfRequests - 1 };
        }
        return mean;
      })
    );

  const onIncrementMeanClicked = (meanId: number) =>
    setRequestedMeanTypes((means) =>
      means.map((mean) => {
        if (mean.id === meanId) {
          return { ...mean, numberOfRequests: mean.numberOfRequests + 1 };
        }
        return mean;
      })
    );

  async function handleSend() {
    requestedMeanTypes.forEach(async (mean) => {
      if (mean.numberOfRequests === 0) return;

      const requests: CreateRequestData[] = Array.from({ length: mean.numberOfRequests }, () => ({
        intervention_id: Number(interventionId),
        request_time: new Date().toISOString(),
        mean_type: mean.mean_type,
      }));
      await mutateAsync(requests);
    });

    setShowModal(false);
    toast.show({
      render: () => {
        return (
          <Alert
            variant="subtle"
            status="success"
            textContent="Demande de moyens envoyée avec succès."
          />
        );
      },
    });
  }

  return (
    <Modal.Content maxWidth="500">
      <Modal.CloseButton />
      <Modal.Header alignItems="center">
        <Text color={Colors.TURQUOISE} fontSize="2xl" fontWeight="semibold">
          Demande de moyens
        </Text>
      </Modal.Header>
      <Modal.Body backgroundColor={Colors.BACKGROUND_GREY}>
        <VStack>
          {requestedMeanTypes.length === 0 ? (
            <Text textAlign="center" fontStyle="italic">
              Aucun type de moyen trouvé.
            </Text>
          ) : (
            requestedMeanTypes.map((mean) => (
              <MeanRequestItem
                meanToRequest={mean}
                onDecrementClicked={() => onDecrementMeanClicked(mean.id)}
                onIncrementClicked={() => onIncrementMeanClicked(mean.id)}
                key={mean.id}
              />
            ))
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          flex="1"
          isLoading={isLoading}
          isLoadingText="Envoi en cours..."
          onPress={handleSend}
          bgColor={Colors.TURQUOISE}
          isDisabled={isSendingPossible}
        >
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
