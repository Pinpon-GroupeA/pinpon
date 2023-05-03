import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Fab, FlatList, Icon } from 'native-base';

import { Intervention as InterventionType } from '../../types/intervention-types';
import Intervention from './Intervention';

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
