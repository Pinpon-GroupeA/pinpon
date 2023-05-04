import { Box, ScrollView, Text } from 'native-base';
import React from 'react';

import PressableSymbol from './PressableSymbol';
import CustomInvertedTriangle from './symbols/CustomInvertedTriangle';
import CustomStar from './symbols/CustomStar';
import CustomTriangle from './symbols/CustomTriangle';
import { useAppStore } from '../../stores/store';
import { SymbolsType } from '../../types/global-types';

function SymbolList() {
  const selectedSymbol = useAppStore((state) => state.selectedSymbol);
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);
  const drawingsColor = useAppStore((state) => state.drawingsColor);

  const handleSymbolPress = (symbolType: SymbolsType) => {
    if (selectedSymbol?.symboleType === symbolType) {
      setSelectedSymbol(undefined);
    } else {
      setSelectedSymbol({ symboleType: symbolType });
    }
  };

  return (
    <Box>
      <Text alignSelf="center">Autres moyens</Text>
      <ScrollView flexDirection="column">
        <PressableSymbol
          type="InvertedTriangle"
          onPress={() => handleSymbolPress('InvertedTriangle')}
          darkBackground={selectedSymbol?.symboleType === 'InvertedTriangle'}
        >
          <CustomInvertedTriangle color={drawingsColor} size={{ height: 30, width: 30 }} />
        </PressableSymbol>
        <PressableSymbol
          type="Triangle"
          onPress={() => handleSymbolPress('Triangle')}
          darkBackground={selectedSymbol?.symboleType === 'Triangle'}
        >
          <CustomTriangle color={drawingsColor} size={{ height: 30, width: 30 }} />
        </PressableSymbol>
        <PressableSymbol
          type="Star"
          onPress={() => handleSymbolPress('Star')}
          darkBackground={selectedSymbol?.symboleType === 'Star'}
        >
          <CustomStar color={drawingsColor} size={{ height: 30, width: 30 }} />
        </PressableSymbol>
      </ScrollView>
    </Box>
  );
}

export default SymbolList;
