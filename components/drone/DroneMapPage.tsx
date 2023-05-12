import { useRouter, useSearchParams } from 'expo-router';
import { Box, Fab } from 'native-base';
import { useState } from 'react';
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
};

function DroneMapPage({ dronePosition, interventionLocation }: MapBackgroundProps) {
  const [markers, setMarkers] = useState<DroneCoordinates[]>([]);
  const [draw, setDraw] = useState(false);
  const [trajectType, setTrajectType] = useState<TrajectType>('OPENED_CIRCUIT');
  const router = useRouter();

  const { id: interventionId } = useSearchParams();

  const handlePress = (event: MapPressEvent) => {
    if (!draw) return;
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
    <Box flex={1}>
      <Fab
        label="Trajectoire"
        renderInPortal={false}
        backgroundColor={draw ? '#0A0' : '#A00'}
        onPress={() => {
          if (draw) updateDroneTraject(markers as DroneCoordinates[], interventionId);
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
        onPress={() => updateDroneIsStopped(false, interventionId)}
        placement="top-left"
      />
      <Fab
        label="Stop"
        renderInPortal={false}
        onPress={() => updateDroneIsStopped(true, interventionId)}
        placement="top-right"
      />
      <Fab
        label={trajectType}
        renderInPortal={false}
        left="25%"
        right="35%"
        onPress={() => {
          if (trajectType === 'CLOSED_CIRCUIT') {
            updateDroneTrajectType('OPENED_CIRCUIT', interventionId);
            setTrajectType('OPENED_CIRCUIT');
          } else {
            setTrajectType('CLOSED_CIRCUIT');
            updateDroneTrajectType('CLOSED_CIRCUIT', interventionId);
          }
        }}
      />
      <MapBackground handlePress={handlePress} initialRegion={interventionLocation}>
        {markers.map((marker, i) => (
          <Marker
            onPress={() =>
              router.push(
                `/intervention/${interventionId}/drone/images?lon=${marker.longitude}&lat=${marker.latitude}`
              )
            }
            coordinate={marker}
            key={i}
          />
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
