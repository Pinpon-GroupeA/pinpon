import { useSearchParams } from 'expo-router';
import { Box, Heading } from 'native-base';

import DroneVideo from '../../../../../components/drone-video/DroneVideo';
import Colors from '../../../../../constants/colors';

export default function Video() {
  const { id } = useSearchParams();

  if (!id) {
    return <Heading>Erreur: Pas d'id</Heading>;
  }

  return (
    <Box mx="3">
      <Heading pt={3} pb={5} size="xl" color={Colors.TURQUOISE}>
        Video
      </Heading>
      <Box alignSelf="center" flex={1}>
        <DroneVideo interventionId={id as string} />
      </Box>
    </Box>
  );
}
