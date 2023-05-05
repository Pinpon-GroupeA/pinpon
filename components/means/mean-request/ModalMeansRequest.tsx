import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { VStack, Button, FormControl, Text, Modal, useToast } from 'native-base';
import React, { useState } from 'react';

import MeanRequestItem from './MeanRequestItem';
import { MeanType } from '../../../types/mean-types';
import { CreateRequestData, createRequest } from '../../../utils/requests-type';
import AlertMeansRequestsSuccess from '../../Alert';

type ModalMeansRequestProps = {
  meansType: MeanType[];
};

export default function ModalMeansRequest({ meansType }: ModalMeansRequestProps) {
  const [values, setValues] = React.useState<number[]>(new Array(meansType.length).fill(0));
  const [isSendingRequests, setIsSendingRequests] = useState(false);
  const { id: interventionId } = useSearchParams();

  const toast = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateRequestData) => createRequest(data),
  });

  async function handleSend() {
    setIsSendingRequests(true);

    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 2);

    values.map(async (val, i) => {
      for (let j = 0; j < val; j++) {
        const request: CreateRequestData = {
          intervention_id: interventionId === undefined ? 0 : +interventionId,
          status: 'EN_ATTENTE',
          request_time: currentTime.toISOString(),
          mean_type: meansType[i].mean_type,
        };
        await mutateAsync(request);
      }
      if (i === values.length - 1) {
        setIsSendingRequests(false);
        toast.show({
          render: () => {
            return (
              <AlertMeansRequestsSuccess textContent="Demande de moyens envoyée avec succès." />
            );
          },
        });
      }
    });
  }

  return (
    <Modal.Content maxWidth="500">
      <Modal.CloseButton />
      <Modal.Header alignItems="center">
        <Text color="#19837C" fontSize="2xl" fontWeight="semibold">
          Demande de moyens
        </Text>
      </Modal.Header>
      <Modal.Body backgroundColor="gray.100">
        <VStack>
          <FormControl>
            {meansType.length === 0 ? (
              <Text textAlign="center" fontStyle="italic">
                Aucun type de moyen trouvé.
              </Text>
            ) : (
              meansType.map((item, index) => {
                return (
                  <MeanRequestItem
                    mean={item}
                    values={values}
                    setValues={setValues}
                    index={index}
                    key={index}
                  />
                );
              })
            )}
          </FormControl>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          flex="1"
          isLoading={isSendingRequests}
          isLoadingText="Envoi en cours..."
          onPress={handleSend}
          bgColor="#19837C"
          isDisabled={meansType.length === 0}
        >
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
