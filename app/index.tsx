import DemandManagement from './CODIS/DemandManagement';
import Providers from './Providers';

export default function App() {
  const adress = '15 Avenue des Champs Elysée, 35000 RENNES';
  const type: string = 'SAP';
  const date = '25/04/2023';
  const demandList = [
    { id: 1, hour: '1005', val: 'Alpha' },
    { id: 2, hour: '1005', val: 'Beta' },
    { id: 3, hour: '1005', val: 'Teta' },
    { id: 4, hour: '1020', val: 'Omega' },
  ];
  return (
    <Providers>
      <DemandManagement adress={adress} type={type} date={date} demandList={demandList} />
    </Providers>
  );
}
