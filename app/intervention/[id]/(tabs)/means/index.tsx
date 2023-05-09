import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import MeansPage from '../../../../../components/means/mean-request/MeansPage';
import useSubscription from '../../../../../hooks/useSubscription';
import { InterventionMean } from '../../../../../types/mean-types';
import { Request } from '../../../../../types/request-types';
import {
  fecthInterventionMeans,
  getInterventionMeanFromMean,
} from '../../../../../utils/intervention-mean';
import { fetchRequestsOfIntervention } from '../../../../../utils/request';
import { Tables } from '../../../../../utils/supabase';

export default function Means() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: means } = useQuery({
    queryKey: ['meansTableMeans'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  const onInsertMeans = async (mean: any) => {
    const completeInterventionMean = await getInterventionMeanFromMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) => [
      completeInterventionMean,
      ...(oldData ?? []),
    ]);
  };

  const onUpdateMeans = async (mean: any) => {
    const completeInterventionMean = await getInterventionMeanFromMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) =>
      oldData?.map((i) => (i.id === mean.id ? completeInterventionMean : i))
    );
  };

  const onDeleteMeans = (mean: any) =>
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
          onInsertMeans(payload.new as any);
          break;

        case 'UPDATE':
          onUpdateMeans(payload.new as any);
          break;

        case 'DELETE':
          onDeleteMeans(payload.old as any);
          break;
      }
    }
  );

  const { data: requests } = useQuery({
    queryKey: ['requestMeans'],
    queryFn: () => fetchRequestsOfIntervention(interventionId),
  });

  const onInsertRequests = async (request: any) => {
    console.log('les coueilles');
    queryClient.setQueryData(['requestMeans'], (oldData: Request[] | undefined) => [
      request,
      ...(oldData ?? []),
    ]);
  };

  const onDeleteRequests = (request: any) => {
    queryClient.setQueryData(['requestMeans'], (old: any[] | undefined) =>
      old?.filter((i) => i.id !== request.id)
    );
  };

  useSubscription(
    {
      channel: 'requestMeans',
      table: Tables.requests,
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsertRequests(payload.new as any);
          break;

        case 'DELETE':
          onDeleteRequests(payload.old as any);
          break;
      }
    }
  );

  return <MeansPage means={means ?? []} requests={requests ?? []} />;
}
