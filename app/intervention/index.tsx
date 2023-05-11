import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Spinner } from 'native-base';
import React, { useState } from 'react';

import InterventionList from '../../components/intervention/InterventionList';
import useSubscription from '../../hooks/useSubscription';
import { Intervention } from '../../types/intervention-types';
import { fetchInterventions, fetchNbDemandsIntervention } from '../../utils/intervention';

export default function InterventionScreen() {
  const queryClient = useQueryClient();

  const { data: interventions } = useQuery<Intervention[]>(['interventions'], {
    queryFn: fetchInterventions,
  });

  const nbDemandsList: number[] = [];
  interventions?.forEach(function (intervention) {
    const tmp = async () => {
      nbDemandsList[intervention.id] = await fetchNbDemandsIntervention(intervention.id);
    };
  });


  const onInsert = (intervention: Intervention) =>
    queryClient.setQueryData(['interventions'], (old: Intervention[] | undefined) => [
      intervention,
      ...(old ?? []),
    ]);

  const onUpdate = (intervention: Intervention) =>
    queryClient.setQueryData(['interventions'], (old: Intervention[] | undefined) =>
      old?.map((i) => (i.id === intervention.id ? intervention : i))
    );

  const onDelete = (intervention: Intervention) =>
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
          onInsert(payload.new as Intervention);
          break;

        case 'UPDATE':
          onUpdate(payload.new as Intervention);
          break;

        case 'DELETE':
          onDelete(payload.old as Intervention);
          break;
      }
    }
  );
  /*
    const interventionsWithPendingRequests = interventions?.map(async (intervention) => {
      const pendingRequests = useQuery("nbDemands",fetchNbDemandsIntervention(intervention.id));
      return { ...intervention, pendingRequests };
    });
  */
  const { data: interventionsWithPendingRequests, isLoading } = useQuery({
    queryKey: ['interventionsWithPendingRequests', interventions],
    queryFn: () =>
      Promise.all(
        interventions?.map(async (intervention) => {
          const pendingRequests = await fetchNbDemandsIntervention(intervention.id);

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
    <>
      <Stack.Screen options={{ title: 'Liste des interventions' }} />
      <InterventionList interventions={interventionsWithPendingRequests ?? []} />
    </>
  );
}
