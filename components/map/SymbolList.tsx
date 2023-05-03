import { ScrollView } from 'native-base';
import React from 'react';

import PressableSymbol from './PressableSymbol';
import CustomRectangle from './symbols/CustomRectangle';
import { useAppStore } from '../../stores/store';

function SymbolList() {
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);

  const handleSymbolPress = (symbolName: string) => {
    setSelectedSymbol(symbolName);
  };

  return (
    <ScrollView flexDirection="column">
      <PressableSymbol onPress={() => handleSymbolPress('test')}>
        <CustomRectangle size={{ height: 30, width: 30 }} color="#f00" strokeStyle />
      </PressableSymbol>
      <PressableSymbol onPress={() => handleSymbolPress('test1')}>
        <CustomRectangle size={{ height: 30, width: 30 }} color="#2D3ED3" />
      </PressableSymbol>
    </ScrollView>
  );
}

export default SymbolList;
