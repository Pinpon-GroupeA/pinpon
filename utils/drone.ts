import { DroneColumns, Tables, supabase } from './supabase';
import { TrajectType, DroneCoordinates, DroneData } from '../types/drone-types';

export const fetchDroneData = async (interventionId?: string | string[]) => {
  const { data, error } = await supabase
    .from(Tables.droneData)
    .select('id, position, traject, is_stopped')
    .eq(DroneColumns.interventionId, interventionId);

  if (error) {
    throw error;
  }

  return data[0] as DroneData;
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
