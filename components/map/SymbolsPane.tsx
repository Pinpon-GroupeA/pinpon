import { useQuery } from '@tanstack/react-query';
import { Box, Button, Divider, Modal, ScrollView } from 'native-base';
import { useState } from 'react';

import ColorSelection from './ColorSelection';
import FireFighterSymbolList from './FireFighterSymbolList';
import SymbolList from './SymbolList';
import { InterventionMean, MeanType } from '../../types/mean-types';
import { fetchMeansTypes } from '../../utils/means-type';
import ModalMeansRequest from '../means/mean-request/ModalMeansRequest';
import Colors from '../../constants/colors';

type SymbolsPaneProps = {
  fireFighterMeans: InterventionMean[];
};

const SymbolsPane = ({ fireFighterMeans }: SymbolsPaneProps) => {
  const [openColorSelection, setOpenColorSelection] = useState<boolean>(false);
  const [openSymbolSelection, setOpenSymbolSelection] = useState<boolean>(false);

  const { data: meanTypes } = useQuery<MeanType[]>(['meanTypes'], {
    queryFn: fetchMeansTypes,
  });

  return (
    <ScrollView>
      <ColorSelection isOpen={openColorSelection} onClose={() => setOpenColorSelection(false)} />
      <Box flexDir="row">
        <Box width="50%">
          <FireFighterSymbolList fireFighterMeans={fireFighterMeans} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="50%">
          <SymbolList />
        </Box>
      </Box>
      <Button onPress={() => setOpenSymbolSelection(true)} bgColor={Colors.TURQUOISE}>
        Ajouter un symbole
      </Button>
      <Modal isOpen={openSymbolSelection} onClose={() => setOpenSymbolSelection(false)} size="md">
        <ModalMeansRequest
          meanTypes={meanTypes || []}
          setShowModal={setOpenSymbolSelection}
          key={meanTypes?.length}
        />
      </Modal>
    </ScrollView>
  );
};

export default SymbolsPane;
