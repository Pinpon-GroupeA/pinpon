import { Entypo } from '@expo/vector-icons';
import {
  Box,
  Heading,
  VStack,
  Divider,
  HStack,
  Text,
  ScrollView,
  IconButton,
  Icon,
  Modal,
} from 'native-base';
import React, { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';
import ConfirmationModalRequest from './ConfirmationModalRequest';
import { InterventionMean, MeanModalProps } from '../../../types/mean-types';
import { Request } from '../../../types/request-types';
import { getMilitaryTime, addMinutes } from '../../../utils/date';

type MeansTableProps = {
  means: InterventionMean[];
  requests: Request[];
};

export default function MeansTable({ means, requests }: MeansTableProps) {
  const [modalContent, setModalContent] = useState<MeanModalProps | null>(null);

  return (
    <Box>
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
        <ScrollView>
          {means.map((mean: InterventionMean, i) => (
            <HStack
              key={mean.id}
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
            >
              <Text flex={2}>{mean.means.label}</Text>
              <Text flex={2}>
                {getMilitaryTime(mean.request_date ? new Date(mean.request_date) : undefined)}
              </Text>
              <Text flex={2}>{addMinutes(mean.request_date, 20)}</Text>
              <Text flex={2}>
                {getMilitaryTime(mean.crm_arrival ? new Date(mean.crm_arrival) : undefined)}
              </Text>
              <Text flex={2}>
                {getMilitaryTime(mean.sector_arrival ? new Date(mean.sector_arrival) : undefined)}
              </Text>
              <Text flex={2}>
                {getMilitaryTime(mean.available_at ? new Date(mean.available_at) : undefined)}
              </Text>
              <IconButton
                icon={<Icon as={Entypo} name="pencil" color="black" />}
                onPress={() =>
                  setModalContent({
                    id: mean.id,
                    crmArrival: mean.crm_arrival,
                    sectorArrival: mean.sector_arrival,
                    availableAt: mean.available_at,
                  })
                }
              />
            </HStack>
          ))}
          {requests.map((request: Request, i) => (
            <HStack
              key={request.id}
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
              bgColor="gray.200"
            >
              <Text flex={2}>{request.mean_type}</Text>
              <Text flex={2}>{getMilitaryTime(new Date(request.request_time))}</Text>
              <Box flex={2} />
              <Box flex={2} />
              <Box flex={2} />
              <Box flex={2} />
              <ConfirmationModalRequest id={request.id} />
            </HStack>
          ))}
        </ScrollView>
      </VStack>
      {modalContent && (
        <Modal isOpen={modalContent !== null} onClose={() => setModalContent(null)} size="md">
          <ConfirmationModal
            id={modalContent.id}
            crmArrival={modalContent.crmArrival}
            sectorArrival={modalContent.sectorArrival}
            availableAt={modalContent.availableAt}
          />
        </Modal>
      )}
    </Box>
  );
}
