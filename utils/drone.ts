import { LatLng } from 'react-native-maps';

import { DroneColumns, Tables, supabase } from './supabase';
import { TrajectType, DroneCoordinates, PositionFormat } from '../types/drone-types';

export const fetchDronePosition = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from(Tables.droneData)
    .select('id, position')
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }

  return data[0] as PositionFormat;
};

export const fetchDrone = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from(Tables.droneData)
    .select('traject')
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }

  return data[0]?.traject as DroneCoordinates;
};

export const updateDroneTraject = async (
  traject: DroneCoordinates[],
  interventionId?: string | string[]
) => {
  const { error } = await supabase
    .from(Tables.droneData)
    .update({ traject })
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }
};

export const updateDroneTrajectType = async (
  trajectType: TrajectType,
  interventionId?: string | string[]
) => {
  const { error } = await supabase
    .from(Tables.droneData)
    .update({ traject_type: trajectType })
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }
};

export const updateDroneIsStopped = async (
  isStopped: boolean,
  interventionId?: string | string[]
) => {
  const { error } = await supabase
    .from(Tables.droneData)
    .update({ is_stopped: isStopped })
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }
};

export const deleteDrone = async (interventionId?: string | string[]) => {
  await supabase.from(Tables.droneData).delete().eq(DroneColumns.interventionId, interventionId);
};
