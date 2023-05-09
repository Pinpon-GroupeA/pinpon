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
} from 'native-base';

import { Request } from '../../types/request-types';
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
    <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
      <Heading fontSize="xl" p="4" pb="3">
        Moyens demandés
      </Heading>
      <Box borderRadius="md">
        <VStack space={[1, 2]} divider={<Divider />}>
          <Box>
            <HStack space={[5, 40]} justifyContent="space-between">
              <VStack>
                <Text>{address}</Text>
              </VStack>
              <VStack>
                <Text textAlign="right">{new Date(date?.toString()).toLocaleString()}</Text>
              </VStack>
            </HStack>
          </Box>
          {requests.map((request, id) => (
            <Box key={id}>
              <HStack justifyContent="space-between">
                <VStack>
                  <Text>{request.mean_type},</Text>

                  <Text>{new Date(request.request_time).toLocaleString()}</Text>
                </VStack>
                <VStack>
                  <HStack justifyContent="space-between">
                    <VStack>
                      <IconButton
                        onPress={(event) => validateRequest(request)}
                        colorScheme="green"
                        borderRadius="full"
                        icon={<CheckIcon />}
                      />
                    </VStack>
                    <VStack>
                      <IconButton
                        onPress={(event) => refuseDemand(request.id)}
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
      </Box>
    </VStack>
  );
}
