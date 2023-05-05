import { Box } from 'native-base';
import { FlatList } from 'react-native';

import MeansTableHeaders from './MeansTableHeaders';
import MeansTableRow from './MeansTableRow';
import { InterventionMean } from '../../types/mean-types';

type MeansTableReworkProps = {
  means: InterventionMean[];
};

const renderMeansTableRow = ({ item }: { item: InterventionMean }) => <MeansTableRow mean={item} />;

const renderMeansTableHeader = () => <MeansTableHeaders />;

function MeansTableRework({ means }: MeansTableReworkProps) {
  return (
    <Box margin="2">
      <FlatList
        data={means}
        renderItem={renderMeansTableRow}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderMeansTableHeader}
      />
    </Box>
  );
}

export default MeansTableRework;
