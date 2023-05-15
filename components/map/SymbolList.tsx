import { Box, Text } from 'native-base';
import React from 'react';

import PressableSymbol from './PressableSymbol';
import CustomInvertedTriangle from './symbols/CustomInvertedTriangle';
import CustomStar from './symbols/CustomStar';
import CustomTriangle from './symbols/CustomTriangle';
import Explosion from './symbols/Explosion';
import { useAppStore } from '../../stores/store';
import { SymbolsType } from '../../types/global-types';

function SymbolList() {
  const { selectedSymbol, setSelectedSymbol, drawingsColor } = useAppStore();
  const handleSymbolPress = (symbolType: SymbolsType) => {
    if (selectedSymbol?.symboleType === symbolType) {
      setSelectedSymbol(undefined);
    } else {
      setSelectedSymbol({ symboleType: symbolType });
    }
  };

  return (
    <Box>
      <Text alignSelf="center">Centre d'action :</Text>

      <PressableSymbol
        type="Star"
        onPress={() => handleSymbolPress('Star')}
        darkBackground={selectedSymbol?.symboleType === 'Star'}
      >
        <CustomStar color={drawingsColor} size={{ height: 30, width: 30 }} />
      </PressableSymbol>
      <Text alignSelf="center">Zone d'action :</Text>
      <PressableSymbol
        type="Explosion"
        onPress={() => handleSymbolPress('Explosion')}
        darkBackground={selectedSymbol?.symboleType === 'Explosion'}
      >
        <Explosion color={drawingsColor} size={{ height: 30, width: 30 }} />
      </PressableSymbol>
      <Text alignSelf="center">Cible/Source :</Text>
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
    </Box>
  );
}

export default SymbolList;
