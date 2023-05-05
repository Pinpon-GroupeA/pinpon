import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { VStack } from 'native-base';

import MeansTable from '../../../../../components/means-table/MeansTable';
import useSubscription from '../../../../../hooks/useSubscription';
import { InterventionMean } from '../../../../../types/mean-types';
import { fecthInterventionMeans, getInterventionMeanFromMean } from '../../../../../utils/means';
import { Tables } from '../../../../../utils/supabase';

export default function Means() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: means } = useQuery({
    queryKey: ['meansTableMeans'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  const onInsert = async (mean: any) => {
    const completeInterventionMean = await getInterventionMeanFromMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) => [
      completeInterventionMean,
      ...(oldData ?? []),
    ]);
  };

  const onUpdate = async (mean: any) => {
    const completeInterventionMean = await getInterventionMeanFromMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) =>
      oldData?.map((i) => (i.id === mean.id ? completeInterventionMean : i))
    );
  };

  const onDelete = (mean: any) =>
    queryClient.setQueryData(['meansTableMeans'], (old: any[] | undefined) =>
      old?.filter((i) => i.id !== mean.id)
    );

  useSubscription(
    {
      channel: 'meansTableMeans',
      table: Tables.interventionMeansLink,
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsert(payload.new as any);
          break;

        case 'UPDATE':
          onUpdate(payload.new as any);
          break;

        case 'DELETE':
          onDelete(payload.old as any);
          break;
      }
    }
  );

  return (
    <VStack>
      <MeansTable means={means || []} />
    </VStack>
  );
}
