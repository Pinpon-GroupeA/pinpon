import { Button, FormControl, HStack, Text } from 'native-base';
import React from 'react';

type MeanRequestItemProps = {
  mean: { mean_type: any; label: any };
  values: number[];
  setValues: (values: number[]) => void;
  index: number;
};

export default function MeanRequestItem({ mean, values, setValues, index }: MeanRequestItemProps) {
  const handleIncrementClick = () => {
    const nextValues = values.map((v, i) => {
      if (i === index) {
        return v + 1;
      } else {
        return v;
      }
    });
    setValues(nextValues);
  };

  const handleDecrementClick = () => {
    const nextValues = values.map((v, i) => {
      if (i === index && values[index] > 0) {
        return v - 1;
      } else {
        return v;
      }
    });
    setValues(nextValues);
  };

  return (
    <HStack alignItems="center" justifyContent="space-around">
      <FormControl.Label flex="8">
        {' '}
        <Text color="black" fontSize="md">
          {mean.label + ' (' + mean.mean_type + ')'}
        </Text>
      </FormControl.Label>
      <HStack alignItems="center" flex="2">
        <Button variant="ghost" _pressed={{ bgColor: '#19837C30' }} onPress={handleDecrementClick}>
          -
        </Button>
        <Text>{values[index]}</Text>
        <Button variant="ghost" _pressed={{ bgColor: '#19837C30' }} onPress={handleIncrementClick}>
          +
        </Button>
      </HStack>
    </HStack>
  );
}
