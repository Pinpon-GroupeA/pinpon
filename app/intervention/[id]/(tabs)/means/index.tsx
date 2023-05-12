import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';

import MeansPage from '../../../../../components/means/mean-request/MeansPage';
import useSubscription from '../../../../../hooks/useSubscription';
import { InterventionMean } from '../../../../../types/mean-types';
import { Request } from '../../../../../types/request-types';
import {
  fecthInterventionMeans,
  getMeansOfInterventionMean,
} from '../../../../../utils/intervention-mean';
import { fetchRequestsOfIntervention } from '../../../../../utils/requests-of-intervention';
import { Tables } from '../../../../../utils/supabase';

export default function Means() {
  const queryClient = useQueryClient();

  const { id: interventionId } = useSearchParams();

  const { data: means } = useQuery({
    queryKey: ['meansTableMeans'],
    queryFn: () => fecthInterventionMeans(interventionId),
  });

  const onInsertMeans = async (mean: InterventionMean) => {
    const completeInterventionMean = await getMeansOfInterventionMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) => [
      completeInterventionMean,
      ...(oldData ?? []),
    ]);
  };

  const onUpdateMeans = async (mean: InterventionMean) => {
    const completeInterventionMean = await getMeansOfInterventionMean(mean);

    queryClient.setQueryData(['meansTableMeans'], (oldData: InterventionMean[] | undefined) =>
      oldData?.map((i) => (i.id === mean.id ? completeInterventionMean : i))
    );
  };

  const onDeleteMeans = (mean: InterventionMean) =>
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
          onInsertMeans(payload.new as InterventionMean);
          break;

        case 'UPDATE':
          onUpdateMeans(payload.new as InterventionMean);
          break;

        case 'DELETE':
          onDeleteMeans(payload.old as InterventionMean);
          break;
      }
    }
  );

  const { data: requests } = useQuery({
    queryKey: ['requestMeans'],
    queryFn: () => fetchRequestsOfIntervention(interventionId),
  });

  const onInsertRequests = async (request: Request) => {
    queryClient.setQueryData(['requestMeans'], (oldData: Request[] | undefined) => [
      request,
      ...(oldData ?? []),
    ]);
  };

  const onDeleteRequests = (request: Request) => {
    queryClient.setQueryData(['requestMeans'], (old: Request[] | undefined) =>
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
          onInsertRequests(payload.new as Request);
          break;

        case 'DELETE':
          onDeleteRequests(payload.old as Request);
          break;
      }
    }
  );

  return <MeansPage means={means ?? []} requests={requests ?? []} />;
}
