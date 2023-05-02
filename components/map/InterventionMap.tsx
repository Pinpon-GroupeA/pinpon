import { useQuery } from '@tanstack/react-query';
import { Text } from 'native-base';
import { useState } from 'react';
import { MapPressEvent, Marker } from 'react-native-maps';

import CustomCircle from './symbols/CustomCircle';
import CustomRectangle from './symbols/CustomRectangle';
import { useAppStore } from '../../stores/store';
import { Coordinates } from '../../types/global-types';
import MapBackground from '../MapBackground';

function InterventionMap() {
  const { error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(
        'https://data.opendatasoft.com/api/records/1.0/search/?dataset=deci-pei%40rennes-metropole&rows=100'
      ).then((res) => res.json()),
  });

  const selectedSymbol = useAppStore((state) => state.selectedSymbol);
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);

  const [markers, setMarkers] = useState<
    { title: string; coordinates: Coordinates; symbol: string }[]
  >([]);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (selectedSymbol) {
      setMarkers([
        ...markers,
        { title: selectedSymbol, coordinates: { latitude, longitude }, symbol: selectedSymbol },
      ]);
      setSelectedSymbol(undefined);
    }
  };

  if (error) return <Text>Error</Text>;

  return (
    <MapBackground handlePress={handlePress}>
      {data?.records.map((item: any) => (
        <Marker
          key={item.recordid}
          coordinate={{
            latitude: item.fields.geo_point_2d[0],
            longitude: item.fields.geo_point_2d[1],
          }}
          title={item.fields.type}
        >
          <CustomCircle color="#2D3ED3" fill />
        </Marker>
      ))}
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker.coordinates} title={marker.title}>
          {marker.symbol === 'test' ? (
            <CustomRectangle color="#f00" strokeStyle />
          ) : (
            <CustomRectangle color="#2D3ED3" />
          )}
        </Marker>
      ))}
    </MapBackground>
  );
}

export default InterventionMap;
