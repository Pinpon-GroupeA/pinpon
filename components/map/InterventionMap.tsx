import { useQuery } from '@tanstack/react-query';
import { Text } from 'native-base';
import { useState } from 'react';
import { MapPressEvent, Marker } from 'react-native-maps';

import CustomCircle from './symbols/CustomCircle';
import { useAppStore } from '../../stores/store';
import { Coordinates, SymbolsType } from '../../types/global-types';
import { selectRightSymbol } from '../../utils/symbols-utils';
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
  const drawingsColor = useAppStore((state) => state.drawingsColor);

  const [markers, setMarkers] = useState<
    { coordinates: Coordinates; symbol: SymbolsType; color: string }[]
  >([]);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (selectedSymbol) {
      setMarkers([
        ...markers,
        { coordinates: { latitude, longitude }, symbol: selectedSymbol, color: drawingsColor },
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
          <CustomCircle size={{ height: 30, width: 30 }} color="#2D3ED3" fill />
        </Marker>
      ))}
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker.coordinates} tappable={false}>
          {selectRightSymbol(marker.symbol, marker.color)}
        </Marker>
      ))}
    </MapBackground>
  );
}

export default InterventionMap;
