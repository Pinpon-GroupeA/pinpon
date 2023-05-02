import { Button, FormControl, HStack, Text } from 'native-base';
import React from 'react';

type MeanRequestItemProps = {
  mean: string;
  value: number;
  setValue: (value: number) => void;
};

export default function MeanRequestItem({ mean, value, setValue }: MeanRequestItemProps) {
  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const increment = () => setValue(value + 1);

  return (
    <HStack alignItems="center" justifyContent="space-around">
      <FormControl.Label flex="8">{mean}</FormControl.Label>
      <HStack alignItems="center" flex="1.5">
        <Button variant="ghost" onPress={decrement}>
          -
        </Button>
        <Text>{value}</Text>
        <Button variant="ghost" onPress={increment}>
          +
        </Button>
      </HStack>
    </HStack>
  );
}
