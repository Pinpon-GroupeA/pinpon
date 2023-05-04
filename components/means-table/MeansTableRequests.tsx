import { Box, Heading, VStack, Divider, HStack, Text, ScrollView } from 'native-base';

import ConfirmationModalRequest from './ConfirmationModalRequest';
import { Request } from '../../types/request-types';

type MeansTableProps = {
  means: Request[];
};

export default function MeansTableRequests({ means }: MeansTableProps) {
  return (
    <Box h="50%">
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Demande de moyens
      </Heading>
      <VStack divider={<Divider bg="black" />} w="100%">
        <HStack
          textAlign="center"
          divider={<Divider bg="black" />}
          h="8"
          alignItems="center"
          textDecoration="bold"
        >
          <Text flex={2} bold fontSize="20px">
            Moyen
          </Text>
          <Text flex={2} bold fontSize="20px">
            Demandé à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Statut
          </Text>
          <Text flex={1} bold fontSize="20px" />
        </HStack>
        <ScrollView h="50%">
          {means?.map((mean: Request, i) =>
            mean.status === 'ACCEPTED' ? null : (
              <HStack
                key={i}
                h="8"
                divider={<Divider bg="black" />}
                alignItems="center"
                textAlign="center"
                bgColor={mean.status === 'REFUSED' ? 'gray.400' : ''}
              >
                <Text flex={2}>{mean.mean_type}</Text>
                <Text flex={2}>
                  {mean.request_date === null
                    ? ''
                    : mean.request_date.slice(11, 13) + mean.request_date.slice(14, 16)}
                </Text>
                <Text flex={2}>{mean.status}</Text>
                <Text flex={1}>
                  {mean.status === 'PENDING' ? <ConfirmationModalRequest id={mean.id} /> : ''}
                </Text>
              </HStack>
            )
          )}
        </ScrollView>
      </VStack>
    </Box>
  );
}
