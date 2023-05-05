import { Entypo } from '@expo/vector-icons';
import { Box, Divider, Icon, IconButton, Text } from 'native-base';

import { InterventionMean } from '../../types/mean-types';
import { getMilitaryTime } from '../../utils/date';

type MeansTableRowProps = {
  mean: InterventionMean;
};

function MeansTableRow({ mean }: MeansTableRowProps) {
  return (
    <Box flexDir="row" alignItems="center">
      <Text textAlign="center" flex="1">
        {mean.means.label}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        {getMilitaryTime(mean.request_date)}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        {getMilitaryTime(mean.request_date)}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        {getMilitaryTime(mean.crm_arrival)}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        {getMilitaryTime(mean.sector_arrival)}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        {getMilitaryTime(mean.available_at)}
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <IconButton flex="0.5" icon={<Icon as={Entypo} name="pencil" size={6} color="black" />} />
    </Box>
  );
}

export default MeansTableRow;
