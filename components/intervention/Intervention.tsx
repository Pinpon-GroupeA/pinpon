import { useRouter } from 'expo-router';
import { Box, Pressable, Text } from 'native-base';

import { Intervention as InterventionType } from '../../types/intervention-types';
import { getDangerCodeColor } from '../../utils/danger-code';

const dateTimeFormattingOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

type InterventionProps = {
  intervention: InterventionType;
};

export default function Intervention({ intervention }: InterventionProps) {
  const router = useRouter();

  const formattedDate = Intl.DateTimeFormat('fr-FR', dateTimeFormattingOptions).format(
    new Date(intervention.date)
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
    router.push(`/intervention/${intervention.id}`);
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
      <Box alignItems="center">
        <Text fontWeight="semibold" color={getDangerCodeColor(intervention.dangerCode)}>
          {intervention.dangerCode}
        </Text>
        <Text>#{intervention.id}</Text>
      </Box>
    </Pressable>
  );
}
