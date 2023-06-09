import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Box, Fab, Icon } from 'native-base';
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
  isStopped: boolean;
  trajectType: TrajectType;
};

function DroneMapPage({
  interventionId,
  traject,
  dronePosition,
  interventionLocation,
  isStopped,
  trajectType,
}: MapBackgroundProps) {
  const { mutateAsync: updateTraject } = useMutation({
    mutationFn: (positions: DroneCoordinates[]) => updateDroneTraject(positions, interventionId),
  });

  const { mutateAsync: updateIsStopped } = useMutation({
    mutationFn: (is_stopped: boolean) => updateDroneIsStopped(is_stopped, interventionId),
  });

  const { mutateAsync: updateTrajectType } = useMutation({
    mutationFn: (type: TrajectType) => updateDroneTrajectType(type, interventionId),
  });

  const [markers, setMarkers] = useState<DroneCoordinates[]>([]);
  const [draw, setDraw] = useState(false);
  const router = useRouter();

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
        renderInPortal={false}
        placement="bottom-right"
        right="216px"
        isDisabled={draw}
        backgroundColor={isStopped ? '#19837C' : 'white'}
        icon={
          isStopped ? (
            <Icon as={MaterialCommunityIcons} name="play" size={6} color="white" />
          ) : (
            <Icon as={MaterialCommunityIcons} name="pause" size={6} color="black" />
          )
        }
        onPress={() => updateIsStopped(!isStopped)}
      />
      <Fab
        renderInPortal={false}
        isDisabled={!isStopped}
        placement="bottom-right"
        right="148px"
        backgroundColor={draw ? 'white' : '#19837C'}
        icon={
          draw ? (
            <Icon as={MaterialCommunityIcons} name="stop" size={6} color="black" />
          ) : (
            <Icon as={MaterialCommunityIcons} name="draw" size={6} color="white" />
          )
        }
        onPress={() => {
          if (draw) {
            updateTraject(markers);
          }
          setDraw(!draw);
        }}
      />
      <Fab
        renderInPortal={false}
        isDisabled={!isStopped || draw}
        right="80px"
        placement="bottom-right"
        backgroundColor={trajectType === 'CLOSED_CIRCUIT' ? '#19837C' : 'white'}
        icon={
          trajectType === 'CLOSED_CIRCUIT' ? (
            <Icon as={MaterialCommunityIcons} name="vector-square-open" size={6} color="white" />
          ) : (
            <Icon as={MaterialCommunityIcons} name="vector-square" size={6} color="black" />
          )
        }
        onPress={() => {
          if (trajectType === 'CLOSED_CIRCUIT') {
            updateTrajectType('OPENED_CIRCUIT');
          } else {
            updateTrajectType('CLOSED_CIRCUIT');
          }
        }}
      />
      <Fab
        icon={<Icon as={FontAwesome5} name="trash" size={5} color="white" />}
        isDisabled={!isStopped || draw}
        backgroundColor="#19837C"
        renderInPortal={false}
        onPress={() => {
          updateTraject([]);
        }}
        placement="bottom-right"
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
