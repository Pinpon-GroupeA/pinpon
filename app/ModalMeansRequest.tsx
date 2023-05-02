import { VStack, Button, FormControl, Text, Modal, HStack } from 'native-base';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import MeanRequestItem from './MeanRequestItem';

export default function ModalMeansRequest() {
  const { control, handleSubmit } = useForm();
  const [VSAP, setVSAP] = React.useState(0);
  const [FTP, setFTP] = React.useState(0);
  const [VLCP, setVLCP] = React.useState(0);

  type FormInputs = {
    VSAP: string;
  };

  const onSubmit = (data: any) => {
    console.log('submiting with ', data);
  };

  return (
    <Modal.Content maxWidth="500">
      <Modal.CloseButton />
      <Modal.Header alignItems="center">
        <Text color="emerald.700" fontSize="2xl" fontWeight="semibold">
          Demande de moyens
        </Text>
      </Modal.Header>
      <Modal.Body backgroundColor="gray.100">
        <VStack>
          <FormControl>
            <HStack alignItems="center" justifyContent="space-around">
              <FormControl.Label flex="8">
                Véhicules de secours aux publics (VSAP)
              </FormControl.Label>
              <HStack alignItems="center" flex="1.5">
                <Button
                  variant="ghost"
                  onPress={() => {
                    if (VSAP > 0) {
                      setVSAP(VSAP - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Text>{VSAP}</Text>
                <Button variant="ghost" onPress={() => setVSAP(VSAP + 1)}>
                  +
                </Button>
              </HStack>
            </HStack>

            <HStack alignItems="center" justifyContent="space-around">
              <FormControl.Label flex="8">Fourgon pompe-tonne (FTP)</FormControl.Label>
              <HStack alignItems="center" flex="1.5">
                <Button
                  variant="ghost"
                  onPress={() => {
                    if (VSAP > 0) {
                      setVSAP(VSAP - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Text>{FTP}</Text>
                <Button variant="ghost" onPress={() => setFTP(FTP + 1)}>
                  +
                </Button>
              </HStack>
            </HStack>

            <HStack alignItems="center" justifyContent="space-around">
              <FormControl.Label flex="8">VL Chef de projet (VLCP)</FormControl.Label>
              <HStack alignItems="center" flex="1.5">
                <Button
                  variant="ghost"
                  onPress={() => {
                    if (VSAP > 0) {
                      setVSAP(VSAP - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Text>{VLCP}</Text>
                <Button variant="ghost" onPress={() => setVLCP(VLCP + 1)}>
                  +
                </Button>
              </HStack>
            </HStack>

            <MeanRequestItem mean="test" value={VLCP} setValue={setVLCP} />
          </FormControl>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button flex="1" onPress={handleSubmit(onSubmit)} bgColor="emerald.700">
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
