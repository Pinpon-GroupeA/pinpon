import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

import DemandManagement from './CODIS/DemandManagement';
import Providers from './Providers';
const supabaseUrl: string = 'http://localhost:8000';
const supabaseKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjgyNjMyODAwLAogICAgImV4cCI6IDE4NDA0ODU2MDAKfQ.bkfg_ZuD1UHBiB1rUY4P0Ox7n9yheMtzUzHsXkVi_bE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  async function getData() {
    await supabase
      .from('Requests')
      .select()
      .eq('status', 'PENDING')
      .then(({ data }) => {
        setDemandList(data);
      });
  }

  const adress = '15 Avenue des Champs Elysée, 35000 RENNES';
  const type: string = 'SAP';
  const date = '25/04/2023';

  const [demandList, setDemandList] = useState<JSON[]>([]);
  getData();
  //console.log('reqout', demandList);

  return (
    <Providers>
      <DemandManagement
        adress={adress}
        type={type}
        date={date}
        demandList={demandList}
        supabase={supabase}
      />
    </Providers>
  );
}
