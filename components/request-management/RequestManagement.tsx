import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  IconButton,
  HStack,
  CheckIcon,
  CloseIcon,
} from 'native-base';

import { Intervention } from '../../types/intervention-types';
import { Request } from '../../types/request-types';
import { getDangerCodeColor } from '../../utils/danger-code';

export default function RequestManagement() {
  const intervention: Intervention = {
    id: '1',
    date: '2021-05-01',
    isOngoing: true,
    dangerCode: 'INC',
    adress: '1 rue de la paix',
    customerName: 'Jean Dupont',
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
    },
  };

  const requests: Request[] = [
    {
      id: '1',
      status: 'PENDING',
      requestDate: '2021-05-01',
      requestedMeanType: 'VSAV',
    },
    {
      id: '2',
      status: 'ACCEPTED',
      requestDate: '2021-05-01',
      requestedMeanType: 'FPT',
    },
  ];

  const validateRequest = (id: string) => {
    console.log('validateRequest', id);
  };

  const refuseRequest = (id: string) => {
    console.log('refuseRequest', id);
  };

  return (
    <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Moyens demandés
      </Heading>
      <VStack space={[1, 2]} divider={<Divider />}>
        <Box>
          <HStack space={[5, 40]} justifyContent="space-between">
            <VStack>
              <Text>{intervention.adress}</Text>
            </VStack>
            <VStack>
              <Text bold textAlign="right" color={getDangerCodeColor(intervention.dangerCode)}>
                {intervention.dangerCode}
              </Text>
              <Text textAlign="right">{intervention.date}</Text>
            </VStack>
          </HStack>
        </Box>
        {requests.map((request, i) => (
          <Box key={i}>
            <HStack justifyContent="space-between">
              <VStack>
                <Text>{request.requestedMeanType},</Text>

                <Text>Demandé à {request.requestDate}</Text>
              </VStack>
              <VStack>
                <HStack justifyContent="space-between">
                  <VStack>
                    <IconButton
                      onPress={() => validateRequest(request.id)}
                      colorScheme="green"
                      borderRadius="full"
                      icon={<CheckIcon />}
                    />
                  </VStack>
                  <VStack>
                    <IconButton
                      onPress={() => refuseRequest(request.id)}
                      colorScheme="red"
                      borderRadius="full"
                      icon={<CloseIcon />}
                    />
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
