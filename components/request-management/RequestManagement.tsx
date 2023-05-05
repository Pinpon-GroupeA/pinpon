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
import { supabase } from '../../utils/supabase';

type RequestManagementProps = {
  address?: string;
  date?: string;
  danger_code?: string;
  requests: Request[];
};

export default function RequestManagement({ address, date, requests }: RequestManagementProps) {
  const validateRequest = async (request: Request) => {
    const { data } = await supabase
      .from('means')
      .select('id')
      .eq('is_available', true)
      .eq('mean_type', request.mean_type);

    if (data) {
      await supabase.from('interventions_means_link').insert([
        {
          using_crm: false,
          is_on_site: false,
          request_date: request.request_time,
          intervention_id: request.intervention_id,
          mean_id: data[0].id,
        },
      ]);

      await supabase.from('means').update({ is_available: false }).eq('id', data[0].id);
      await supabase.from('requests').update({ status: 'ACCEPTEE' }).eq('id', request.id);
    }
  };

  async function refuseDemand(id: number) {
    await supabase.from('Requests').update({ status: 'REFUSEE' }).eq('id', id);
  }

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
                <Text textAlign="right">{date}</Text>
              </VStack>
            </HStack>
          </Box>
          {requests.map((request, id) => (
            <Box key={id}>
              <HStack justifyContent="space-between">
                <VStack>
                  <Text>{request.mean_type},</Text>

                  <Text>
                    demandé le {request.request_time.split('T')[0].split('-').join('/')} à{' '}
                    {request.request_time.split('T')[1].split('+')[0].split(':').join('')}
                  </Text>
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
