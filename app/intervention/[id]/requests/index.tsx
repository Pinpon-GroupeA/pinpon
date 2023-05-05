import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import RequestManagement from '../../../../components/request-management/RequestManagement';
import { fetchInterventionAddressDangerCodeAndDate } from '../../../../utils/intervention';
import { fetchPendingRequests } from '../../../../utils/request';

export default function App() {
  const { id: interventionId } = useSearchParams();

  const { data: requests } = useQuery({
    queryKey: ['requestList'],
    queryFn: fetchPendingRequests,
  });

  const { data: intervention } = useQuery({
    queryKey: ['intervention'],
    queryFn: () => fetchInterventionAddressDangerCodeAndDate(interventionId),
  });

  return (
    <RequestManagement
      address={intervention?.address}
      danger_code={intervention?.danger_code}
      date={intervention?.created_at}
      requests={requests ?? []}
    />
  );
}
