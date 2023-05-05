import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import InterventionList from '../../components/intervention/InterventionList';
import useSubscription from '../../hooks/useSubscription';
import { Intervention } from '../../types/intervention-types';
import { fetchInterventions } from '../../utils/intervention';

export default function InterventionScreen() {
  const queryClient = useQueryClient();

  const { data: interventions } = useQuery<Intervention[]>(['interventions'], {
    queryFn: fetchInterventions,
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

  return (
    <>
      <Stack.Screen options={{ title: 'Liste des interventions' }} />
      <InterventionList interventions={interventions ?? []} />
    </>
  );
}
