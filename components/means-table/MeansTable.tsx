import { Box, Heading, VStack, Divider, HStack, Text, ScrollView } from 'native-base';
import React from 'react';

import ConfirmationModal from './ConfirmationModal';
import { Mean } from '../../types/mean-types';
import { getDate, getMilitaryTime } from '../../utils/means';

type MeansTableProps = {
  means: Mean[];
};

export default function MeansTable({ means }: MeansTableProps) {
  return (
    <Box h="50%">
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
        <ScrollView h="50%">
          {means.map((mean: Mean, i) => (
            <HStack
              key={mean.id}
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
            >
              <Text flex={2}>{mean.danger_code}</Text>
              <Text flex={2}>{getMilitaryTime(mean.request_date)}</Text>
              <Text flex={2}>{getDate(mean.request_date)}</Text>
              <Text flex={2}>
                {mean.crm_arrival == null ? '' : getMilitaryTime(mean.crm_arrival)}
              </Text>
              <Text flex={2}>
                {mean.sector_arrival == null ? '' : getMilitaryTime(mean.sector_arrival)}
              </Text>
              <Text flex={2}>
                {mean.available_at == null ? '' : getMilitaryTime(mean.available_at)}
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
