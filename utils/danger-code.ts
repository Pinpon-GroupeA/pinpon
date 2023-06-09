import Colors from '../constants/colors';
import { DangerCode } from '../types/global-types';

export const getDangerCodeColor = (dangerCode: DangerCode) => {
  const dangerCodeColor = dangerCodeColors.find(
    (dangerCodeColor) => dangerCodeColor.dangerCode === dangerCode
  );
  if (!dangerCodeColor) {
    return 'Colors.BLACK';
  }
  return dangerCodeColor.color;
};

export const dangerCodeColors: { dangerCode: DangerCode; color: string }[] = [
  { dangerCode: 'INC', color: Colors.RED },
  { dangerCode: 'SAP', color: Colors.GREEN },
  { dangerCode: 'EAU', color: Colors.BLUE },
  { dangerCode: 'PART', color: Colors.ORANGE },
  { dangerCode: 'COM', color: Colors.PURPLE },
  { dangerCode: 'OTHER', color: Colors.BLACK },
];

export const findDangerCodeFromColor = (color: string) => {
  const dangerCodeColor = dangerCodeColors.find(
    (dangerCodeColor) => dangerCodeColor.color === color
  );
  if (!dangerCodeColor) {
    return 'OTHER';
  }
  return dangerCodeColor.dangerCode;
};
