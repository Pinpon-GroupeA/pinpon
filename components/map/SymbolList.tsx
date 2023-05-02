import { Pressable, ScrollView } from 'native-base';
import React from 'react';

import CustomRectangle from './symbols/CustomRectangle';
import { useAppStore } from '../../stores/store';

function SymbolList() {
  const selectedSymbol = useAppStore((state) => state.selectedSymbol);
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);

  const handleSymbolPress = (symbolName: string) => {
    setSelectedSymbol(symbolName);
  };

  return (
    <ScrollView flexDirection="column">
      <Pressable
        padding={3}
        bgColor={selectedSymbol === 'test' ? 'amber.300' : undefined}
        alignItems="center"
        onPress={() => handleSymbolPress('test')}
      >
        <CustomRectangle size={{ height: 30, width: 30 }} color="#f00" strokeStyle />
      </Pressable>
      <Pressable
        padding={3}
        bgColor={selectedSymbol === 'test1' ? 'amber.300' : undefined}
        alignItems="center"
        onPress={() => handleSymbolPress('test1')}
      >
        <CustomRectangle size={{ height: 30, width: 30 }} color="#2D3ED3" />
      </Pressable>
    </ScrollView>
  );
}

export default SymbolList;
