import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Fab, FlatList, Heading, Icon, VStack } from 'native-base';

import Intervention from './Intervention';
import { Intervention as InterventionType } from '../../types/intervention-types';

type InterventionListProps = {
  interventions: InterventionType[];
};

const renderIntervention = ({ item }: { item: InterventionType }) => (
  <Intervention intervention={item} />
);

export default function InterventionList({ interventions }: InterventionListProps) {
  const router = useRouter();
  const isCodis = true; // TODO: get user type

  return (
    <>
      <FlatList
        data={interventions}
        renderItem={renderIntervention}
        ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
        keyExtractor={(intervention) => intervention.id}
        ListEmptyComponent={() => (
          <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
            <Heading>Pas d'interventions trouvées</Heading>
          </VStack>
        )}
      />
      {isCodis && (
        <Fab
          placement="bottom-right"
          icon={<Icon color="white" as={AntDesign} name="plus" size="4" />}
          onPress={() => router.push('/intervention/create')}
          renderInPortal={false}
        />
      )}
    </>
  );
}
