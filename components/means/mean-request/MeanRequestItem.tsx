import { Button, FormControl, HStack, Text } from 'native-base';
import React from 'react';

import { MeanTypeToRequest } from '../../../types/mean-types';

type MeanRequestItemProps = {
  meanToRequest: MeanTypeToRequest;
  onIncrementClicked: () => void;
  onDecrementClicked: () => void;
};

export default function MeanRequestItem({
  meanToRequest,
  onIncrementClicked,
  onDecrementClicked,
}: MeanRequestItemProps) {
  return (
    <HStack alignItems="center" justifyContent="space-around">
      <FormControl.Label flex="8">
        <Text color="black" fontSize="md">
          {meanToRequest.label + ' (' + meanToRequest.mean_type + ')'}
        </Text>
      </FormControl.Label>
      <HStack alignItems="center" flex="2">
        <Button
          variant="ghost"
          disabled={meanToRequest.numberOfRequests < 1}
          onPress={onDecrementClicked}
          _pressed={{ bgColor: '#19837C30' }}
        >
          -
        </Button>
        <Text>{meanToRequest.numberOfRequests}</Text>
        <Button variant="ghost" onPress={onIncrementClicked} _pressed={{ bgColor: '#19837C30' }}>
          +
        </Button>
      </HStack>
    </HStack>
  );
}
