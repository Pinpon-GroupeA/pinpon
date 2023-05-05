import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import MeansTableRequests from '../../../../../components/means-table/MeansTableRequests';
import { fecthInterventionMeans, requestsRequest } from '../../../../../utils/means';

export default function Means() {
  const { id: interventionId } = useSearchParams();

  const { data: requests } = useQuery({
    queryKey: ['requests'],
    queryFn: () => requestsRequest(interventionId),
  });

  const { data: dataInter } = useQuery({
    queryKey: ['dataInter'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  return (
    <VStack>
      <MeansTable means={dataInter || []} />
      <MeansTableRequests means={requests || []} />
    </VStack>
  );
}
