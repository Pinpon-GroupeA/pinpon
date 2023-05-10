import { Box, ScrollView, Text } from 'native-base';

import PressableSymbol from './PressableSymbol';
import FireFighterVehicle from './symbols/FireFighterVehicle';
import { useAppStore } from '../../stores/store';
import { InterventionMean } from '../../types/mean-types';

type FireFighterSymbolListProps = {
  fireFighterMeans: InterventionMean[];
};

const FireFighterSymbolList = ({ fireFighterMeans }: FireFighterSymbolListProps) => {
  const { selectedSymbol, setSelectedSymbol, drawingsColor } = useAppStore();

  const handleSymbolPress = (id: number) => {
    if (selectedSymbol && selectedSymbol.id === id) {
      setSelectedSymbol(undefined);
    } else {
      setSelectedSymbol({ symboleType: 'FireFighterVehicle', id });
    }
  };

  return (
    <Box alignItems="center">
      <Text>Cible/Source</Text>
      <ScrollView flexDir="column" width="100%">
        {fireFighterMeans.map((mean) => (
          <PressableSymbol
            key={mean.id}
            type="FireFighterVehicle"
            onPress={() => handleSymbolPress(mean.mean_id)}
            darkBackground={selectedSymbol?.id === mean.mean_id}
          >
            <FireFighterVehicle color={drawingsColor} dashed name={mean.means.label} />
          </PressableSymbol>
        ))}
      </ScrollView>
      <Text>Moyens</Text>
      <ScrollView flexDir="column" width="100%"></ScrollView>
    </Box>
  );
};

export default FireFighterSymbolList;
