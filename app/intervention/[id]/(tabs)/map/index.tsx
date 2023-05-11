import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Box, HStack } from 'native-base';

import InterventionMap from '../../../../../components/map/InterventionMap';
import SymbolsPane from '../../../../../components/map/SymbolsPane';
import useSubscription from '../../../../../hooks/useSubscription';
import { InterventionMean, OtherMean } from '../../../../../types/mean-types';
import { fetchInterventionLocation } from '../../../../../utils/intervention';
import {
  fetchInterventionDangers,
  getOtherMeansPlaced,
} from '../../../../../utils/intervention-dangers';
import {
  fecthInterventionMeans,
  getFireFighterMeansNotPlaced,
  getFireFightersMeansPlaced,
  getMeansOfInterventionMean,
} from '../../../../../utils/intervention-mean';
import { Tables } from '../../../../../utils/supabase';

export default function Map() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: interventionLocation } = useQuery({
    queryKey: ['interventionLocation'],
    queryFn: () => fetchInterventionLocation(interventionId),
  });

  const { data: fireFighterMeans } = useQuery({
    queryKey: ['fireFighterMeans'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  const { data: otherMeans } = useQuery({
    queryKey: ['otherMeans'],
    queryFn: () => fetchInterventionDangers(interventionId),
  });

  const onFireFighterMeanInsert = async (interventionMean: InterventionMean) => {
    const completeInterventionMean = await getMeansOfInterventionMean(interventionMean);

    queryClient.setQueryData(['fireFighterMeans'], (oldData: InterventionMean[] | undefined) => [
      completeInterventionMean,
      ...(oldData ?? []),
    ]);
  };

  const onFireFighterMeanUpdate = async (interventionMean: InterventionMean) => {
    const completeInterventionMean = await getMeansOfInterventionMean(interventionMean);

    queryClient.setQueryData(['fireFighterMeans'], (oldData: InterventionMean[] | undefined) =>
      oldData?.map((i) => (i.id === interventionMean.id ? completeInterventionMean : i))
    );
  };

  const onFireFighterMeanDelete = (interventionMean: InterventionMean) => {
    queryClient.setQueryData(['fireFighterMeans'], (oldData: InterventionMean[] | undefined) =>
      oldData?.filter((i) => i.id !== interventionMean.id)
    );
  };

  const onOtherMeanInsert = async (otherMean: OtherMean) => {
    queryClient.setQueryData(['otherMeans'], (oldData: OtherMean[] | undefined) => [
      otherMean,
      ...(oldData ?? []),
    ]);
  };

  const onOtherMeanUpdate = async (otherMean: OtherMean) => {
    queryClient.setQueryData(['otherMeans'], (oldData: OtherMean[] | undefined) =>
      oldData?.map((i) => (i.id === otherMean.id ? otherMean : i))
    );
  };

  const onOtherMeanDelete = (otherMean: OtherMean) => {
    queryClient.setQueryData(['otherMeans'], (oldData: OtherMean[] | undefined) =>
      oldData?.filter((i) => i.id !== otherMean.id)
    );
  };

  useSubscription(
    {
      channel: 'interventions_means:means_id=eq.' + interventionId,
      table: Tables.interventionMeansLink,
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onFireFighterMeanInsert(payload.new as InterventionMean);
          break;
        case 'UPDATE':
          onFireFighterMeanUpdate(payload.new as InterventionMean);
          break;
        case 'DELETE':
          onFireFighterMeanDelete(payload.old as InterventionMean);
          break;
      }
    }
  );

  useSubscription(
    {
      channel: 'other_means:means_id=eq.' + interventionId,
      table: Tables.otherMeans,
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onOtherMeanInsert(payload.new as OtherMean);
          break;
        case 'UPDATE':
          onOtherMeanUpdate(payload.new as OtherMean);
          break;
        case 'DELETE':
          onOtherMeanDelete(payload.old as OtherMean);
          break;
      }
    }
  );

  const getPolylines = () => {
    if (!otherMeans) return [];

    return otherMeans.filter((mean) => mean.category === 'PL');
  };

  const getOtherMeans = () => {
    if (!otherMeans) return [];

    return otherMeans.filter((mean) => mean.category !== 'PL');
  };

  return (
    <HStack h="100%">
      <Box w="20%">
        <SymbolsPane fireFighterMeans={getFireFighterMeansNotPlaced(fireFighterMeans ?? [])} />
      </Box>
      <Box w="80%">
        <InterventionMap
          fireFighterMeans={getFireFightersMeansPlaced(fireFighterMeans ?? [])}
          otherMeans={getOtherMeansPlaced(getOtherMeans())}
          currentPolylines={getPolylines()}
          interventionLocation={interventionLocation ?? { latitude: 0, longitude: 0 }}
        />
      </Box>
    </HStack>
  );
}
