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
        {mean.label} ({mean.mean_type})
      </FormControl.Label>
      <HStack alignItems="center" flex="1.5">
        <Button variant="ghost" onPress={handleDecrementClick}>
          -
        </Button>
        <Text>{values[index]}</Text>
        <Button variant="ghost" onPress={handleIncrementClick}>
          +
        </Button>
      </HStack>
    </HStack>
  );
}
