import { Box, Heading, VStack, Divider, HStack, Text, ScrollView } from 'native-base';
import React from 'react';

import ConfirmationModal from './ConfirmationModal';
import { InterventionMean } from '../../../types/mean-types';
import { getMilitaryTime, addMinutes } from '../../../utils/date';

type MeansTableProps = {
  means: InterventionMean[];
};

export default function MeansTable({ means }: MeansTableProps) {
  return (
    <Box>
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Tableau des moyens
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
          <Text flex={1} bold fontSize="20px" />
        </HStack>
        <ScrollView>
          {means.map((mean: InterventionMean, i) => (
            <HStack
              key={mean.id}
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
            >
              <Text flex={2}>{mean.means.label}</Text>
              <Text flex={2}>
                {getMilitaryTime(new Date(mean.request_date).toLocaleTimeString())}
              </Text>
              <Text flex={2}>{addMinutes(mean.request_date, 20)}</Text>
              <Text flex={2}>
                {getMilitaryTime(new Date(mean.crm_arrival).toLocaleTimeString())}
              </Text>
              <Text flex={2}>
                {getMilitaryTime(new Date(mean.sector_arrival).toLocaleTimeString())}
              </Text>
              <Text flex={2}>
                {getMilitaryTime(new Date(mean.available_at).toLocaleTimeString())}
              </Text>
              <ConfirmationModal
                id={mean.id}
                crm={mean.crm_arrival}
                sector={mean.sector_arrival}
                available={mean.available_at}
              />
            </HStack>
          ))}
        </ScrollView>
      </VStack>
    </Box>
  );
}
