import { useMutation } from '@tanstack/react-query';
import { Box, Fab } from 'native-base';
import { useEffect, useState } from 'react';
import { LatLng, MapPressEvent, Marker, Polyline } from 'react-native-maps';

import { DroneCoordinates, TrajectType } from '../../types/drone-types';
import { Coordinates } from '../../types/global-types';
import {
  updateDroneIsStopped,
  updateDroneTraject,
  updateDroneTrajectType,
} from '../../utils/drone';
import MapBackground from '../MapBackground';

type MapBackgroundProps = {
  dronePosition: LatLng;
  interventionLocation: Coordinates;
  interventionId: string | string[] | undefined;
  traject: DroneCoordinates[];
};

function DroneMapPage({
  interventionId,
  traject,
  dronePosition,
  interventionLocation,
}: MapBackgroundProps) {
  const { mutateAsync: updateTraject } = useMutation({
    mutationFn: (data: { positions: DroneCoordinates[] }) =>
      updateDroneTraject(data.positions, interventionId),
  });

  const { mutateAsync: updateIsStopped } = useMutation({
    mutationFn: (data: { is_stopped: boolean }) =>
      updateDroneIsStopped(data.is_stopped, interventionId),
  });

  const { mutateAsync: updateTrajectType } = useMutation({
    mutationFn: (data: { type: TrajectType }) => updateDroneTrajectType(data.type, interventionId),
  });

  const [markers, setMarkers] = useState<DroneCoordinates[]>(traject);
  const [draw, setDraw] = useState(false);
  const [trajectType, setTrajectType] = useState<TrajectType>('OPENED_CIRCUIT');

  useEffect(() => {
    setMarkers(traject);
  }, [traject]);

  const handlePress = (event: MapPressEvent) => {
    if (!draw) return;
    setMarkers((prev) => [
      ...prev,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        altitude: 25,
      },
    ]);
  };

  return (
    <Box flex={1}>
      <Fab
        label="Trajectoire"
        renderInPortal={false}
        backgroundColor={draw ? '#0A0' : '#A00'}
        onPress={() => {
          if (draw) {
            updateTraject({ positions: markers as DroneCoordinates[] });
          }
          setDraw(!draw);
        }}
        placement="bottom-right"
      />
      <Fab
        label="Clear"
        renderInPortal={false}
        onPress={() => setMarkers([])}
        placement="bottom-left"
      />
      <Fab
        label="Start"
        renderInPortal={false}
        onPress={() => updateIsStopped({ is_stopped: false })}
        placement="top-left"
      />
      <Fab
        label="Stop"
        renderInPortal={false}
        onPress={() => updateIsStopped({ is_stopped: true })}
        placement="top-right"
      />
      <Fab
        label={trajectType}
        renderInPortal={false}
        left="25%"
        right="35%"
        onPress={() => {
          if (trajectType === 'CLOSED_CIRCUIT') {
            updateTrajectType({ type: 'OPENED_CIRCUIT' });
            setTrajectType('OPENED_CIRCUIT');
          } else {
            updateTrajectType({ type: 'CLOSED_CIRCUIT' });
            setTrajectType('CLOSED_CIRCUIT');
          }
        }}
      />
      <MapBackground handlePress={handlePress} initialRegion={interventionLocation}>
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
        <Marker coordinate={dronePosition} pinColor="blue" />
      </MapBackground>
    </Box>
  );
}

export default DroneMapPage;
