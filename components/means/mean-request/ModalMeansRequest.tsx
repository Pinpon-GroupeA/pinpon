import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { VStack, Button, FormControl, Text, Modal, useToast } from 'native-base';
import React, { useState } from 'react';

import MeanRequestItem from './MeanRequestItem';
import { MeanType } from '../../../types/mean-types';
import { CreateRequestData, createRequest } from '../../../utils/requests-type';
import Alert from '../../Alert';

type ModalMeansRequestProps = {
  meansType: MeanType[];
  setShowModal: (showModal: boolean) => void;
};

export default function ModalMeansRequest({ meansType, setShowModal }: ModalMeansRequestProps) {
  const [values, setValues] = React.useState<number[]>(new Array(meansType.length).fill(0));
  const [isSendingRequests, setIsSendingRequests] = useState(false);
  const { id: interventionId } = useSearchParams();

  const toast = useToast();
  const isSendingPossible = meansType.length === 0 || values.reduce((acc, i) => acc + i, 0) === 0;

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateRequestData) => createRequest(data),
  });

  async function handleSend() {
    setIsSendingRequests(true);

    values.map(async (val, i) => {
      for (let j = 0; j < val; j++) {
        const request: CreateRequestData = {
          intervention_id: interventionId === undefined ? 0 : +interventionId,
          status: 'EN_ATTENTE',
          request_time: new Date().toISOString(),
          mean_type: meansType[i].mean_type,
        };
        await mutateAsync(request);
      }
      if (i === values.length - 1) {
        setIsSendingRequests(false);
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
          isDisabled={isSendingPossible}
        >
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
