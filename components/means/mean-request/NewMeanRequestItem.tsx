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
        {meanToRequest.label} ({meanToRequest.mean_type})
      </FormControl.Label>
      <HStack alignItems="center" flex="1.5">
        <Button
          variant="ghost"
          disabled={meanToRequest.numberOfRequests < 1}
          onPress={onDecrementClicked}
        >
          -
        </Button>
        <Text>{meanToRequest.numberOfRequests}</Text>
        <Button variant="ghost" onPress={onIncrementClicked}>
          +
        </Button>
      </HStack>
    </HStack>
  );
}
