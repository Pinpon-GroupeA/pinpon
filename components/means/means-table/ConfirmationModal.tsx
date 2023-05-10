import { useMutation } from '@tanstack/react-query';
import { Modal, VStack, Text, HStack, Button } from 'native-base';

import { MeanModalContent } from '../../../types/mean-types';
import { getMilitaryTime } from '../../../utils/date';
import {
  updateCrmArrivalDate,
  updateSectorArrivalDate,
  updateAvailableAtDate,
  updateIsOnSite,
} from '../../../utils/intervention-mean';

type ConfirmationModalProps = {
  content: MeanModalContent;
  closeModal: () => void;
};

export default function ConfirmationModal({ content, closeModal }: ConfirmationModalProps) {
  const { id, crmArrival, sectorArrival, availableAt } = content;

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
      <Modal.Header>Confirmation des heures</Modal.Header>
      <Modal.Body>
        <VStack>
          <HStack pb="3">
            <Text bold fontSize="20px" mr="10">
              Au CRM à
            </Text>
            {crmArrival === null ? (
              <Button
                onPress={() => {
                  updateCrmDate();
                  closeModal();
                }}
              >
                arrivé au CRM
              </Button>
            ) : (
              <Button disabled bgColor="gray.400">
                arrivé au CRM à {getMilitaryTime(new Date(crmArrival))}
              </Button>
            )}
          </HStack>
          <HStack pb="3">
            <Text bold fontSize="20px" mr="10">
              Sur site à
            </Text>
            {sectorArrival === null ? (
              <Button
                onPress={() => {
                  updateSectorDate();
                  setOnSite();
                  closeModal();
                }}
              >
                Sur le secteur
              </Button>
            ) : (
              <Button disabled bgColor="gray.400">
                Sur le secteur à {getMilitaryTime(new Date(sectorArrival))}
              </Button>
            )}
          </HStack>
          <HStack pb="3">
            <Text bold fontSize="20px" mr="10">
              Disponible à
            </Text>
            {availableAt === null ? (
              <Button
                onPress={() => {
                  updateAvailableDate();
                  closeModal();
                }}
              >
                Disponible
              </Button>
            ) : (
              <Button disabled bgColor="gray.400">
                Disponible à {getMilitaryTime(new Date(availableAt))}
              </Button>
            )}
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
}
