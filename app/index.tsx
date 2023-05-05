import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

import DemandManagement from './CODIS/DemandManagement';
import Providers from './Providers';
const supabaseUrl: string = 'https://nhyrcvtksbhogtjrpipq.supabase.co';
const supabaseKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeXJjdnRrc2Job2d0anJwaXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMTA3NzIsImV4cCI6MTk5ODc4Njc3Mn0.KaldGU5M-JTyonQ_PKcMUH9Bh3xisDcsUg3Z9iOGUhU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  async function getData() {
    await supabase
      .from('requests')
      .select()
      .eq('status', 'EN_ATTENTE')
      .then(({ data, error }) => {
        setDemandList(data);
      });
  }

  const adress = '15 Avenue des Champs Elysée, 35000 RENNES';
  const danger_code: string = 'SAP';
  const date = '25/04/2023';

  const [demandList, setDemandList] = useState<JSON[]>([]);
  getData();

  return (
    <Providers>
      <DemandManagement
        adress={adress}
        danger_code={danger_code}
        date={date}
        demandList={demandList}
        supabase={supabase}
      />
    </Providers>
  );
}
