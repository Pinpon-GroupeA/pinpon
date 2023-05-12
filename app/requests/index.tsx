import { useQuery, useQueryClient } from '@tanstack/react-query';

import RequestsManagement from '../../components/request-management/RequestsManagement';
import useSubscription from '../../hooks/useSubscription';
import { Request } from '../../types/request-types';
import { fetchInterventionsIdAddressAndDate } from '../../utils/intervention';
import { fetchRequests } from '../../utils/requests';

export default function App() {
  const queryClient = useQueryClient();

  const { data: requests } = useQuery({
    queryKey: ['requestList'],
    queryFn: () => fetchRequests(),
  });

  const { data: interventions } = useQuery({
    queryKey: ['interventionList'],
    queryFn: () => fetchInterventionsIdAddressAndDate(),
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

  return <RequestsManagement interventions={interventions ?? []} requests={requests ?? []} />;
}
