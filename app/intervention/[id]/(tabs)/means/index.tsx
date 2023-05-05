import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Spinner, VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import MeansTableRequests from '../../../../../components/means-table/MeansTableRequests';
import { Mean } from '../../../../../types/mean-types';
import { Request } from '../../../../../types/request-types';
import { meansRequest, requestsRequest } from '../../../../../utils/means';

export default function Means() {
  const { id } = useSearchParams();
  const { data: requests, isLoading } = useQuery<Request[]>(
    ['requests', id],
    async (): Promise<Request[]> => {
      if (id) {
        const _id = Array.isArray(id) ? id.at(0) : id;

        if (!_id) {
          return [];
        }

        return requestsRequest(_id);
      }

      return [];
    }
  );

  const { data: dataInter } = useQuery<Mean[]>(['intervention'], async (): Promise<Mean[]> => {
    if (id) {
      const _id = Array.isArray(id) ? id.at(0) : id;

      if (!_id) {
        return [];
      }

      return meansRequest(_id);
    }

    return [];
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
