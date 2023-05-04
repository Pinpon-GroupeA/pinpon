import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { Entypo } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import { Modal, VStack, Text, HStack, Button } from 'native-base';
import React, { useState } from 'react';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type ModalOpen = {
  crm: string;
  sector: string;
  available: string;
  id: string;
};

export default function ConfirmationModal({ crm, sector, available, id }: ModalOpen) {
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
                      sendCRM(id);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    arrivé au CRM
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    arrivé au CRM à {crm.slice(11, 13) + crm.slice(14, 16)}
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
                      sendSector(id);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Sur le secteur
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    Sur le secteur à {sector.slice(11, 13) + sector.slice(14, 16)}
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
                      sendAvailable(id);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Disponible
                  </Button>
                ) : (
                  <Button disabled bgColor="gray.400">
                    Disponible à {available.slice(11, 13) + available.slice(14, 16)}
                  </Button>
                )}
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Text flex={1} onPress={() => setModalVisible(true)}>
        <Entypo name="pencil" size={24} color="black" />
      </Text>
    </>
  );
}

function getlocalTime() {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
}

async function sendCRM(id: string) {
  await supabase
    .from('interventions_means_link')
    .update({ crm_arrival: getlocalTime() })
    .eq('id', id);
}

async function sendSector(id: string) {
  await supabase
    .from('interventions_means_link')
    .update({ sector_arrival: getlocalTime() })
    .eq('id', id);
}

async function sendAvailable(id: string) {
  await supabase
    .from('interventions_means_link')
    .update({ available_at: getlocalTime() })
    .eq('id', id);
}
