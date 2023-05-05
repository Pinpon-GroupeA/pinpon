import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Text } from 'native-base';
import { MapPressEvent, Marker } from 'react-native-maps';

import CustomCircle from './symbols/CustomCircle';
import FireFighterVehicle from './symbols/FireFighterVehicle';
import { useAppStore } from '../../stores/store';
import { Coordinates } from '../../types/global-types';
import { InterventionMean, OtherMean } from '../../types/mean-types';
import { findDangerCodeFromColor, getDangerCodeColor } from '../../utils/danger-code';
import { castInterventionIdAsNumber } from '../../utils/intervention';
import { createOtherMean } from '../../utils/intervention-dangers';
import { updateInterventionMeanDangerCode } from '../../utils/intervention-mean';
import { updateMeanLocation } from '../../utils/means';
import {
  getOtherMeanFromSymbolTypeAndColorAndLocationAndInterventionId,
  selectRightSymbol,
} from '../../utils/symbols-utils';
import MapBackground from '../MapBackground';

type InterventionMapProps = {
  fireFighterMeans: InterventionMean[];
  otherMeans: OtherMean[];
  interventionLocation: Coordinates;
};

function InterventionMap({
  fireFighterMeans,
  otherMeans,
  interventionLocation,
}: InterventionMapProps) {
  const { error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(
        'https://data.opendatasoft.com/api/records/1.0/search/?dataset=deci-pei%40rennes-metropole&rows=100'
      ).then((res) => res.json()),
  });

  const { id: interventionId } = useSearchParams();

  const selectedSymbol = useAppStore((state) => state.selectedSymbol);
  const setSelectedSymbol = useAppStore((state) => state.setSelectedSymbol);
  const drawingsColor = useAppStore((state) => state.drawingsColor);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (selectedSymbol) {
      if (selectedSymbol.symboleType && selectedSymbol.symboleType !== 'FireFighterVehicle') {
        createOtherMean(
          getOtherMeanFromSymbolTypeAndColorAndLocationAndInterventionId(
            selectedSymbol.symboleType,
            drawingsColor,
            {
              latitude,
              longitude,
            },
            castInterventionIdAsNumber(interventionId)
          )
        );
      } else if (selectedSymbol.id) {
        updateMeanLocation(selectedSymbol.id, {
          latitude,
          longitude,
        });
        updateInterventionMeanDangerCode(selectedSymbol.id, findDangerCodeFromColor(drawingsColor));
      }
      setSelectedSymbol(undefined);
    }
  };

  if (error) return <Text>Error</Text>;

  return (
    <MapBackground handlePress={handlePress} initialRegion={interventionLocation}>
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
      {fireFighterMeans.map((mean) => (
        <Marker
          key={mean.id}
          coordinate={{
            latitude: mean.means.location.latitude,
            longitude: mean.means.location.longitude,
          }}
        >
          <FireFighterVehicle
            color={getDangerCodeColor(mean.danger_code)}
            name={mean.means.label}
            dashed={!mean.is_on_site}
          />
        </Marker>
      ))}
      {otherMeans.map((mean) => (
        <Marker
          key={mean.id}
          coordinate={{
            latitude: mean.location.latitude,
            longitude: mean.location.longitude,
          }}
        >
          {selectRightSymbol(mean.category, mean.danger_code)}
        </Marker>
      ))}
    </MapBackground>
  );
}

export default InterventionMap;
