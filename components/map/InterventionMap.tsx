import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Box, Fab, Icon, Modal, Text } from 'native-base';
import { useState } from 'react';
import { MapPressEvent, Marker, Polyline } from 'react-native-maps';

import AlertDialogComponent from './AlertDialogComponent';
import CustomCircle from './symbols/CustomCircle';
import FireFighterVehicle from './symbols/FireFighterVehicle';
import { useAppStore } from '../../stores/store';
import { Coordinates } from '../../types/global-types';
import { InterventionMean, MeanModalContent, OtherMean } from '../../types/mean-types';
import { findDangerCodeFromColor, getDangerCodeColor } from '../../utils/danger-code';
import { castInterventionIdAsNumber } from '../../utils/intervention';
import { createOtherMean, deleteOtherMean } from '../../utils/intervention-dangers';
import { updateInterventionMeanDangerCode } from '../../utils/intervention-mean';
import { updateMeanLocation } from '../../utils/means';
import {
  getOtherMeanFromSymbolTypeAndColorAndLocationAndInterventionId,
  getOtherMeanPolylineFromColorAndIterventionIdAndPoints,
  selectRightSymbol,
} from '../../utils/symbols-utils';
import MapBackground from '../MapBackground';
import ConfirmationModal from '../means/means-table/ConfirmationModal';

type InterventionMapProps = {
  fireFighterMeans: InterventionMean[];
  otherMeans: OtherMean[];
  currentPolylines: OtherMean[];
  interventionLocation: Coordinates;
};

function InterventionMap({
  fireFighterMeans,
  otherMeans,
  currentPolylines,
  interventionLocation,
}: InterventionMapProps) {
  const waterPointDistance = 1000;
  const waterPointNumber = 100;

  const { error, data } = useQuery({
    queryKey: ['waterPoints', interventionLocation],
    queryFn: async () => {
      const response = await fetch(
        `https://data.opendatasoft.com/api/records/1.0/search/?dataset=deci-pei%40rennes-metropole&rows=${waterPointNumber}&geofilter.distance=${interventionLocation.latitude},${interventionLocation.longitude},${waterPointDistance}`
      );
      return response.json();
    },
  });

  const { id: interventionId } = useSearchParams();

  const { mutateAsync: deleteOtherMeanMutation } = useMutation({
    mutationFn: (otherMeanId: number) => deleteOtherMean(otherMeanId),
  });

  const { selectedSymbol, setSelectedSymbol, drawingsColor } = useAppStore();

  const [newPolyline, setNewPolyline] = useState<Coordinates[]>([]);
  const [polylineDrawMode, setPolylineDrawMode] = useState(false);
  const [modalContent, setModalContent] = useState<MeanModalContent | null>(null);
  const [pressedPolylineId, setPressedPolylineId] = useState<number | null>(null);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (polylineDrawMode) {
      setNewPolyline((prev) => [...prev, { latitude, longitude }]);
      return;
    }

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

  const savePolyline = () => {
    if (!polylineDrawMode) {
      setPolylineDrawMode(true);
      return;
    }
    setPolylineDrawMode(false);

    const interventionDanger = getOtherMeanPolylineFromColorAndIterventionIdAndPoints(
      drawingsColor,
      castInterventionIdAsNumber(interventionId),
      newPolyline
    );

    createOtherMean(interventionDanger);

    setNewPolyline([]);
  };

  const handleFireFighterVehiclePress = (mean: InterventionMean) => {
    setModalContent({
      id: mean.id,
      crmArrival: mean.crm_arrival,
      sectorArrival: mean.sector_arrival,
      availableAt: mean.available_at,
    });
  };

  if (error) return <Text>Error</Text>;

  return (
    <Box flex={1}>
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
            <CustomCircle size={{ height: 30, width: 30 }} color="#2D3ED3" />
          </Marker>
        ))}
        {fireFighterMeans.map((mean) => (
          <Marker
            key={mean.id}
            coordinate={{
              latitude: mean.means.location.latitude,
              longitude: mean.means.location.longitude,
            }}
            title="Modifier moyen"
            onCalloutPress={() => handleFireFighterVehiclePress(mean)}
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
            title="X"
            onCalloutPress={() => deleteOtherMeanMutation(mean.id)}
          >
            {selectRightSymbol(mean.category, mean.danger_code)}
          </Marker>
        ))}
        <Polyline coordinates={newPolyline} strokeColor={drawingsColor} strokeWidth={3} />
        {currentPolylines.map((mean) => (
          <Polyline
            key={mean.id}
            coordinates={mean.points}
            strokeColor={getDangerCodeColor(mean.danger_code)}
            strokeWidth={3}
            onPress={() => setPressedPolylineId(mean.id)}
            tappable
          />
        ))}
      </MapBackground>
      <Fab
        renderInPortal={false}
        placement="bottom-right"
        backgroundColor={polylineDrawMode ? 'white' : '#19837C'}
        icon={
          polylineDrawMode ? (
            <Icon as={MaterialCommunityIcons} name="stop" size={6} color="black" />
          ) : (
            <Icon as={MaterialCommunityIcons} name="draw" size={6} color="white" />
          )
        }
        onPress={savePolyline}
      />
      {modalContent && (
        <Modal isOpen={modalContent !== null} onClose={() => setModalContent(null)} size="md">
          <ConfirmationModal content={modalContent} closeModal={() => setModalContent(null)} />
        </Modal>
      )}
      <AlertDialogComponent
        isOpen={pressedPolylineId !== null}
        onClose={() => setPressedPolylineId(null)}
        onConfirm={() => {
          deleteOtherMeanMutation(pressedPolylineId!);
          setPressedPolylineId(null);
        }}
        headerText="Suppression tracé"
        bodyText="Voulez-vous vraiment supprimer ce tracé ? Cette action est irréversible."
      />
    </Box>
  );
}

export default InterventionMap;
