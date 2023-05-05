import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import { fecthInterventionMeans } from '../../../../../utils/means';

export default function Means() {
  const { id: interventionId } = useSearchParams();

  const { data: dataInter } = useQuery({
    queryKey: ['dataInter'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  return (
    <VStack>
      <MeansTable means={dataInter || []} />
    </VStack>
  );
}
