import { LatLng } from 'react-native-maps';

export type TrajectType = 'CLOSED_CIRCUIT' | 'OPENED_CIRCUIT';

export type DroneType = {
  id: 'id';
  interventionId: 'intervention_id';
  position: 'position';
  currentTime: 'current_time';
  trajectType: 'traject_type';
  traject: 'traject';
  isStopped: 'is_stopped';
};

export type DroneCoordinates = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export type DroneData = {
  id: number;
  traject: DroneCoordinates[];
  position: LatLng;
  is_stopped: boolean;
};

export type ImageData = {
  file: string;
  name: string;
};
