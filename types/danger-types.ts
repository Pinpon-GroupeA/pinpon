import { location, DangerCode } from './types';

export type Danger = {
  location: location;
  DangerType: DangerType;
  InterventionId: number
};

export type DangerType = 'INC';
