import { DangerCode } from '../types/global-types';

export const getDangerCodeColor = (dangerCode: DangerCode) => {
  const dangerCodeColor = dangerCodeColors.find(
    (dangerCodeColor) => dangerCodeColor.dangerCode === dangerCode
  );
  if (!dangerCodeColor) {
    return 'black.500';
  }
  return dangerCodeColor.color;
};

export const dangerCodeColors: { dangerCode: DangerCode; color: string }[] = [
  { dangerCode: 'INC', color: '#FF0000' },
  { dangerCode: 'SAP', color: '#00EB17' },
  { dangerCode: 'EAU', color: '#2D3ED3' },
  { dangerCode: 'PART', color: '#FF8F28' },
  { dangerCode: 'COM', color: '#A721E5' },
  { dangerCode: 'OTHER', color: 'black' },
];
