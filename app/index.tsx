import InterventionList from '../components/intervention/InterventionList';
import { Intervention as InterventionType } from '../types/intervention-types';

export default function App() {
  const interventions: InterventionType[] = [
    {
      id: '1',
      date: '2021-09-01T10:00:00',
      location: {
        latitude: 48.115537335418445,
        longitude: -1.638870923241485,
      },
      address: 'Rue de la Chalotais, 35000 Rennes',
      customerName: 'Jean Dupont',
      dangerCode: 'INC',
      isOngoing: true,
    },
    {
      id: '2',
      date: '2021-09-01T10:00:00',
      location: {
        latitude: 48.115537335418445,
        longitude: -1.638870923241485,
      },
      address: 'Rue de la Chalotais, 35000 Rennes',
      customerName: 'Jean Dupont',
      dangerCode: 'SAP',
      isOngoing: true,
    },
  ];

  return <InterventionList interventions={interventions} />;
}
