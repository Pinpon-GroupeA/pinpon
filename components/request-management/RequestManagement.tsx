import { useMutation } from '@tanstack/react-query';
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
  ScrollView,
} from 'native-base';

import { Request } from '../../types/request-types';
import { dateTimeFormattingOptions } from '../../utils/date';
import { InterventionMeanCreateType, createInterventionMean } from '../../utils/intervention-mean';
import { fetchAvailableMeans, updateMeanStatus } from '../../utils/means';
import { deleteRequest } from '../../utils/request';

type RequestManagementProps = {
  address?: string;
  date?: string;
  danger_code?: string;
  requests: Request[];
};

export default function RequestManagement({ address, date, requests }: RequestManagementProps) {
  const { mutateAsync: createInterventionMeanMutation } = useMutation({
    mutationFn: (data: InterventionMeanCreateType) => createInterventionMean(data),
  });

  const { mutateAsync: updateMeanStatusMutation } = useMutation({
    mutationFn: (data: { meanId: number; is_available: boolean }) =>
      updateMeanStatus(data.meanId, data.is_available),
  });

  const { mutateAsync: deleteRequestMutation } = useMutation({
    mutationFn: (id: number) => deleteRequest(id),
  });

  const validateRequest = async (request: Request) => {
    const availableMeans = await fetchAvailableMeans(request.mean_type);

    if (availableMeans) {
      await createInterventionMeanMutation({
        is_on_site: false,
        using_crm: false,
        request_date: request.request_time,
        intervention_id: request.intervention_id,
        mean_id: availableMeans[0].id,
      });

      await updateMeanStatusMutation({ meanId: availableMeans[0].id, is_available: false });
      await deleteRequestMutation(request.id);
    }
  };

  const refuseDemand = async (id: number) => {
    await deleteRequestMutation(id);
  };

  return (
    <Box marginX={6} flex={1}>
      <Heading pt={3} size="xl" color="#19837C">
        Moyens demandés
      </Heading>

      <Box pb="5" justifyContent="space-between" p="2">
        <Text fontSize="xl">
          {address}
          {'  -  '}
          {date
            ? Intl.DateTimeFormat('fr-FR', dateTimeFormattingOptions).format(new Date(date))
            : ''}
        </Text>
      </Box>

      <ScrollView mb="2">
        <VStack flex="1" borderRadius="md" space={[1, 2]}>
          {requests.map((request, id) => (
            <Box
              key={id}
              pl={2}
              py={1}
              borderWidth={1}
              borderColor="dark.600"
              backgroundColor="#F2F2F2"
            >
              <HStack justifyContent="space-between">
                <VStack>
                  <Text fontSize="lg">{request.mean_type},</Text>
                  <Text fontSize="md">
                    {Intl.DateTimeFormat('fr-FR', dateTimeFormattingOptions).format(
                      new Date(request.request_time)
                    )}
                  </Text>
                </VStack>
                <VStack>
                  <HStack justifyContent="space-between" flex={1}>
                    <IconButton
                      onPress={() => validateRequest(request)}
                      colorScheme="green"
                      borderRadius="full"
                      icon={<CheckIcon />}
                    />

                    <IconButton
                      onPress={() => refuseDemand(request.id)}
                      colorScheme="red"
                      borderRadius="full"
                      icon={<CloseIcon />}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
