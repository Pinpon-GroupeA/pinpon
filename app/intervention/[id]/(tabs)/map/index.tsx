import { Box, HStack } from 'native-base';

import InterventionMap from '../../../../../components/map/InterventionMap';
import SymbolList from '../../../../../components/map/SymbolList';

export default function Map() {
  return (
    <HStack h="100%">
      <Box w="15%">
        <SymbolList />
      </Box>
      <Box w="85%">
        <InterventionMap />
      </Box>
    </HStack>
  );
}
