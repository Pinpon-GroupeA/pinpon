import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Spinner, VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import MeansTableRequests from '../../../../../components/means-table/MeansTableRequests';
import { Mean } from '../../../../../types/mean-types';
import { Request } from '../../../../../types/request-types';
import { meansRequest, requestsRequest } from '../../../../../utils/means';

export default function Means() {
  const id = useSearchParams();
  const { data: requests, isLoading } = useQuery<Request[]>(
    ['requests'],
    async (): Promise<Request[]> => {
      return requestsRequest(id);
    }
  );

  const { data: dataInter } = useQuery<Mean[]>(['intervention'], async (): Promise<Mean[]> => {
    return meansRequest(id);
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack>
      <MeansTable means={dataInter || []} />
      <MeansTableRequests means={requests || []} />
    </VStack>
  );
}
