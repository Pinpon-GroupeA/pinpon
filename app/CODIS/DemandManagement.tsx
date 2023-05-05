import { SupabaseClient } from '@supabase/supabase-js';
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
import { useState } from 'react';

function getTypeColor(mytype: string) {
  switch (mytype) {
    case 'INC':
      return 'red.500';
    case 'SAP':
      return 'green.500';
    default:
      return 'black.500';
  }
}

type demandProps = {
  adress: string;
  danger_code: string;
  date: string;
  demandList: any;
  supabase: SupabaseClient;
};

export default function DemandManagement(props: demandProps) {
  const [affectedId, setAffectedId] = useState<number>(-1);
  const typeColor = getTypeColor(props.danger_code);

  async function validDemand(supabase: SupabaseClient, demand: any) {
    await supabase
      .from('means')
      .select('id')
      .eq('is_available', true)
      .eq('mean_type', demand.mean_type)
      .then(({ data }) => {
        if (data) {
          setAffectedId(data[0].id);
          console.log('début insertion de ', data[0].id);
          supabase
            .from('interventions_means_link')
            .insert([
              {
                using_crm: false,
                is_on_site: false,
                request_date: demand.request_time,
                intervention_id: demand.intervention_id,
                mean_id: data[0].id,
                danger_code: props.danger_code,
              },
            ])
            .then((response) => {
              supabase
                .from('means')
                .update({ is_available: false })
                .eq('id', data[0].id)
                .then((subresponse) => console.log('reservation : ', subresponse));
              supabase
                .from('requests')
                .update({ status: 'ACCEPTEE' })
                .eq('id', demand.id)
                .then((subresponse) => console.log('validation : ', subresponse));
              console.log('fin insertion : ', response);
            });
        } else {
          console.log('No available mean.');
        }
      });
  }

  async function refuseDemand(supabase: SupabaseClient, id: number) {
    await supabase.from('Requests').update({ status: 'REFUSEE' }).eq('id', id);
  }

  return (
    <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
      <Heading fontSize="xl" p="4" pb="3">
        Moyens demandés
      </Heading>
      <br />
      <Box borderRadius="md">
        <VStack space={[1, 2]} divider={<Divider />}>
          <Box>
            <HStack space={[5, 40]} justifyContent="space-between">
              <VStack>
                <Text>{props.adress}</Text>
              </VStack>
              <VStack>
                <Text bold textAlign="right" color={typeColor}>
                  {props.danger_code}
                </Text>
                <Text textAlign="right">{props.date}</Text>
              </VStack>
            </HStack>
          </Box>
          {props.demandList.map((mydemand: any) => (
            <Box>
              <HStack justifyContent="space-between">
                <VStack>
                  <Text>{mydemand.mean_type},</Text>

                  <Text>
                    demandé le {mydemand.request_time.split('T')[0].split('-').join('/')} à{' '}
                    {mydemand.request_time.split('T')[1].split('+')[0].split(':').join('')}
                  </Text>
                </VStack>
                <VStack>
                  <HStack justifyContent="space-between">
                    <VStack>
                      <IconButton
                        onPress={(event) => validDemand(props.supabase, mydemand)}
                        colorScheme="green"
                        borderRadius="full"
                        icon={<CheckIcon />}
                      />
                    </VStack>
                    <VStack>
                      <IconButton
                        onPress={(event) => refuseDemand(props.supabase, mydemand.id)}
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
