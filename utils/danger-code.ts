import { DangerCode } from '../types/types';

export const getDangerCodeColor = (dangerCode: DangerCode) => {
  switch (dangerCode) {
    case 'INC':
      return 'red.500';
    case 'SAP':
      return 'green.500';
    default:
      return 'black.500';
  }
};
