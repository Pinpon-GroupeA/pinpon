import { Box, FlatList } from 'native-base';

import Intervention from './Intervention';
import { Intervention as InterventionType } from '../../types/intervention-types';

const renderIntervention = ({ item }: { item: InterventionType }) => (
  <Intervention intervention={item} />
);

export default function InterventionList() {
  const interventions: InterventionType[] = [
    {
      id: '1',
      date: '2021-09-01T10:00:00',
      location: {
        latitude: 48.115537335418445,
        longitude: -1.638870923241485,
      },
      address: 'Rue de la Chalotais, 35000 Rennes',
      customerName: 'Jean Dupont',
      dangerCode: 'INC',
      isOngoing: true,
    },
    {
      id: '2',
      date: '2021-09-01T10:00:00',
      location: {
        latitude: 48.115537335418445,
        longitude: -1.638870923241485,
      },
      address: 'Rue de la Chalotais, 35000 Rennes',
      customerName: 'Jean Dupont',
      dangerCode: 'SAP',
      isOngoing: true,
    },
  ];

  return (
    <FlatList
      data={interventions}
      renderItem={renderIntervention}
      ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
    />
  );
}
