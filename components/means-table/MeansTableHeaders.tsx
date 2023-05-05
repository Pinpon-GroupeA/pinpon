import { Box, Divider, Text } from 'native-base';

function MeansTableHeaders() {
  return (
    <Box flexDir="row" alignItems="center">
      <Text textAlign="center" flex="1">
        Moyen
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        Demandé à
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        Arrivée prévue à
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        Au CRM à
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        Sur site à
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Text textAlign="center" flex="1">
        Disponible à
      </Text>
      <Divider orientation="vertical" mx={2} bg="#202124" />
      <Box flex="0.71" />
    </Box>
  );
}

export default MeansTableHeaders;
