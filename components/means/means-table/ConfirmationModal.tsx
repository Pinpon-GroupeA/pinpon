import { useMutation } from '@tanstack/react-query';
import { Button, HStack, Modal, Text, VStack } from 'native-base';

import { Coordinates } from '../../../types/global-types';
import { InterventionMeanStatus, MeanModalContent } from '../../../types/mean-types';
import { getMilitaryTime } from '../../../utils/date';
import {
  updateAvailableAtDate,
  updateCrmArrivalDate,
  updateInterventionMeanStatus,
  updateSectorArrivalDate,
} from '../../../utils/intervention-mean';
import { updateMeanLocation } from '../../../utils/means';

type ConfirmationModalProps = {
  content: MeanModalContent;
  closeModal: () => void;
};

export default function ConfirmationModal({
  content: { id, crmArrival, sectorArrival, availableAt, status, meanId },
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

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: (status: InterventionMeanStatus) => updateInterventionMeanStatus(id, status),
  });

  const { mutateAsync: updateMeanLocationMutation } = useMutation({
    mutationFn: (data: { meanId: number; location: Coordinates | null }) =>
      updateMeanLocation(data.meanId, data.location),
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
                  if (status === 'arriving_crm') {
                    updateCrmDate();
                  }
                  updateStatus('at_crm');
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
            {sectorArrival === null || status === 'changing_position' ? (
              <Button
                flex={1}
                bgColor="#19837C"
                onPress={() => {
                  if (crmArrival === null) {
                    updateCrmDate();
                  }
                  if (status === 'arriving_on_site') {
                    updateSectorDate();
                  }
                  updateStatus('on_site');
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
                  updateStatus('available');
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
          {status !== ('at_crm' || 'arriving_crm' || 'returning_crm') && (
            <HStack alignItems="center" justifyContent="space-around">
              <Button
                flex={1}
                bgColor="#19837C"
                onPress={() => {
                  updateStatus('returning_crm');
                  updateMeanLocationMutation({
                    meanId,
                    location: null,
                  });
                  closeModal();
                }}
              >
                Renvoyer au CRM
              </Button>
            </HStack>
          )}
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
}
