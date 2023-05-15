import { Box, Divider, ScrollView } from 'native-base';
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

  return (
    <ScrollView>
      <ColorSelection isOpen={openModal} onClose={() => setOpenModal(false)} />
      <Box flexDir="row">
        <Box width="50%">
          <FireFighterSymbolList fireFighterMeans={fireFighterMeans} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="50%">
          <SymbolList />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SymbolsPane;
