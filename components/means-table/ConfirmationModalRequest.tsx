import { Entypo } from '@expo/vector-icons';
import { Modal, Button, VStack, Box, Icon, Pressable } from 'native-base';
import React, { useState } from 'react';

import { deleteMeans } from '../../utils/means';

type ModalData = {
  id: string;
};

export default function ConfirmationModalRequest({ id }: ModalData) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(!modalVisible)} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Voulez-vous supprimer la demande du moyen ?</Modal.Header>
          <Modal.Body>
            <VStack>
              <Box pb="3">
                <Button
                  onPress={() => {
                    deleteMeans(id);
                    setModalVisible(!modalVisible);
                  }}
                >
                  Confirmer
                </Button>
              </Box>
              <Box>
                <Button onPress={() => setModalVisible(!modalVisible)}>Annuler</Button>
              </Box>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Pressable flex={1} onPress={() => setModalVisible(true)}>
        <Icon as={Entypo} name="cross" size={24} color="black" />
      </Pressable>
    </>
  );
}
