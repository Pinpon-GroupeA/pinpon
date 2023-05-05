import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { supabase } from '../utils/supabase';

type UseSubscriptionConfig = {
  table?: string;
  channel?: string;
};

const useSubscription = (
  { table, channel }: UseSubscriptionConfig,
  callback: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void
) => {
  useEffect(() => {
    const interventions = supabase
      .channel(channel ?? 'all')
      .on('postgres_changes', { event: '*', schema: 'public', table: table ?? '*' }, callback)
      .subscribe();

    return () => {
      interventions.unsubscribe();
    };
  }, []);
};

export default useSubscription;
