import { AntDesign } from '@expo/vector-icons';
import { Box, Fab, FlatList, Icon } from 'native-base';

import Intervention from './Intervention';
import { Intervention as InterventionType } from '../../types/intervention-types';

type InterventionListProps = {
  interventions: InterventionType[];
};

const renderIntervention = ({ item }: { item: InterventionType }) => (
  <Intervention intervention={item} />
);

export default function InterventionList({ interventions }: InterventionListProps) {
  const isCodis = true;

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
          renderInPortal={false}
        />
      )}
    </>
  );
}
