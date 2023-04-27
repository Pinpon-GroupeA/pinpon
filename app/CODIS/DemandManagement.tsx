import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  IconButton,
  HStack,
  CheckIcon,
  CloseIcon,
} from 'native-base';

function getTypeColor(mytype: string) {
  switch (mytype) {
    case 'INC':
      return 'red.500';
    case 'SAP':
      return 'green.500';
    default:
      return 'black.500';
  }
}

function validDemand(id: number) {}

function refuseDemand(id: number) {}

type demandProps = {
  adress: string;
  type: string;
  date: string;
  demandList: demand[];
};
type demand = {
  id: number;
  hour: string;
  val: string;
};

export default function DemandManagement(props: demandProps) {
  const typeColor = getTypeColor(props.type);

  return (
    <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
      <Heading fontSize="xl" p="4" pb="3">
        Moyens demandés
      </Heading>
      <br />
      <Box borderRadius="md">
        <VStack space={[1, 2]} divider={<Divider />}>
          <Box>
            <HStack space={[5, 40]} justifyContent="space-between">
              <VStack>
                <Text>{props.adress}</Text>
              </VStack>
              <VStack>
                <Text bold textAlign="right" color={typeColor}>
                  {props.type}
                </Text>
                <Text textAlign="right">{props.date}</Text>
              </VStack>
            </HStack>
          </Box>
          {props.demandList.map((mydemand) => (
            <Box>
              <HStack justifyContent="space-between">
                <VStack>
                  <Text>{mydemand.val},</Text>

                  <Text>demandé à {mydemand.hour}</Text>
                </VStack>
                <VStack>
                  <HStack justifyContent="space-between">
                    <VStack>
                      <IconButton
                        onPress={(event) => validDemand(mydemand.id)}
                        colorScheme="green"
                        borderRadius="full"
                        icon={<CheckIcon />}
                      />
                    </VStack>
                    <VStack>
                      <IconButton
                        onPress={(event) => refuseDemand(mydemand.id)}
                        colorScheme="red"
                        borderRadius="full"
                        icon={<CloseIcon />}
                      />
                    </VStack>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}
