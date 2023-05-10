import { useQuery } from '@tanstack/react-query';
import { Box, Fab, Modal } from 'native-base';
import { useState } from 'react';

import ModalMeansRequest from './ModalMeansRequest';
import { InterventionMean, MeanType } from '../../../types/mean-types';
import { Request } from '../../../types/request-types';
import { fetchMeansTypes } from '../../../utils/means-type';
import MeansTable from '../means-table/MeansTable';

type MeansPageProps = {
  means: InterventionMean[];
  requests: Request[];
};

function MeansPage({ means, requests }: MeansPageProps) {
  const [showModal, setShowModal] = useState(false);

  const { data: meanTypes } = useQuery<MeanType[]>(['meanTypes'], {
    queryFn: fetchMeansTypes,
  });

  return (
    <Box flex="1">
      <MeansTable means={means} requests={requests} />
      <Fab
        label="Demande de moyens"
        isLoading={meanTypes === undefined}
        isLoadingText="Récupération des moyens possibles..."
        backgroundColor="#19837C"
        onPress={() => setShowModal(true)}
        renderInPortal={false}
        placement="bottom-right"
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalMeansRequest meansType={meanTypes ?? []} setShowModal={setShowModal} />
      </Modal>
    </Box>
  );
}

export default MeansPage;
