import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { Spinner, VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import MeansTableRequests from '../../../../../components/means-table/MeansTableRequests';
import { Mean } from '../../../../../types/mean-types';
import { Request } from '../../../../../types/request-types';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Means() {
  const { id } = useSearchParams();
  const { data: request, isLoading } = useQuery<Request[]>(['requests'], async (): Promise<Request[]> => {
      const { data, error } = await supabase.from('Requests').select('*').eq('id_inter', id);

      if (error) {
        throw new Error(error.message);
      }
      return data as Request[];
    }
  );

  const { data: dataInter } = useQuery<Mean[]>(['intervention'], async (): Promise<Mean[]> => {
    const { data, error } = await supabase
      .from('interventions_means_link')
      .select('*')
      .eq('intervention_id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data as Mean[];
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack>
      <MeansTable means={dataInter || []} />
      <MeansTableRequests means={request || []} />
    </VStack>
  );
}
