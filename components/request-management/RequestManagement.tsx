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

type RequestManagementProps = {
  intervention: Intervention;
  requests: Request[];
};

export default function RequestManagement({ intervention, requests }: RequestManagementProps) {
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
              <Text>{intervention.address}</Text>
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
