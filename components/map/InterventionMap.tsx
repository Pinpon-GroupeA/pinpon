import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Box, Fab, Icon, Modal, Text } from 'native-base';
import { useState } from 'react';
import { MapPressEvent, Marker, MarkerDragStartEndEvent, Polyline } from 'react-native-maps';

import AlertDialogComponent from './AlertDialogComponent';
import CustomCircle from './symbols/CustomCircle';
import FireFighterVehicle from './symbols/FireFighterVehicle';
import Colors from '../../constants/colors';
import { useAppStore } from '../../stores/store';
import { Coordinates, DangerCode } from '../../types/global-types';
import {
  InterventionMean,
  InterventionMeanStatus,
  MeanModalContent,
  OtherMean,
} from '../../types/mean-types';
import { findDangerCodeFromColor, getDangerCodeColor } from '../../utils/danger-code';
import { castInterventionIdAsNumber } from '../../utils/intervention';
import {
  createOtherMean,
  deleteOtherMean,
  updateOtherMeanLocation,
} from '../../utils/intervention-dangers';
import {
  fetchStatusFromMeanId,
  updateInterventionMeanDangerCode,
  updateInterventionMeanStatus,
  updateInterventionMeanStatusFromMeanId,
} from '../../utils/intervention-mean';
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
  const waterPointNumber = 20;

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

  const { mutateAsync: updateOtherMeanLocationMutation } = useMutation({
    mutationFn: (data: { otherMeanId: number; location: Coordinates }) =>
      updateOtherMeanLocation(data.otherMeanId, data.location),
  });

  const { mutateAsync: updateMeanLocationMutation } = useMutation({
    mutationFn: (data: { meanId: number; location: Coordinates }) =>
      updateMeanLocation(data.meanId, data.location),
  });

  const { mutateAsync: updateMeanStatus } = useMutation({
    mutationFn: (data: { id: number; status: InterventionMeanStatus }) =>
      updateInterventionMeanStatus(data.id, data.status),
  });

  const { mutateAsync: updateMeanStatusFromMeanId } = useMutation({
    mutationFn: (data: { meanId: number; status: InterventionMeanStatus }) =>
      updateInterventionMeanStatusFromMeanId(data.meanId, data.status),
  });

  const { mutateAsync: createOtherMeanMutation } = useMutation({
    mutationFn: (otherMean: OtherMean) => createOtherMean(otherMean),
  });

  const { mutateAsync: updateInterventionMeanDangerCodeMutation } = useMutation({
    mutationFn: (data: { meanId: number; dangerCode: DangerCode }) =>
      updateInterventionMeanDangerCode(data.meanId, data.dangerCode),
  });

  const { selectedSymbol, setSelectedSymbol, drawingsColor } = useAppStore();

  const [newPolyline, setNewPolyline] = useState<Coordinates[]>([]);
  const [polylineDrawMode, setPolylineDrawMode] = useState(false);
  const [modalContent, setModalContent] = useState<MeanModalContent | null>(null);
  const [pressedPolylineId, setPressedPolylineId] = useState<number | null>(null);

  const handlePress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (polylineDrawMode) {
      setNewPolyline((prev) => [...prev, { latitude, longitude }]);
      return;
    }

    if (selectedSymbol) {
      if (selectedSymbol.symboleType && selectedSymbol.symboleType !== 'FireFighterVehicle') {
        createOtherMeanMutation(
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
        updateMeanLocationMutation({
          meanId: selectedSymbol.id,
          location: { latitude, longitude },
        });

        updateInterventionMeanDangerCodeMutation({
          meanId: selectedSymbol.id,
          dangerCode: findDangerCodeFromColor(drawingsColor),
        });

        const meanStatus = await fetchStatusFromMeanId(selectedSymbol.id);

        updateMeanStatusFromMeanId({
          meanId: selectedSymbol.id,
          status: meanStatus === 'returning_crm' ? 'changing_position' : 'arriving_on_site',
        });
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
      meanId: mean.mean_id,
      crmArrival: mean.crm_arrival,
      sectorArrival: mean.sector_arrival,
      availableAt: mean.available_at,
      status: mean.status,
      meanLocation: mean.means.location,
    });
  };

  const handleOtherMeanDragEnd = (event: MarkerDragStartEndEvent, otherMeanId: number) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    updateOtherMeanLocationMutation({
      otherMeanId,
      location: { latitude, longitude },
    });
  };

  const handleFireFighterVehicleDragEnd = (
    event: MarkerDragStartEndEvent,
    mean: InterventionMean
  ) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    updateMeanLocationMutation({
      meanId: mean.mean_id,
      location: { latitude, longitude },
    });

    updateMeanStatus({
      id: mean.id,
      status: 'changing_position',
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
            draggable
            onDragEnd={(event) => handleFireFighterVehicleDragEnd(event, mean)}
          >
            <FireFighterVehicle
              color={getDangerCodeColor(mean.danger_code)}
              name={mean.means.label}
              dashed={mean.status !== 'on_site'}
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
            draggable
            onDragEnd={(event) => handleOtherMeanDragEnd(event, mean.id)}
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
        backgroundColor={polylineDrawMode ? 'white' : Colors.TURQUOISE}
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
