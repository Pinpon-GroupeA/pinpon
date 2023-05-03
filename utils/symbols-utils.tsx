import { Text } from 'native-base';

import CustomInvertedTriangle from '../components/map/symbols/CustomInvertedTriangle';
import CustomStar from '../components/map/symbols/CustomStar';
import CustomTriangle from '../components/map/symbols/CustomTriangle';
import { SymbolsType } from '../types/global-types';

export const selectRightSymbol = (symbolName: SymbolsType, color: string) => {
  switch (symbolName) {
    case 'InvertedTriangle':
      return <CustomInvertedTriangle color={color} />;
    case 'Triangle':
      return <CustomTriangle color={color} />;
    case 'Star':
      return <CustomStar color={color} />;
    default:
      return <Text> Erreur </Text>;
  }
};
