import { Entypo } from '@expo/vector-icons';
import {
  Box,
  Heading,
  VStack,
  Divider,
  HStack,
  Text,
  ScrollView,
  Modal,
  Button,
  FormControl,
  Input,
} from 'native-base';
import React from 'react';

import ConfirmationModal from './ConfirmationModal';
import { Mean } from '../../types/mean-types';

type MeansTableProps = {
  means: Mean[];
};

const [modalVisible, setModalVisible] = React.useState(false);

function customModal() {
  return;
  <Modal.Content>
    <Modal.CloseButton />
    <Modal.Header>Forgot Password?</Modal.Header>
    <Modal.Body>
      Enter email address and we'll send a link to reset your password.
      <FormControl mt="3">
        <FormControl.Label>Email</FormControl.Label>
        <Input />
      </FormControl>
    </Modal.Body>
    <Modal.Footer>
      <Button
        flex="1"
        onPress={() => {
          setModalVisible(false);
        }}
      >
        Proceed
      </Button>
    </Modal.Footer>
  </Modal.Content>;
}

function getDate(date: string) {
  // eslint-disable-next-line radix
  let hour = parseInt(date.slice(11, 13), undefined);
  // eslint-disable-next-line radix
  let min = parseInt(date.slice(14, 16), undefined);
  let hourS = '';
  let minS = '';
  min += 20;
  if (min > 59) {
    min = min - 60;
    hour++;
    // eslint-disable-next-line eqeqeq
    if (hour == 24) {
      hour = 0;
    }
  }

  if (min < 10) {
    minS = '0' + min.toString();
  } else {
    minS = min.toString();
  }

  if (hour < 10) {
    hourS = '0' + hour.toString();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hourS = hour.toString();
  }

  return hourS + minS;
}

export default function MeansTable({ means }: MeansTableProps) {
  return (
    <Box h="50%">
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Tableau des moyens
      </Heading>
      <VStack divider={<Divider bg="black" />} w="100%">
        <HStack
          textAlign="center"
          divider={<Divider bg="black" />}
          h="8"
          alignItems="center"
          textDecoration="bold"
        >
          <Text flex={2} bold fontSize="20px">
            Moyen
          </Text>
          <Text flex={2} bold fontSize="20px">
            Demandé à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Arrivée prévue à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Au CRM à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Sur site à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Disponible à
          </Text>
          <Text flex={1} bold fontSize="20px" />
        </HStack>
        <ScrollView h="50%">
          {means.map((mean, i) => (
            <HStack
              key={i}
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
            >
              <Text flex={2}>{mean.danger_code}</Text>
              <Text flex={2}>
                {mean.request_date.slice(11, 13) + mean.request_date.slice(14, 16)}
              </Text>
              <Text flex={2}>{getDate(mean.request_date)}</Text>
              <Text flex={2}>
                {mean.crm_arrival == null
                  ? ''
                  : mean.crm_arrival.slice(11, 13) + mean.crm_arrival.slice(11, 13)}
              </Text>
              <Text flex={2}>
                {mean.sector_arrival == null
                  ? ''
                  : mean.sector_arrival.slice(11, 13) + mean.sector_arrival.slice(14, 16)}
              </Text>
              <Text flex={2}>
                {mean.available_at == null
                  ? ''
                  : mean.available_at.slice(11, 13) + mean.available_at.slice(11, 13)}
              </Text>
              <Text flex={1}>
                <Modal
                  isOpen={modalVisible}
                  onClose={() => setModalVisible(false)}
                  avoidKeyboard
                  justifyContent="flex-end"
                  bottom="4"
                  size="lg"
                >
                  customModal()
                </Modal>
                <VStack space={8} alignItems="center">
                  <Button
                    w="104"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Entypo name="pencil" size={24} color="black" />
                  </Button>
                </VStack>
              </Text>
            </HStack>
          ))}
        </ScrollView>
      </VStack>
    </Box>
  );
}
