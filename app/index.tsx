import { Box, Heading, Text, VStack } from 'native-base';

import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <HelloWorld />
    </Providers>
  );
}

// TODO - Remove this component and replace when we start building the app
function HelloWorld() {
  return (
    <VStack flex="1" p="24px" alignItems="center" justifyContent="center">
      <Box justifyContent="center" maxW="960" marginX="auto">
        <Heading size="2xl" fontWeight="bold">
          Hello World
        </Heading>
        <Text color="#38434D">This is the first page of your app.</Text>
      </Box>
    </VStack>
  );
}
