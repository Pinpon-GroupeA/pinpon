import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'native-base';

import InitialMeansRequest from '../../../components/intervention/InitialMeansRequest';
import { MeanType } from '../../../types/mean-types';
import { fetchMeansTypes } from '../../../utils/means-type';

export default function CreateInterventionStep2() {
  const { data: meanTypes, isLoading } = useQuery<MeanType[]>(['meanTypes'], {
    queryFn: fetchMeansTypes,
  });

  if (isLoading) return <Spinner />;

  return <InitialMeansRequest meanTypes={meanTypes ?? []} key={meanTypes?.length} />;
}
