import { Text } from 'native-base';

import { findDangerCodeFromColor, getDangerCodeColor } from './danger-code';
import CustomInvertedTriangle from '../components/map/symbols/CustomInvertedTriangle';
import CustomStar from '../components/map/symbols/CustomStar';
import CustomTriangle from '../components/map/symbols/CustomTriangle';
import { Coordinates, DangerCode, SymbolsType } from '../types/global-types';
import { MeanCategory, OtherMean } from '../types/mean-types';

export const selectRightSymbol = (meanCategory: MeanCategory, dangerCode: DangerCode) => {
  switch (getSymbolNameTypeFromMeanCategory(meanCategory)) {
    case 'InvertedTriangle':
      return <CustomInvertedTriangle color={getDangerCodeColor(dangerCode)} />;
    case 'Triangle':
      return <CustomTriangle color={getDangerCodeColor(dangerCode)} />;
    case 'Star':
      return <CustomStar color={getDangerCodeColor(dangerCode)} />;
    default:
      return <Text> Erreur </Text>;
  }
};

export const getSymbolNameTypeFromMeanCategory = (meanCategory: MeanCategory) => {
  switch (meanCategory) {
    case 'PS':
      return 'InvertedTriangle';
    case 'SD':
      return 'Triangle';
    case 'ZA':
      return 'Star';
    default:
      return 'Error';
  }
};

export const getMeanCategoryFromSymbolType = (symbolType: SymbolsType) => {
  switch (symbolType) {
    case 'InvertedTriangle':
      return 'PS';
    case 'Triangle':
      return 'SD';
    case 'Star':
      return 'ZA';
    default:
      return 'Error';
  }
};

export const getOtherMeanFromSymbolTypeAndColorAndLocationAndInterventionId = (
  symbolType: SymbolsType,
  color: string,
  location: Coordinates,
  interventionId: number
) => {
  const meanCategory = getMeanCategoryFromSymbolType(symbolType);
  const dangerCode = findDangerCodeFromColor(color);
  return {
    intervention_id: interventionId,
    danger_code: dangerCode,
    location,
    category: meanCategory,
  } as OtherMean;
};
