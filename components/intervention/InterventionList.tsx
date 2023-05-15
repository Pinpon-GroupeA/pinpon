import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Fab, HStack, Heading, Icon, Pressable, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import Colors from '../../constants/colors';
import { useAppStore } from '../../stores/store';
import { InterventionListData } from '../../types/intervention-types';
import { deleteIntervention, markAsCompleted } from '../../utils/intervention';
import Intervention from './Intervention';

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
    <Box bgColor={Colors.BACKGROUND_GREY}>
      <Intervention intervention={item} />
    </Box>
  );
  const renderHiddenIntervention = ({ item }: { item: InterventionListData }) => (
    <Box
      flex="1"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      bgColor={Colors.BACKGROUND_GREY}
      pl="15px"
    >
      {item.status_intervention !== 'OVER' && (
        <Pressable mr="4" onPress={() => markAsCompleted(item.id)}>
          <Icon as={AntDesign} name="check" color={Colors.GREEN} size={6} />
        </Pressable>
      )}
      <Pressable onPress={() => deleteIntervention(item.id)}>
        <Icon as={FontAwesome5} name="trash" color={Colors.RED} size={4} />
      </Pressable>
    </Box>
  );

  return (
    <Box mx={3} h="100%">
      <HStack m={3} justifyContent={isCodis ? 'space-evenly' : 'flex-start'} alignItems="center">
        <Heading fontSize="4xl" color={Colors.TURQUOISE}>
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
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
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
  );
}
