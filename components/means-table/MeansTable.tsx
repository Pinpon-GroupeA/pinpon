import { ScrollView, Heading, VStack, Divider, HStack, Text } from 'native-base';
import React from 'react';

import { Mean } from '../../types/mean-types';

export default function MeansTable() {
  const means: Mean[] = [
    {
      id: '1',
      label: 'VSAV 1',
      requestTime: '1000',
      schduledArrivalTime: '1015',
      CRMArrivalTime: '1020',
      onSiteArrivalTime: '1025',
      availableTime: '1030',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'VSAV',
      dangerCode: 'INC',
    },
    {
      id: '2',
      label: 'FPT 1',
      requestTime: '1020',
      schduledArrivalTime: '1025',
      CRMArrivalTime: '1030',
      onSiteArrivalTime: '1035',
      availableTime: '1040',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'FPT',
      dangerCode: 'SAP',
    },
    {
      id: '3',
      label: 'VSAV 2',
      requestTime: '1030',
      schduledArrivalTime: '1035',
      CRMArrivalTime: '1040',
      onSiteArrivalTime: '1045',
      availableTime: '1050',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'VSAV',
      dangerCode: 'INC',
    },
  ];

  return (
    <ScrollView>
      <Heading pt={3} pb={8} size="2xl" color="#19837C">
        Tableau des moyens
      </Heading>
      <VStack divider={<Divider bg="black" />} w="100%" h="10rem">
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
    </ScrollView>
  );
}
