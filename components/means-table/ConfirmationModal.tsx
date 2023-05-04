import React from 'react';
import { Entypo } from '@expo/vector-icons';

import { Modal, FormControl, Button, Input, VStack, Text } from 'native-base'

function ConfirmationModal() {
    const [modalVisible, setModalVisible] = React.useState(false);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Forgot Password?</Modal.Header>
            <Modal.Body>
              PLACEHOLDER INFO HERE.
              <FormControl mt="3">
                <FormControl.Label>Arrivée à:</FormControl.Label>
                <Input />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={() => {
              setModalVisible(false);
            }}>
                Proceed
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <VStack space={8} alignItems="center">
          <Button w="104" onPress={() => {
          setModalVisible(!modalVisible);
        }}>
            <Entypo name="pencil" size={24} color="black" />
          </Button>
          <Text textAlign="center">
            Open modal and focus on the input element to see the effect.
          </Text>
        </VStack>
      </>;
  };

export default ConfirmationModal;
