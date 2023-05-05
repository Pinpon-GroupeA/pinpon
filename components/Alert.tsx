import { Alert as NativeBaseAlert, HStack, VStack, Text } from 'native-base';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';
import { CustomProps } from 'native-base/lib/typescript/components/types';

type AlertProps = {
  textContent: string;
  variant: CustomProps<'Alert'>['variant'];
  status: InterfaceAlertProps['status'];
};

export default function Alert({ textContent, variant, status }: AlertProps) {
  return (
    <NativeBaseAlert w="100%" variant={variant} status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <NativeBaseAlert.Icon />
            <Text>{textContent}</Text>
          </HStack>
        </HStack>
      </VStack>
    </NativeBaseAlert>
  );
}
