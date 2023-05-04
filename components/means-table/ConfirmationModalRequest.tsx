import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { Entypo } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import { Modal, Button, Text, VStack, Box } from 'native-base';
import React, { useState } from 'react';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      <Text flex={1} onPress={() => setModalVisible(true)}>
        <Entypo name="cross" size={24} color="black" />
      </Text>
    </>
  );
}

async function deleteMeans(id: string) {
  await supabase.from('Requests').delete().eq('id', id);
}
