import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Box, Spinner } from 'native-base';
import React from 'react';

import InterventionList from '../../components/intervention/InterventionList';
import useSubscription from '../../hooks/useSubscription';
import { Intervention } from '../../types/intervention-types';
import { fetchInterventions } from '../../utils/intervention';
import {
  fetchNumberOfRequests,
  fetchNumberOfRequestsOfIntervention,
} from '../../utils/requests-of-intervention';

export default function InterventionScreen() {
  const queryClient = useQueryClient();

  const { data: interventions } = useQuery<Intervention[]>(['interventions'], {
    queryFn: fetchInterventions,
  });

  const { data: numberOfRequests } = useQuery<number>(['numberOfRequests'], {
    queryFn: fetchNumberOfRequests,
  });

  const onInsertIntervention = (intervention: Intervention) =>
    queryClient.setQueryData(['interventions'], (old: Intervention[] | undefined) => [
      intervention,
      ...(old ?? []),
    ]);

  const onUpdateIntervention = (intervention: Intervention) =>
    queryClient.setQueryData(['interventions'], (old: Intervention[] | undefined) =>
      old?.map((i) => (i.id === intervention.id ? intervention : i))
    );

  const onDeleteIntervention = (intervention: Intervention) =>
    queryClient.setQueryData(['interventions'], (old: Intervention[] | undefined) =>
      old?.filter((i) => i.id !== intervention.id)
    );

  useSubscription(
    {
      channel: 'interventions',
      table: 'interventions',
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsertIntervention(payload.new as Intervention);
          break;

        case 'UPDATE':
          onUpdateIntervention(payload.new as Intervention);
          break;

        case 'DELETE':
          onDeleteIntervention(payload.old as Intervention);
          break;
      }
    }
  );

  const onInsertRequest = () => {
    const newNumberOfRequests = numberOfRequests ? numberOfRequests + 1 : 1;

    queryClient.setQueryData(['numberOfRequests'], newNumberOfRequests);
  };

  const onDeleteRequest = () => {
    const newNumberOfRequests = numberOfRequests ? numberOfRequests - 1 : 0;

    queryClient.setQueryData(['numberOfRequests'], newNumberOfRequests);
  };

  useSubscription(
    {
      channel: 'numberOfRequests',
      table: 'requests',
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsertRequest();
          break;
        case 'DELETE':
          onDeleteRequest();
          break;
      }
    }
  );

  const { data: interventionsWithPendingRequests, isLoading } = useQuery({
    queryKey: ['interventionsWithPendingRequests', interventions, numberOfRequests],
    queryFn: () =>
      Promise.all(
        interventions?.map(async (intervention) => {
          const pendingRequests = await fetchNumberOfRequestsOfIntervention(intervention.id);

          return {
            ...intervention,
            pendingRequests,
          };
        }) || []
      ),
    enabled: !!interventions,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box height="100%">
      <Stack.Screen options={{ title: 'Liste des interventions' }} />
      <InterventionList interventions={interventionsWithPendingRequests ?? []} />
    </Box>
  );
}
