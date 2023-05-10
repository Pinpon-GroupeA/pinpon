import { useRouter } from 'expo-router';
import { Badge, Box, HStack, Pressable, Text } from 'native-base';

import { useAppStore } from '../../stores/store';
import { Intervention as InterventionType } from '../../types/intervention-types';
import { getDangerCodeColor } from '../../utils/danger-code';
import { dateTimeFormattingOptions } from '../../utils/date';
import { getStatusMessage as getBadgeMessage, getStatusBadgeColor } from '../../utils/intervention';

type InterventionProps = {
  intervention: InterventionType;
};

export default function Intervention({ intervention }: InterventionProps) {
  const isCodis = useAppStore((state) => state.role) === 'CODIS';

  const router = useRouter();

  const formattedDate = Intl.DateTimeFormat('fr-FR', dateTimeFormattingOptions).format(
    new Date(intervention.created_at)
  );
  const showAddress = intervention.address && intervention.address.length > 0;
  const title = (
    <Text fontSize="md" fontWeight="semibold">
      {showAddress
        ? intervention.address
        : `${intervention.location.latitude}, ${intervention.location.longitude}`}
    </Text>
  );

  const handleInterventionPress = () => {
    if (isCodis) {
      router.push(`/intervention/${intervention.id}/requests`);
    } else {
      router.push(`/intervention/${intervention.id}/map`);
    }
  };

  return (
    <Pressable
      p="2"
      borderWidth="1"
      borderRadius="md"
      borderColor="gray.200"
      flexWrap="wrap"
      flexDirection="row"
      justifyContent="space-between"
      onPress={handleInterventionPress}
    >
      <Box>
        {title}
        <Text fontSize="sm" color="gray.400">
          {formattedDate}
        </Text>
      </Box>
      <HStack space="6" alignItems="center">
        <Badge variant="solid" colorScheme={getStatusBadgeColor(intervention.status_intervention)}>
          {getBadgeMessage(intervention.status_intervention)}
        </Badge>
        <Box alignItems="center">
          <Text fontWeight="semibold" color={getDangerCodeColor(intervention.danger_code)}>
            {intervention.danger_code}
          </Text>
          <Text>#{intervention.id}</Text>
        </Box>
      </HStack>
    </Pressable>
  );
}
