import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import InterventionList from '../../components/intervention/InterventionList';
import { Intervention } from '../../types/intervention-types';
import { fetchInterventions } from '../../utils/intervention';
import { supabase } from '../../utils/supabase';

export default function App() {
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

  useEffect(() => {
    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Interventions' },
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
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <InterventionList interventions={interventions ?? []} />;
}
