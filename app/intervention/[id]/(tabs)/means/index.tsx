import MeansTable from '../../../../../components/means-table/MeansTable';
import { Mean } from '../../../../../types/mean-types';

export default function Means() {
  const means: Mean[] = [
    {
      id: '1',
      label: 'VSAV 1',
      requestTime: '1000',
      schduledArrivalTime: '1015',
      CRMArrivalTime: '1020',
      onSiteArrivalTime: '1025',
      availableTime: '1030',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'VSAV',
      dangerCode: 'INC',
    },
    {
      id: '2',
      label: 'FPT 1',
      requestTime: '1020',
      schduledArrivalTime: '1025',
      CRMArrivalTime: '1030',
      onSiteArrivalTime: '1035',
      availableTime: '1040',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'FPT',
      dangerCode: 'SAP',
    },
    {
      id: '3',
      label: 'VSAV 2',
      requestTime: '1030',
      schduledArrivalTime: '1035',
      CRMArrivalTime: '1040',
      onSiteArrivalTime: '1045',
      availableTime: '1050',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
      },
      meanType: 'VSAV',
      dangerCode: 'INC',
    },
  ];

  return <MeansTable means={means} />;
}
