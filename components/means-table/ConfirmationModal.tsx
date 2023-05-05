import { Entypo } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Modal, VStack, Text, HStack, Button, Icon, Pressable } from 'native-base';
import React, { useState } from 'react';

import { getMilitaryTime } from '../../utils/date';
import {
  updateAvailableAtDate,
  updateCrmArrivalDate,
  updateIsOnSite,
  updateSectorArrivalDate,
} from '../../utils/intervention-means';

type ModalOpen = {
  crm: string;
  sector: string;
  available: string;
  id: number;
};

export default function ConfirmationModal({ crm, sector, available, id }: ModalOpen) {
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

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(!modalVisible)} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Confirmation des heures</Modal.Header>
          <Modal.Body>
            <VStack>
              <HStack pb="3">
                <Text bold fontSize="20px" mr="10">
                  Au CRM à
                </Text>
                {crm === null ? (
                  <Button
                    onPress={() => {
                      updateCrmDate();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    arrivé au CRM
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    arrivé au CRM à {getMilitaryTime(crm)}
                  </Button>
                )}
              </HStack>
              <HStack pb="3">
                <Text bold fontSize="20px" mr="10">
                  Sur site à
                </Text>
                {sector === null ? (
                  <Button
                    onPress={() => {
                      updateSectorDate();
                      setOnSite();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Sur le secteur
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    Sur le secteur à {getMilitaryTime(sector)}
                  </Button>
                )}
              </HStack>
              <HStack pb="3">
                <Text bold fontSize="20px" mr="10">
                  Disponible à
                </Text>
                {available === null ? (
                  <Button
                    onPress={() => {
                      updateAvailableDate();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Disponible
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    Disponible à {getMilitaryTime(available)}
                  </Button>
                )}
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Pressable flex={1} onPress={() => setModalVisible(true)}>
        <Icon as={Entypo} name="pencil" size={6} color="black" />
      </Pressable>
    </>
  );
}
