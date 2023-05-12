import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import RequestsOfInterventionManagement from '../../../../components/request-management/RequestsOfInterventionManagement';
import useSubscription from '../../../../hooks/useSubscription';
import { Request } from '../../../../types/request-types';
import { fetchInterventionAddressDangerCodeAndDate } from '../../../../utils/intervention';
import { fetchRequestsOfIntervention } from '../../../../utils/requests-of-intervention';

export default function App() {
  const { id: interventionId } = useSearchParams();

  const queryClient = useQueryClient();

  const { data: requests } = useQuery({
    queryKey: ['requestList'],
    queryFn: () => fetchRequestsOfIntervention(interventionId),
  });

  const { data: intervention } = useQuery({
    queryKey: ['intervention'],
    queryFn: () => fetchInterventionAddressDangerCodeAndDate(interventionId),
  });

  const onInsert = (request: Request) =>
    queryClient.setQueryData(['requestList'], (old: Request[] | undefined) => [
      request,
      ...(old ?? []),
    ]);

  const onUpdate = (request: Request) =>
    queryClient.setQueryData(['requestList'], (old: Request[] | undefined) =>
      old?.map((r) => (r.id === request.id ? request : r))
    );

  const onDelete = (request: Request) =>
    queryClient.setQueryData(['requestList'], (old: Request[] | undefined) =>
      old?.filter((r) => r.id !== request.id)
    );

  useSubscription(
    {
      channel: 'requests',
      table: 'requests',
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsert(payload.new as Request);
          break;

        case 'UPDATE':
          onUpdate(payload.new as Request);
          break;

        case 'DELETE':
          onDelete(payload.old as Request);
          break;
      }
    }
  );

  return (
    <RequestsOfInterventionManagement
      address={intervention?.address}
      danger_code={intervention?.danger_code}
      date={intervention?.created_at}
      requests={requests ?? []}
    />
  );
}
