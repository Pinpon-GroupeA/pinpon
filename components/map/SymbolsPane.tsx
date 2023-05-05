import { MaterialIcons } from '@expo/vector-icons';
import { Box, Divider, Icon, IconButton } from 'native-base';
import { useState } from 'react';

import ColorSelection from './ColorSelection';
import FireFighterSymbolList from './FireFighterSymbolList';
import SymbolList from './SymbolList';
import { InterventionMean } from '../../types/mean-types';

type SymbolsPaneProps = {
  fireFighterMeans: InterventionMean[];
};

const SymbolsPane = ({ fireFighterMeans }: SymbolsPaneProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleColorSecletionButtonPress = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <ColorSelection isOpen={openModal} onClose={() => setOpenModal(false)} />
      <IconButton
        bgColor="#19837C"
        margin={1}
        icon={<Icon as={MaterialIcons} name="color-lens" size={5} color="white" />}
        onPress={handleColorSecletionButtonPress}
      />
      <Box flexDir="row">
        <Box width="50%">
          <FireFighterSymbolList fireFighterMeans={fireFighterMeans} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="50%">
          <SymbolList />
        </Box>
      </Box>
    </Box>
  );
};

export default SymbolsPane;
