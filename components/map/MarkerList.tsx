import { ScrollView } from 'native-base';
import React from 'react';
import { Rect } from 'react-native-svg';

import CustomMarker from './CustomMarker';
import { useAppStore } from '../../stores/store';

function SymbolsList() {
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);

  const handleSymbolPress = (id: number) => {
    console.log('handleSymbolPress', id);
    setSelectedSymbol(id);
  };

  return (
    <ScrollView>
      <CustomMarker onPress={handleSymbolPress}>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke="red"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </CustomMarker>
      <CustomMarker>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke="blue"
          strokeWidth="1"
          strokeDasharray="none"
        />
      </CustomMarker>
    </ScrollView>
  );
}

export default SymbolsList;
