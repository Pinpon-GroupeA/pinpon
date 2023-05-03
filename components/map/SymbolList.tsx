import { MaterialIcons } from '@expo/vector-icons';
import { Box, Icon, IconButton, ScrollView } from 'native-base';
import React from 'react';

import ColorSelection from './ColorSelection';
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

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleSymbolPress = (symbolName: SymbolsType) => {
    if (selectedSymbol === symbolName) {
      setSelectedSymbol(undefined);
    } else {
      setSelectedSymbol(symbolName);
    }
  };

  const handleColorSecletionButtonPress = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <ColorSelection isOpen={openModal} onClose={() => setOpenModal(false)} />
      <IconButton
        bgColor="#19837C"
        margin={1}
        icon={<Icon as={MaterialIcons} name="color-lens" size={5} color="black" />}
        onPress={handleColorSecletionButtonPress}
      />
      <ScrollView flexDirection="column">
        <PressableSymbol
          type="InvertedTriangle"
          onPress={() => handleSymbolPress('InvertedTriangle')}
        >
          <CustomInvertedTriangle color={drawingsColor} />
        </PressableSymbol>
        <PressableSymbol type="Triangle" onPress={() => handleSymbolPress('Triangle')}>
          <CustomTriangle color={drawingsColor} />
        </PressableSymbol>
        <PressableSymbol type="Star" onPress={() => handleSymbolPress('Star')}>
          <CustomStar color={drawingsColor} />
        </PressableSymbol>
      </ScrollView>
    </Box>
  );
}

export default SymbolList;
