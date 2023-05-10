import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Button, Text } from 'native-base';
import { useState } from 'react';
import { MapPressEvent, Marker, Polyline } from 'react-native-maps';

import MapBackground from '../../../../../components/MapBackground';
import useSubscription from '../../../../../hooks/useSubscription';
import {
  TrajectType,
  DroneType,
  DroneCoordinates,
  PositionFormat,
} from '../../../../../types/drone-types';
import {
  fetchDronePosition,
  updateDroneTraject,
  updateDroneTrajectType,
  updateDroneIsStopped,
} from '../../../../../utils/drone';
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

  const { data: droneTraject } = useQuery({
    queryKey: ['droneTraject'],
    queryFn: () => fetchDronePosition(interventionId),
  });

  const onDroneUpdate = async (drone: PositionFormat) => {
    queryClient.setQueryData(['dronePosition'], (oldData: PositionFormat | undefined) =>
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
          onDroneUpdate(payload.new as PositionFormat);
          break;
      }
    }
  );

  const [markers, setMarkers] = useState<DroneCoordinates[]>([]);
  const [draw, setDraw] = useState(false);
  const [trajectType, setTrajectType] = useState<TrajectType>('OPENED_CIRCUIT');

  const handlePress = (event: MapPressEvent) => {
    if (!draw) {
      return;
    }
    setMarkers((prev) => [
      ...prev,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        altitude: 50,
      },
    ]);
  };

  return (
    <>
      <Button backgroundColor={draw ? '#0f0' : '#f00'} onPress={() => setDraw(!draw)}>
        Draw mode
      </Button>
      <Button onPress={() => setMarkers([])}>Clear</Button>
      <Button onPress={() => updateDroneIsStopped(false, interventionId)}>Start</Button>
      <Button onPress={() => updateDroneIsStopped(true, interventionId)}>Stop</Button>
      <Button onPress={() => updateDroneTraject(markers as DroneCoordinates[], interventionId)}>
        Upload
      </Button>
      <Button
        onPress={() => {
          if (trajectType === 'CLOSED_CIRCUIT') {
            updateDroneTrajectType('OPENED_CIRCUIT', interventionId);
            setTrajectType('OPENED_CIRCUIT');
          } else {
            setTrajectType('CLOSED_CIRCUIT');
            updateDroneTrajectType('CLOSED_CIRCUIT', interventionId);
          }
        }}
      >
        {trajectType}
      </Button>
      <Text>{dronePosition?.position.latitude}</Text>
      <MapBackground
        handlePress={handlePress}
        initialRegion={interventionLocation ?? { latitude: 0, longitude: 0 }}
      >
        {markers.map((marker, i) => (
          <Marker coordinate={marker} key={i} />
        ))}
        <Polyline
          coordinates={
            trajectType === 'CLOSED_CIRCUIT' && markers.length > 0
              ? [...markers, markers[0]]
              : markers
          }
          strokeWidth={4}
        />
        <Marker
          coordinate={dronePosition?.position ?? { latitude: 0, longitude: 0 }}
          pinColor="blue"
        />
      </MapBackground>
    </>
  );
}
