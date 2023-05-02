import { Box, Heading, VStack, Divider, HStack, Text } from 'native-base';
import React from 'react';

import { Mean } from '../../types/mean-types';

type MeansTableProps = {
  means: Mean[];
};

export default function MeansTable({ means }: MeansTableProps) {
  return (
    <Box>
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Tableau des moyens
      </Heading>
      <VStack divider={<Divider bg="black" />} w="100%" h="100%">
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
            Arrivée prévue à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Au CRM à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Sur site à
          </Text>
          <Text flex={2} bold fontSize="20px">
            Disponible à
          </Text>
        </HStack>
        {means.map((mean, i) => (
          <HStack
            key={i}
            divider={<Divider bg="black" />}
            h="8"
            alignItems="center"
            textAlign="center"
          >
            <Text flex={2}>{mean.label}</Text>
            <Text flex={2}>{mean.requestTime}</Text>
            <Text flex={2}>{mean.schduledArrivalTime}</Text>
            <Text flex={2}>{mean.CRMArrivalTime}</Text>
            <Text flex={2}>{mean.onSiteArrivalTime}</Text>
            <Text flex={2}>{mean.availableTime}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
