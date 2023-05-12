import { useMutation } from '@tanstack/react-query';
import { Button, HStack, Modal, Text, VStack } from 'native-base';

import { MeanModalContent } from '../../../types/mean-types';
import { getMilitaryTime } from '../../../utils/date';
import {
  updateAvailableAtDate,
  updateCrmArrivalDate,
  updateIsOnSite,
  updateSectorArrivalDate,
} from '../../../utils/intervention-mean';

type ConfirmationModalProps = {
  content: MeanModalContent;
  closeModal: () => void;
};

export default function ConfirmationModal({
  content: { id, crmArrival, sectorArrival, availableAt },
  closeModal,
}: ConfirmationModalProps) {
  const { mutateAsync: updateCrmDate } = useMutation({
    mutationFn: () => updateCrmArrivalDate(id),
  });

  const { mutateAsync: updateSectorDate } = useMutation({
    mutationFn: () => updateSectorArrivalDate(id),
  });

  const { mutateAsync: updateAvailableDate } = useMutation({
    mutationFn: () => updateAvailableAtDate(id),
  });

  const { mutateAsync: setOnSite } = useMutation({
    mutationFn: () => updateIsOnSite(id, true),
  });

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>
        <Text color="#19837C" fontSize="xl" fontWeight="semibold" textAlign="center">
          Confirmation des heures
        </Text>
      </Modal.Header>
      <Modal.Body>
        <VStack space={3}>
          <HStack alignItems="center" justifyContent="space-around">
            <Text fontSize="20px" flex={1} textAlign="left">
              Au CRM à
            </Text>
            {crmArrival === null ? (
              <Button
                flex={1}
                bgColor="#19837C"
                onPress={() => {
                  updateCrmDate();
                  closeModal();
                }}
              >
                Arrivé au CRM
              </Button>
            ) : (
              <Text fontSize="20px" flex={1} textAlign="center">
                {getMilitaryTime(new Date(crmArrival))}
              </Text>
            )}
          </HStack>

          <HStack alignItems="center" justifyContent="space-around">
            <Text fontSize="20px" flex={1} textAlign="left">
              Sur site à
            </Text>
            {sectorArrival === null ? (
              <Button
                flex={1}
                bgColor="#19837C"
                onPress={() => {
                  updateSectorDate();
                  setOnSite();
                  closeModal();
                }}
              >
                Sur le secteur
              </Button>
            ) : (
              <Text fontSize="20px" flex={1} textAlign="center">
                {getMilitaryTime(new Date(sectorArrival))}
              </Text>
            )}
          </HStack>

          <HStack alignItems="center" justifyContent="space-around">
            <Text fontSize="20px" flex={1} textAlign="left">
              Disponible à
            </Text>
            {availableAt === null ? (
              <Button
                flex={1}
                bgColor="#19837C"
                onPress={() => {
                  updateAvailableDate();
                  closeModal();
                }}
              >
                Disponible
              </Button>
            ) : (
              <Text fontSize="20px" flex={1} textAlign="center">
                {getMilitaryTime(new Date(availableAt))}
              </Text>
            )}
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
}
