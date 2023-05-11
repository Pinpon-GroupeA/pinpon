import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import DroneMapPage from '../../../../../components/drone/DroneMapPage';
import useSubscription from '../../../../../hooks/useSubscription';
import { droneData } from '../../../../../types/drone-types';
import { fetchDronePosition } from '../../../../../utils/drone';
import { fetchInterventionLocation } from '../../../../../utils/intervention';
import { Tables } from '../../../../../utils/supabase';

export default function Drone() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: interventionLocation } = useQuery({
    queryKey: ['interventionLocation'],
    queryFn: () => fetchInterventionLocation(interventionId),
  });

  const { data: dronePosition } = useQuery({
    queryKey: ['dronePosition'],
    queryFn: () => fetchDronePosition(interventionId),
  });

  const onDroneUpdate = async (drone: droneData) => {
    queryClient.setQueryData(['drone'], (oldData: droneData | undefined) =>
      oldData?.id === drone.id ? drone : oldData
    );
  };

  useSubscription(
    {
      channel: 'drone_data' + interventionId,
      table: Tables.droneData,
    },
    (payload) => {
      switch (payload.eventType) {
        case 'UPDATE':
          onDroneUpdate(payload.new as droneData);
          break;
      }
    }
  );

  return (
    <DroneMapPage
      interventionLocation={interventionLocation ?? { latitude: 0, longitude: 0 }}
      dronePosition={dronePosition?.position ?? { latitude: 0, longitude: 0 }}
    />
  );
}
