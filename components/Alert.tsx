import { Alert, HStack, VStack, Text } from 'native-base';

type AlertProps = {
  textContent: string;
};

export default function AlertMeansRequestsSuccess({ textContent }: AlertProps) {
  return (
    <Alert w="100%" variant="subtle" status="success">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text>{textContent}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
}
