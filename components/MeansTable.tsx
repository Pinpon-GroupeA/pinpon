import { Foundation, AntDesign } from '@expo/vector-icons';
import { ScrollView, Heading, Text, VStack, HStack, Fab, Divider } from 'native-base';
import React from 'react';

export default function MeansTable() {
  return <Table />;
}

function Table() {
  const instState = [
    {
      moyen: 'VSAV',
      demande: '1030',
      prevu: '1031',
      crm: '1032',
      site: '1033',
      disponible: '1034',
      statut: 'Accepté',
    },
    {
      moyen: 'VLCP',
      demande: '1030',
      prevu: '1031',
      crm: '1032',
      site: '1033',
      disponible: '1034',
      statut: 'Refusé',
    },
    {
      moyen: 'FPT',
      demande: '1030',
      prevu: '1031',
      crm: '1032',
      site: '1033',
      disponible: '1034',
      statut: 'En attente',
    },
  ];

  const [list] = React.useState(instState);

  //Moyen, Demandé à, Prévu au CRM à, Au CRM à, Prévu sur site à, Sur le site à, Disponible à

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
            Prévu au CRM à
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
          <Text flex={2} bold fontSize="20px">
            Statut
          </Text>
          <Text flex={1} bold fontSize="20px" />
        </HStack>
        {list.map((item) =>
          item.statut === 'Refusé' ? (
            <HStack
              divider={<Divider bg="black" />}
              h="8"
              alignItems="center"
              textAlign="center"
              backgroundColor="gray.300"
            >
              <Text flex={2}>{item.moyen}</Text>
              <Text flex={2}>{item.demande}</Text>
              <Text flex={2}>{item.prevu}</Text>
              <Text flex={2}>{item.crm}</Text>
              <Text flex={2}>{item.site}</Text>
              <Text flex={2}>{item.disponible}</Text>
              <Text flex={2}>{item.statut}</Text>
              <Text flex={1} />
            </HStack>
          ) : (
            <HStack divider={<Divider bg="black" />} h="8" alignItems="center" textAlign="center">
              <Text flex={2}>{item.moyen}</Text>
              <Text flex={2}>{item.demande}</Text>
              <Text flex={2}>{item.prevu}</Text>
              <Text flex={2}>{item.crm}</Text>
              <Text flex={2}>{item.site}</Text>
              <Text flex={2}>{item.disponible}</Text>
              <Text flex={2}>{item.statut}</Text>
              <Text flex={1}>
                {item.statut === 'Accepté' ? (
                  <Foundation name="pencil" size={20} color="black" />
                ) : (
                  <Foundation name="x" size={20} color="black" />
                )}
              </Text>
            </HStack>
          )
        )}
      </VStack>
      <Fab
        renderInPortal
        backgroundColor="#19837C"
        icon={<AntDesign name="plus" size={24} color="black" />}
      />
    </ScrollView>
  );
}
