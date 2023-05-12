import { AntDesign } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  IconButton,
  HStack,
  CheckIcon,
  CloseIcon,
  ScrollView,
  Icon,
  useToast,
} from 'native-base';

import { Request } from '../../types/request-types';
import { dateTimeFormattingOptions } from '../../utils/date';
import { InterventionMeanCreateType, createInterventionMean } from '../../utils/intervention-mean';
import { fetchAvailableMeans, updateMeanStatus } from '../../utils/means';
import { deleteRequest } from '../../utils/requests-of-intervention';
import Alert from '../Alert';

type RequestsManagementProps = {
  interventions: { id: number; address: string; created_at: string }[];
  requests: Request[];
};

export default function RequestsManagement({ interventions, requests }: RequestsManagementProps) {
  const router = useRouter();
  const toast = useToast();

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

    const isEnoughMeansAvailable = availableMeans.length > 0;

    if (!isEnoughMeansAvailable) {
      // TODO: Improve this toast: it is quickly dimissed after the navigation
      toast.show({
        render: () => (
          <Alert
            variant="subtle"
            status="warning"
            textContent={`Pas de ${request.mean_type} disponibles.`}
          />
        ),
      });
      return;
    }

    const scheduledArrival = new Date();
    scheduledArrival.setMinutes(scheduledArrival.getMinutes() + 20);

    await createInterventionMeanMutation({
      scheduled_arrival: scheduledArrival.toISOString(),
      status: 'arriving_crm',
      request_date: request.request_time,
      intervention_id: request.intervention_id,
      mean_id: availableMeans[0].id,
    });

    await updateMeanStatusMutation({ meanId: availableMeans[0].id, is_available: false });
    await deleteRequestMutation(request.id);
  };

  const refuseRequest = async (id: number) => {
    await deleteRequestMutation(id);
  };

  return (
    <Box>
      <HStack my={3} mx={6} justifyContent="space-evenly" alignItems="center">
        <Heading size="xl" color="#19837C">
          Moyens demandés
        </Heading>
        <Icon as={AntDesign} name="caretleft" color="dark.600" size={6} />

        <Heading fontSize="3xl" fontWeight="normal" onPress={() => router.push('/intervention')}>
          Interventions
        </Heading>
      </HStack>
      <ScrollView mb="16">
        {interventions.map((intervention, idInter) => (
          <Box key={idInter} mx={3}>
            <Box justifyContent="space-between" p="2">
              <Text fontSize="xl" textAlign="center" fontWeight="medium">
                {intervention.address}
                {'  -  '}
                {intervention.created_at
                  ? Intl.DateTimeFormat('fr-FR', dateTimeFormattingOptions).format(
                      new Date(intervention.created_at)
                    )
                  : ''}
              </Text>
            </Box>

            <VStack flex="1" pb={8} space={[1, 2]}>
              {requests
                .filter((request) => request.intervention_id === intervention.id)
                .map((request, idRequest) => (
                  <Box
                    key={idRequest}
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
                            onPress={() => refuseRequest(request.id)}
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
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}
