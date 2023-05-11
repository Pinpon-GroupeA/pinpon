import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Fab, FlatList, Heading, Icon, VStack, HStack } from 'native-base';

import Intervention from './Intervention';
import { useAppStore } from '../../stores/store';
import { InterventionListData } from '../../types/intervention-types';

type InterventionListProps = {
  interventions: InterventionListData[];
};

const renderIntervention = ({ item }: { item: InterventionListData }) => (
  <Intervention intervention={item} />
);

export default function InterventionList({ interventions }: InterventionListProps) {
  const router = useRouter();
  const isCodis = useAppStore((state) => state.role) === 'CODIS';

  const orderInterventions = (interventions: InterventionListData[]) => {
    if (isCodis) {
      return interventions.sort((a, b) => {
        return b.pendingRequests - a.pendingRequests;
      });
    }

    return interventions;
  };

  return (
    <Box mx={3}>
      <HStack m={3} justifyContent={isCodis ? 'space-evenly' : 'flex-start'} alignItems="center">
        <Heading fontSize="4xl" color="#19837C">
          Interventions
        </Heading>
        {isCodis && <Icon as={AntDesign} name="caretright" color="dark.600" size={6} />}

        {isCodis && (
          <Heading fontSize="3xl" fontWeight="normal" onPress={() => router.push('/requests')}>
            Moyens Demandés
          </Heading>
        )}
      </HStack>

      <FlatList
        data={orderInterventions(interventions)}
        renderItem={renderIntervention}
        ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
        keyExtractor={(intervention) => String(intervention.id)}
        ListEmptyComponent={() => (
          <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
            <Heading>Pas d'interventions trouvées</Heading>
          </VStack>
        )}
      />
      {isCodis && (
        <Fab
          placement="bottom-right"
          bgColor="#19837C"
          icon={<Icon color="white" as={AntDesign} name="plus" size="4" />}
          onPress={() => router.push('/intervention/create')}
          renderInPortal={false}
        />
      )}
    </Box>
  );
}
