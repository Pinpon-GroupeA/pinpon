import { useQuery } from '@tanstack/react-query';
import { Box, Fab, Modal } from 'native-base';
import { useState } from 'react';

import ModalMeansRequest from './ModalMeansRequest';
import { Mean, MeanType } from '../../../types/mean-types';
import { fetchMeansTypes } from '../../../utils/means-type';
import MeansTable from '../means-table/MeansTable';

export default function MeansPage() {
  const [showModal, setShowModal] = useState(false);

  const means: Mean[] = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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

  const { data: meanTypes } = useQuery<MeanType[]>(['meanTypes'], {
    queryFn: fetchMeansTypes,
  });

  return (
    <Box>
      <MeansTable means={means} />
      <Fab
        label="Demande de moyens"
        isLoading={meanTypes === undefined}
        isLoadingText="Récupération des moyens possibles..."
        bottom={115}
        backgroundColor="#19837C"
        onPress={() => setShowModal(true)}
        renderInPortal={false}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalMeansRequest meansType={meanTypes ?? []} />
      </Modal>
    </Box>
  );
}
