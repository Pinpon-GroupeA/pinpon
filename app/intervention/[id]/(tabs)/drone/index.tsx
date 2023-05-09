import { LatLng, MapPressEvent, Marker, Polyline } from 'react-native-maps';
import MapBackground from '../../../../../components/MapBackground';
import { Coordinates } from '../../../../../types/global-types';
import { TrajectType } from '../../../../../types/drone-types';
import { useState } from 'react';
import { Button, Text } from 'native-base';

export default function Drone() {
  const interventionLocation: Coordinates = { latitude: 48.11565, longitude: -1.63969 };

  const [markers, setMarkers] = useState<LatLng[]>([]);
  const [firstMarkers, setFirstMarkers] = useState<LatLng>();

  const [draw, setDraw] = useState(false);
  const [trajectType, setTrajectType] = useState<TrajectType>("OPENED_CIRCUIT");

  const handlePress = (event: MapPressEvent) => {
    if (!draw) {
      return
    }
    setMarkers((prev) => [...prev, event.nativeEvent.coordinate]);
  }

  return (
    <>
      <Button backgroundColor={draw ? "#0f0" : "#f00"} onPress={() => setDraw(!draw)}>
        Draw mode
      </Button>
      <Button onPress={() => setMarkers([])}>
        Clear
      </Button>
      <Button onPress={() => trajectType === "CLOSED_CIRCUIT" ? setTrajectType("OPENED_CIRCUIT") : setTrajectType("CLOSED_CIRCUIT")}>
        {trajectType}
      </Button>
      <MapBackground handlePress={handlePress} initialRegion={interventionLocation}>
        {markers.map((marker, i) => (
          <Marker coordinate={marker} key={i} />
        ))}
        <Polyline coordinates={(trajectType === "CLOSED_CIRCUIT") && (markers.length > 0) ? [...markers, markers[0]] : markers} strokeWidth={4} />
      </MapBackground>

    </>
  );
}
