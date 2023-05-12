import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import DroneMapPage from '../../../../../components/drone/DroneMapPage';
import useSubscription from '../../../../../hooks/useSubscription';
import { DroneData } from '../../../../../types/drone-types';
import { fetchDroneData } from '../../../../../utils/drone';
import { fetchInterventionLocation } from '../../../../../utils/intervention';
import { Tables } from '../../../../../utils/supabase';

export default function Drone() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: interventionLocation } = useQuery({
    queryKey: ['interventionLocation'],
    queryFn: () => fetchInterventionLocation(interventionId),
  });

  const { data: drone } = useQuery({
    queryKey: ['drone'],
    queryFn: () => fetchDroneData(interventionId),
  });

  const onDroneUpdate = async (drone: DroneData) => {
    queryClient.setQueryData(['drone'], (oldData: DroneData | undefined) =>
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
          onDroneUpdate(payload.new as DroneData);
          break;
      }
    }
  );

  return (
    <DroneMapPage
      traject={drone?.traject ?? []}
      interventionId={interventionId}
      interventionLocation={interventionLocation ?? { latitude: 0, longitude: 0 }}
      dronePosition={drone?.position ?? { latitude: 0, longitude: 0 }}
    />
  );
}
