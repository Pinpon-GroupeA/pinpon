import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Fab, HStack, Heading, Icon, NativeBaseProvider, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import Intervention from './Intervention';
import Colors from '../../constants/colors';
import { useAppStore } from '../../stores/store';
import { InterventionListData } from '../../types/intervention-types';
import { supprInterventions } from '../../utils/intervention';

type InterventionListProps = {
  interventions: InterventionListData[];
};

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

  const renderIntervention = ({ item }: { item: InterventionListData }) => (
    <Intervention intervention={item} />
  );
  const renderHiddenIntervention = ({ item }: { item: InterventionListData }) => <HStack />;

  const deleteIntervention = (id: any) => {
    supprInterventions(id);
  };

  return (
    <NativeBaseProvider>
      <Box h="100%">
        <HStack m={3} justifyContent={isCodis ? 'space-evenly' : 'flex-start'} alignItems="center">
          <Heading mx={3} fontSize="4xl" color={Colors.TURQUOISE}>
            Interventions
          </Heading>
          {isCodis && <Icon as={AntDesign} name="caretright" color="dark.600" size={6} />}

          {isCodis && (
            <Heading fontSize="3xl" fontWeight="normal" onPress={() => router.push('/requests')}>
              Moyens Demandés
            </Heading>
          )}
        </HStack>

        <SwipeListView
          data={orderInterventions(interventions)}
          renderItem={renderIntervention}
          renderHiddenItem={renderHiddenIntervention}
          ItemSeparatorComponent={() => <Box w="100%" h="1px" backgroundColor="gray.300" />}
          keyExtractor={(intervention) => String(intervention.id)}
          ListEmptyComponent={() => (
            <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
              <Heading>Pas d'interventions trouvées</Heading>
            </VStack>
          )}
          rightOpenValue={-75}
          leftOpenValue={75}
          rightActivationValue={75}
          leftActivationValue={75}
          onRightAction={deleteIntervention}
          onLeftAction={deleteIntervention}
        />
        {isCodis && (
          <Fab
            placement="bottom-right"
            bgColor={Colors.TURQUOISE}
            icon={<Icon color="white" as={AntDesign} name="plus" size="4" />}
            onPress={() => router.push('/intervention/create')}
            renderInPortal={false}
          />
        )}
      </Box>
    </NativeBaseProvider>
  );
}
